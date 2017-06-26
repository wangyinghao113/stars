(function() {
    'use strict';

    angular
        .module('h5')
        .config(route);

    route.$inject = ["$stateProvider", "$urlRouterProvider", "$urlMatcherFactoryProvider"];

    function route($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        // make url match whether trailing slash or not
        $urlMatcherFactoryProvider.strictMode(false);

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('root', {
                url: "",
                templateUrl: "App.html",
                abstract: true
            })

        .state('root.welcome', {
            url: "",
            templateUrl: "welcome/Welcome.html",
            controller: "WelcomeController",
            controllerAs: "welcome"
        })

        .state('root.video', {
                url: "/video/{menuId: [0-9]{1,}}",
                templateUrl: "video/Video.html",
                controller: "VideoController",
                controllerAs: "video"
            })
        .state('root.video.detail', {
                url: "/{postId: [0-9]{1,}}",
                views: {
                    "@root": {
                        templateUrl: "video/VideoDetail.html",
                        controller: "VideoDetailController",
                        controllerAs: "videoDetail"
                    }
                }
            })
       
       

       

       
    }
})();

(function() {
    'use strict';

    angular
        .module('h5')
        .run(routeHandling);

    routeHandling.$inject = ['$state', '$rootScope', '$q', '$uibModalStack', 'Cache', 'UCenter'];

    function routeHandling($state, $rootScope, $q, $uibModalStack, Cache, UCenter) {
        // workaround for $stateChangeStart changing history issue
        // credit: mgrahamjo@https://github.com/angular-ui/ui-router/issues/1780

        var transitionTo = $state.transitionTo;
        $state.transitionTo = function(to, toParams, options) {
            var from = $state.$current,
                fromParams = $state.params;

            to = to.name ? to : $state.get(to);
            if (options.notify !== false && $rootScope.$broadcast('$beforeStateChange', to, toParams, from, fromParams).defaultPrevented) {
                return $q.reject(new Error('transition prevented'));
            } else {
                return transitionTo(to, toParams, options);
            }
        };

        $rootScope.$on('$beforeStateChange', function(e, toState, toParams, fromState, fromParams) {

            if ($rootScope.timer_chat) {
                clearInterval($rootScope.timer_chat)
            }

            if ($uibModalStack.getTop() || $(".sweet-alert.visible").length > 0) {
                // if any modal is open, close them and not navigate
                e.preventDefault();

                $uibModalStack.dismissAll();
                swal.close();

                window.history.forward();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
          
            // temp handling, TODO: remember scroll for each page
            $(window).scrollTop(0);
            $('body').removeClass('greyBackground');
            $('body').removeClass('blackBackground');
            $("#glbPopUp").show();
            UCenter.toggle(false);
            
            if (toState.name == 'root.home') {
                $('#mediaplay').show();
                $('#glbPopUp').css('bottom', $(window).width() / 3 + 10);
            } else {
                $('#mediaplay').hide();
                $('#glbPopUp').css('bottom', '6rem');
            }
            if ($.inArray(toState.name, ['root.store', 'root.game.detail']) > -1) {
                $('body').css({
                    'overflow': 'hidden',
                    'min-height': 0
                });
            } else {
                $('body').css({
                    'overflow': 'visible',
                    'min-height': '100vh'
                });
            }
            if (toState.name == 'root.store.detail') {
                $('body').addClass('trans-topmenu');
            } else {
                $('body').removeClass('trans-topmenu');
            }
            if (!$('#glbPopUp').hasClass('modal')) {
                if ($.inArray(toState.name, ['root.game.detail']) > -1) {
                    $('#glbPopUp').addClass('hide');
                } else {
                    $('#glbPopUp').removeClass('hide');
                }
            }
        });
    }
})();
