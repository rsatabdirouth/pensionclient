(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('homeDetailsCtrl', homeDetailsCtrl);

    homeDetailsCtrl.$inject = ['$stateParams', '$rootScope'];

    function homeDetailsCtrl($stateParams, $rootScope) { }
})();