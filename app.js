(function () {
    'use strict';

    angular.module('h5', [
        'ui.router',
        'blueimp.fileupload',
        'ngAnimate',
        'perfect_scrollbar',
        'infinite-scroll',
        'ngSanitize',
        'ui.bootstrap',
        'dibari.angular-ellipsis',
        'ngTouch'
    ])

    .config(config)
    .run(run);

    function config() { }

    run.$inject = ['Popup', 'Api', 'AppInfo', 'Utility', '$window', 'Menu', 'User'];

    function run(Popup, Api, AppInfo, Utility, $window, Menu, User) {
      var appCode = jxCode;

        moment.locale('zh-cn');

        Api.setup(appCode).then(function () {
            AppInfo.getData();
            Menu.getData();
            User.getData(true);
            swal.setDefaults({
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            });
        }, function () {
            Popup.alert("警告", "没找到APP!");
        });
    }
})();