(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('contactUsCtrl', contactUsCtrl);

    contactUsCtrl.$inject = ['$stateParams', '$rootScope', '$http', '$state', 'localStorageService', 'ajaxify'];

    function contactUsCtrl($stateParams, $rootScope, $http, $state, localStorageService, ajaxify) {
        var vm = this;
        vm.formSubmitted = false;
        vm.contactForm = {};
        //vm.thankDiv = false;
        //vm.contactDiv = true;
        //vm.Form = {};
        vm.saveContactFormData = saveContactFormData;
        vm.validContactForm = validContactForm;
       
        $("#thankArea").hide();


        function validContactForm() {
            if (vm.contactForm.FirstName != null && vm.contactForm.Email != null && vm.contactForm.HomePhone != null && vm.contactForm.ContactTime != null)
                return true;
            else
                false;
        }

        function saveContactFormData(form, e) {
            console.log(form);

            if (!form.$pristine && form.$valid && validContactForm()) {
                vm.formSubmitted = true;

                ajaxify.callAjax('GET', 'https://jsonip.com', null, function (err, success) {
                    if (err) {
                        console.log(err);
                    }
                    else { //success

                        vm.contactForm.IpAddress = success.ip;
                        var data = {
                            Name: vm.contactForm.FirstName,
                            HomePhone: vm.contactForm.HomePhone,
                            Email: vm.contactForm.Email,
                            Message: vm.contactForm.Message,
                            BTC: $("#ContactTime option:selected").text(),
                            Domain: "truepensionplan.co.uk",
                            Type: "contact_us",
                            IP: vm.contactForm.IpAddress                         
                        };
                        ajaxify.callAjax("POST", 'https://email.pwilds.com/api/Ses/contactus', data, function (err, success) {
                            if (err) {
                                vm.formSubmitted = false;
                                console.log(err);
                            } else {
                                vm.formSubmitted = false;
                                vm.thankDiv = true;
                                vm.contactDiv = false;
                                //vm.contactForm = {};
                                $("#thankArea").show();
                                $("#contactUsArea").hide();
                                console.log(success);
                            }
                        });

                    }
                });
            }
        }

    }
})();