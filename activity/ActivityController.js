(function () {
    'use strict';

    angular
        .module('h5')
        .controller('ActivityController', ActivityController);

    ActivityController.$inject = ['Menu', 'Post', 'TopMenu', 'Popup', '$scope', '$timeout', '$state', '$window'];

    function ActivityController(Menu, Post, TopMenu, Popup, $scope, $timeout, $state, $window) {
        var vm = this;

        vm.data = [];
        vm.loading = true;

        activate();

        function activate() {
            Menu.showMenu(false);

            TopMenu.setup({
                title: ''
            });

            Menu.onReady(function () {
                var obj = {
                    title: Menu.selectedMenu.Name,
                    back: function () {
                        if ($state.params.return) {
                            $window.location.href = $state.params.return;
                        }
                        else {
                            Menu.navigate();
                        }
                    },
                    right: [
                        {
                            title: '发起',
                            state: 'root.activity.add'
                        }]
                };
                TopMenu.setup(obj);
                getData();
            });

            $scope.$on('scrollEnd', loadMore);
        }

        function getData() {
            vm.loading = true;

            Post.getData(Menu.selectedMenu).then(function (data) {
                data.forEach(function (el, idx, _this) {
                    _this[idx].completed = null;
                    if (el.Activity) {
                        if (new Date(el.Activity.DateTo).getTime() < Date.now()){
                            _this[idx].completed = true;
                        } else {
                            _this[idx].completed = false;
                        }
                    }
                });
                vm.data = data;
            })
            .finally(function () {
                vm.loading = Post.isLoading;
            });
        }

        function loadMore() {
            vm.loading = true;

            Post.loadMore(Menu.selectedMenu).then(function (data) {
                vm.data = data;
            })
            .finally(function () {
                vm.loading = Post.isLoading;
            });
        }
    }
})();
