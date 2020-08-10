(function () {

    var app = angular.module('resetController', ['authServices','userServices'])
    app.config(function () {

        console.log("Reset Controller Loaded")
    })

    app.controller('resetCtrl', function ($scope, Auth,User, $timeout, $location, $rootScope,$routeParams) {
       $rootScope.$on('$routeChangeStart', function () {

            console.log(Auth.isLoggedIn())
            console.log(AuthToken.getToken())
            $rootScope.loggedIn = Auth.isLoggedIn()
            Auth.getUser().then(function (data) {
                console.log(data)
                $rootScope.payPeriod = data.data.payperiod;
                $rootScope.userClassy = $rootScope.userClass

                console.log($rootScope.userClass)
            })
        })
               if (Auth.isLoggedIn()) {
                    //$rootScope.payPeriod = data.data.payperiod;
                   // $rootScope.userClassy = $rootScope.userClass
                }else{
                   Auth.logout();
                }
        $scope.resetData = {
            username:null
        }
        $scope.name = ""
        $scope.loading = false;
        $scope.fadein = true;
        $scope.errorMsg = false;
        $scope.disabled = false;
        $scope.successMsg = true;
        $scope.successfulPasswordReset = false;
        $scope.failedPasswordReset = false;
        User.findByToken($routeParams.token).then(function(data){

            console.log(data)
            $scope.name = data.data.user.name

        })
        this.resetPassword=function(regData,valid,regForm){
           
            if(valid){
                $scope.disabled = true;
                $scope.loading = true;
                    this.regData.name = $scope.name;
                    console.log(this.regData)
             User.savePassword(this.regData).then(function(data){
                 console.log(data)
                 if(data.data.success){
                     $scope.loading = false;
                     $scope.successfulPasswordReset = true;
                       $timeout(function(){
                         $location.path('/login')
                     },2000)

                 }else{
                     $scope.loading = false;
                     $scope.failedPasswordReset = true;
                     $timeout(function(){
                         $scope.failedPasswordReset = false;
                         $scope.disabled = false;
                         $scope.regData = {};
                     },1000)
                 }
             })
               
            }else{
                console.log("Incomplete form..")
            }
        }
        
    })

}());