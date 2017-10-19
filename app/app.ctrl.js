(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$stateParams', '$rootScope', '$http', '$state', '$location', 'localStorageService', 'ajaxify'];

    function MainCtrl($stateParams, $rootScope, $http, $state, $location, localStorageService, ajaxify) {
        /* jshint validthis:true */
        var vm = this;
        vm.formSubmitted = false;
        vm.reqform = {};
        vm.reqform.ExistPensions = "0";
        var d = new Date();
        vm.saveRequestFormData = saveRequestFormData;
        vm.validRequestForm = validRequestForm;
        $rootScope.showModal = true;
        $rootScope.isLoaded = false;
        $rootScope.ukpostvalidation="/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i";
      
        //activate();
        //function activate() {       
        //}
      

        function validRequestForm() {
            if (vm.reqform.FirstName != null && vm.reqform.Email != null && vm.reqform.PostCode != null && vm.reqform.HomePhone != null && vm.reqform.ContactTime != null && vm.reqform.PensionValue != null && vm.reqform.ExistPensions != null)
                return true;
            else
                false;
        }
      
        function saveRequestFormData(form, e) {
            console.log(vm.shortform);
            vm.reqform.LeadCategory = 4;
            vm.reqform.SiteId = ConstantValues.Web_Site_Master_Id;
            vm.reqform.ProductName = "Pension";
            vm.reqform.OrganizationHashCode = "G3C6QVRZRQD57B0B";
            vm.reqform.Status = "NEW";
            vm.reqform.Title = "UNKNOWN";
            vm.reqform.LastName = "UNKNOWN";
            vm.reqform.Address1 = "UNKNOWN";
            vm.reqform.City = "UNKNOWN";
            vm.reqform.DOB = d.getDate();
            vm.reqform.Opt = "true";
            vm.reqform.PensionType = "0";
            vm.reqform.PensionAccessFund = "0";
            vm.reqform.IsCurrentlyPayingMoney = "false";
            vm.reqform.WorkPhone = "00000000000";
            vm.reqform.Source = $location.search().src;
            vm.reqform.MatchType = $location.search().kw;
            vm.reqform.Keyword = $location.search().mch;

            var ip = "";

            if (!form.$pristine && form.$valid && validRequestForm()) {
                vm.formSubmitted = true;

                ajaxify.callAjax('GET', 'https://jsonip.com', null, function (err, success) {
                    if (err) {
                        console.log(err);
                    }
                    else { 
                        //success
                        vm.reqform.IpAddress = success.ip;                       
                        ajaxify.callAjax("POST", 'https://alds.pioneer-web.com/sherlockapi/api/Sherlock/capturelead', vm.reqform, function (err, success) {
                            if (err) {

                                vm.formSubmitted = false;
                                console.log(err);

                                var data = {
                                    Name: vm.reqform.FirstName,
                                    HomePhone: vm.reqform.HomePhone,
                                    PostCode: vm.reqform.PostCode,
                                    Email: vm.reqform.Email,
                                    PensionValue: vm.reqform.PensionValue,
                                    ExistPensions: vm.reqform.ExistPensions,                                    
                                    BTC: $("#contactTime option:selected").text(),
                                    SID: vm.reqform.SiteId,                                   
                                    Domain: "truepensionplan.co.uk",
                                    Type: "request_form",
                                    IP: vm.reqform.IpAddress

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
                          
                                localStorageService.set("Name", vm.reqform.FirstName);
                                $("div").removeClass("modal-backdrop");
                                //$("#requestCallModal").hide();
                                $rootScope.showModal = false;
                                var TotalPensionValue = vm.reqform.ExistPensions * vm.reqform.PensionValue;
                                console.log(TotalPensionValue);

                                if (TotalPensionValue > 35000)
                                    $state.go('reqThankYou');
                                else
                                    $state.go('govtThankYou');

                                vm.reqform = {};
                            }

                        });
                    }
                });

            }
        }

    }
})();
