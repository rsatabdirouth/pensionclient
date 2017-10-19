(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('longFormCtrl', longFormCtrl);

    longFormCtrl.$inject = ['$stateParams', '$rootScope', '$http', '$state', 'localStorageService', 'ajaxify'];


    function longFormCtrl($stateParams, $rootScope, $http, $state, localStorageService, ajaxify) {
        var vm = this;
        vm.formSubmitted = false;
        vm.Form = {};
        vm.saveLongFormData = saveLongFormData;
        vm.validLongForm = validLongForm;
        var shortForm = {};
        var FullName = {};
        vm.Form.PensionType = "1";
        vm.Form.PensionAccessFund = "1";
        //vm.emailBody = emailBody;
        vm.Form.Opt = true;
        activate();


        function activate() {
            //var LeadID = localStorageService.get("ref_id");
            // $("#optcheckbox").attr('checked', true);
            vm.Form = localStorageService.get("short_form");
            if (vm.Form == undefined || vm.Form == null) {
                $state.go('home.details');
            }
            vm.Form.Address1 = "";
            vm.Form.PostCode = "";
            vm.Form.PensionType = "1";
            vm.Form.PensionAccessFund = "1";
            console.log(vm.Form);
            console.log('hi');
            localStorageService.set("short_form", vm.shortform);
        }

        function validLongForm() {
            if (vm.Form.Address1 != "" && vm.Form.PostCode != "" && vm.Form.PensionValue != null && vm.Form.PensionType != null && vm.Form.PensionAccessFund != null && vm.Form.ExistPensions != null)
                return true;
            else
                false;
        }

       

        function saveLongFormData(form, e) {

            console.log(vm.Form);
            vm.Form.LeadCategory = 1;

            vm.Form.LeadId = localStorageService.get("ref_id");

            if (!form.$pristine && form.$valid && validLongForm()) {
                vm.formSubmitted = true;

                ajaxify.callAjax("POST", 'https://alds.pioneer-web.com/sherlockapi/api/Sherlock/capturelead', vm.Form, function (err, success) {
                    if (err) {

                        vm.formSubmitted = false;
                        console.log(err);

                        var data = {
                            Type: "long_form",
                            Title: vm.Form.Title,
                            FName: vm.Form.FirstName,
                            LName: vm.Form.LastName,
                            DOB: vm.Form.DOB,
                            HomePhone: vm.Form.HomePhone,
                            WorkPhone: vm.Form.WorkPhone,
                            Email: vm.Form.Email,
                            Address: vm.Form.Address1,
                            PostCode: vm.Form.PostCode,
                            PensionValue: vm.Form.PensionValue,
                            PensionType: $("#pensionType option:selected").text(),
                            ExistPensions: vm.Form.ExistPensions,
                            SID: vm.Form.SiteId,
                            Domain: "truepensionplan.co.uk",
                            IP: vm.Form.IpAddress
                        
                        };
                        ajaxify.callAjax("POST", 'https://email.pwilds.com/api/Ses/contactus', data, function (err, success) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(success);
                            }
                        });

                    } else { //success
                        vm.formSubmitted = false;
                        console.log(success);
                        var FullName = vm.Form.Title + " " + vm.Form.FirstName + " " + vm.Form.LastName;
                        localStorageService.set("Name", FullName);
                        var TotalPensionValue = vm.Form.ExistPensions * vm.Form.PensionValue;
                        console.log(TotalPensionValue);
                        if (TotalPensionValue > 35000)
                            $state.go('thankYou');
                        else
                            $state.go('govtThankYou');
                    }
                });
            }
        }
    }
})();