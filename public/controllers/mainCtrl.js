(function () {

    var app = angular.module('mainController', ['authServices', 'userServices', 'payperiodServices'])
    app.config(function () {

        console.log("Main Controller Loaded")
        
    })

    app.controller('mainCtrl', function ($scope, Auth, $timeout, $location, User, $rootScope, AuthToken, PayPeriod, $window) {

        if (Auth.isLoggedIn()) {
            //$rootScope.payPeriod = data.data.payperiod;
            // $rootScope.userClassy = $rootScope.userClass
        } else {
            Auth.logout();
        }
        $rootScope.userClassy = $rootScope.userClass
        $scope.userClass = "";
        $scope.userToken = "";
        $scope.date = 24;
        $scope.month = 12;
        $scope.monthName = "December"
        $scope.booked = true;
        $rootScope.payPeriodIcon = false;
        $scope.day = ""
        $scope.iterator = 0;
        $scope.payperiod = 43;
        $scope.jobDetails = [];
        $scope.timeData = {};
        $('.carousel.carousel-slider').carousel({ fullWidth: true });
        $('.parallax').parallax();
        $scope.jobDetailsObject =
            {
                date: "12/30/18",
                booked: true,
                dateNum: 30,
                day: "Sunday",
                location: "ASB SHOWGROUNDS",
                contractor: "Carlton Events",
                supervisor: "Stoves",
                timesheetSubmitted: true,
                timeout: "6:00pm",
                timein: "6:00am"
        };
        $scope.logout = function () {
            Auth.logout();
            $rootScope.loggedIn = false;
            $location.path('/')
            $rootScope.payPeriodIcon = false;
        }
        $scope.addPayPeriod = function () {
            $scope.payPeriod = {};


        }
        PayPeriod.getAllPayPeriods().then(function (data) {
            console.log(data)
            for (var i = 0; i < data.data.payperiods.length; i++) {


                for (var z = 0; z < data.data.payperiods[i].jobDetails.length; z++) {
                    if (data.data.payperiods[i].jobDetails[z].timesheetSubmitted) {
                        data.data.payperiods[i].jobDetails[z].timein = "06:00 am";
                        data.data.payperiods[i].jobDetails[z].timeout = "06:00 pm"
                        //data.data.payperiods[i].jobDetails[z].lunch = true;
                        data.data.payperiods[i].jobDetails[z].booked = true;

                        //console.log(data.data.payperiods[i].jobDetails[z].timein)
                    }

                }
                // console.log(i,data.data.payperiods[i].jobDetails)
                // PayPeriod.updatePayPeriodJobDetails(data.data.payperiods).then(function(data){
                //   console.log(data)
                // })
            }
        })
        $scope.addJobDetails = function () {

            $scope.iterator++

            if ($scope.iterator < 8) {

                if ($scope.date == 31) {

                    $scope.date = 1

                    if ($scope.monthName == "") {

                        $scope.monthName = "January"

                    } else if ($scope.monthName == "January") {

                        $scope.monthName = "February"

                    } else if ($scope.monthName == "February") {

                        $scope.monthName = "March"

                    } else if ($scope.monthName == "March") {

                        $scope.monthName = "April"

                    } else if ($scope.monthName == "April") {

                        $scope.monthName = "May"

                    } else if ($scope.monthName == "May") {

                        $scope.monthName = "June"

                    } else if ($scope.monthName == "June") {

                        $scope.monthName = "July"

                    } else if ($scope.monthName == "July") {

                        $scope.monthName = "August"

                    } else if ($scope.monthName == "August") {

                        $scope.monthName = "September"

                    } else if ($scope.monthName == "September") {

                        $scope.monthName = "October"

                    } else if ($scope.monthName == "October") {

                        $scope.monthName = "November"

                    } else if ($scope.monthName == "November") {

                        $scope.monthName = "December"

                    } else if ($scope.monthName == "December") {

                        $scope.monthName = "January"

                    }

                    $scope.month++

                } else {

                    $scope.date++;

                }

                if ($scope.day == "") {

                    $scope.day = "Monday";

                } else if ($scope.day == "Monday") {

                    $scope.day = "Tuesday";

                } else if ($scope.day == "Tuesday") {

                    $scope.day = "Wednesday"

                } else if ($scope.day == "Wednesday") {

                    $scope.day = "Thursday"

                } else if ($scope.day == "Thursday") {

                    $scope.day = "Friday"

                } else if ($scope.day == "Friday") {

                    $scope.day = "Saturday"

                } else if ($scope.day == "Saturday") {

                    $scope.day = "Sunday"

                } else if ($scope.day == "Sunday") {

                    $scope.day = "Monday"

                }

                $scope.fulldate = $scope.month + "/" + $scope.date + "/18"

                $scope.jobDetails.push(

                    {

                        date: $scope.fulldate,
                        dateNum: $scope.date,
                        booked: true,
                        day: $scope.day,
                        location: "ASB SHOWGROUNDS",
                        contractor: "Carlton Events",
                        supervisor: "Stoves",
                        timesheetSubmitted: true,
                        timeout: "6:00pm",
                        timein: "6:00am"
                    }

                )

                //console.log($scope.jobDetails)

            } else {

                $scope.payperiod++
                $scope.payPeriod = {

                }
                $scope.payPeriod.booked = $scope.booked;
                $scope.payPeriod.payperiod = $scope.payperiod
                $scope.payPeriod.jobDetails = $scope.jobDetails
                $scope.payPeriod.month = $scope.monthName;
                $scope.payPeriod.monthNum = $scope.month;

                PayPeriod.createPayPeriod($scope.payPeriod).then(function (data) {

                    $scope.iterator = 0;
                    $scope.jobDetails = [];
                    //console.log(data)

                })

                //console.log($scope.payPeriod)
                //console.log("new week")

            }

        }
        Auth.getUser().then(function (data) {

            //console.log(data)
            //console.log($rootScope.user_id)

            if (data.data.success) {

                $rootScope.userClass = data.data.userclass;
                $rootScope.user_id = data.data._id
                $rootScope.messageCount = data.data.messages.length
                $rootScope.payPeriod = data.data.payperiod;
                $rootScope.userClassy = $rootScope.userClass

            } else {

                Auth.logout();

            }

        })
        User.getUserClass().then(function (data) {

            //console.log(data)

        })
        $rootScope.$on('$routeChangeStart', function () {

            //console.log("Logged In?", Auth.isLoggedIn())
            // console.log(AuthToken.getToken())
            $rootScope.loggedIn = Auth.isLoggedIn()
            $rootScope.userClassy = $rootScope.userClass

            Auth.getUser().then(function (data) {
                //console.log(data)

                if (data.data.success) {

                    $rootScope.userClass = data.data.userclass
                    $rootScope.payPeriod = data.data.payperiod;
                    $rootScope.userClassy = $rootScope.userClass

                } else {

                    Auth.logout();

                }

                //console.log($rootScope.userClass)

            })

        })

    })

}());