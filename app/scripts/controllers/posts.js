'use strict';

angular.module('blogNgApp')
  .controller('PostsCtrl', [ '$scope', 'postsFactory', '$modal', '$log', function ($scope, postsFactory, $modal, $log) {
    $scope.posts = postsFactory.query();
    $scope.addPostData = {};
    $scope.addPost = function () {
      postsFactory.save({ post: $scope.addPostData });
      $scope.posts.push($scope.addPostData);
      $scope.addPostData = {};
    };
    $scope.editPost = function (idx) {
      var modalInstance = $modal.open({
        templateUrl: 'views/editPostModalContent.html',
        controller: 'editPostModalInstanceCtrl',
        resolve: {
          editPostData : function () {
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
    $scope.deletePost = function(idx){
      if (confirm("정말 삭제 하시겠습니까?")){
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