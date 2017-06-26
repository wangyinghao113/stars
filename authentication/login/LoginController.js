(function () {
    'use strict';

    angular
        .module('h5')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['Menu', 'TopMenu', 'User', 'Popup', '$state', '$window', '$rootScope'];

    function LoginController(Menu, TopMenu, User, Popup, $state, $window, $rootScope) {
        var vm = this;
            vm.data = {};
            vm.login = login;
            vm.go = go;
            vm.goforget = goforget;
            vm.callBackUrl = window.location.hostname;
            activate();

        function activate() {

            IsUnionLogin();

            Menu.showMenu(false);

            TopMenu.setup({
                title: '登录',
                show: false,
                //right: [{
                //    title: '注册',
                //    state: 'root.register'
                //}]
                back: '<'
            });

            $('body').addClass('greyBackground');
        }

        function goforget(){
            $state.go('root.forgetPassword', {
                menuId: $state.params.menuId,

                'return': $state.href($state.current.name, $state.params)
            });
        }

        function go() {
            $window.history.back();


            //$state.go('root.personal', { menuId:10})
        }

        function login() {
            //if (!/^1[34578][0-9]{9}$/.test(vm.data.phone)) {
            //    Popup.alert("提示", '请输入正确的手机号码');
            //    return;
            //}
            if (vm.data.password === '') {
                Popup.alert("提示", '密码不能为空');
                return;
            }

            var promise = User.login(vm.data.phone, vm.data.password);

            Popup.process(promise).then(function () {
                //if ($state.params.return) {
                //    $window.location.href = $state.params.return;
                //    $state.go('root.home');
                //}
                //else {
                //    Menu.navigate();

                //}
                Menu.navigate();
            });
        }

      /**
       * @function 第三方登录
       */
        function IsUnionLogin() {
          if (location.toString().indexOf("?union=") <= -1) {
            return;
          }

          swal({ title: '加载中', text: '请稍候', imageUrl: '/images/common/loading.gif', imageSize: '88x88', showConfirmButton: false });

          // 第三方平台返回的用户信息
          var _signinEntity = function () {
            try {
              var signinString = decodeURIComponent(location.toString().split("?union=")[1]);

              var entity = JSON.parse(signinString)

              return entity;
            }
            catch (err) {
              return null;
            }
          }

          // 下一步要跳转到的地址
          var _signinReturnUrl = function () {
            try {
              // 如果设置了返回地址
              // 1，从绑定微博页跳转过来的
              var returnUrl = Cookies.get('union_weibo_return');

              var entity = null;

              if (returnUrl != undefined && returnUrl != "null") {
                entity = JSON.parse(returnUrl);
              }

              //读取以后立即删除掉
              Cookies.set('union_weibo_return', null);
              return entity;
            }
            catch (err) {
              return null;
            }
          }

          //如果接口返回错误信息，就给出提示，不在继续
          var signinEntity = _signinEntity();

          if (signinEntity == null || signinEntity.code != 0) {
            Popup.error(signinEntity.msg);
            return;
          }

          Menu.onReady(function () {

            var promise = null;

            // 登录后带有返回地址
            // 用于绑定业务
            var signinReturnUrl = _signinReturnUrl();
            if (signinReturnUrl != null) {
              promise = User.getData().then(function (u) {
                return User.linkaccount_weibo(u.AppUserId, signinEntity.user.uid, signinEntity.user.token);
              });
            }

              // 第三方登录
            else {
              switch (signinEntity.channel) {

                case "weibo":
                  promise = User.login_weibo(signinEntity.user.uid, signinEntity.user.token, signinEntity.user.name, signinEntity.user.img);
                  break;

                case "qq":
                  promise = User.login_qq(signinEntity.user.uid, signinEntity.user.token, signinEntity.user.name, signinEntity.user.img);
                  break;

                case "wechat":
                  promise = User.login_wechat(signinEntity.user.uid, signinEntity.user.token, signinEntity.user.name, signinEntity.user.img);
                  break;

                case "facebook":
                  promise = User.login_facebook(signinEntity.user.uid, signinEntity.user.token, signinEntity.user.name, signinEntity.user.img);
                  break;
              }
            }


            var navigate = function () {
              if (signinReturnUrl != null) {
                $state.go(signinReturnUrl.url, signinReturnUrl.params);
              }
              else {
                Menu.navigate();
              }
            };

            promise.then(function ()
            {
              swal.close();
              navigate();
            }, function (r) {
              Popup.alert(r.ErrorMessage).then(function () {
                navigate();
              });
            });
          });
        }
    }
})();