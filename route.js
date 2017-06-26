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

        .state('root.home', {
            url: "/home/{menuId: [0-9]{1,}}",
            templateUrl: "home/Home.html",
            controller: "HomeController",
            controllerAs: "home"
        })

        .state('root.homelist', {
                url: "/homelist/{menuId: [0-9]{1,}}",
                templateUrl: "home/HomeList.html",
                controller: "HomeListController",
                controllerAs: "homelist"
            })
            .state('root.homedetails', {
                url: "/homedetails/{menuId: [0-9]{1,}}",
                templateUrl: "home/HomeDetails.html",
                controller: "HomeDetailsController",
                controllerAs: "homedetails"
            })
            .state('root.homeM', {
                url: "/homeM/{menuId: [0-9]{1,}}",
                templateUrl: "home/homeMarketing/Home.html",
                controller: "HomeMarketingController",
                controllerAs: "home"
            })



        .state('root.search', {
            url: "/search",
            templateUrl: "search/Search.html",
            controller: "SearchController",
            controllerAs: "search"
        })

        //.state('root.list.sublist', {
        //    url: "/{subMenuId: [0-9]{1,}}",
        //    views: {
        //        "@root": {
        //            templateUrl:  "list/SubList.html",
        //            controller: "SubListController",
        //            controllerAs: "sublist"
        //        }
        //    }
        //})




        .state('root.shop', {
            url: "/shop/{menuId: [0-9]{1,}}",
            templateUrl: "shop/shop.html",
            controller: "ShopController",
            controllerAs: "shop"
        })

        .state('root.shop.detail', {
            url: "/{productId: [0-9]{1,}}?returnUrl",
            views: {
                "@root": {
                    templateUrl: "shop/ShopDetail.html",
                    controller: "ShopDetailController",
                    controllerAs: "shopDetail"
                }
            }
        })

        .state('root.store', {
            url: "/store/{menuId: [0-9]{1,}}",
            templateUrl: "store/Store.html",
            controller: "StoreController",
            controllerAs: "store"
        })

        .state('root.store.detail', {
            url: "/detail/{productId: [0-9]{1,}}?returnUrl",
            views: {
                "@root": {
                    templateUrl: "store/StoreDetail.html",
                    controller: "StoreDetailController",
                    controllerAs: "storeDetail"
                }
            }
        })

        .state('root.yuyue', {
            url: "/yuyue/{menuId: [0-9]{1,}}",
            templateUrl: "yuyue/Yuyue.html",
            controller: "YuyueController",
            controllerAs: "yuyue"
        })

        .state('root.yuyue.detail', {
            url: "/{productId: [0-9]{1,}}?returnUrl",
            views: {
                "@root": {
                    templateUrl: "yuyue/YuyueDetail.html",
                    controller: "YuyueDetailController",
                    controllerAs: "yuyueDetail"
                }
            }
        })

        .state('root.forum', {
            url: "/forum/{menuId: [0-9]{1,}}",
            templateUrl: "forum/Forum.html",
            controller: "ForumController",
            controllerAs: "forum"
        })

        .state('root.forum.detail', {
            url: "/{postId: [0-9]{1,}}?returnUrl",
            views: {
                "@root": {
                    templateUrl: "forum/ForumDetail.html",
                    controller: "ForumDetailController",
                    controllerAs: "forumDetail"
                }
            }
        })

        .state('root.dialog', {
            url: "/dialog/{menuId: [0-9]{1,}}",
            templateUrl: "dialog/Dialog.html",
            controller: "DialogController",
            controllerAs: "dialog"
        })

        .state('root.photo', {
            url: "/photo/{menuId: [0-9]{1,}}",
            templateUrl: "photo/Photo.html",
            controller: "PhotoController",
            controllerAs: "photo"
        })

        .state('root.photo.detail', {
            url: "/{postId: [0-9]{1,}}?returnUrl",
            views: {
                "@root": {
                    templateUrl: "photo/PhotoDetail.html",
                    controller: "PhotoDetailController",
                    controllerAs: "photoDetail"
                }
            }
        })

        .state('root.forum.detail.comment', {
            url: "/comment/{commentId: [0-9]*}/{subcommentId: [0-9]*}",
            views: {
                "@root": {
                    templateUrl: "forum/ForumComment.html",
                    controller: "ForumCommentController",
                    controllerAs: "forumComment"
                }
            }
        })

        .state('root.forum.addPost', {
            url: "/add",
            views: {
                "@root": {
                    templateUrl: "forum/ForumAdd.html",
                    controller: "ForumAddController",
                    controllerAs: "forumAdd"
                }
            }
        })

        .state('root.news', {
            url: "/news/{menuId: [0-9]{1,}}/:return",
            templateUrl: "news/News.html",
            controller: "NewsController",
            controllerAs: "news"
        })

        .state('root.news.detail', {
            url: "/{postId: [0-9]{1,}}?returnUrl",
            views: {
                "@root": {
                    templateUrl: "news/NewsDetail.html",
                    controller: "NewsDetailController",
                    controllerAs: "newsDetail"
                }
            }
        })

        .state('root.news.addPost', {
            url: "/add",
            views: {
                "@root": {
                    templateUrl: "news/NewsComment.html",
                    controller: "NewsCommentController",
                    controllerAs: "newscomment"
                }
            }
        })


        .state('root.list', {
            url: "/list/{menuId: [0-9]{1,}}/:return",
            templateUrl: "list/List.html",
            controller: "ListController",
            controllerAs: "list"
        })

        .state('root.list.detail', {
            url: "/{postId: [0-9]{1,}}?returnUrl",
            views: {
                "@root": {
                    templateUrl: "list/ListDetail.html",
                    controller: "ListDetailController",
                    controllerAs: "listDetail"
                }
            }
        })

        .state('root.list.addPost', {
            url: "/add",
            views: {
                "@root": {
                    templateUrl: "list/ListComment.html",
                    controller: "ListCommentController",
                    controllerAs: "listcomment"
                }
            }
        })



        .state('root.personal', {
            url: "/personal/{menuId: [0-9]{1,}}",
            templateUrl: "personal/Personal.html",
            controller: "PersonalController",
            controllerAs: "personal"
        })

        .state('root.register', {
            url: "/register",
            templateUrl: "authentication/register/Register.html",
            controller: "RegisterController",
            controllerAs: "register"
        })

        .state('root.registernext', {
            url: "/registernext",
            templateUrl: "authentication/register/RegisterNext.html",
            controller: "RegisterNextController",
            controllerAs: "registernext"
        })

        .state('root.register.end', {
            url: "/end",
            views: {
                "@root": {
                    templateUrl: "authentication/register/RegisterEnd.html",
                    controller: "RegisterEndController",
                    controllerAs: "registerEnd"
                }
            }
        })

        .state('root.login', {
            url: "/login/:return",
            templateUrl: "authentication/login/Login.html",
            controller: "LoginController",
            controllerAs: "login",
            params: {
                'return': {
                    value: null,
                    squash: true
                }
            }
        })

        .state('root.forgetPassword', {
            url: "/forgetPassword/:return",
            templateUrl: "authentication/forgetPassword/ForgetPassword.html",
            controller: "ForgetPasswordController",
            controllerAs: "forgetPassword",
            //params: {
            //    'return': { value: null, squash: true }
            //}
        })

        .state('root.forgetNext', {
            url: "/forgetNext",
            templateUrl: "authentication/forgetPassword/ForgetNext.html",
            controller: "ForgetNextController",
            controllerAs: "forgetNext"
        })

        .state('root.forgetPassword.new', {
            url: "/new",
            views: {
                "@root": {
                    templateUrl: "authentication/resetPassword/ResetPassword.html",
                    controller: "ResetPasswordController",
                    controllerAs: "resetPassword"
                }
            }
        })

        .state('root.changePassword', {
            url: "/changePassword",
            templateUrl: "authentication/forgetPassword/ForgetPassword.html",
            controller: "ForgetPasswordController",
            controllerAs: "forgetPassword"
        })

        .state('root.changePassword.new', {
                url: "/new",
                views: {
                    "@root": {
                        templateUrl: "authentication/resetPassword/ResetPassword.html",
                        controller: "ResetPasswordController",
                        controllerAs: "resetPassword"
                    }
                }
            })
            .state('root.setting', {
                url: "/setting",
                views: {
                    "@root": {
                        templateUrl: "personal/myDetails/Setting.html",
                        controller: "SettingController",
                        controllerAs: "setting"
                    }
                }
            })

        .state('root.record', {
                url: "/record",
                templateUrl: "record/Record.html",
                controller: "RecordController",
                controllerAs: "record"
            })
            .state('root.rank', {
                url: "/rank",
                templateUrl: "rank/Rank.html",
                controller: "RankController",
                controllerAs: "rank"
            })
            .state('root.aboutus', {
                url: "/aboutus",
                views: {
                    "@root": {
                        templateUrl: "personal/myDetails/AboutUs.html",
                        controller: "AboutUsController",
                        controllerAs: "aboutus"
                    }
                }
            })
            .state('root.activity', {
                url: "/activity/{menuId: [0-9]{1,}}/:return",
                templateUrl: "activity/Activity.html",
                controller: "ActivityController",
                controllerAs: "activity"
            }).state('root.activity.detail', {
                url: "/{postId: [0-9]{1,}}",
                views: {
                    "@root": {
                        templateUrl: "activity/ActivityDetail.html",
                        controller: "ActivityDetailController",
                        controllerAs: "activityDetail"
                    }
                }
            }).state('root.activity.add', {
                url: "/add",
                views: {
                    "@root": {
                        templateUrl: "activity/ActivityAdd.html",
                        controller: "ActivityAddController",
                        controllerAs: "activityadd"
                    }
                }
            }).state('root.video', {
                url: "/video/{menuId: [0-9]{1,}}",
                templateUrl: "video/Video.html",
                controller: "VideoController",
                controllerAs: "video"
            }).state('root.video.detail', {
                url: "/{postId: [0-9]{1,}}",
                views: {
                    "@root": {
                        templateUrl: "video/VideoDetail.html",
                        controller: "VideoDetailController",
                        controllerAs: "videoDetail"
                    }
                }
            }).state('root.group', {
                url: "/group/{menuId: [0-9]{1,}}/:return",
                templateUrl: "group/Group.html",
                controller: "GroupController",
                controllerAs: "group"
            })
            .state('root.group.broadcast', {
                url: "/broadcast",
                views: {
                    "@root": {
                        templateUrl: "group/Broadcast.html",
                        controller: "BroadcastController",
                        controllerAs: "broadcast"
                    }
                }
            })

        .state('root.group.onlineusers', {
                url: "/onlineusers",
                views: {
                    "@root": {
                        templateUrl: "group/OnlineUsers.html",
                        controller: "OnlineUsersController",
                        controllerAs: "onlineusers"
                    }
                }
            })
            .state('root.group.chat', {
                url: "/chat/:return",
                views: {
                    "@root": {
                        templateUrl: "group/Chat.html",
                        controller: "ChatController",
                        controllerAs: "chat"
                    }
                }
            })

        .state('root.group.member', {
            url: "/member/{groupId: [0-9]{1,}}/:return",
            views: {
                "@root": {
                    templateUrl: "group/Member.html",
                    controller: "MemberController",
                    controllerAs: "member",
                    params: {
                        'return': {
                            value: null,
                            squash: true
                        }
                    }
                }
            }
        })

        .state('root.group.approve', {
            url: "/approve/{groupId: [0-9]{1,}}",
            views: {
                "@root": {
                    templateUrl: "group/Approve.html",
                    controller: "ApproveController",
                    controllerAs: "approve"
                }
            }
        })

        .state('root.group.groupchat', {
            url: "/{groupId: [0-9a-zA-Z-]{1,}}",
            views: {
                "@root": {
                    templateUrl: "group/GroupChat.html",
                    controller: "GroupChatController",
                    controllerAs: "groupchat"
                }
            }
        })

        .state('root.group.create', {
            url: "/create/new",
            views: {
                "@root": {
                    templateUrl: "group/Create.html",
                    controller: "CreateController",
                    controllerAs: "create"
                }
            }
        }).state('root.game', {
            url: "/game/{menuId: [0-9]{1,}}",
            templateUrl: "game/Game.html",
            controller: "GameController",
            controllerAs: "game"
        }).state('root.game.detail', {
            url: "/detail/{gameId: .{1,}}/:return",
            views: {
                "@root": {
                    templateUrl: "game/GameDetail.html",
                    controller: "GameDetailController",
                    controllerAs: "gamedetail"
                }
            }
        }).state('root.game.luckydraw', {
            url: "/luckydraw/{drawId: [0-9]{1,}}",
            views: {
                "@root": {
                    templateUrl: "game/LuckyDraw.html",
                    controller: "LuckyDrawController",
                    controllerAs: "luckydraw"
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