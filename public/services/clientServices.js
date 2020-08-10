
angular.module('clientServices', []).config(function () {

    console.log("clientService")

})
.factory('Client', function ($http,$window) {
    var clientFactory = {};

    clientFactory.create = function(clientName){

       return  $http.put('/api/clients/create/'+clientName);

    }
    clientFactory.getClients = function(){
        return $http.get('/api/clients')
    }
    return clientFactory;
});