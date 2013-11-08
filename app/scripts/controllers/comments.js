'use strict';

angular.module('blogNgApp')
  .controller('CommentsCtrl', [ '$scope', 'commentsFactory', function ($scope, commentsFactory) {
    $scope.addCommentData = {};
    $scope.addComment = function(){
      commentsFactory.save({ post_id: $scope.post.id, comment: $scope.addCommentData },function(data){
        $scope.post.comments.push(data);
        console.log($scope.post.comments);
        $scope.addCommentData = {};
      });

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