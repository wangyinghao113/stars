(function () {
    'use strict';

    angular
        .module('h5')
        .controller('ActivityDetailController', ActivityDetailController);

    ActivityDetailController.$inject = ['Menu', 'TopMenu', 'Post', '$state', 'Comment', 'Popup', '$uibModal', '$scope', '$timeout', '$q', 'Carousel', 'Sharer', 'User', 'Notification'];

    function ActivityDetailController(Menu, TopMenu, Post, $state, Comment, Popup, $uibModal, $scope, $timeout, $q, Carousel, Sharer, User, Notification) {
        var vm = this;

        vm.data = {};
        vm.comments = [];
        vm.loading = true;

        vm.activePhoto = 0;
        vm.comment = comment;
        vm.like = like;
        vm.share = share;
        vm.photoView = photoView;
        vm.reportPost = reportPost;
        vm.submitReport = submitReport;
        vm.delComment = delComment;
        vm.changeData = changeData;
        vm.user = {};

        activate();

        function activate() {
            vm.isReport = false;
            vm.reportType = [];
            Menu.showMenu(false);

            TopMenu.setup({
                title: '',
                back: '<',
            });

            Menu.onReady(function () {
                getData();
            });

            //$scope.$on('scrollEnd', loadMore);
        }

        function getData() {
            vm.loading = true;

            User.getData().then(function (data) {
                vm.user = data;
            });

            var promises = [];
            promises.push(Post.getSingle(Menu.selectedMenu, $state.params.postId, true).then(function (data) {
                var myFrame = document.getElementById("myiframe");
                myFrame.width = document.documentElement.clientWidth;
                myFrame.height = document.documentElement.clientHeight;
                myFrame.src = decodeURIComponent(data.DeepLink.replace(/^.+value=(.+)(&.+)?$/, '$1')) + Cookies.get('accessToken');

                vm.data = data;
                TopMenu.setup({
                    title: data.Title,
                    back: 'root.activity',
                    right: [
                        Sharer.setupTopMenu(vm.data)
                    ]
                });
            }));

            //promises.push(Comment.getData($state.params.postId).then(function (data) {
            //    vm.comments = data;
            //}));

            $q.all(promises).finally(function () {
                vm.loading = false;
            });
        }

        function loadMore() {
            vm.loading = true;

            Comment.loadMore($state.params.postId).then(function (data) {
                vm.comments = data;
            })
            .finally(function () {
                vm.loading = Comment.isLoading;
            });
        }

        function comment(commentId, subcommentId) {
            if (!commentId) {
                $state.go('root.forum.detail.comment');
            }
            else if (!subcommentId) {
                $state.go('root.forum.detail.comment', {
                    commentId: commentId
                });
            }
            else {
                $state.go('root.forum.detail.comment', {
                    commentId: commentId, subcommentId: subcommentId
                });
            }
        }

        function like() {
            Post.like(vm.data).then(function () { },
            function () {
                alert("出现了错误");
            });
        }

        function share(post) {
           Sharer.viewSharer(vm.data);
        }

        function photoView(post) {
            var activePhoto = vm.data.SubPostList.indexOf(post);

            if (activePhoto == -1) activePhoto = 0;

            Carousel.open({
                data: vm.data.SubPostList,
                dataPath: 'PhotoList.0.Url',
                active: activePhoto
            });
        }

        function reportPost() {

            vm.isReport = true;

            TopMenu.setup({
                title: '举报',
                back: activate,
                right: [{
                    title: '发送',
                    action: submitReport
                }]
            });

            vm.reportType = [
                   { Label: "广告", Value: "0" },
                   { Label: "色情", Value: "1" },
                   { Label: "反动", Value: "2" },
                   { Label: "头像", Value: "3" }
            ];
        }

        function submitReport() {

            var grep = $.grep(vm.reportType, function (item) {
                return item.checked;
            });

            if (grep.length == 0) {
                Popup.alert("警告", "请选举报理由");
                return;
            }

            var reportItem = grep.map(function (item) {
                return item.Value;
            });

            var postId = $state.params.postId;

            Popup.confirm("警告", "您确定要举报这篇贴子").then(function () {
                var promise = Post.reportPost(postId, reportItem);

                Popup.process(promise, "感谢你的举报。调查正在进行中。谢谢。").then(function () {
                    //$state.go('root.forum.detail', { postId: postId });
                    activate();
                });
            });


        }

        function delComment(commentId, subcommentId, $event) {
            vm.loading = true;
            $event.stopPropagation();
            Popup.confirm("警告", "您确定要删除?").then(function () {
                var promise = Notification.delNotify($state.params.postId, commentId, subcommentId).then(function (data) {
                    getData();
                });
                Popup.process(promise);
            }).finally(function () {
                vm.loading = false;
            });
        }

        function changeData(flg) {
            var flg = arguments[0] || false;
            if (flg) {
                vm.data.SubPostList[vm.activePhoto].CommentsCount--;
            } else {
                vm.data.SubPostList[vm.activePhoto].CommentsCount++;
            }
        }
    }
})();