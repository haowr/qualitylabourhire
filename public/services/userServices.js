console.log("testing")
angular.module('userServices',['authServices']).config(function(){

    console.log("UserService")

})
.factory('User', function($http,Auth,AuthToken){

    userFactory = {};
    //User.create(regData)
    userFactory.create = function(regData){

        return $http.post('/api/users', regData);

    }
    userFactory.getUsers = function(){

        return $http.get('/api/users')

    }
    userFactory.markTimeSheetAsDisputed = function(timesheet){
        return $http.post('/api/users/marktimesheetasdisputed',timesheet)
    }
       userFactory.markTimeSheetAsApproved = function(timesheet){
        return $http.post('/api/users/marktimesheetasapproved',timesheet)
    }
    userFactory.requestJob = function(jobData){
        return $http.post('/api/users/requestjob', jobData)
    }
    userFactory.getRequestedJobs = function(client){
        return $http.put('/api/users/getrequestedjobs/'+client)
    }
    userFactory.getApprovedJobs = function(name){
        return $http.put('/api/users/getapprovedjobs/'+name)
    }
    userFactory.addJob = function(jobData){
        return $http.post('/api/users/addjob',jobData)
    }
    userFactory.removeJob = function(jobData){
        return $http.post('/api/users/removejob',jobData)
    }
    userFactory.findUser = function(id){
      /*  console.log(name)
        return $http.put('/api/users/finduser/'+name)*/
        return $http.put('/api/users/finduser/'+id)
    }
    userFactory.removeUser = function(name){
        return $http.put('/api/users/removeuser/'+name)
    }
    userFactory.addDelinquentTimeSheet = function(jobDetail){
        return $http.post('/api/users/adddelinquenttimesheet',jobDetail)
    }
    userFactory.checkAndAddDelinquentTimeSheet = function(usersArray){
        return $http.post('/api/users/checkandadddelinquenttimesheet', usersArray)
    }
    userFactory.addPayPeriodToPayPeriodHistory = function(payperiod){
        console.log(payperiod)
        return $http.post('/api/users/addpayperiodtopayperiodhistory',payperiod)
    }
    userFactory.addJobToCurrentPayPeriod = function(job){
        return $http.post('/api/users/addjobtocurrentpayperiod',job)
    }
    userFactory.addLocation= function(locationData){
        return $http.post('/api/users/addlocation',locationData)
    }
    userFactory.getLocations = function(username){
        return $http.put('/api/users/getlocations/'+username)
    }
    userFactory.getSupervisors = function(username){
        return $http.put('/api/users/getsupervisors/'+username)
    }
    userFactory.changeRequestedJobToApproved = function(jobData){
        return $http.post('/api/users/changerequestedjobtoapproved',jobData)
    }
      userFactory.changeRequestedJobToDisApproved = function(jobData){
        return $http.post('/api/users/changerequestedjobtodisapproved',jobData)
    }
    userFactory.removeLocation = function(locationData){
        return $http.post('/api/users/removelocation', locationData)
    }
    userFactory.removeRequestedJob = function(jobData){
        return $http.post('/api/users/removerequestedjob', jobData)
    }
    userFactory.removeSupervisor = function(supervisorData){
        return $http.post('/api/users/removesupervisor', supervisorData)
    }
    userFactory.addSupervisor = function(supervisorData){
        return $http.post('/api/users/addsupervisor',supervisorData)
    }
    userFactory.changeUserPayPeriod= function(details){
        console.log(details)
      
        return $http.post('/api/users/changeuserpayperiod',details)
    }
    userFactory.addHoursToClientSubmittedTimeSheets = function(jobDetails){
        return $http.post('/api/users/addhourstoclientsubmittedtimesheets', jobDetails)
    }
    userFactory.removeRequestedJob = function(jobDetails){
        return $http.post('/api/users/removerequestedjob', jobDetails)
    }
    userFactory.addHoursToPayPeriod = function(hoursDetails){
        return $http.post('/api/users/addhourstopayperiod', hoursDetails)
    }
    userFactory.changeDisputedTimeSheetToResolved = function(jobDetails){
        return $http.post("/api/users/changedisputedtimesheettoresolved",jobDetails)
    }
     userFactory.changeDisputedTimeSheetToUnResolved = function(jobDetails){
        return $http.post("/api/users/changedisputedtimesheettounresolved",jobDetails)
    }
    userFactory.addApprovedJobsToJobCountArray = function(countData){
        return $http.post('/api/users/addapprovedjobstojobcountarray',countData)
    }
    userFactory.getAdmin = function(){
        return $http.get('/api/users/getadmin')
    }
        //User.sendPassword(resetData);
  userFactory.sendPassword = function(resetData){

    return $http.post('/api/users/resetpassword',resetData);

 }
 userFactory.findByToken = function(token){
     return $http.put('/api/users/findbytoken/'+token)
 }
   userFactory.savePassword = function(regData){

    return $http.post('/api/users/savepassword/',regData);

 }
    userFactory.editPayRate = function(newinfo){
        return $http.post('/api/users/editpayrate',newinfo)
    }
    userFactory.editPhoneNumber = function(newinfo){
        return $http.post('/api/users/editphonenumber',newinfo)
    }
    userFactory.editEmail = function(newinfo){
        return $http.post('/api/users/editemail/',newinfo)
    }
    userFactory.sendSms = function(userDetails){
        return $http.post('/api/users/sendsms', userDetails)
    }
    userFactory.sendMessage = function(messageDetails){
        return $http.post('/api/users/sendmessage',messageDetails)
    }
    userFactory.addHoursToBookedJob = function(jobData){
        return $http.post('/api/users/addhourstobookedjob', jobData)
    }
    userFactory.changePayPeriodHistoryEntryToPaid = function(payperiodDetails){
        return $http.post('/api/users/changepayperiodhistoryentrytopaid', payperiodDetails)
    }
    userFactory.changePayPeriodHistoryEntryToUnPaid = function(payperiodDetails){
        return $http.post('/api/users/changepayperiodhistoryentrytounpaid', payperiodDetails)
    }

       //User.getPermission();
 userFactory.getUserClass= function(){
    if(AuthToken.getToken()){
        var token = AuthToken.getToken()
            return $http.put('/api/getuserclass'+token);

    }

 }
    userFactory.generatePdf = function(){
        return $http.get('/api/generatepdf')
    }
    userFactory.instaSearch = function(input){
        console.log(input)
        return $http.put('/api/users/'+input)
    }
       
    userFactory.updatePayPeriod = function(payperiod,username){
        console.log("Hello from userservice")
        return $http.put('/api/users/updatepayperiod/'+payperiod+'/'+username)

    }
    userFactory.getUser  = function(userId){
         console.log("Hello from userservice")
        return $http.put('/api/users/'+userId);
    }
    userFactory.changeAvailability = function(userid,month,date,boolean){

        return $http.put('/api/users/'+userid+'/'+month+'/'+date+'/'+boolean);

    }
    userFactory.getMessages = function(id){

        return $http.put('/api/users/getmessages/'+id)
    }
    userFactory.changeMessageToRead = function(id,index){
        return $http.put('/api/users/changemessagetoread/'+id+"/"+index)
    }
    userFactory.changeMessageToUnRead = function(id,index){
        return $http.put('/api/users/changemessagetounread/'+id+"/"+index)
    }
       userFactory.removeMessage = function(name,index){
        return $http.put('/api/users/removemessage/'+name+"/"+index)
    }
    userFactory.addBookedJob = function(jobObject){
        console.log(jobObject)
                return $http.post('/api/bookjob',jobObject);

    }
    userFactory.setToBooked = function(userid,date,boolean){
        //console.log(jobObject)
        return $http.put('/api/users/'+userid+"/"+date+"/"+boolean);
                
        
    }
    return userFactory
})