(function () {

    var app = angular.module('passwordController', ['authServices','userServices'])
    app.config(function () {

        console.log("Password Controller Loaded")
    })

    app.controller('passwordCtrl', function ($scope, Auth,User, $timeout, $location, $rootScope) {
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

        $scope.resetData = {
            username:null
        }
        $scope.loading = false;
        $scope.fadein = true;
        $scope.errorMsg = false;
        $scope.disabled = false;
        $scope.successMsg = true;
        $scope.successfulPasswordResetEmailSent = false;
        $scope.failedPasswordResetEmailSent = false;
           $scope.sendResetPasswordLink= function(resetData,valid){
            
            $scope.loading=true;
            $scope.disabled = true;

            //console.log(scope.resetData);
             if(valid){
                 console.log(valid)
                User.sendPassword($scope.resetData).then(function(data){
                    console.log(data)
                    $scope.loading = false;
                    if(data.data.success){
                        $scope.successfulPasswordResetEmailSent = true
                        $timeout(function(){
                            $scope.fadein = false;
                            //$scope.successfulPasswordResetEmailSent = false
                        },2000)
                        //scope.successMsg = data.data.message;
                    }else{
                        $scope.failedPasswordResetEmailSent = true;
                        $scope.disabled = false;
                        $scope.errorMsg = data.data.message;
                          $timeout(function(){
                            $scope.fadein = false;
                           // $scope.failedPasswordResetEmailSent = false
                        },2000)
                    }
            });

             }else{
                $scope.loading = false;
                 $scope.disabled = false;
                  $scope.failedPasswordResetEmailSent = true;
                 $scope.errorMsg="Please enter a valid Username";
             }



        };
      
        
    })

}());