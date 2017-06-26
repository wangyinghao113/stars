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
    <script src="/dist/temp/vendor.js"></script>
    <script src="app.js"></script>
    <script src="route.js"></script>
    <script src="AppController.js"></script>
</body>
</html>
