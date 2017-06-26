(function () {
    'use strict';

    angular
        .module('h5')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['Menu', 'TopMenu', '$state', 'User', 'Popup', '$interval'];

    function RegisterController(Menu,TopMenu, $state, User, Popup, $interval) {
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
            TopMenu.setup({
                title: '注册',
                back: '<'
            });
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
            //if (vm.data.phone, vm.data.tac, vm.data.tacId) {
            //    $state.go('root.registernext')
            //}
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
                $state.go('.end')
            });
        }
    }
})();
