(function () {

    console.log("routes.js loaded");

    var app = angular.module("appRoutes", ['ngRoute']);

    app.config(function ($routeProvider, $locationProvider) {//Only providers in config phase... no $rootScope or any other instances...



        $routeProvider
            .when('/', {
                templateUrl: '../views/pages/test.html',
                controller: 'homeCtrl',
                name: "QLH | HOME",
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
            .when('/services', {
                templateUrl: '../views/pages/services.html',
                name: "QLH | SERVICES",
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
            .when('/register', {
                templateUrl: '../views/pages/register.html',
                name: "QLH | SERVICES",
                controller: "registerCtrl",
                controllerAs: 'register',
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
            .when('/login', {
                templateUrl: '../views/pages/login.html',
                name: "QLH | SERVICES",
                controller: "loginCtrl",
                controllerAs: 'login',
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
                  .when('/display', {
                templateUrl: '../views/pages/display.html',
                name: "CLOUD | GALLERY",
                controller: "displayCtrl",
                controllerAs: 'login',
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
                 .when('/employmentdocuments', {
                templateUrl: '../views/pages/employmentdocs.html',
                name: "QLH | EMPLOYMENT DOCUMENTS",
                controller: "registerCtrl",
                controllerAs: 'register',
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
                     .when('/forgotpassword', {
                templateUrl: '../views/pages/forgotpassword.html',
                name: "QLH | FORGOT PASSWORD",
                controller: "passwordCtrl",
                controllerAs: 'password',
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
                  .when('/reset/:token', {
                templateUrl: '../views/pages/newpassword.html',
                controller: 'resetCtrl',
                controllerAs: 'reset',
                name: "HOJ | Change Password",
                authenticated: false
            })
            .when('/profile/:userid', {
                templateUrl: '../views/pages/profile.html',
                name: "QLH | PROFILE",
                controller: "profileCtrl",
                controllerAs: 'profile'

            })
                 .when('/clienttoc', {
                templateUrl: '../views/pages/clienttoc.html',
                name: "QLH | CLIENT TOC",
                controller: "registerCtrl",
                controllerAs: 'register'

            })
                             .when('/clientregister', {
                templateUrl: '../views/pages/clientregister.html',
                name: "QLH | CLIENT REGISTRATION",
                controller: "registerCtrl",
                controllerAs: 'register'

            })
            .when('/clientprofile/:userid', {
                templateUrl: '../views/pages/clientprofile.html',
                name: "QLH | CLIENT",
                controller: "profileCtrl",
                controllerAs: 'profile'

            })
            .when('/calander/:userid/:month/:date', {
                templateUrl: '../views/pages/calander.html',
                name: "QLH | Calander",
                controller: "calanderCtrl",
                controllerAs: 'calander'

            })
            .when('/management', {
                templateUrl: '../views/pages/management.html',
                name: "QLH | MANAGEMENT",
                controller: "managementCtrl",
                controllerAs: 'management',
                 authenticated: true,
                permission: ["admin", "moderator"]

            })
                   .when('/management/users/:_id', {
                templateUrl: '../views/pages/management-users.html',
                name: "QLH | MANAGEMENT|USER",
                controller: "managementCtrl",
                controllerAs: 'management'

            })

            .when('/contact', {
                templateUrl: '../views/pages/contact.html',
                name: "QLH | SERVICES",
                resolve: {
                    init: function ($route) {
                        console.log("index")
                    }
                }
            })
            .when('/home', {

                templateUrl: '../views/pages/test2.html',

                name: "QLH | Home",
 controller: "mainCtrl",
                controllerAs: 'management',
                resolve: {
                    init: function ($route) {

                        console.log("homecontroller")
                        console.log($route)
                        console.log(templateUrl)
                    }
                }

            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requiredBase: false
            //now no more # required before routes
        })
        
  
    })

     app.run(['$rootScope', 'Auth', '$location', 'User', function ($rootScope, Auth, $location, User, $routeUpdate, $routeParams) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //console.log(Auth.isLoggedIn());
            console.log(next.$$route.name);
            $rootScope.title = next.$$route.name;
            if (next.$$route !== undefined) {

                if (next.$$route.authenticated == true) {
                    //console.log("Requires authentication!")
                    if (!Auth.isLoggedIn()) {
                        //console.log("You're not logged in dude!");
                        event.preventDefault();
                        $location.path('/login');

                    } else if (next.$$route.permission) {
                        Auth.getUser().then(function (data) {
                            console.log(data);

                            if (next.$$route.permission[0] != data.data.userclass) {
                                if (next.$$route.permission[1] != data.data.userclass) {

                                    $location.path('/');
                                }
                            }
                        });

                    }

                } else if (next.$$route.authenticated == false) {

                    //console.log("Does not require authentication!")
                    if (Auth.isLoggedIn()) {
                        event.preventDefault();
                        $location.path('/profile');
                    }
                } else {
                    //console.log("Authenticated does not matter");
                    //$route.reload();
                }
                //console.log(next.$$route.authenticated);
            }

            //if($routeParams.name == )

        });


    }]);

}())