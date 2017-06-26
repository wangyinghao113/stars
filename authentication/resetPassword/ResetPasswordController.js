(function () {
    'use strict';

    angular
        .module('h5')
        .controller('ResetPasswordController', ResetPasswordController);

    ResetPasswordController.$inject = ['Menu', 'TopMenu', '$state', '$timeout', 'Popup', 'User', '$rootScope', '$window'];

    function ResetPasswordController(Menu, TopMenu, $state, $timeout, Popup, User, $rootScope, $window) {
        var vm = this;

        vm.data = User.registerInfo;
        vm.showError = false;

        vm.checkPassword = checkPassword;
        vm.submit = submit;

        var timeout = null;

        activate();

        function activate() {
            Menu.showMenu(false);

            TopMenu.setup({
                title: '设置密码',
                back: '^'
            });

            $('body').addClass('greyBackground');

            if (!User.registerInfo.tacId) {
                $state.go('^');
            }
        }

        function checkPassword() {
            if (timeout) {
                $timeout.cancel(timeout);
            }

            var match = (vm.data.password == vm.data.password1);
            
            if (!vm.showError & !match) {
                timeout = $timeout(function () {
                    vm.showError = true;
                }, 1000);
            }

            if (match || !vm.data.password1) {
                vm.showError = false;
            }
        }

        function submit() {
            if (!/^[a-zA-Z0-9]{6,16}$/.test(vm.data.password)) {
                Popup.alert('提示', '登陆密码为6-16位字母或数字组成');
                return;
            }
            //if (vm.data.password != vm.data.password1) {
            //    Popup.alert('提示', '两次输入密码不一致');
            //    return;
            //}

            Popup.process(User.resetPassword(), "成功重置密码").then(function () {
                if ($state.is('root.forgetPassword.new')) {
                    $state.go('root.login');
                }
                else {
                    if ($rootScope.loginReturn) {
                        $window.location.href = $rootScope.loginReturn;
                    }
                    else {
                        Menu.navigate();
                    }
                }
            });
        }
    }
})();