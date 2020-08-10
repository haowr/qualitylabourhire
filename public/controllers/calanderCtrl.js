(function () {

    var app = angular.module('calanderController', ['userServices'])
    app.config(function () {

        console.log("calander Controller Loaded")
    })

    app.controller('calanderCtrl', function ($scope, Auth, $timeout, $location, $routeParams, User) {

        $scope.available = false;
        $scope.isSwitchedOn = false;
        $scope.date = $routeParams.date;
        $scope.month = $routeParams.month;
        $scope.hrsWorked = null;
        $scope.minsWorked = null;
        $scope.areYouSure = false;
        $scope.loading =false;
        $scope.supervisor = "";
        $scope.contractor = "";
        $scope.location = "";
        $scope.name = "";
        $scope.calender = [];
        $scope.successfullyBooked = false;
        $scope.failedBooking=false;
        $scope.jobDetails2 = null;
        $scope.contractor2 = "";
        $scope.location2 = "";
        $scope.supervisor2 = "";
        $scope.finalTimeOut = {
            name: "",

            clockIn: "",
            clockOut: "",
            hrsWorked: 0,
            minsWorked: 0,
            date: 0,
            month: ""

        }
        document.addEventListener("DOMContentLoaded", function (event) {
            //do work
        });
        ////console.log(document.getElementById("switch").checked)
        //console.log(document.getElementById("switch").prop)
        console.log($routeParams)
        $('#switch').prop('checked', true);
        $scope.imSure = function () {
            
            $scope.imSure = true;
            $scope.areYouSure = false;
            $scope.loading = true;
            $scope.jobDetails = {
                supervisor: $scope.supervisor,
                contractor: $scope.contractor,
                location: $scope.location,
                date: $routeParams.date,
                month: $routeParams.month

            }
            User.setToBooked($routeParams.userid, $routeParams.date, "true").then(function (data) {
                console.log(data)
                if (data.data.success) {
                    $scope.successfullyBooked = true;
                    
                    $scope.loading = false;
                    $timeout(function () {
                        $scope.successfullyBooked = false;
                    }, 4000)
                }else{
                    $scope.failedBooking = true;
                    $scope.loading = false;
                }
            })
            $scope.jobObject = {
                userid:$routeParams.userid,
                jobDetails : $scope.jobDetails
            }
            this.logo = {

            }
            console.log($scope.jobObject)
            User.addBookedJob($scope.jobObject).then(function(data){
                console.log(data)
                $timeout(function(){
    
                    $location.path('/profile/'+$routeParams.userid)
                },4000)
            })
            console.log($scope.jobDetails)
        }
        $scope.bookJob = function (jobDetailData, valid) {
            if (valid) {
                $scope.areYouSure = true;
                $scope.contractor = jobDetailData.contractor
                $scope.location = jobDetailData.location
                $scope.supervisor = jobDetailData.supervisor
                document.getElementById("trigger").click();
            }
            console.log(this.jobDetailsData)
            console.log(valid)
        }
        $scope.clockOut = function (timeData) {
            console.log(this.timeData)
            $scope.clockIn = "" + this.timeData.hundreth + "" + this.timeData.hundreth2 + ":" + this.timeData.minTenth + "" + this.timeData.minTenth2 + this.timeData.inAmPm + "";
            $scope.clockOut = "" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + ":" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + this.timeData.outAmPm + ""
            console.log($scope.clockIn)
            console.log($scope.clockOut)
            console.log("ampm", this.timeData.inAmPm, this.timeData.outAmPm)
            if ((this.timeData.inAmPm == "AM" && this.timeData.outAmPm == "AM") || (this.timeData.inAmPm == "PM" && this.timeData.outAmPm == "PM")) {
                //$scope.hrsWorked = (this.timeData.outHundreth + this.timeData.outHundreth2 + this.timeData.outMinTenth + this.timeData.outMinTenth2) - (this.timeData.hundreth + this.timeData.hundreth2 + this.timeData.minTenth + this.timeData.minTenth2)
                //console.log($scope.hrsWorked)
                console.log("same")
                if (Number(("" + this.timeData.hundreth + "" + this.timeData.hundreth2 + "")) <= (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + ""))) {
                    console.log("oro")
                    if (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + "") == 12) {

                        $scope.hrsWorked = (12 - Number("" + this.timeData.hundreth + "" + this.timeData.hundreth2 + "") + 12)

                    } else {
                        $scope.hrsWorked = (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + "") - Number("" + this.timeData.hundreth + "" + this.timeData.hundreth2 + ""))

                    }
                } else {

                    $scope.hrsWorked = (Number("" + this.timeData.hundreth2 + "" + this.timeData.hundreth + "") - Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + ""))
                }
                if ((Number("" + this.timeData.minTenth + "" + this.timeData.minTenth2 + "")) >= (Number("" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + ""))) {
                    console.log("helo")
                    console.log(Number("" + this.timeData.minTenth2 + "" + this.timeData.minTenth + ""))
                    console.log(Number("" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + ""))
                    $scope.minsWorked = (Number("" + this.timeData.minTenth + "" + this.timeData.minTenth2 + "") - (Number("" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + "")))
                } else {
                    $scope.minsWorked = (Number("" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + "") - (Number("" + this.timeData.minTenth + "" + this.timeData.minTenth2 + "")))
                }
                console.log("hrsWorked", $scope.hrsWorked)
                console.log("minsWorked", $scope.minsWorked)

            } else {
                if (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + "") == 12) {
                    console.log('last')
                    $scope.hrsWorked = (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + "") - Number("" + this.timeData.hundreth + "" + this.timeData.hundreth2 + ""))

                } else {
                    if (this.timeData.inAmPm == "AM") {
                        $scope.hrsWorked = (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + "") - (Number("" + this.timeData.hundreth + "" + this.timeData.hundreth2 + "")) + 12)

                    } else {
                        $scope.hrsWorked = (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + "") - (Number("" + this.timeData.hundreth + "" + this.timeData.hundreth2 + "")) + 12)

                    }

                    console.log()
                }
                if (Number("" + this.timeData.outHundreth + "" + this.timeData.outHundreth2 + "") == 12) {
                    console.log("helo")
                    console.log(Number("" + this.timeData.minTenth2 + "" + this.timeData.minTenth + ""))
                    console.log(Number("" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + ""))
                    $scope.minsWorked = (Number("" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + "") - (Number("" + this.timeData.minTenth + "" + this.timeData.minTenth2 + "")))
                } else {

                    $scope.minsWorked = (Number("" + this.timeData.outMinTenth + "" + this.timeData.outMinTenth2 + "") - (Number("" + this.timeData.minTenth + "" + this.timeData.minTenth2 + "")))
                }
                console.log("hrsWorked", $scope.hrsWorked)
                console.log("minsWorked", $scope.minsWorked)



            }

            // console.log(""+this.timeData.hundreth+""+this.timeData.hundreth2+":"+this.timeData.minTenth+""+this.timeData.minTenth2+this.timeData.inAmPm+"")
        }


        $scope.getSwitchValue = function () {
            alert(angular.element('#my-switch').prop('checked'));
        };

        User.getUser($routeParams.userid).then(function (data) {

            console.log(data);
            console.log(data.data.user[$routeParams.month][$routeParams.date - 1])
            $scope.name = data.data.user.name;
            $scope.isSwitchedOn = data.data.user[$routeParams.month][$routeParams.date - 1]
            $scope.jobDetails2 = data.data.user.jobDetails;
            console.log($scope.jobDetails2[$scope.date-1].location)
            $scope.location2 = $scope.jobDetails2[$scope.date-1].location;
            $scope.contractor2= $scope.jobDetails2[$scope.date-1].contractor;
            $scope.supervisor2 = $scope.jobDetails2[$scope.date-1].supervisor;


        })




        $scope.availabilityChanger = function () {

            if ($scope.isSwitchedOn) {
                $scope.available = false;
                console.log($scope.available)
                User.changeAvailability($routeParams.userid, $routeParams.month, $routeParams.date, "false").then(function (data) {
                    console.log(data)
                    $scope.isSwitchedOn = false;
                })

            } else {
                $scope.available = true;
                console.log($scope.available)
                User.changeAvailability($routeParams.userid, $routeParams.month, $routeParams.date, "true").then(function (data) {
                    console.log(data)
                    $scope.isSwitcheOn = true;
                })
            }


        }
    })

}());