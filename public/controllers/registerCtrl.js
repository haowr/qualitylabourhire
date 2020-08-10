(function(){

    var app = angular.module('registerController',['userServices','authServices'])
    app.config(function(){

        console.log("Register Controller Loaded")
    })

    app.controller('registerCtrl', function($scope,$http,$location,User,$timeout,$rootScope,Auth){
               $rootScope.$on('$routeChangeStart', function () {

           
           
            $rootScope.loggedIn = Auth.isLoggedIn()
            Auth.getUser().then(function (data) {
                console.log(data)
                $rootScope.payPeriod = data.data.payperiod;
                $rootScope.userClassy = $rootScope.userClass

                console.log($rootScope.userClass)
            })
        })
        $scope.successReg = false;
        $scope.failReg = false;
       $scope.errorMsg = false;
        $scope.successMsg = false;
  
                $scope.iAgreeData={
            yes:false
        }
        $scope.shakeOn = false;



        $scope.iAgreeFunc = function () {
            console.log($scope.iAgreeData)
        }
        $scope.continueRegistration = function () {
            if ($scope.iAgreeData.yes) {
                console.log("You Agree! >:)")
                console.log($scope.regData)
                $location.path('/clientregister');
            } else {
                $scope.shakeOn = true;
                $timeout(function () {
                    $scope.shakeOn = false;
                }, 2000)

            }

        }
         this.regEmployee=function(regData,valid,regForm){
           
            if(valid){
                console.log(this.regData)
             
                
                    this.regData.userclass = "employee"
                
                $scope.loading= true;
                User.create(this.regData).then(function(data){
                    console.log(data.data)
                    if(data.data.success){
                        $scope.loading = false;
                        $scope.successReg = true;
                        console.log(this.successReg)
                        $scope.successMsg = data.data.message;
                        $timeout(function(){
                            $scope.successReg = false;
                            $scope.successMsg = false;
                            $location.path('/login');
                        },3000)
                    }else{
                        $scope.loading = false;
                        $scope.failReg = true;
                        $scope.errorMsg = data.data.message;
                        console.log($scope.failReg,$scope.errorMsg)
                        setTimeout(function(){
                            $scope.failReg = false;
                            $scope.errorMsg = false;
                            console.log($scope.failReg)
                        },3000)
                    }
                })
            }else{
                console.log("Incomplete form..")
            }
        }
        this.regClient=function(regData,valid,regForm){
           
            if(valid){
                console.log(this.regData)
                
                this.regData.userclass = "client"
                this.regData.iagree = true;
                $location.path('/clientregister')

              
                $scope.loading= true;
                User.create(this.regData).then(function(data){
                    console.log(data.data)
                    if(data.data.success){
                        $scope.loading = false;
                        $scope.successReg = true;
                        console.log(this.successReg)
                        $scope.successMsg = data.data.message;
                        $timeout(function(){
                            $scope.successReg = false;
                            $scope.successMsg = false;
                            $location.path('/login');
                        },3000)
                    }else{
                        $scope.loading = false;
                        $scope.failReg = true;
                        $scope.errorMsg = data.data.message;
                        console.log($scope.failReg,$scope.errorMsg)
                        setTimeout(function(){
                            $scope.failReg = false;
                            $scope.errorMsg = false;
                            console.log($scope.failReg)
                        },3000)
                    }
                })
            }else{
                console.log("Incomplete form..")
            }
        }

    })

}());