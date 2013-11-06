'use strict';

angular.module('blogNgApp')
  .controller('PostsCtrl', function ($scope) {
    $scope.posts = [
      {title:'Title1'},
      {title:'Title2'},
      {title:'Title3'},
      {title:'Title4'},
      {title:'Title5'}
    ]
  });
