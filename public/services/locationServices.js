
angular.module('locationServices', []).config(function () {

    console.log("locationServices")

})
.factory('Location', function ($http,$window) {
    var locationFactory = {};

    locationFactory.create = function(locationName){

       return  $http.put('/api/locations/create/'+locationName);

    }
      locationFactory.getLocations = function(){
        return $http.get('/api/locations')
    }
    return locationFactory;
});