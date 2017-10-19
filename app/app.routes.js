
//all routes
(function () {
    'use strict';

    angular.module('mainApp')
    .config(['$stateProvider', '$urlRouterProvider', 'GlobalConstants', function ($stateProvider, $urlRouterProvider, GlobalConstants) {
        $urlRouterProvider.otherwise("/pension-plan");

        $stateProvider
            .state('home', {
                abstract: true,
                url: "",
                views: {
                    '@': {
                        templateUrl: GlobalConstants.tplMain
                        ,controller: 'homeCtrl as home'
                    }
                }
            })

            .state('home.details', {
                url: "/pension-plan",
                views: {
                    'home-content@home': {
                        templateUrl: GlobalConstants.tplHomeDetails
                        ,controller: 'homeDetailsCtrl as homeDetails'
                    }
                }

            })

            .state('home.aboutUs', {
                url: "/about-us",
                views: {
                    'home-content@home': {
                        templateUrl: GlobalConstants.tplaboutUs
                        //controller: 'aboutUsCtrl as aboutUs'
                    }
                }

            })

            .state('home.termsAndConditions', {
                url: "/terms-and-conditions",
                views: {
                    'home-content@home': {
                        templateUrl: GlobalConstants.tpltermsAndConditions
                        //, controller: 'termsAndConditionsCtrl as termsAndConditions'
                    }
                }
            })

            .state('home.contactUs', {
                url: "/contact-us",
                views: {
                    'home-content@home': {
                        templateUrl: GlobalConstants.tplcontactUs,
                        controller: 'contactUsCtrl as contactUs'
                    }
                }
            })

            .state('home.cookiePolicy', {
                url: "/cookie-policy",
                views: {
                    'home-content@home': {
                        templateUrl: GlobalConstants.tplcookiePolicy
                        //, controller: 'cookiePolicyCtrl as cookiePolicy'
                    }
                }
            })

            .state('home.privacyPolicy', {
                url: "/privacy-policy",
                views: {
                    'home-content@home': {
                        templateUrl: GlobalConstants.tplprivacyPolicy
                        //,controller: 'privacyPolicyCtrl as privacyPolicy'
                    }
                }
            })

             .state('comlainHandlingProcedure', {
                 url: "/complaint-handling-procedure",
                 views: {
                     '@': {
                         templateUrl: GlobalConstants.tplcomlainHandlingProcedure
                         //, controller: 'comlainHandlingProcedureCtrl as comlainHandlingProcedure'
                     }
                 }
             })


            .state('home.howItWorks', {
                url: "/how-it-works",
                views: {
                    '@': {
                        templateUrl: GlobalConstants.tplhowItWorks
                        //,controller: 'howItWorksCtrl as howItWorks'
                    }
                }
            })


             .state('longForm', {                
                 url: '/applicaton-form',               
                 views: {
                     '@': {
                         templateUrl: GlobalConstants.tpllongForm,
                         controller: 'longFormCtrl as longForm'
                     }
                 }
             })

             .state('thankYou', {
                 url: '/thank-you',
                 views: {
                     '@': {
                         templateUrl: GlobalConstants.tplthankYou,
                         controller: 'thankYouCtrl as thankYou'
                     }
                 }
             })
            .state('reqThankYou', {
                url: '/thankyou',
                views: {
                    '@': {
                        templateUrl: GlobalConstants.tplreqThankYou,
                        controller: 'reqThankYouCtrl as reqThankYou'
                    }
                }
            })
        .state('govtThankYou', {
            url: '/thank',
            views: {
                '@': {
                    templateUrl: GlobalConstants.tplgovtThankYou,
                    controller: 'govtThankYouCtrl as govtThankYou'
                }
            }
        })

        ;
    }]);
})();