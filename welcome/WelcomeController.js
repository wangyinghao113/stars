(function () {
    'use strict';

    angular
        .module('h5')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['WelcomeService', '$interval', 'Menu', 'TopMenu', 'AppInfo', '$scope','$state'];

    function WelcomeController(WelcomeService, $interval, Menu, TopMenu, AppInfo, $scope, $state) {
        var vm = this;

        vm.data = [];
        vm.currentActive = -1;

        vm.enter = enter;
        vm.entryFlg = false;

        activate();

        function activate() {
            vm.data.push({
                ImageUrl: '/images/welcome/default_welcome.png',
                active: true,
            });

            var watch = $scope.$watch(function () {
                return AppInfo.data.AppType;
            }, function () {
                if (AppInfo.data.AppType) {
                    getData()
                    watch();
                }
            });

            Menu.showMenu(false);

            Menu.onReady(function () {
                vm.entryFlg = true;
            });

            TopMenu.setup({
                show: false
            });

            $('.welcome').height($(window).height());

            $(window).resize(function () {
                $('.welcome').height($(window).height());
            });
        }

        function getData() {
            WelcomeService.getData().then(function () {
                if (WelcomeService.data.length > 0) {
                    angular.copy(WelcomeService.data, vm.data);
                    startCarousel();
                }
                else {
                    enter();
                }
            });

        }

        function enter()
        {
            $state.go('root.home', { menuId: 2425 });
        }

        function startCarousel() {
            var timer = 0;

            switch (vm.data.length) {
                case 1: timer = 5; break;
                case 2: timer = 2.5; break;
                case 3: timer = 2.5; break;
                case 4: timer = 2.5; break;
            }

            var interval = $interval(function () {
                if (vm.currentActive < vm.data.length - 1) {
                    vm.currentActive++;
                }
                else {
                    $interval.cancel(interval);
                    enter();
                }
            }, timer * 1000);
        }
    }
})();
