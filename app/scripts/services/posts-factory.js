'use strict';

angular.module('blogNgApp')
  .factory('postsFactory', ['$resource', function ($resource) {
    return $resource('http://' + 'localhost\\:3000' + '/posts', {}, {

    });
  }]);
