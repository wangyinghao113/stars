(function () {
    'use strict';

    angular
        .module('h5')
        .controller('RegisterNextController', RegisterNextController);

    RegisterNextController.$inject = ['Menu', 'TopMenu', '$state', 'User', 'Popup', '$interval'];

    function RegisterNextController(Menu, TopMenu, $state, User, Popup, $interval) {
        var vm = this;

        vm.data = {};
        vm.countdown = 0;

        vm.getTac = getTac;
        vm.next = next;

        var tacId = 0;

        activate();

        function activate() {
            Menu.showMenu(false);
            TopMenu.setup({
                title: '注册',
                back: 'root.login',
            });
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

        function next() {
            if (!vm.data.phone) {
                Popup.alert("提示", "请输入手机号码");
                return;
            }

            if (!vm.data.tac) {
                Popup.alert("提示", "请输入验证码");
                return;
            }

            Popup.process(User.verifyTac(vm.data.phone, vm.data.tac, vm.data.tacId)).then(function () {
                User.registerInfo = vm.data;
                $state.go('root.register.end')
            });
        }
    }
})();
