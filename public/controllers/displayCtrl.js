(function () {

    var app = angular.module('displayController', ['userServices'])
    app.config(function () {

        console.log("display Controller Loaded")
    })

    app.controller('displayCtrl', function ($scope, $http, $location, User, $timeout) {

        $scope.image1 = true;
        $scope.image2 = false;
        $scope.image3 = false;
        $scope.image4 = false;
        $scope.image5 = false;
        $scope.image6 = false;
        $scope.image7 = false;
        $scope.image8 = false;
        $scope.image9 = false;
        $scope.image10 = false;
        $scope.changeImage = function () {

            if ($scope.image1) {
                  $scope.image1 = false;
            $scope.image2 = true;
            $scope.image3 = false;
            $scope.image4 = false;
            $scope.image5 = false;
            $scope.image6 = false;
            $scope.image7 = false;
            $scope.image8 = false;
            $scope.image9 = false;
            $scope.image10 = false;

            } else if ($scope.image2) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = true;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
            }
            else if ($scope.image3) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = true;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
            }
            else if ($scope.image4) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = true;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
            }
            else if ($scope.image5) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = true;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
            }
            else if ($scope.image6) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = true;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
            }
            else if ($scope.image7) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = true;
                $scope.image9 = false;
                $scope.image10 = false;
            }
               else if ($scope.image8) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = true;
                $scope.image10 = false;
                console.log(9)
            }
            else if ($scope.image9) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = true;
                console.log(9)
            }
            else if ($scope.image10) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
                                $scope.image11 = true;
                                                console.log(10)


            }
                        else if ($scope.image11) {
                $scope.image1 = false;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
                                $scope.image11 = false;
                                                                $scope.image12 = true;

                                                console.log(11)


                
            }
  else if ($scope.image12) {
                $scope.image1 = true;
                $scope.image2 = false;
                $scope.image3 = false;
                $scope.image4 = false;
                $scope.image5 = false;
                $scope.image6 = false;
                $scope.image7 = false;
                $scope.image8 = false;
                $scope.image9 = false;
                $scope.image10 = false;
                                $scope.image11 = false;
                                                                $scope.image12 = false;

                                                console.log(11)


                
            }

        }



    })

}());