'use strict';

angular.module('blogNgApp')
  .factory('commentsFactory', ['$resource', function ($resource) {
    return $resource('http://' + 'localhost\\:3000' + '/posts/:post_id/comments/:id',
      {
        post_id: '@post_id',
        id: '@id'
      });
  }]);