'use strict';

angular.module('blogNgApp')
  .controller('PostsCtrl', [ '$scope', 'postsFactory', '$modal', '$log', function ($scope, postsFactory, $modal, $log) {
    $scope.posts = postsFactory.query();
    $scope.addPostData = {};
    $scope.predicate = '-created_at';
    $scope.isPostData = function() {
      if ($scope.addPostData.title || $scope.addPostData.text) {
        console.log($scope.addPostData.title);
        return true;
      }
    };
    $scope.addPost = function () {
      postsFactory.save({ post: $scope.addPostData }, function(data){
        $scope.posts.push(data);
//        console.log(data);
        $scope.addPostData = {};
      });
    };
    $scope.editPost = function (post) {
      var modalInstance = $modal.open({
        templateUrl: 'views/editPostModalContent.html',
        controller: 'editPostModalInstanceCtrl',
        resolve: {
          editPostData : function () {
            var idx = $scope.posts.indexOf(post)
            $scope.editPostData = $scope.posts[idx];
            return $scope.editPostData;
          }
        }
      });

      modalInstance.result.then(function () {
        // save the modified post
        postsFactory.update({ id:$scope.editPostData.id, post: $scope.editPostData });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.deletePost = function(post){
      if (confirm("정말 삭제 하시겠습니까?")){
        var idx = $scope.posts.indexOf(post);
        var post = $scope.posts[idx];
        postsFactory.delete({ id: post.id });
        $scope.posts.splice(idx, 1);
      }
    };
  }]);

var editPostModalInstanceCtrl = function ($scope, $modalInstance, editPostData) {
  $scope.editPostData = editPostData;
  $scope.savePost = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};