(function () {
    'use strict';

    angular
        .module('h5')
        .controller('ForgetPasswordController', ForgetPasswordController);

    ForgetPasswordController.$inject = ['Menu', 'TopMenu', '$state', 'User', 'Popup', '$interval', '$rootScope', '$window'];

    function ForgetPasswordController(Menu, TopMenu, $state, User, Popup, $interval, $rootScope, $window) {
        var vm = this;

        vm.data = {};
        vm.countdown = 0;

        vm.getTac = getTac;
        vm.next = next;
        vm.nextone = nextone;
        var tacId = 0;

        activate();

        function activate() {
            Menu.showMenu(false);

            if ( $(".one").show()) {
                TopMenu.setup({
                    show:true,
                    title: '找回密码',
                    back: '<'
                });
            }
            else {
                TopMenu.setup({
                    title: '修改密码',
                    back: function () {
                        if ($rootScope.loginReturn) {
                            $window.location.href = $rootScope.loginReturn;
                        }
                        else {
                            Menu.navigate();
                        }
                    }
                });
            }
            $(".two").hide();
            $('body').addClass('greyBackground');
        }

        function getTac() {
            if (!vm.data.phone) {
                Popup.alert("提示", "请输入手机号码");
                return;
            }

            var promise = User.getTac(vm.data.phone).then(function (data) {
                vm.data.tacId = data.MessageId;

                vm.countdown = 60;
                var interval = $interval(function () {
                    vm.countdown--;

                    if (vm.countdown <= 0) $interval.cancel(interval);
                }, 1000);
            });

            Popup.process(promise, "验证码发送成功!");

        }

        function nextone() {
            if (!vm.data.phone) {
                Popup.alert("提示", "请输入手机号码");
                return;

            }

            var promise = User.getTac(vm.data.phone).then(function (data) {
                vm.data.tacId = data.MessageId;

                vm.countdown = 60;
                var interval = $interval(function () {
                    vm.countdown--;

                    if (vm.countdown <= 0) $interval.cancel(interval);
                }, 1000);
            });

            Popup.process(promise, "验证码发送成功!").then(function (data) {
                $(".one").hide();
                $(".two").show();
            });

        }

        function next() {

            if (!vm.data.phone) {
                Popup.alert("提示", "请输入手机号码");
                return;
                $(".one").hide();
                $(".two").show();
                $(".blueButton").show();
            }


            if (!vm.data.tac) {
                Popup.alert("提示", "请输入验证码");
                return;
            }

            Popup.process(User.verifyTac(vm.data.phone, vm.data.tac, vm.data.tacId)).then(function () {
                User.registerInfo = vm.data;
                $state.go('.new')
            });
        }
    }
})();