(function () {
    'use strict';

    angular
        .module('h5')
        .factory('WelcomeService', WelcomeService);

    WelcomeService.$inject = ['Api'];

    function WelcomeService(Api) {
        var service = {
            data: null,
            getData: getData
        };

        return service;
        ////////////////

        function getData() {
            return Api.call({
                url: '/api/Personal/v200/Banner/List',
                params: { bannerType: 30 }
            }).then(function (data) {
                service.data = data;
            });
        }
    
    }
})();
