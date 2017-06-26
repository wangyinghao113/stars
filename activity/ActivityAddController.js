(function () {
    'use strict';

    angular
        .module('h5')
        .controller('ActivityAddController', ActivityAddController);

    ActivityAddController.$inject = ['Menu', 'Post', 'TopMenu', 'Popup', '$scope', '$timeout'];

    function ActivityAddController(Menu, Post, TopMenu, Popup, $scope, $timeout) {
        var vm = this;

        vm.data = [];
        vm.loading = true;
        vm.menuId = 0;
        activate();

        function activate() {
            Menu.showMenu(false);


            TopMenu.setup({
                title: '发布活动',
                back: 'root.activity',
            });

            Menu.onReady(function ()
            {
                var oFrm = document.getElementById('compaign');

                var tk = Cookies.get('accessToken');

                oFrm.setAttribute('src', Menu.selectedMenu.MenuInfo.CreateCampaignUrl+tk);

                $timeout(function () { vm.loading = false; }, 1000);
            });
        }
    }
})();