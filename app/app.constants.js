/// <reference path="" />
/// <reference path="" />

//mainApp
(function () {
    'use strict';

    angular.module('mainApp')
        .constant('GlobalConstants', {
            appName: ConstantValues.APP_NAME,

            tplMain: './app/component/home/home.html',

            tplHomeDetails: './app/component/homeDetails/homeDetails.html',
         
            tplaboutUs: './app/component/aboutUs/aboutUs.html',
           
            tplcomlainHandlingProcedure: './app/component/comlainHandlingProcedure/comlainHandlingProcedure.html',

            tplcontactUs: './app/component/contactUs/contactUs.html',

            tplcookiePolicy: './app/component/cookiePolicy/cookiePolicy.html',

            tpllongForm: './app/component/Form/longForm.html',

            tplhowItWorks: './app/component/howItWorks/howItWorks.html',

            tplprivacyPolicy: './app/component/privacyPolicy/privacyPolicy.html',

            tpltermsAndConditions: './app/component/termsAndConditions/termsAndConditions.html',

            tplthankYou: './app/component/ThankYou/formThank/formThank.html',

            tplreqThankYou: './app/component/ThankYou/requestThank/requestThank.html',

            tplgovtThankYou: './app/component/ThankYou/govtFormThank/govtFormThank.html',

        })
 
    ;
})();