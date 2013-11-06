'use strict';

angular.module('blogNgApp')
  .controller('PostsCtrl', [ '$scope', 'postsFactory', function ($scope, postsFactory) {
//    $scope.posts = [
//      {title:'Title1'},
//      {title:'Title2'},
//      {title:'Title3'},
//      {title:'Title4'},
//      {title:'Title5'}
//    ];
    $scope.posts = postsFactory.query();
  }]);
