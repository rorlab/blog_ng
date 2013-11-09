'use strict';

angular.module('blogNgApp')
  .controller('CommentsCtrl', [ '$scope', 'commentsFactory', function ($scope, commentsFactory) {
    $scope.addCommentData = {};
    commentsFactory.query({post_id: $scope.post.id}, function(data){
      $scope.comments = data;
    });
    $scope.addComment = function(){
      commentsFactory.save({ post_id: $scope.post.id, comment: $scope.addCommentData },function(data){
        $scope.comments.push(data);
        $scope.addCommentData = {};
      });

    };
    $scope.deleteComment = function(comment){
      if (confirm('정말 삭제하시겠습니까?')) {
        var idx = $scope.post.comments.indexOf(comment);
        commentsFactory.delete({ post_id: $scope.post.id,id:comment.id});
        $scope.post.comments.splice(idx, 1);
      };
    };
  }])
  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });