(function() {
    'use strict';

    angular
        .module('h5')
        .controller('AppController', AppController);

    AppController.$inject = ['TopMenu', 'Menu', 'UCenter', '$scope', 'AppInfo', 'Sharer', '$rootScope', '$state'];

    function AppController(TopMenu, Menu, UCenter, $scope, AppInfo, Sharer, $rootScope, $state) {
        var vm = this;

        vm.contentHeight = '';
        vm.sharer = Sharer;
        vm.appInfo = AppInfo.data;

        activate();

        function activate() {
            $scope.$watchCollection(function() {

                return [TopMenu.data.show, Menu.status.isShown, UCenter.data.show];

            }, function() {
                vm.hasTopMenu = TopMenu.data.show;
                vm.hasMenu = Menu.status.isShown;
                vm.hasUCenter = UCenter.data.show;
                //vm.hasUCenter = UCenter.data.show;
            });

            $rootScope.initAudioFlg = true;
        }

        //$(document.body).on('click', '#glbPopUp', function() {
        //    window.open("http://www.jixiuapp.com/s/ppPU")
        //});
        

        $(window).scroll(function() {
            if ($(window).scrollTop() < 100) {
                $rootScope.$broadcast('scrollInfinite');
            }

            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                $rootScope.$broadcast('scrollEnd');
            }
        });
    }
})();