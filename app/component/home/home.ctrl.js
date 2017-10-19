(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$stateParams', '$rootScope', '$http', '$state', '$location', 'localStorageService', 'ajaxify'];

    function homeCtrl($stateParams, $rootScope, $http, $state, $location, localStorageService, ajaxify) {
        var vm = this;
        vm.formSubmitted = false;
        vm.shortform = {};
        vm.saveShortFormData = saveShortFormData;
        vm.validForm = validForm;
        //vm.rangeValues = rangeValues;
        var input = [];
        vm.days = rangeValues(1, 31);
        vm.months = rangeValues(1, 12);
        var d = new Date();
        vm.years = rangeValues(1930, d.getFullYear() - 21);
        vm.shortform.Title = "Mr";
        vm.shortform.ExistPensions = "0";
       
        vm.ukpostvalidation="/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i";
        //vm.emailBody = emailBody;
        
        function rangeValues(start, end) {
            input = [];
            for (var index = start; index <= end; index++) {
                input.push(index);
            }
            return input;
        }
console.log(vm.addShortForm);
     

        function validForm() {
            if (vm.shortform.Title != null && vm.shortform.FirstName != null && vm.shortform.LastName != null && vm.shortform.day != null
                && vm.shortform.month != null && vm.shortform.year != null && vm.shortform.Email != null && vm.shortform.HomePhone != null
                && vm.shortform.PensionValue != null && vm.shortform.ExistPensions != null)
                return true;
            else
                false;
        }

        function saveShortFormData(form, e) {
            vm.shortform.DOB = vm.shortform.day + "-" + vm.shortform.month + "-" + vm.shortform.year;
            vm.shortform.LeadCategory = 2;
            vm.shortform.SiteId = ConstantValues.Web_Site_Master_Id;
            vm.shortform.Status = "NEW";
            vm.shortform.City = "UNKNOWN";
            vm.shortform.PostCode = "UNKNOWN";
            vm.shortform.Address1 = "UNKNOWN";
            vm.shortform.Opt = "true";
            vm.shortform.ProductName = "Pension";
            vm.shortform.OrganizationHashCode = "G3C6QVRZRQD57B0B";
            vm.shortform.IsCurrentlyPayingMoney = "false";
            vm.shortform.Source = $location.search().src;
            vm.shortform.MatchType = $location.search().kw;
            vm.shortform.Keyword = $location.search().mch;
            var ip = "";
            if (!form.$pristine && form.$valid && validForm()) {
                vm.formSubmitted = true;

                ajaxify.callAjax('GET', 'https://jsonip.com', null, function (err, success) {
                    if (err) {
                        console.log(err);
                    }
                    else { //success

                        vm.shortform.IpAddress = success.ip;
                        ajaxify.callAjax("POST", 'https://alds.pioneer-web.com/sherlockapi/api/Sherlock/capturelead', vm.shortform, 
                            function (err, success) {
                            if (err) {
                                vm.formSubmitted = false;
                                console.log(err);
                                var data = {
                                    Type: "short_form",
                                    Title: vm.shortform.Title,
                                    FName: vm.shortform.FirstName,
                                    LName: vm.shortform.LastName,
                                    DOB: vm.shortform.DOB,
                                    HomePhone: vm.shortform.HomePhone,
                                    WorkPhone: vm.shortform.WorkPhone,
                                    Email: vm.shortform.Email,
                                    PensionValue: vm.shortform.PensionValue,
                                    ExistPensions: vm.shortform.ExistPensions,
                                    SID: vm.shortform.SiteId,
                                    Domain: "truepensionplan.co.uk",                                    
                                    IP: vm.shortform.IpAddress

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
                                localStorageService.set("ref_id", success.ref_id);
                                localStorageService.set("short_form", vm.shortform);
                                $state.go('longForm');
                            }

                        });
                    }
                });

            }
        };
    }
})();