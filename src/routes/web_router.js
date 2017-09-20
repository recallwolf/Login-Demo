var express = require('express');
var router = express.Router();
var eventproxy = require('eventproxy');
var UserModel = require('../models/user');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

//主页
router.get('/', function(req, res) {
  res.render('index');
});

//登录界面
router.get('/login', function(req, res){
	res.render('login');
});

//注册界面
router.get('/register', function(req, res){
	res.render('register');
});

//提交登录信息
router.post('/login', function(req, res){
	//获取登录信息
	var username = req.body.username;
	var pwd = req.body.pwd;

	//判断用户信息是否为空
	if(!username || !pwd){
		res.status(422);
		res.render('login', {error: '您填写的不完整'});
	}
	UserModel.getUser(username, pwd, function(err, user){
		if(user){
			req.seesion.user = user;
			res.render('login', {success: '登陆成功'});
		}
		if(err){
			res.status(422);
			res.render('login', {error: '用户名或密码错误'});
		}
	});
});


//提交注册信息
router.post('/register', function(req, res){
	//获取用户数据
	var username = req.body.username;
	var pwd = req.body.pwd;
	var email = req.body.email;
	var repwd = req.body.repwd;
	var ep = new eventproxy();
	ep.on('info_error', function(msg){
		res.status(422);
		res.render('register',{error: msg});
	});

	//验证数据

	//验证用户数据是否为空
	var isempty = [username, pwd, email, repwd].some(function(value){
		return value === '';
	});
	//验证两次输入密码
	var isright = pwd !== repwd;

	if(isempty || isright){
		ep.emit('info_error', '注册信息错误');
	}
	UserModel.getUserBySignupInfo(username, email, function(err, users){
		if(err){
			ep.emit('info_error', '获取用户数据失败');
		}
		if(users.length > 0){
			ep.emit('info_error', '用户名或邮箱已存在');
		}
		UserModel.addUser({username: username, pwd: pwd, email: emial}, function(err, result){
			if(result){
				res.render('/register', {success: '恭喜你注册成功'});
			}
			if(err){
				ep.emit('info_error', '注册失败');
			}
		});
	});
});

//登出
router.get('/logout', function(){
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
