//mainApp
(function () {
    'use strict';

    angular.module('mainApp')

        .run(['$rootScope', '$state', '$stateParams', 'localStorageService',
            function ($rootScope, $state, $stateParams, localStorageService) {

                $rootScope.$on('$stateChangeSuccess', function (event, toState, toStateParams) {                    
                    $rootScope.isLoaded = true;
                    // track the state the user wants to go to; authorization service needs this
                    try {

                        $rootScope.toState = toState;

                        var go = false;

                        $rootScope.showModal = true;

                    }
                    catch (err) {
                        //$window.location.href = GlobalConstants.loginURL;
                    }
                });
            }])
        .service("ajaxify", function () {
            this.callAjax = function (method, url, data, callback) {
                var ajaxObj = null;

                if (typeof ActiveXObject == 'function')
                    ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
                else
                    if (window.XMLHttpRequest)
                        ajaxObj = new XMLHttpRequest();

                ajaxObj.open(method, url, true);
                if (method === "POST")
                    ajaxObj.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                ajaxObj.send(JSON.stringify(data));

                ajaxObj.onreadystatechange = function () {
                    if (ajaxObj.readyState === ajaxObj.DONE) {
                        if (ajaxObj.status === 200) {
                            if (ajaxObj.response !== "")
                                callback(null, JSON.parse(ajaxObj.response));
                            else
                                callback(null, ajaxObj.response);
                            //callback(null, JSON.parse(ajaxObj.response));
                        }
                        else {
                            callback(ajaxObj.responseText);
                        }

                    }
                };
            }
        })
        ;

})();