(function () {
    'use strict';

    angular
        .module('h5')
        .controller('ForgetNextController', ForgetNextController);

    ForgetNextController.$inject = ['Menu', 'TopMenu', '$state', 'User', 'Popup', '$interval', '$rootScope', '$window'];

    function ForgetNextController(Menu, TopMenu, $state, User, Popup, $interval, $rootScope, $window) {
        var vm = this;

        vm.data = {};
        vm.countdown = 0;

        vm.getTac = getTac;
        vm.complete = complete;

        var tacId = 0;

        activate();

        function activate() {
            Menu.showMenu(false);

            //if ($state.is('root.forgetPassword')) {
            //    TopMenu.setup({
            //        show:false,
            //        title: '忘记密码',
            //        back: 'root.login'
            //    });
            //}
            //else {
            TopMenu.setup({
                title: '找回密码',
                back: 'root.forgetPassword',
                //back: function () {
                //    if ($rootScope.loginReturn) {
                //        $window.location.href = $rootScope.loginReturn;
                //    }
                //    else {
                //        Menu.navigate();
                //    }
                //}
            });
            //}

            $('body').addClass('greyBackground');
        }

        function getTac() {
            if (!vm.data.tac) {
                Popup.alert("提示", "请输入手机号码");
                return;
            }

            var promise = User.getTac(vm.data.phone, vm.data.tac).then(function (data) {
                vm.data.tacId = data.MessageId;

                vm.countdown = 60;
                var interval = $interval(function () {
                    vm.countdown--;

                    if (vm.countdown <= 0) $interval.cancel(interval);
                }, 1000);
            });

            Popup.process(promise, "验证码发送成功!");
        }

        function complete() {
           

            if (!vm.data.tac) {
                Popup.alert("提示", "请输入验证码").then(function () {
                    User.registerInfo = vm.data;
                    $state.go('.new')
                });
             
            }     
        }
    }
})();