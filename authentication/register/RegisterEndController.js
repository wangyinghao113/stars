(function () {
    'use strict';

    angular
        .module('h5')
        .controller('RegisterEndController', RegisterEndController);

    RegisterEndController.$inject = ['Menu',  'User', '$state', 'Popup', '$rootScope', '$window'];

    function RegisterEndController(Menu,  User, $state, Popup, $rootScope, $window) {
        var vm = this;

        vm.data = User.registerInfo;
        vm.data.userPic = {};
        vm.viewPassword = false;

        vm.getImgUrl = getImgUrl;
        vm.submit = submit;

        activate();

        function activate() {
            Menu.showMenu(false);

            //TopMenu.setup({
            //    title: '注册',
            //    back: 'root.register'
            //});

            $('body').addClass('greyBackground');

            if (!User.registerInfo.tacId) {
                $state.go('root.register');
            }
        }

        function getImgUrl(model) {
            if (model && model.file && model.file.preview) {
                return model.file.preview.toDataURL();
            }
            else {
                return '/images/register/icon_peo.png';
            }
        }

        function submit() {
            if (!/[0-9a-zA-Z]{6,16}/.test(vm.data.password)) {
                Popup.alert("警告", "密码为6-16位字母或数字组成！");
                return;
            }

            Popup.process(User.register(), "恭喜你注册成功!").then(function () {
                if ($rootScope.loginReturn) {
                    $window.location.href = $rootScope.loginReturn;
                }
                else {
                    Menu.navigate();
                }
            });
        }
    }
})();