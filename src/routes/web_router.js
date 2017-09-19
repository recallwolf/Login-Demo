var express = require('express');
var router = express.Router();
var eventproxy = require('eventproxy');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

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
		res.render('login', {error: '您填写的不完整'})；
	}
});


//提交注册信息
router.post('/register', function(){
	//获取用户数据
	var username = req.body.user;
	var pwd = req.body.pwd;
	var email = req.body.email;
	var repwd = req.body.repwd;
	var ep = new EventProxy();
	ep.on('info_error', function(msg){
		res.status(422);
		res.render('login',{error: msg});
	})

	//验证数据

	//验证用户数据是否为空
	var isempty = [usernaem, pwd, email, repwd].some(function(value){
		return value === '';
	});
	//验证两次输入密码
	var isright = pwd !== repwd;

	if(isempty || isright){
		ep.emit('info_error', '注册信息错误');
	}

});

//登出
router.get('/logout', function(){
	res.redirect('/');
});

module.exports = router;
