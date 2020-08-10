(function(){

    var app = angular.module('homeController',['authServices'])
    
    app.config(function(){

        //console.log("Home Controller Loaded")

    })

    app.controller('homeCtrl', function($scope,$rootScope,Auth){

        $rootScope.$on('$routeChangeStart', function () {

           
            $rootScope.loggedIn = Auth.isLoggedIn()

            Auth.getUser().then(function (data) {

                //console.log(data)
                //console.log($rootScope.userClass)
                $rootScope.payPeriod = data.data.payperiod;
                $rootScope.userClassy = $rootScope.userClass

            })

        })
              
        $('.carousel.carousel-slider').carousel({ fullWidth: true });

    })

}());