<!DOCTYPE html>
<html ng-app="h5" ng-strict-di ng-controller="AppController as app">
<head>
    <title ng-bind="app.appInfo.AppName ? app.appInfo.AppName : '&#x9B4F;&#x4E00;&#x5B81;&#x4E13;&#x5C5E;APP'">&#x9B4F;&#x4E00;&#x5B81;&#x4E13;&#x5C5E;APP</title>
    <link rel="icon" type="image/png" ng-attr-href="{{app.appInfo.AppIconUrl}}" ng-if="app.appInfo.AppIconUrl" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <meta name="format-detection"content="telephone=no, email=no" />
    <link href="/dist/temp/vendor.css" rel="stylesheet" />
    <link href="app-debug.css" rel="stylesheet" />
    <link href="app-prefixed.css" rel="stylesheet" />
</head>
<body>
    <div ui-view></div>
    <script>
        var protocol = (location.protocol || 'http') + '//';
        var jxServer = protocol + '<%=ConfigurationManager.AppSettings("ServerUrl")%>';
        var jxCode = '<%=ConfigurationManager.AppSettings("ServerAppCode")%>';
    </script>
    <script src="/dist/temp/vendor.js"></script>
    <script src="app.js"></script>
    <script src="route.js"></script>
    <script src="AppController.js"></script>
    <script src="common/ApiService.js"></script>
    <script src="common/AppInfoService.js"></script>
    <script src="common/ConstantService.js"></script>
    <script src="common/PostService.js"></script>
    <script src="common/CacheService.js"></script>
    <script src="common/DeepLinkService.js"></script>
    <script src="common/UserService.js"></script>
    <script src="common/CommentService.js"></script>
    <script src="common/OrderService.js"></script>
    <script src="common/CartService.js"></script>
    <script src="common/BookmarkService.js"></script>
    <script src="common/FeedbackService.js"></script>
    <script src="common/NotificationService.js"></script>
    <script src="common/AlbumService.js"></script>
    <script src="common/GroupService.js"></script>
    <script src="common/LuckyDrawService.js"></script>
    <script src="common/chatFilterService.js"></script>
    <script src="utility/UtilityService.js"></script>
    <script src="utility/backgroundImageDirective.js"></script>
    <script src="utility/errSrcDirective.js"></script>
    <script src="utility/previewSrcDirective.js"></script>
    <script src="utility/perfectScrollbarDecorator.js"></script>
    <script src="utility/uibModalDecorator.js"></script>
    <script src="utility/dateInputDirective.js"></script>
    <script src="utility/textareaAutoResizeDirective.js"></script>
    <script src="utility/videoSrcDirective.js"></script>
    <script src="welcome/WelcomeController.js"></script>
    <script src="welcome/WelcomeService.js"></script>
    <script src="menu/MenuService.js"></script>
    <script src="menu/menuDirective.js"></script>
    <script src="menu/ScreenService.js"></script>
    <script src="home/HomeController.js"></script>
    <script src="home/homeDetail/homeRoute.js"></script>
    <script src="home/homeDetail/HomeDetailHTMLController.js"></script>
    <script src="home/homeDetail/HomeDetailInternalController.js"></script>
    <script src="home/homeDetail/HomeDetailAlbumController.js"></script>
    <script src="home/homeDetail/HomeDetailService.js"></script>
    <script src="home/homeMarketing/HomeMarketingController.js"></script>
    <script src="list/ListController.js"></script>
    <script src="list/ListDetailController.js"></script>
    <script src="component/v2FileUploadDirective.js"></script>
    <script src="component/topMenuDirective.js"></script>
    <script src="component/TopMenuService.js"></script>
    <script src="component/multiDatesPickerDirective.js"></script>
    <script src="component/PopupService.js"></script>
    <script src="component/SharerService.js"></script>
    <script src="component/sharerDirective.js"></script>
    <script src="component/CarouselService.js"></script>
    <script src="component/noDataScreenDirective.js"></script>
    <script src="component/commentDirective.js"></script>
    <script src="component/waterfallDirective.js"></script>
    <script src="authentication/register/RegisterController.js"></script>
    <script src="authentication/register/RegisterNextController.js"></script>
    <script src="authentication/register/RegisterEndController.js"></script>
    <script src="authentication/forgetPassword/ForgetPasswordController.js"></script>
    <script src="authentication/forgetPassword/ForgetNextController.js"></script>
    <script src="authentication/login/LoginController.js"></script>
    <script src="authentication/resetPassword/ResetPasswordController.js"></script>
    <script src="personal/PersonalController.js"></script>
    <script src="personal/PersonalService.js"></script>
    <script src="shop/ShopController.js"></script>
    <script src="shop/ShopDetailController.js"></script>
    <script src="shop/ShopService.js"></script>
    <script src="store/StoreController.js"></script>
    <script src="store/StoreDetailController.js"></script>
    <script src="store/StoreService.js"></script>
    <script src="forum/ForumController.js"></script>
    <script src="forum/ForumDetailController.js"></script>
    <script src="forum/ForumCommentController.js"></script>
    <script src="forum/ForumAddController.js"></script>
    <script src="photo/PhotoController.js"></script>
    <script src="photo/PhotoDetailController.js"></script>
    <script src="personal/myDetails/personalRoute.js"></script>
    <script src="personal/myDetails/MyBookmarkController.js"></script>
    <script src="personal/myDetails/MyFeedbackController.js"></script>
    <script src="personal/myDetails/MyInfoController.js"></script>
    <script src="personal/myDetails/MyOrderController.js"></script>
    <script src="personal/myDetails/MyOrderDetailsController.js"></script>
    <script src="personal/myDetails/MyCartController.js"></script>
    <script src="personal/myDetails/MyCartSummarizeController.js"></script>
    <script src="personal/myDetails/MyTagCommentController.js"></script>
    <script src="personal/myDetails/MyFollowController.js"></script>
    <script src="personal/myDetails/MyTiebaController.js"></script>
    <script src="personal/myDetails/MyTiebaDetailController.js"></script>
    <script src="search/SearchController.js"></script>
    <script src="zhibo/ZhiboController.js"></script>
    <script src="message/MessageController.js"></script>
    <script src="ucenter/UCenterService.js"></script>
    <script src="ucenter/ucenterDirective.js"></script>
    <script src="record/RecordController.js"></script>
    <script src="personal/myDetails/MySetController.js"></script>
    <script src="personal/myDetails/RepairController.js"></script>
    <script src="personal/myDetails/RepairDetailsController.js"></script>
    <script src="personal/myDetails/ExpressController.js"></script>
    <script src="personal/myDetails/MyCartPaymentController.js"></script>
    <script src="personal/myDetails/AboutUsController.js"></script>
    <script src="personal/myDetails/SettingController.js"></script>
    <script src="personal/myDetails/MyAlbumController.js"></script>
    <script src="personal/myDetails/MyAlbumCommentController.js"></script>
    <script src="personal/myDetails/UserController.js"></script>
    <script src="personal/myDetails/MyCheckinController.js"></script>
    <script src="home/HomeListController.js"></script>
    <script src="home/HomeDetailsController.js"></script>
    <script src="yuyue/YuyueController.js"></script>
    <script src="yuyue/YuyueDetailController.js"></script>
    <script src="list/SubListController.js"></script>
    <script src="utility/repeatFinish.js"></script>
    <script src="list/ListCommentController.js"></script>
    <script src="common/ValidateService.js"></script>
    <script src="news/NewsController.js"></script>
    <script src="news/NewsDetailController.js"></script>
    <script src="news/NewsCommentController.js"></script>
    <script src="activity/ActivityController.js"></script>
    <script src="activity/ActivityAddController.js"></script>
    <script src="activity/ActivityDetailController.js"></script>
    <script src="video/VideoController.js"></script>
    <script src="video/VideoDetailController.js"></script>
    <script src="group/GroupController.js"></script>
    <script src="group/ChatController.js"></script>
    <script src="group/BroadcastController.js"></script>
    <script src="group/OnlineUsersController.js"></script>
    <script src="group/MemberController.js"></script>
    <script src="rank/RankController.js"></script>
    <script src="dialog/DialogController.js"></script>
    <script src="group/CreateController.js"></script>
    <script src="personal/myDetails/TaskListController.js"></script>
    <script src="personal/myDetails/MyActivityController.js"></script>
    <script src="personal/myDetails/CertificationController.js"></script>
    <script src="personal/myDetails/DirectMessagesComtroller.js"></script>
    <script src="group/GroupChatController.js"></script>
    <script src="group/ApproveController.js"></script>
    <script src="game/GameController.js"></script>
    <script src="game/GameDetailController.js"></script>
    <script src="game/LuckyDrawController.js"></script>
    <script type="text/javascript" src="/ckplayer/ckplayer.js" charset="utf-8"></script>
    <script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?8eac533fc25bd8214fcac1ab96d84b47";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>

</body>
</html>
