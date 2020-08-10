angular.module('authServices', []).config(function () {

    console.log("authService")

})
    .factory('Auth', function ($http,AuthToken,$q) {

        authFactory = {};
        //User.create(regData)
        authFactory.login = function (loginData) {

            return $http.post('/api/authenticate', loginData).then(function(data){
                       AuthToken.setToken(data.data.token,data.data.timelefttoken);
                      // AuthToken.setToken(data.data.timelefttoken)

                       return data;
            })

        }
//Auth.Logout();
 authFactory.logout = function(){
    AuthToken.setToken();
    
 };
 

         //Auth.isLoggedIn()

 authFactory.isLoggedIn = function(){
    
     if(AuthToken.getToken().token){
        return true;

     }else{
         return false;
     }

     
 };
        //Auth.getUser()


        authFactory.getUser = function () {

            if (AuthToken.getToken()) {
                console.log(AuthToken.getToken())
                return $http.post('/api/me',AuthToken.getToken());
            } else {
                $q.reject({ message: 'User has no token' })
            }

        };
        return authFactory
    })

.factory('AuthToken', function ($window) {
    var authTokenFactory = {};

    authTokenFactory.setToken = function (token,timelefttoken) {
        if (token ||timelefttoken) {
            $window.localStorage.setItem('token', token);
            $window.localStorage.setItem('timelefttoken',timelefttoken)
        } else {
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('timelefttoken');
        }


    };
    //AuthToken.getToken();
    authTokenFactory.getToken = function () {
        var token= {token:$window.localStorage.getItem('token')};
        return token;
    };
    return authTokenFactory;
});