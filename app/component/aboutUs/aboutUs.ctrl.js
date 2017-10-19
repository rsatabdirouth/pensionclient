(function () {
    'use strict';

    angular
        .module('mainApp', [])
        .controller('aboutUsCtrl', aboutUsCtrl);

    aboutUsCtrl.$inject = ['$http', '$scope', '$rootScope',  '$state', 'GlobalConstants'];

    function aboutUsCtrl($http, $scope, $rootScope, $state,  GlobalConstants) {
        'use strict';
        var vm = this;
        
        active();

       

        function active() {
         
        }


    }

})();
