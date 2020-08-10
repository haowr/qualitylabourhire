
angular.module('supervisorServices', []).config(function () {

    console.log("supervisorServices")

})
.factory('Supervisor', function ($http,$window) {
    var supervisorFactory = {};

    supervisorFactory.create = function(supervisorName){

       return  $http.put('/api/supervisors/create/'+supervisorName);

    }
      supervisorFactory.getSupervisors = function(){
        return $http.get('/api/supervisors')
    }

    return supervisorFactory;
});