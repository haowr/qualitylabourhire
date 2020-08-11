(function () {

    var app = angular.module('managementController', ['authServices', 'supervisorServices', 'locationServices', 'clientServices'])
    
    app.config(function () {

        //console.log("Management Controller Loaded")

    })

    app.controller('managementCtrl', function ($scope, Auth, $timeout, $location, $interval, $window, User, $rootScope, Location, Client, Supervisor, $routeParams) {

        $rootScope.$on('$routeChangeStart', function () {

            console.log(Auth.isLoggedIn())
            $rootScope.loggedIn = Auth.isLoggedIn()
            Auth.getUser().then(function (data) {

                console.log(data)
            
                if (data.data.success) {
                    //$rootScope.payPeriod = data.data.payperiod;
                   // $rootScope.userClassy = $rootScope.userClass
                }else{
                   // Auth.logout();
                }
                //console.log($rootScope.userClass)

            })

        })
        $scope.username = "";
        $scope.userName = ""
        $rootScope.userClassy = $rootScope.userClass
        $scope.payperiod = '';
        $scope.payPeriodStartDate = "";
        $scope.payPeriodEndDate = "";
        $scope.currentUserHistoryFile = "";
        $scope.payPeriodHistoryIndex = ""
        $scope.loading = false;
        $scope.loadingUsers = false;
        $scope.loadingPersonalHistory = false;
        $scope.adminMenuLoading = true;
        $scope.loadingRemoveUser = false;
        $scope.generalHistoryTitle = false;
        $scope.personalHistoryTitle = false;
        $scope.managementPage = true;
        $scope.clientsPage = false;
        $scope.disputedTimeSheetsPageOpen = false;
        $scope.payslipPageOpen = false;
        $scope.employeesPage = false;
        $scope.userFilePage = false;
        $scope.openIssue = false;
        $scope.closeIssue = false;
        $scope.individualPayPeriodOpen = true;
        $scope.historyEntryOpen = true;
        $scope.bookedJobs = false;
        $scope.employeeHome = true;
        $scope.loadingCurrentClient = false;
        $scope.currentClientObject = {}
        $scope.name = "";
        $scope.approvedJobsArray = [];
        $scope.delinquentTimeSheetsArray = []
        $scope.requestedJobsArray = []
        $scope.disputedTimeSheetsArray = [];
        $scope.removeRequestedJobPageOpen = false;
        $scope.removingRequestedJob = false;
        $scope.removeClientPageOpen = false;
        $scope.clientHomePage = true
        $scope.loadingRemoveClient = false;
        $scope.removeClientSuccessful = false;
        $scope.clientDetailsPageOpen = false;
        $scope.currentClientFile = "";
        $scope.requestedJobsArray = [];
        $scope.requestedJobsPageOpen = false;
        $scope.requestedJobsPageSelected = false;
        $scope.individualRequestedJobOpen = true;
        $scope.requestIndex = null;
        $scope.approvingRequest = false;
        $scope.disApprovingRequest = false;
        $scope.clientHome = true;
        $scope.clientListOpen = false;
        $scope.employeeListOpen = false;
        $scope.complaintsOpened = false;
        $scope.complaintsSelected = false;
        $scope.bookedJobsSelected = false;
        $scope.timesheetsSelected = false;
        $scope.payslipPageSelected = false;
        $scope.delinquentTimeSheetSelected = false;
        $scope.disputesSelected = false;
        $scope.jobsSelected = true;
        $scope.bookedJobsPageOpened = false;
        $scope.complaintsPageOpened = false;
        $scope.historyPageOpen = true;
        $scope.generalHistoryOpen = false;
        $scope.personalHistoryOpen = false;
        $scope.commentsPageOpened = false;
        $scope.commentsPageOpened = false;
        $scope.noComments = false;
        $scope.noComplaints = false;
        $scope.addJobPageOpen = false;
        $scope.commentsSelected = false;
        $scope.payslipGenerationOpen = false;
        $scope.payPeriodPaidSwitch = false;
        $scope.payPeriodUnPaidSwitch = false;
        $scope.slidein = false;
        $scope.slideIn = false;
        $scope.slideout = false;
        $scope.fadeOut = false;
        $scope.fadeOut2 = false;
        $scope.jobsPageOpen = true;
        $scope.historyPageOpen = false;
        $scope.openJob = 0;
        $scope.currentJobInDate = 0;
        $scope.timesheetsPageOpen = false;
        $scope.removeUserPageOpen = false;
        $scope.areYouSureRemove = false;
        $scope.areYouSureRemove3 = false;
        $scope.disputesPageOpen = false;
        $scope.incompletePayPeriod = false;
        $scope.incompletePayPeriodPageOpen = false;
        $scope.editPayRatePageOpen = false;
        $scope.editPhoneNumberPageOpen = false
        $scope.editPhoneNumberLoading = false;
        $scope.locationsListLoading = false;
        $scope.loadingLists = false;
        $scope.supervisorListLoading = false;
        $scope.locationsListOn = false;
        $scope.supervisorsListOn = false;
        $scope.editEmailLoading = false;
        $scope.editPayRateLoading = false;
        $scope.phoneNumberData = {}
        $scope.editPayRatePageOpen = false;
        $scope.payRateData = {};
        $scope.emailData = {};
        $scope.requestedJobsPageOpen = false;
        $scope.adminRequestedJobsPageOpen = false;
        $scope.approvedJobsPageOpen = false;
        $scope.individualApprovedJobOpen = true;
        $scope.approvedIndex = null;
        $scope.approvedJobsPaginated = [];
        $scope.approvedJobsForPagination = [];
        $scope.disputeIndex = null;
        $scope.disputedTimeSheetOpen = true;
        $scope.disputedTimeSheetLoading = false;
        $scope.timeSheetMessageLoading = false;
        $scope.timeSheetComposeMessageOpen = false;
        $scope.allFieldsMustBeInput = false;
        $scope.delinquentIndex = null;
        $scope.delinquentTimeSheetOpen = true;
        $scope.delinquentTimeSheetLoading = false;
        $scope.delinquentInfo = false;
        $scope.delinquentTimeSheetInfo = false
        $scope.messageIndex = null;
        $scope.adminMessageOpen = true;
        $scope.adminMessageLoading = false;
        $scope.adminMessagesArray = [];
        $scope.adminMessagesPageOpen = false;
        $scope.adminHome = true;
        $scope.fadeIn = true;
        $scope.chartsPageOpen = false;
        $scope.messageAdminPageOpen = false;
        $scope.timeSheetMessage = {

            subject: "Re:Disputed Time Sheet(" + $scope.disputedDate + ")",
            body: null,
            from: "ohrha harho",
            to: null

        }
        $scope.sendingTo = "";
        $scope.sendingFrom = "";
        $scope.disputedDate = ""
        $scope.resolvingDispute = false;
        $scope.usersPageIndex = ""
        $scope.textName = ""
        $scope.userDetailsPageOpened = true;
        $scope.delinquentTimeSheetPageOpened = false;
        $scope.timesheetEntryOpen = true;
        $scope.curTimesheet = null;
        $scope.noInput = false;
        $scope.showChart = true;
        $scope.removeChart = false;
        $scope.searchResults = false;
        $scope.userList = false;
        $scope.usersLoaded = false;
        $scope.noSearchResults = false;
        $scope.loadingNewJob = false;
        $scope.loadingAddAndRemoveDelinquentTimeSheet = false;
        $scope.loadingDisputedTimeSheetsPage = false;
        $scope.loadingAddDelinquentTimeSheet = false;
        $scope.turnOtherPayPeriodsOff = false;
        $scope.globalPayPeriodIndexATM = "";
        $scope.addHoursDelinquentPageOpen = false;
        $scope.submitHoursLoading = false;
        $scope.submitHoursLoading = false;
        $scope.addHoursPageOpen = false;
        $scope.areYouSure = false;
        $scope.areYouSureRemove2 = false;
        $scope.payPeriodUpdated = false;
        $scope.delinquentTimeSheet = false;
        $scope.individualUser = false;
        $scope.employeeListOpenAdmin = false;
        $scope.totalHours = 0
        $scope.loadingUserList = false
        $scope.requestedJobsPaginated = [];
        $scope.requestedJobsForPagination = [];
        $scope.currentUserFile = "";
        $scope.employees = [];
        $scope.selectedItem = {};
        $scope.currentEmployee = [];
        $scope.employeesForHistory = [];
        $scope.employeesPaginated = [];
        $scope.currentusernameArray = [];
        $scope.payPeriods = [];
        $scope.payPeriodHistory = [];
        $scope.page = 0;
        $scope.minVarIn = "";
        $scope.hrVarIn = "";
        $scope.hrVarOut = "";
        $scope.minVarOut = ""
        $scope.numaro = 4;
        $scope.pageArray = [];
        $scope.clients = [];
        $scope.locations = [];
        $scope.supervisors = [];
        $scope.jobData = {};
        $scope.delinquentTimeSheetArray = [];
        $scope.jobData2 = {};
        $scope.timeData = {

        };
        $scope.newPayPeriodObject = {

        }
        $scope.employeeJobDetails = {};
        $scope.delinquentJobDetails = {};
        $scope.pageLimit = 4;
        $scope.currentPage = 1;
        $scope.curPeriod = null;
        $scope.curHistory = null;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.hoursWorked = 0;
        $scope.finalHours = "";
        $scope.hourIterator = 0;
        $scope.minIterator = 0;
        $scope.displayDate = moment().weekday(0)
        console.log($scope.displayDate)
        $scope.date = new Date();
        $scope.dateNow = $scope.date.getDate()
        $scope.month = $scope.date.getMonth() + 1;
        $scope.monthArray = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
        ]
        $scope.year = moment().year();
        $scope.yearString = String($scope.year)
        $scope.dateCompiled = "" + $scope.month + "/" + $scope.dateNow + "/" + $scope.yearString[2] + $scope.yearString[3]
        console.log($scope.dateCompiled)
        $scope.monthLiteral = "";
        $scope.day = $scope.date.getDay();
        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
        $scope.labelsMetrics = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.dataMetrics = [
            [1, 2, 4, 81, -56, 55, -40],
            [5, 3, 4, 19, 86, 27, 90]
        ];
        $scope.datasetOverrideMetrics = [
            {
                label: "Requested Jobs",
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: "Approved Jobs",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                type: 'line'
            }
        ];
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A'];
        $scope.data = [

            [0, 0, 0, 0, 0, 0, 0]

        ];
        $scope.data2 = [

            [65, 59, 80, 81, 56, 55, 40]

        ];
        $scope.onClick = function (points, evt) {

            console.log(points, evt);

        };
        setTimeout(function () {

            $('select').material_select();

        }, 15000);
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options = {

            scales: {

                yAxes: [

                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }

                ]

            }

        }
        $scope.payperiods = [];
        $scope.currentPayPeriod = 0;
        $scope.jobDetails = [];
        $scope.comments = [];
        $scope.userSearchResults = [];
        $scope.currentUserPhoneNumber = "";
        $scope.qlhLogo = 'data:image/jpeg;base64,/9j/4QaiRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAeAAAAcgEyAAIAAAAUAAAAkIdpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxODowNToyNiAxNjozNDo1MAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAY6ADAAQAAAABAAAAVAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAAVsAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/' +
            'bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAVABjAwEiAAIRAQMRAf/dAAQAB//EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A9VSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//Q9USSSSUpJJJJSkHJzMbEZvyLG1jtPJ/qt+kq+Xd1Oy44+HUK2j6WTZwJ/wBGz89LF6Rj0v8AXuJyck83W6/5jfosUMsk5Exxx20M5+mA/uj5sjKIQAEpy32hDWf1/cRjq+Rd7sTBtur7PdFYP9Xep1dYo3ivKY/EsOgFohp/q2/QV9RsrrtYWWND2nlrhIS9vMNfd4j2lGPB/wA31/8APVx4zp7dDuJHj/53pZAgiRqElTZhWYxnCs2198ewks/6276dStVuc5suaWO7tMH8QpIyJ0lHhP8AjR/' +
            'wZLJRA1BsfZL/ABWSSSSctUkkkkp//9H1VJJJJSG6q95/R3GryDWn/qlVtxOoAF56iWNaJJNbIAHclaC5v/GKckfUzqf2ad/pjdt52b2et/4Fv3JksUZbmX0nOP8A0ZL45DHbh+sYy/6Qa+P9Y+l5eaMHG+s1L8hx2tYGMhzv3WPP6N/9hyvl946i3ph6z+vOr9ZuP6TdxrB2+p/V3LkPrTX9Wm/4tcV2EKBfsx/sTq9vqm6Wert2/pPV/nfWWhTY+v8Axj9OdmODLf2KPVLjHv3e/n+Umfdsfef/AIbl/wC/Xe/PtD/wvH/3r2FnUsLEycXAyshozMsEUMdo6wsE2FoHtUh1PAd1F3Sxc05za/WdRruFZO31P6u5cX9eHZ9n1u+rB6Q+j7YftXoPv3Opnazd6no+/wCju+iodAHWm/4y8kdbdjPzP2YNcQPFez1GbP5/371MxPoKSSSSlJJJJKUkkkkp/9L1RJOkkpZM9jHscx7Q5jgQ5pEgg8ghSSSU8b1H/Fv0sdQxOqdBrp6fmYt3qvY9hsosH7rqHO/ROb/g31La6r9U/q91q9uV1XCZk5DWCsPLniGgl232OZ+c5bCSSnLx/qz0LGOE6jEaw9M3/YiC79H6utu2Xfn/AMtWW9K6e3qbuqikDPfV6Dr5MmsHd6cTs+l/JVtJJSySdJJSySdJJSySdJJT/9P1RJOkkpZJOkkpZJOkkpZJOkkpZJOkkpZJOkkpZJOkkp//1PVUl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKf/2f/' +
            'tDpxQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNBDoAAAAAAOUAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAADABQAHIAbwBvAGYAIABTAGUAdAB1AHAAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4Qkl' +
            'NBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAI4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADSQAAAAYAAAAAAAAAAAAAAFQAAABjAAAACgBVAG4AdABpAHQAbABlAGQALQAyAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAABjAAAAVAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAVAAAAABSZ2h0bG9uZwAAAGMAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAFQAAAAAUmdodGxvbmcAAABjAAAAA3VybFRFWFQAAAABAAAAAAAAbnVsbFRFWFQAAAABAAAAAAAATXNnZVRFWFQAAAABAAAAAAAGYWx0VGFnVEVYVAAAAAEAAAAAAA5jZWxsVGV4dElzSFRNTGJvb2wBAAAACGNlbGxUZXh0VEVYVAAAAAEAAAAAAAlob3J6QWxpZ25lbnVtAAAAD0VTbGljZUhvcnpBbGlnbgAAAAdkZWZhdWx0AAAACXZlcnRBbGlnbmVudW0AAAAPRVNsaWNlVmVydEFsaWduAAAAB2RlZmF1bHQAAAALYmdDb2xvclR5cGVlbnVtAAAAEUVTbGljZUJHQ29sb3JUeXBlAAAAAE5vbmUAAAAJdG9wT3V0c2V0bG9uZwAAAAAAAAAKbGVmdE91dHNldGxvbmcAAAAAAAAADGJvdHRvbU91dHNldGxvbmcAAAAAAAAAC3JpZ2h0T3V0c2V0bG9uZwAAAAAAO' +
            'EJJTQQoAAAAAAAMAAAAAj/wAAAAAAAAOEJJTQQUAAAAAAAEAAAAAjhCSU0EDAAAAAAFiAAAAAEAAABjAAAAVAAAASwAAGJwAAAFbAAYAAH/2P/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAVABjAwEiAAIRAQMRAf/dAAQAB//EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A9VSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//Q9USSSSUpJJJJSkHJzMbEZvyLG1jtPJ/qt+kq+Xd1Oy44+HUK2j6WTZwJ/wBGz89LF6Rj0v8AXuJyck83W6/5jfosUMsk5Exxx20M5+mA/uj5sjKIQAEpy32hDWf1/cRjq+Rd7sTBtur7PdFYP9Xep1dYo3ivKY/EsOgFohp/q2/QV9RsrrtYWWND2nlrhIS9vMNfd4j2lGPB/wA31/8APVx4zp7dDuJHj/53pZAgiRqElTZhWYxnCs2198ewks/6276dStVuc5suaWO7tMH8QpIyJ0lHhP8AjR/wZLJRA1BsfZL/ABWSSSSctUkkkkp//9H1VJJJJSG6q95/R3GryDWn/qlVtxOoAF56iWNaJJNbIAHclaC5v/GKckfUzqf2ad/pjdt52b2et/4Fv3JksUZbmX0nOP8A0ZL45DHbh+sYy/6Qa+P9Y+l5eaMHG+s1L8hx2tYGMhzv3WPP6N/9hyvl946i3ph6z+vOr9ZuP6TdxrB2+p/V3LkPrTX9Wm/4tcV2EKBfsx/sTq9vqm6Wert2/pPV/nfWWhTY+v8Axj9OdmODLf2KPVLjHv3e/n+Umfdsfef/AIbl/wC/Xe/PtD/wvH/3r2FnUsLEycXAyshozMsEUMdo6wsE2FoHtUh1PAd1F3Sxc05za/WdRruFZO31P6u5cX9eHZ9n1u+rB6Q+j7YftXoPv3Opnazd6no+/wCju+iodAHWm/4y8kdbdjPzP2YNcQPFez1GbP5/371MxPoKSSSSlJJJJKUkkkkp/9L1RJOkkpZM9jHscx7Q5jgQ5pEgg8ghSSSU8b1H/Fv0sdQxOqdBrp6fmYt3qvY9hsosH7rqHO/ROb/g31La6r9U/q91q9uV1XCZk5DWCsPLniGgl232OZ+c5bCSSnLx/qz0LGOE6jEaw9M3/YiC79H6utu2Xfn/AMtWW9K6e3qbuqikDPfV6Dr5MmsHd6cTs+l/JVtJJSySdJJSySdJJSySdJJT/9P1RJOkkpZJOkkpZJOkkpZJOkkpZJOkkpZJOkkpZJOkkp//1PVUl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKf/2ThCSU0EIQAAAAAAVQAAAAEBAAAADwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAAABMAQQBkAG8AYgBlACAAUABoAG8AdABvAHMAaABvAHAAIABDAFMANgAAAAEAOEJJTQQGAAAAAAAHAAgAAAABAQD/4Q3WaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWN' +
            'rZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNS0yNlQxNjozNDo1MCsxMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNS0yNlQxNjozNDo1MCsxMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDUtMjZUMTY6MzQ6NTArMTI6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTlGRTczQ0I5RDYwRTgxMUI4QjdDNzJCOEFGQzhBNTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OThGRTczQ0I5RDYwRTgxMUI4QjdDNzJCOEFGQzhBNTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5OEZFNzNDQjlENjBFODExQjhCN0M3MkI4QUZDOEE1OCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4RkU3M0NCOUQ2MEU4MTFCOEI3QzcyQjhBRkM4QTU4IiBzdEV2dDp3aGVuPSIyMDE4LTA1LTI2VDE2OjM0OjUwKzEyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTlGRTczQ0I5RDYwRTgxMUI4QjdDNzJCOEFGQzhBNTgiIHN0RXZ0OndoZW49IjIwMTgtMDUtMjZUMTY6MzQ6NTArMTI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI' +
            'CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2M' +
            'Tk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVN' +
            'BVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAVABjAwERAAIRAQMRAf/dAAQADf/EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRzRUY3R2MoVVZXGrLC0uLyZIN0k4Rlo7PD0+MpOGbzdSo5OkhJSlhZWmdoaWp2d3h5eoWGh4iJipSVlpeYmZqkpaanqKmqtLW2t7i5usTFxsfIycrU1dbX2Nna5OXm5+jp6vT19vf4+foRAAIBAwIEBAMFBAQEBgYFbQECAxEEIRIFMQYAIhNBUQcyYRRxCEKBI5EVUqFiFjMJsSTB0UNy8BfhgjQlklMYY0TxorImN' +
            'RlUNkVkJwpzg5NGdMLS4vJVZXVWN4SFo7PD0+PzKRqUpLTE1OT0laW1xdXl9ShHV2Y4doaWprbG1ub2Z3eHl6e3x9fn90hYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A39tI/wB8F/4p7917r2kf74L/AMU9+6917SP98F/4p7917r2kf74L/wAU9+6917SP98F/4p7917r2kf74L/xT37r3XtI/3wX/AIp7917r2kf74L/xT37r3XtI/wB8F/4p7917r2kf74L/AMU9+6917SP98F/4p7917r2kf74L/wAU9+6917SP98F/4p7917r/0N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//R39dR/qP94/6P9+6917Uf6j/eP+j/AH7r3XtR/qP94/6P9+6917Uf6j/eP+j/AH7r3XtR/qP94/6P9+690G3ZfcPWnT2G/jvZO8sLtSgbUKZchUBq/ISKP8zi8VTGfJZKe/8AZgicj82HsE88e4/I/tvtv72525ltdvtD8Ikb9SQ/wxRLqllb5IjH1p0KeVeSuaudr7938rbHPeXA+LQvYg9ZJDREHzdh0Wem+Xm/d5E13TvxX7b37tm5an3RuCqwvW2NykAvapw0W42mqshBKBdDpjJBFwPcHQfeL5t5mrd+23sFzFu+x/hurh4dtjlX+KEXNWkU+Rop9QOpUl9mOXtj/wAX5393tl27dfO3hWW+eM/wymCioR55PyJ6Vm2vmFsZsrSbZ7Z2xvXoLdNbIKeko+0cOcbt3JVOoL4cRvallqNtVt2I0l5oNdxYG49iDZPvH8qHcLbYvcPYt05Q3+VtKJukPhW8jcKQ3qlrZ/lqdK4oM9E+6eynMAs5t25O3aw5j2hBVmsJNcyL6yWrATr86K1M1PRsYp45445oZYpoZUWSKWJ0kjljdQySRukhV0dTcEEgj3kJHIkqJLE4aNgCCDUEHIIIwQfIjqHHR42ZJFKuDQgihBHEEeR6yaj/AFH+8f8AR/u/Vevaj/Uf7x/0f7917r2o/wBR/vH/AEf7917r2o/1H+8f9H+/de6//9Lf0v8A4/7z/wBhPfuvdev/AI/7z/2E9+6916/+P+8/9hPfuvdev/j/ALz/ANhPfuvdFP7Z3Z8ltw7tqetuj9k4/aWMhhp/413lv6anmwlEKqCOaSLZm2Keeetz2QpUl0+WdBTrOrIy2Gv3j57h8we+G88wzck+1fK0O3WKqvj75flWgTWoJFlaqWe4kUGmqRRGHBUrQauph5N2f2s23ZouaOf9/kvLtmbwtqswwlbSSAbmdgFhRiK6UJcqQQanT131h8ROvNl5ob831W5TujticrNWdhdjSJl6imqP1adt4WaSXFbdpIW/zKxK8sQ4EluPfuRPu58ncsbmObea7mfmf3Cc6n3HcT4zK3GltA1YrdFPwBQXUYD0x17mz3o5l32xPL3L8EOxcnLhbOyHhqy/8PlFJJmP4ixCtxK16NcLAACwAAAANgAOAAA/AHvIMAAUHDqHuOTx6aM9t7A7pxdVg9zYbFbgw1dG0VZi8zQ0uSoKmNgVKzUlYJoX4PF1uPx7Ld22bad/sLjat82yC82yVaPFNGskbA+TI4Kn9nS3bty3HaLuG/2q+mtr6M1WSJ2R1PyZSCP29ANiulM/1XP5+jd1SYzbmtpJ+pN61ddmdiaWYs8e1cqXqtx7DkYk6VhNbj1P/KH+RE23+1+78gS+L7V7+0Gy1q20XrSTWHzFpL33NgT5BDNbj/lG8+pDvOe9u5vjEfP+0CXc6UG42qpFd/I3EfbDdj1LCKY/7+6Hbb+UyGVxy1GWwdZtzIxyPBV4ysqaOtCSxhCZaOuoKqanrqCbXeKX9tyOHjjcMglfaL683CzWbcNplsrwMVeJ2R6EUyjxsyvGa9rdrEYZEYFRH25WttZ3Jjs9wS6tiKq6hlqD5MjgMrj8S5H8LMtGL3f/AB/3n/sJ7NOkHXr/AOP+8/8AYT37r3Xr/wCP+8/9hPfuvdf/09/j37r3XvfuvdIDdu2t6ZuUvtrsmv2XH4lQQ0m2Ns5tRIL6pi+bo6mQl7/puALcewjzDsnM26Pq2PnWbbE0gUS2tp8+tZ0Y59OHQi2bdNisE07ryvHfNWtWnnix6UiZRj16ALcvVPftHSZHMz/MrIbZw+No6nIZCuyHUvWqUGMoKOF6mrra2unloqempKWnjZ5JHKoiKWJAB9xXf+2XvTcyM1p94y6gQ+X7m25qfn2/4Oh/ac8+2MCKtx7L28rev7yvVr/x7qqvr7+Y38Xu4e5KPoXrP+eJ1BubtPK5n+7uD23Rdb7Ago9x59p/tocLtfdNc9LtHc+Uq6g6KeCgrqiSpcgRBz7IJfaD7wDtWP7010o9P3Ft/wD1s6N4/cf2gUUf2Dtyf+lref8AQHRvqjL73ovkPi/ihV/zMIIvkVmOu6jtvG9Sv0hsr+9Fb1vR5STDVW7YkDmh/hUOUhaAkzCTWP0259tj2e+8GCK/eouqf9KPb/8ArZ1c+5Hs9Q09gbev/S1vP+gOjlbj+R3S3T3Y3Q/x17V7j2/R9697UGepOqdtZenkx24e2a/YGJo6/euRwuPx1JLi6Z6CmqEqZ4jJEkaygJe3vJfbLe7s9tsLTcL83d9FCiyTFFjMzqoDSFE7ULsCxVe1a0GB1B99NbXN7d3FnaC3tHlZkiDFxGpJKoHbubSKLqbJpU56dKT5M9DV3yGyvxPpOztuT/IvCddU3beW6lR6z+9FD1vWZODDUu7pkNIKEYqbKVMcIImMmth6bc+13STodPfuvde9+691737r3Xvfuvde9+691//U3+Pfuvde9+691737r3VKX/CimbsuD+TH86ZOqjllz/8Ao2wUebbB/cDJjr2XsHaEXZWg0v7woDsV68V1vT/DzPq9Gr37r3VD380jAfy2qH/hNf0RkuiKHoWn7CGx/ipL8aMr1/BtCLt+r7vfK7HO+v4VWYMDelTvZ6ds224VdmnWoWU1IEirb3XujgbM3Bl9u/8ACjX4aZPurNUGA3o38kLBw7+rtx5GjxUf9/Jt5FtywVFTXTQQ/eSZtKm66tRINvp7917ps/ngV3fe5v5uP8i6t+Fm4+jH70roPmd/ot3D3Wd0Z7pP7+LaGx48w+6z1tM+5ayjGEirY4fsX1LW+PX6A/v3Xuk38BKP5pUP/ClruuD56Zj425zvj/hr/Eua74rY7sfGdWf3MbuHZf8Ad2EU3aTybo/vHHKKn7xr/bFTH4+dXv3XutwX37r3Xvfuvde9+691737r3Xvfuvdf/9Xf0t/h/vH/AGD9+69163+H+8f9g/fuvdet/h/vH/YP37r3TflsRi89i8lg85jKDM4XM0FZisviMrRU+QxeVxeQp5KSvxuSoKunmpa6grqWZ4poZUaOSNirAgke/de61wPkV/wm/wDjDSd+/Hf5cfy8dpdMfFDvvo3t+n7Fz23N4bCzXaXQHauGJ80+Gy3WOTzr4/ZOaxVVGHxNft9KA49pXlijWpipKin917qzf5T/AMpz+X38599YLtn5efGDZXcXZ+F2fjNlU25MnuLsLHNQ4DH1uRy0OFo49ubm25SzUNNlczVyRyS0/nYSnUbWUe690r9gfy0Pgz1dV/GKv2D8edsbbq/hnH2FF8ZJ6XNb1qG6lj7Wqais7CXCiu3HVrkv7zVNXI838SFaYy37XjFvfuvdDRR/Fb4/4/5K5f5g0fWmJg+See6ypem8v2qtdnjma3rOiytPnKXacmNfJNt1KKHK0kcwlSjWpLKAZCvHv3XujA2/w/3j/sH7917r1v8AD/eP+wfv3XuvW/w/3j/sH7917r1v8P8AeP8AsH7917r1v8P94/7B+/de6//W397j+o/249+69164/qP9uPfuvdeuP6j/AG49+69164/qP9uPfuvdeuP6j/bj37r3Xrj+o/249+69164/qP8Abj37r3Xrj+o/249+69164/qP9uPfuvdeuP6j/bj37r3Xrj+o/wBuPfuvdeuP6j/bj37r3Xrj+o/249+691//19/S/wDj/vP/AGE9+6916/8Aj/vP/YT37r3Xr/4/7z/2E9+6916/+P8AvP8A2E9+6916/wDj/vP/AGE9+6916/8Aj/vP/YT37r3Xr/4/7z/2E9+6916/+P8AvP8A2E9+6916/wDj/vP/AGE9+6916/8Aj/vP/YT37r3Xr/4/7z/2E9+6916/+P8AvP8A2E9+6916/wDj/vP/AGE9+691/9Df2sf6/wDQ3/R3v3XuvWP9f+hv+jvfuvdesf6/9Df9He/de69Y/wBf+hv+jvfuvdesf6/9Df8AR3v3XuvWP9f+hv8Ao737r3XrH+v/AEN/0d7917r1j/X/AKG' +
            '/6O9+6916x/r/ANDf9He/de69Y/1/6G/6O9+6916x/r/0N/0d7917r1j/AF/6G/6O9+6916x/r/0N/wBHe/de6//R3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9k='


        $scope.openRemoveRequestedJobPage = function () {

            $scope.removeRequestedJobPageOpen = true;

        }
        $scope.closeRemoveRequestedJobPage = function () {

            $scope.removeRequestedJobPageOpen = false;

        }
        $scope.removeClient = function () {

            $scope.loadingRemoveClient = true;

            User.removeUser($scope.currentClientFile).then(function (data) {

                //console.log(data)
                $scope.loadingRemoveClient = false;
                $scope.removeClientSuccessful = true;

                $timeout(function () {

                    $scope.removeClientSuccessful = false;
                    $scope.removeClientPageOpen = false;
                    $scope.openClientList();

                }, 2000)

            })

        }
        $scope.checkSession = function () {

            if (Auth.isLoggedIn()) {

                $scope.checkingSession = true;

                var interval = $interval(function () {
                    ////console.log("test");
                    var timelefttoken = $window.localStorage.getItem('timelefttoken');
                    //console.log(token)
                    if (timelefttoken === null) {

                        $interval.cancel(interval);

                    } else {

                        self.parseJwt = function (token) {

                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                            return JSON.parse($window.atob(base64));

                        }

                        var expireTime = self.parseJwt(timelefttoken);
                        var timeStamp = Math.floor(Date.now() / 1000);// convert javascript date object into a timestamp
                        var timeCheck = expireTime.exp - timeStamp;

                        if (timeCheck == 0) {

                            //console.log("Token has expired...");
                            Auth.logout(); // Open bootstrap modal and let user decide what to do
                            $interval.cancel(interval); // Stop interval

                        }
                        else {
                            
                        }

                    }

                }, 2000);

            }

        };
        $scope.checkSession();
        $scope.openRemoveClientPage = function () {

            if (!$scope.removeClientPageOpen) {

                $scope.removeClientPageOpen = true;
                $scope.clientHomePage = false;
                $scope.adminRequestedJobsPageOpen = false;

            } else {

                $scope.clientHomePage = true;
                $scope.removeClientPageOpen = false;

            }
        }
 
        $scope.openAdminRequestedJobsPage = function () {

            //console.log($scope.locationsArray)

            if (!$scope.adminRequestedJobsPageOpen) {

                $scope.clientHomePage = false;
                $scope.removeClientPageOpen = false;
                $scope.adminRequestedJobsPageOpen = true;

                User.getRequestedJobs($scope.name).then(function (data) {

                    //console.log(data)
                    $scope.requestedJobsArray = data.data.requestedjobs;
                    $scope.pageLimit = 4;
                    $scope.requestedJobsPaginated = [];
                    $scope.requestedJobsForPagination = [];

                    for (var i = 0; i <= $scope.requestedJobsArray.length; i++) {

                        var page = 0;
                        ////console.log($scope.pageLimit, i, $scope.employees.length)
                        //console.log($scope.employees)
                        if (i < $scope.pageLimit) {

                            console.log("its less")

                        }

                        if (i < $scope.requestedJobsArray.length) {

                            console.log("yup,less")

                        }

                        if (i < $scope.pageLimit && i < $scope.requestedJobsArray.length) {//5
                            console.log("HELLO")
                            //console.log($scope.employees[i])
                            //console.log($scope.pageLimit, i, $scope.employees.length)
                            if ($scope.requestedJobsArray[i] && !$scope.requestedJobsArray[i].approved) {

                                $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])
                                console.log(i)
                                console.log("firstCondiation")
                                console.log($scope.pageArray)

                            }

                        } else {

                            console.log("else")
                            $scope.loadingUsers = false;
                            $scope.requestedJobsPaginated.push($scope.requestedJobsForPagination)
                            console.log($scope.requestedJobsPaginated)
                            $scope.requestedJobsForPagination = [];

                            if ($scope.requestedJobsArray[i] !== undefined && !$scope.requestedJobsArray[i].approved) {

                                $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])

                            }

                            $scope.pageLimit = $scope.pageLimit + 4;
                            page++

                        }

                    }

                })

            } else {

                $scope.requestedJobsPageOpen = false;

            }

        }
        $scope.openRequestedJobsPage = function () {

            console.log($scope.locationsArray)

            if (!$scope.requestedJobsPageOpen) {
               
                $scope.fadeIn = false;

                $timeout(function () {

                    $scope.adminHome = false;
                    $scope.requestedJobsPageOpen = true; $scope.addSupervisorPageOpen = false;

                    User.getRequestedJobs($scope.user_id).then(function (data) {

                        console.log(data)
                        $scope.requestedJobsArray = data.data.requestedjobs;
                        $scope.pageLimit = 4;
                        $scope.requestedJobsPaginated = [];
                        $scope.requestedJobsForPagination = [];

                        for (var i = 0; i <= $scope.requestedJobsArray.length; i++) {

                            var page = 0;
  
                            if (i < $scope.pageLimit) {

                                console.log("its less")

                            }
                            if (i < $scope.requestedJobsArray.length) {

                                console.log("yup,less")

                            }
                            if (i < $scope.pageLimit && i < $scope.requestedJobsArray.length) {

                                console.log("HELLO")
        
                                if ($scope.requestedJobsArray[i] && !$scope.requestedJobsArray[i].approved) {

                                    $scope.requestedJobsArray[i].currentIndex = i
                                    $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])
                                    console.log(i)
                                    console.log("firstCondiation")
                                    console.log($scope.pageArray)

                                }

                            } else {

                                console.log("else")
                                $scope.loadingUsers = false;
                                $scope.requestedJobsPaginated.push($scope.requestedJobsForPagination)
                                console.log($scope.requestedJobsPaginated)
                                $scope.requestedJobsForPagination = [];

                                if ($scope.requestedJobsArray[i] !== undefined && !$scope.requestedJobsArray[i].approved) {

                                    $scope.requestedJobsArray[i].currentIndex = i
                                    $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                        console.log("first")
                        console.log($scope.timesheetEntryOpen)

                    })

                }, 500)

            } else {
                $scope.requestedJobsPageOpen = false;
            }






        }
        $scope.openApprovedJobsPage = function () {

            if (!$scope.approvedJobsPageOpen) {

                $scope.fadeIn = false;
                
                $timeout(function () {

                    $scope.adminHome = false;
                    $scope.approvedJobsPageOpen = true;

                    User.getApprovedJobs($scope.name).then(function (data) {

                        console.log(data)
                        $scope.approvedJobsArray = data.data.approvednotbooked;
                        $scope.pageLimit = 4;
                        $scope.approvedJobsPaginated = [];
                        $scope.approvedJobsForPagination = [];

                        for (var i = 0; i <= $scope.approvedJobsArray.length; i++) {

                            var page = 0;
   
                            if (i < $scope.pageLimit) {

                                console.log("its less")

                            }
                            if (i < $scope.approvedJobsArray.length) {

                                console.log("yup,less")
                            }

                            if (i < $scope.pageLimit && i < $scope.approvedJobsArray.length) {

                                console.log("HELLO")
                
                                if ($scope.approvedJobsArray[i] && $scope.approvedJobsArray[i].approved) {

                                    $scope.approvedJobsForPagination.push($scope.approvedJobsArray[i])
                                    console.log(i)
                                    console.log("firstCondiation")
                                    console.log($scope.pageArray)

                                }

                            } else {

                                console.log("else")
                                $scope.loadingUsers = false;
                                $scope.approvedJobsPaginated.push($scope.approvedJobsForPagination)
                                $scope.approvedJobsForPagination = [];

                                if ($scope.approvedJobsArray[i] !== undefined && $scope.approvedJobsArray[i].approved) {

                                    $scope.approvedJobsForPagination.push($scope.approvedJobsArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    })

                }, 500)


            } else {

                $scope.approvedJobsPageOpen = false;
                $scope.adminHome = true;

            }

        }
        $scope.openIndividualApprovedJob = function (index) {

            if ($scope.individualApprovedJobOpen && index !== $scope.approvedIndex) {

                $scope.messageLoading = true;
                $scope.approvedIndex = index;
                console.log("first")
                console.log($scope.timesheetEntryOpen)

            }else if (!$scope.individualApprovedJobOpen && index == $scope.approvedIndex) {

                $scope.individualApprovedJobOpen = true;
                console.log("second")
                console.log($scope.timesheetEntryOpen)

            }
            else if (!$scope.individualApprovedJobOpen && index !== $scope.approvedIndex) {

                console.log("third")
                $scope.individualApprovedJobOpen = true;
                console.log($scope.timesheetEntryOpen)
                $scope.approvedIndex = index;

            } else {

                console.log("last")
                $scope.approvedIndex = null

            }

        }
        $scope.closeTimeSheetComposeMessagePage = function () {

            $scope.timeSheetComposeMessageOpen = false;

        }
        $scope.submitTimeSheetComposeMessage = function (name, date) {

            console.log($scope.timeSheetMessage)

            if ($scope.timeSheetMessage.to == null) {

                $scope.allFieldsMustBeInput = true;

            }
            if ($scope.timeSheetMessage.from == null) {

                $scope.allFieldsMustBeInput = true;

            }
            if ($scope.timeSheetMessage.body == null) {

                $scope.allFieldsMustBeInput = true;

            }
            if ($scope.timeSheetMessage.subject == null) {

                $scope.allFieldsMustBeInput = true;

            }
            if ($scope.timeSheetMessage.body !== null &&
                $scope.timeSheetMessage.to !== null &&
                $scope.timeSheetMessage.from !== null &&
                $scope.timeSheetMessage.subject !== null) {

                console.log($scope.timeSheetMessage)
                $scope.allFieldsMustBeInput = false;
                $scope.timeSheetMessageLoading = true;

                User.sendMessage($scope.timeSheetMessage).then(function (data) {

                    console.log(data)
                    $scope.timeSheetMessageLoading = false;
                    $scope.timeSheetMessageSuccessfullySent = true;

                    $timeout(function () {

                        $scope.timeSheetMessageSuccessfullySent = false;
                        $scope.closeTimeSheetComposeMessagePage()
                        
                    }, 1500)

                })

            }

        }
        $scope.markAsResolved = function (jobData) {

            $scope.resolvingDispute = true;
            console.log(jobData)
            jobData.disputed = false;

            User.changeDisputedTimeSheetToResolved(jobData).then(function (data) {

                console.log(data)
                $scope.disputedTimeSheetsArray = data.data.user.disputedtimesheets
                $scope.disputedTimeSheetsForPagination = [];
                $scope.disputedTimeSheetsPaginated = [];

                for (var i = 0; i <= $scope.disputedTimeSheetsArray.length; i++) {

                    var page = 0;
                    console.log($scope.employees)

                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.disputedTimeSheetsArray.length) {

                        console.log("yup,less")
                    }

                    if (i < $scope.pageLimit && i < $scope.disputedTimeSheetsArray.length) {

                        console.log("HELLO")
 
                        if ($scope.disputedTimeSheetsArray[i]) {

                            $scope.disputedTimeSheetsArray[i].currentIndex = i;
                            $scope.disputedTimeSheetsForPagination.push($scope.disputedTimeSheetsArray[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.pageArray)

                        }

                    } else {

                        console.log("else")
                        $scope.loadingUsers = false;
                        $scope.disputedTimeSheetsPaginated.push($scope.disputedTimeSheetsForPagination)
                        $scope.disputedTimeSheetsForPagination = [];

                        if ($scope.disputedTimeSheetsArray[i] !== undefined) {

                            $scope.disputedTimeSheetsForPagination.push($scope.disputedTimeSheetsArray[i])

                        }

                        $scope.pageLimit = $scope.pageLimit + 4;
                        page++

                    }
                }
            })
        }
        $scope.markAsUnResolved = function (jobData, index) {

            console.log(index)
            console.log(jobData)
            jobData.disputed = true;

            User.changeDisputedTimeSheetToUnResolved(jobData).then(function (data) {

                console.log(data)
                $scope.disputedTimeSheetsArray = data.data.user.disputedtimesheets
                $scope.disputedTimeSheetsForPagination = [];
                $scope.disputedTimeSheetsPaginated = [];

                for (var i = 0; i <= $scope.disputedTimeSheetsArray.length; i++) {

                    var page = 0;
                    console.log($scope.employees)

                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.disputedTimeSheetsArray.length) {

                        console.log("yup,less")
                    }

                    if (i < $scope.pageLimit && i < $scope.disputedTimeSheetsArray.length) {

                        console.log("HELLO")

                        if ($scope.disputedTimeSheetsArray[i]) {

                            $scope.disputedTimeSheetsArray[i].currentIndex = i;
                            $scope.disputedTimeSheetsForPagination.push($scope.disputedTimeSheetsArray[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.pageArray)

                        }

                    } else {

                        console.log("else")
                        $scope.loadingUsers = false;
                        $scope.disputedTimeSheetsPaginated.push($scope.disputedTimeSheetsForPagination)
                        $scope.disputedTimeSheetsForPagination = [];

                        if ($scope.disputedTimeSheetsArray[i] !== undefined) {

                            $scope.disputedTimeSheetsForPagination.push($scope.disputedTimeSheetsArray[i])

                        }

                        $scope.pageLimit = $scope.pageLimit + 4;
                        page++

                    }
                }
            })
        }
        $scope.openTimeSheetComposeMessage = function (name, date) {

            if (!$scope.timeSheetComposeMessageOpen)
            $scope.allFieldsMustBeInput = false;
            $scope.timeSheetComposeMessageOpen = true;
            $scope.sendingFrom = name;
            $scope.disputedDate = date;
            $scope.timeSheetMessage.from = "ohrha harho"
            $scope.timeSheetMessage.to = $scope.sendingFrom
            $scope.timeSheetMessage.subject = "Re:Disputed Time Sheet(" + $scope.disputedDate + ")"

        }
        $scope.openDispute = function (index) {

            if ($scope.disputedTimeSheetOpen && index !== $scope.disputeIndex) {
    
                $scope.disputeIndex = index;
                console.log("first")
                console.log($scope.timesheetEntryOpen)

            }
            else if (!$scope.disputedTimeSheetOpen && index == $scope.disputeIndex) {

                $scope.disputedTimeSheetOpen = true;
                console.log("second")
                console.log($scope.timesheetEntryOpen)

            }
            else if (!$scope.disputedTimeSheetOpen && index !== $scope.disputeIndex) {

                console.log("third")
                $scope.disputedTimeSheetOpen = true;
                console.log($scope.timesheetEntryOpen)
                $scope.disputeIndex = index;

            } else {

                console.log("last")
                $scope.disputeIndex = null

            }

        }
        $scope.openDisputedTimeSheetsPage = function () {

            if (!$scope.disputedTimeSheetsPageOpen) {

                $scope.loadingDisputedTimeSheetsPage = true;

                User.findUser( $rootScope.user_id ).then(function (data) {

                    console.log(data)
                    $scope.disputedTimeSheetsArray = data.data.user[0].disputedtimesheets
                    $scope.fadeIn = false;

                    $timeout(function () {

                        $scope.adminHome = false;
                        $scope.disputedTimeSheetsPageOpen = true;
                        $scope.disputedTimeSheetsForPagination = [];
                        $scope.disputedTimeSheetsPaginated = [];

                        for (var i = 0; i <= $scope.disputedTimeSheetsArray.length; i++) {

                            var page = 0;
                            console.log($scope.employees)

                            if (i < $scope.pageLimit) {

                                console.log("its less")

                            }
                            if (i < $scope.disputedTimeSheetsArray.length) {

                                console.log("yup,less")

                            }
                            if (i < $scope.pageLimit && i < $scope.disputedTimeSheetsArray.length) {

                                console.log("HELLO")
                    
                                if ($scope.disputedTimeSheetsArray[i]) {

                                    $scope.disputedTimeSheetsArray[i].currentIndex = i;
                                    $scope.disputedTimeSheetsForPagination.push($scope.disputedTimeSheetsArray[i])
                                    console.log(i)
                                    console.log("firstCondiation")
                                    console.log($scope.pageArray)

                                }

                            } else {

                                console.log("else")
                                $scope.loadingUsers = false;
                                $scope.disputedTimeSheetsPaginated.push($scope.disputedTimeSheetsForPagination)
                                $scope.loadingDisputedTimeSheetsPage = false;
                                $scope.disputedTimeSheetsForPagination = [];

                                if ($scope.disputedTimeSheetsArray[i] !== undefined) {

                                    $scope.disputedTimeSheetsForPagination.push($scope.disputedTimeSheetsArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    }, 500)
                })
            }
        }
        $scope.openDelinquentInfo = function () {

            if (!$scope.delinquentInfo) {

                $scope.delinquentInfo = true;
                $scope.delinquentTimeSheetInfo = false;

            } else {

                $scope.delinquentInfo = false;

            }

        }
        $scope.openDelinquentTimeSheetInfo = function () {

            if (!$scope.delinquentTimeSheetInfo) {

                $scope.delinquentTimeSheetInfo = true;
                $scope.delinquentInfo = false;

            } else {

                $scope.delinquentTimeSheetInfo = false;

            }

        }
        $scope.openDelinquentTimeSheet = function (index, timesheetData) {

            $('select').material_select();

            if ($scope.delinquentTimeSheetOpen && index !== $scope.delinquentIndex) {

                $scope.delinquentIndex = index;

            }

            else if (!$scope.delinquentTimeSheetOpen && index == $scope.delinquentIndex) {

                $scope.adminMessageOpen = true;
                console.log("second")
                console.log($scope.timesheetEntryOpen)

            }
            else if (!$scope.delinquentTimeSheetOpen && index !== $scope.delinquentIndex) {

                console.log("third")
                $scope.delinquentTimeSheetOpen = true;
                console.log($scope.timesheetEntryOpen)
                $scope.delinquentIndex = index;

            } else {

                console.log("last")
                $scope.delinquentIndex = null
                $scope.delinquentInfo = false;
                $scope.delinquentTimeSheetInfo = false;

            }

        }
        $scope.openMessage = function (index, messageIndex, timesheetData) {

            $('select').material_select();

            if ($scope.adminMessageOpen && index !== $scope.messageIndex) {

                $scope.adminMessageLoading = true;
                $scope.messageIndex = index;
                console.log(messageIndex)

                User.changeMessageToRead($scope.user_id, messageIndex).then(function (data) {

                    console.log(data)
                    $scope.pageLimit = 4;
                    $scope.adminMessagesPaginated = [];
                    $scope.adminMessagesForPagination = [];
                    $scope.adminMessagesArray = data.data.user.comments;

                    for (var i = 0; i <= $scope.adminMessagesArray.length; i++) {

                        var page = 0;

                        if (i < $scope.pageLimit) {

                            console.log("its less")

                        }
                        if (i < $scope.adminMessagesArray.length) {

                            console.log("yup,less")

                        }
                        if (i < $scope.pageLimit && i < $scope.adminMessagesArray.length) {

                            console.log("HELLO")
                         
                            if ($scope.adminMessagesArray[i]) {

                                $scope.adminMessagesArray[i].messageIndex = i
                                $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])
                                console.log(i)
                                console.log("firstCondiation")
                                console.log($scope.pageArray)

                            }

                        } else {

                            console.log("else")
                            $scope.loadingUsers = false;
                            $scope.adminMessagesPaginated.push($scope.adminMessagesForPagination)
                            console.log($scope.adminMessagesPaginated)
                            $scope.adminMessagesForPagination = [];

                            if ($scope.adminMessagesArray[i] !== undefined) {

                                $scope.adminMessagesArray[i].messageIndex = i
                                $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])

                            }

                            $scope.pageLimit = $scope.pageLimit + 4;
                            page++

                        }

                    }

                    $scope.messageLoading = false;

                })

                console.log("first")
                console.log($scope.timesheetEntryOpen)

            }

            else if (!$scope.adminMessageOpen && index == $scope.messageIndex) {

                $scope.adminMessageOpen = true;
                console.log("second")
                console.log($scope.timesheetEntryOpen)
                //$scope.curPeriod = index;

            }
            else if (!$scope.adminMessageOpen && index !== $scope.messageIndex) {

                console.log("third")
                $scope.adminMessageOpen = true;
                console.log($scope.timesheetEntryOpen)
                $scope.messageIndex = index;

            } else {

                console.log("last")
                $scope.messageIndex = null

            }

        }
        $scope.openAdminMessagesPage = function (date, employee, client) {

            //console.log(date, employee, client)

            if (!$scope.adminMessagesPageOpen) {

                $scope.fadeIn = false;

                $timeout(function () {

                    $scope.adminHome = false;
                    $scope.adminMessagesPageOpen = true;
                    $scope.adminMessagesForPagination = [];
                    $scope.adminMessagesPaginated = [];

                    User.getMessages($scope.user_id).then(function (data) {

                        console.log(data)
                        $scope.pageLimit = 4;
                        $scope.adminMessagesArray = data.data.messages;
                        $scope.adminMessagesLoading = false;
                        console.log($scope.adminMessagesArray)
                        
                        for (var i = 0; i <= $scope.adminMessagesArray.length; i++) {

                            var page = 0;
                            console.log($scope.employees)

                            if (i < $scope.pageLimit) {

                                console.log("its less")

                            }
                            if (i < $scope.adminMessagesArray.length) {

                                console.log("yup,less")

                            }
                            if (i < $scope.pageLimit && i < $scope.adminMessagesArray.length) {

                                console.log("HELLO")
                                
                                if ($scope.adminMessagesArray[i]) {

                                    $scope.adminMessagesArray[i].messageIndex = i
                                    $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])
                                    console.log(i)
                                    console.log("firstCondiation")
                                    console.log($scope.pageArray)

                                }

                            } else {

                                console.log("else")
                                $scope.loadingUsers = false;
                                $scope.adminMessagesPaginated.push($scope.adminMessagesForPagination)
                                console.log($scope.adminMessagesPaginated)
                                $scope.adminMessagesForPagination = [];

                                if ($scope.adminMessagesArray[i] !== undefined) {

                                    $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                        console.log("Admin Messages Paginated", $scope.adminMessagesPaginated)

                    })

                }, 500)

            } else {

                $scope.adminMessagesPage = false;
                $scope.adminHome = true

            }

        }
        $scope.markAsUnread = function (index, messageindex) {

            $scope.messageLoading = true;
            $scope.currentIndex = index;
            $scope.messageIndex = messageindex
            console.log(messageindex)

            User.changeMessageToUnRead($scope.user_id, $scope.messageIndex).then(function (data) {

                console.log(data)
                $scope.pageLimit = 4;
                $scope.adminMessagesPaginated = [];
                $scope.adminMessagesForPagination = [];
                $scope.adminMessagesArray = data.data.user.comments;

                for (var i = 0; i <= $scope.adminMessagesArray.length; i++) {

                    var page = 0;
                    console.log($scope.employees)

                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.adminMessagesArray.length) {

                        console.log("yup,less")

                    }
                    if (i < $scope.pageLimit && i < $scope.adminMessagesArray.length) {

                        console.log("HELLO")
                        
                        if ($scope.adminMessagesArray[i]) {

                            $scope.adminMessagesArray[i].messageIndex = i
                            $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.pageArray)

                        }

                    } else {

                        console.log("else")
                        $scope.loadingUsers = false;
                        $scope.adminMessagesPaginated.push($scope.adminMessagesForPagination)
                        console.log($scope.messagesPaginated)
                        $scope.adminMessagesForPagination = [];

                        if ($scope.adminMessagesArray[i] !== undefined) {

                            $scope.adminMessagesArray[i].messageIndex = i
                            $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])

                        }

                        $scope.pageLimit = $scope.pageLimit + 4;
                        page++

                    }

                }

                $scope.messageLoading = false;
                $scope.messageIndex = null
                $scope.currentIndex = null;

            })

        }
        $scope.timeSheetMessage = {

            to: "ohrha harho",
            from: $scope.name,
            subject: null,
            body: null

        }
        $scope.openMessageAdminPage = function (date, employee, client) {

            console.log(date, employee, client)
            $scope.sendingDate = date;

            if (employee !== undefined) {

                $scope.timeSheetMessage.to = employee

            }
            if (client !== undefined) {

                $scope.timeSheetMessage.to = client

            }

            $scope.timeSheetMessage.subject = "Disputed Time Sheet(" + $scope.sendingDate + ")"

            if (!$scope.messageAdminPageOpen) {

                $scope.messageAdminPageOpen = true;

            }

        }
        $scope.submitTimeSheetMessage = function () {

            $scope.messageAdminPageOpen = false;
            $scope.allFieldsMustBeInput = false;

            if ($scope.timeSheetMessage.body == null) {

                $scope.allFieldsMustBeInput = true;

            } else {

                $scope.submitAdminMessageLoading = true;

                User.sendMessage($scope.timeSheetMessage).then(function (data) {

                    console.log(data)
                    $scope.submitAdminMessageLoading = false;
                    $scope.submitAdminMessageSuccessfullySent = true;

                    $timeout(function () {

                        $scope.submitAdminMessageSuccessfullySent = false;
                        $scope.timeSheetMessage = {
                            to: "ohrha harho",
                            from: $scope.name,
                            subject: null,
                            body: null
                        }
                        $scope.closeMessageAdminPage()

                    }, 2000)

                })

            }

        }
        User.getAdmin().then(function (data) {

            console.log(data)
            $scope.countData = {}
            $scope.countData.index = $scope.day
            $scope.countData.countData = data.data.user.approvednotbooked.length
            $scope.countData.reqData = data.data.user.requestedjobs.length
            $scope.userPayPeriod = data.data.user.payperiodnum
            console.log($scope.userPayPeriod, "$scope.userPayPeriod")

            if ($scope.month == 1) {

                if ($scope.dateNow == 1 || 2 || 3 || 4 || 5 || 6 || 7) {

                    $rootScope.payPeriod = 1;
                    //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 8 || 9 || 10 || 11 || 12 || 13 || 14) {

                    $rootScope.payPeriod = 2;
                    //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 15 || 16 || 17 || 18 || 19 || 20 || 21) {

                    $rootScope.payPeriod = 3;
                    //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 22 || 23 || 24 || 25 || 26 || 27 || 28) {

                    $rootScope.payPeriod = 4;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

                if ($scope.dateNow == 29 || 30 || 31) {

                    $rootScope.payPeriod = 5;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

            }
            if ($scope.month == 2) {

                if ($scope.dateNow == 1 || 2 || 3 || 4) {

                    $rootScope.payPeriod = 5;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 5 || 6 || 7 || 8 || 9 || 10 || 11) {

                    $rootScope.payPeriod = 6;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 12 || 13 || 14 || 15 || 16 || 17 || 18) {

                    $rootScope.payPeriod = 7;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 19 || 20 || 21 || 22 || 23 || 24 || 25) {

                    $rootScope.payPeriod = 8;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 26 || 27 || 28) {

                    $rootScope.payPeriod = 9;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

            }
            if ($scope.month == 3) {

                if ($scope.dateNow == 1 || 2 || 3 || 4) {

                    $rootScope.payPeriod = 9;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 5 || 6 || 7 || 8 || 9 || 10 || 11) {

                    $rootScope.payPeriod = 10;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 12 || 13 || 14 || 15 || 16 || 17 || 18) {

                    $rootScope.payPeriod = 11;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 19 || 20 || 21 || 22 || 23 || 24 || 25) {

                    $rootScope.payPeriod = 12;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 26 || 27 || 28 || 29 || 30 || 31) {

                    $rootScope.payPeriod = 13;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

            }
            if ($scope.month == 4) {

                if ($scope.dateNow == 1) {

                    $rootScope.payPeriod = 13;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 2 || 3 || 4 || 5 || 6 || 7 || 8) {

                    $rootScope.payPeriod = 14;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 9 || 10 || 11 || 12 || 13 || 14 || 15) {

                    $rootScope.payPeriod = 15;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 16 || 17 || 18 || 19 || 20 || 21 || 22) {

                    $rootScope.payPeriod = 16;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 24 || 25 || 26 || 27 || 28 || 29 || 30) {

                    $rootScope.payPeriod = 18;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

            }
            if ($scope.month == 5) {

                if ($scope.dateNow == 1 || 2 || 3 || 4 || 5 || 6 || 7) {

                    $rootScope.payPeriod = 19;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 8 || 9 || 10 || 11 || 12 || 13 || 14) {

                    $rootScope.payPeriod = 20;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 15 || 16 || 17 || 18 || 19 || 20 || 21) {

                    $rootScope.payPeriod = 21;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 22 || 23 || 24 || 25 || 26 || 27 || 28) {

                    $rootScope.payPeriod = 22;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 28 || 29 || 30 || 31) {

                    $rootScope.payPeriod = 1;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

            }
            if ($scope.month == 6) {

                if ($scope.dateNow == 1 || $scope.dateNow == 2 || $scope.dateNow == 3) {

                    $rootScope.payPeriod = 1;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 4 || $scope.dateNow == 5 || $scope.dateNow == 6 || $scope.dateNow == 7 || $scope.dateNow == 8 || $scope.dateNow == 9 || $scope.dateNow == 10) {

                    $rootScope.payPeriod = 2;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                  
                }
                if ($scope.dateNow == 11 || $scope.dateNow == 12 || $scope.dateNow == 13 || $scope.dateNow == 14 || $scope.dateNow == 15 || $scope.dateNow == 16 || $scope.dateNow == 17) {

                    $rootScope.payPeriod = 3;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;

                }
                if ($scope.dateNow == 18 || $scope.dateNow == 19 || $scope.dateNow == 20 || $scope.dateNow == 21 || $scope.dateNow == 22 || $scope.dateNow == 23 || $scope.dateNow == 24) {

                    $scope.newPPObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    $rootScope.payPeriod = 4;

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        User.getUsers().then(function (data) {

                            for (var i = 0; i < data.data.users.length; i++) {


                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name
                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name

                            }

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                console.log(data)
                                $scope.addPayPeriodToPayPeriodHistory();

                            })

                        })


                    } else {

                        console.log("Pay Periods Match")

                    }

                }
                if ($scope.dateNow == 25 || $scope.dateNow == 26 || $scope.dateNow == 27 || $scope.dateNow == 28 || $scope.dateNow == 39 || $scope.dateNow == 30) {

                    $rootScope.payPeriod = 5;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                    $scope.newPPObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {

                            for (var i = 0; i < data.data.users.length; i++) {


                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                console.log(data)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })


                    } else {

                        console.log("Pay Periods Match")

                    }



                }
            }
            if ($scope.month == 7) {

                if ($scope.dateNow == 1) {

                    $rootScope.payPeriod = 5;
                    $scope.newPPObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                        
                        User.getUsers().then(function (data) {

                            for (var i = 0; i < data.data.users.length; i++) {


                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name
                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                console.log(data)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })

                        })

                    } else {

                        console.log("Pay Periods Match")

                    }


                }
                if ($scope.dateNow == 2 || $scope.dateNow == 3 || $scope.dateNow == 4 || $scope.dateNow == 5 || $scope.dateNow == 6 || $scope.dateNow == 7 || $scope.dateNow == 8) {

                    $rootScope.payPeriod = 6;
                    console.log($scope.dateNow)
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    //console.log("$rootScope.userPayPeriod", $rootScope.userPayPeriod)

                    $scope.newPPObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;


                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.newPayPeriodLoading = true;
                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {

                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }

                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })


                    } else {

                        console.log("Pay Periods Match")

                    }



                }
                if ($scope.dateNow == 9 || $scope.dateNow == 10 || $scope.dateNow == 11 || $scope.dateNow == 12 || $scope.dateNow == 13 || $scope.dateNow == 14 || $scope.dateNow == 15) {

                    $rootScope.payPeriod = 7;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    /*
                    
                                                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                                                        $scope.loadingNewPayPeriod = true;
                                                        $scope.userPayPeriod = $rootScope.payPeriod
                                                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                                                        User.getUsers().then(function (data) {
                                                            
                    
                                                            for (var i = 0; i < data.data.users.length; i++) {
                    
                                                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                                                    name: data.data.users[i].name
                                                                }
                                                               
                    
                    
                                                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                                                $scope.newPayPeriodHistoryEntry = {
                                                                    entry: data.data.users[i].jobDetails
                                                                }
                    
                                                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                                                $scope.newPPObject.currentusername = data.data.users[i].name
                    
                                                                $scope.currentusernameArray.push(data.data.users[i].name)
                                                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name
                    
                    
                                                            }
                    
                                                             //This works..//
                                                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function(data){
                    
                                                            })
                                                            //This works..//
                    
                                                          /*  User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                                                $scope.loadingAddToWorkHistory = true;
                                                                console.log(data)
                                                                console.log($scope.newPayPeriodHistoryEntry)
                                                                $scope.addPayPeriodToPayPeriodHistory();
                    
                    
                                                            })*/
                    /*  })


                  } else {

                      console.log("Pay Periods Match")

                  }

*/
                }
                if ($scope.dateNow == 16 || $scope.dateNow == 17 || $scope.dateNow == 18 || $scope.dateNow == 19 || $scope.dateNow == 20 || $scope.dateNow == 21 || $scope.dateNow == 22) {

                    $rootScope.payPeriod = 1;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    // $scope.newPPObject.newpayperiod = $rootScope.payPeriod;


                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })


                    } else {

                        console.log("Pay Periods Match")

                    }



                }
                if ($scope.dateNow == 23 || $scope.dateNow == 24 || $scope.dateNow == 25 || $scope.dateNow == 26 || $scope.dateNow == 27 || $scope.dateNow == 28 || $scope.dateNow == 29) {

                    $rootScope.payPeriod = 2;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;


                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })


                    } else {

                        console.log("Pay Periods Match")

                    }


                }
                if ($scope.dateNow == 30 || $scope.dateNow == 31) {

                    $rootScope.payPeriod = 3;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;


                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = 2
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })


                    } else {

                        console.log("Pay Periods Match")

                    }

                }
            }
            if ($scope.month == 8) {

                if ($scope.dateNow == 1 || $scope.dateNow == 2 || $scope.dateNow == 3 || $scope.dateNow == 4 || $scope.dateNow == 5) {

                    $rootScope.payPeriod = 3;
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }
                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {

                                    entry: data.data.users[i].jobDetails

                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name
                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name

                            }

                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })

                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();

                            })

                        })


                    } else {

                        console.log("Pay Periods Match")

                    }

                }
                if ($scope.dateNow == 6 || $scope.dateNow == 7 || $scope.dateNow == 8 || $scope.dateNow == 9 || $scope.dateNow == 10 || $scope.dateNow == 11 || $scope.dateNow == 12) {

                    $rootScope.payPeriod = 4;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })

                }
                
                     else {

                        console.log("Pay Periods Match")

                    }
                }
                if ($scope.dateNow == 13 || $scope.dateNow == 14 || $scope.dateNow == 15 || $scope.dateNow == 16 || $scope.dateNow == 17 || $scope.dateNow == 18 || $scope.dateNow == 19) {

                     $rootScope.payPeriod = 5;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })

                }
                
                     else {

                        console.log("Pay Periods Match")

                    }

                }
                if ($scope.dateNow == 20 || $scope.dateNow == 21 || $scope.dateNow == 22 || $scope.dateNow == 23 || $scope.dateNow == 24 || $scope.dateNow == 25 || $scope.dateNow == 26) {

                   
                    $rootScope.payPeriod = 6;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })

                }
                
                     else {

                        console.log("Pay Periods Match")

                    }

                }
                if ($scope.dateNow == 27 || $scope.dateNow == 28 || $scope.dateNow == 29 || $scope.dateNow == 30 || $scope.dateNow == 31) {

                  
                    $rootScope.payPeriod = 7;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        //$scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })

                }
                
                     else {

                        console.log("Pay Periods Match")

                    }

                }
            }
            if ($scope.month == 9) {

                if ($scope.dateNow == 1 || $scope.dateNow == 2) {

                    $rootScope.payPeriod = 7;
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                        $scope.loadingNewPayPeriod = true;

                        User.getUsers().then(function (data) {

                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }

                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                
                                $scope.newPayPeriodHistoryEntry = {

                                    entry: data.data.users[i].jobDetails

                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = $scope.userPayPeriod
                                $scope.newPPObject.currentusername = data.data.users[i].name
                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name

                            }

                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)

                            //This works..//

                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })

                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();

                            })

                        })

                }
                else {

                        console.log("Pay Periods Match")

                    }

                }
                if ($scope.dateNow == 3 || $scope.dateNow == 4 || $scope.dateNow == 5 || $scope.dateNow == 6 || $scope.dateNow == 7 || $scope.dateNow == 8 ||$scope.dateNow == 9) {

                 
                    $rootScope.payPeriod =8;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = 6
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })

                }
                
                     else {

                        console.log("Pay Periods Match")

                    }

                }
                if ($scope.dateNow == 10 ||$scope.dateNow == 11 ||$scope.dateNow == 12 ||$scope.dateNow == 13 ||$scope.dateNow == 14 || $scope.dateNow ==15 || $scope.dateNow ==16) {

                  
                    $rootScope.payPeriod =9;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = 7
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })

                }
                
                     else {

                        console.log("Pay Periods Match")

                    }


                }
                if ($scope.dateNow == 17 ||$scope.dateNow == 18 || $scope.dateNow ==19 ||$scope.dateNow == 20 || $scope.dateNow ==21 ||$scope.dateNow == 22 ||$scope.dateNow == 23) {

                    $rootScope.payPeriod = 18;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)


                }
                if ($scope.dateNow == 24 || $scope.dateNow == 25 || $scope.dateNow ==26 ||$scope.dateNow == 27 ||$scope.dateNow == 28 ||$scope.dateNow == 29 ||$scope.dateNow == 30) {

                    $rootScope.payPeriod = 19;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)


                }
            }
            if ($scope.month == 10) {

                if ($scope.dateNow == 1 || $scope.dateNow == 2 || $scope.dateNow == 3 || $scope.dateNow == 4 || $scope.dateNow == 5 || $scope.dateNow == 6 || $scope.dateNow == 7) {

                    $rootScope.payPeriod =10;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                        $scope.loadingNewPayPeriod = true;
                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)

                        User.getUsers().then(function (data) {

                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {

                                    name: data.data.users[i].name

                                }

                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                
                                $scope.newPayPeriodHistoryEntry = {

                                    entry: data.data.users[i].jobDetails

                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = 7
                                $scope.newPPObject.currentusername = data.data.users[i].name
                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name

                            }

                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)

                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();

                            })

                        })

                }
                
                     else {

                        console.log("Pay Periods Match")

                    }


                }
                if ($scope.dateNow == 8 || 9 || 10 || 11 || 12 || 13 || 14) {

                   // $rootScope.payPeriod = 21;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)


                }
                if ($scope.dateNow == 15 || $scope.dateNow == 16 || $scope.dateNow ==17 ||$scope.dateNow == 18 ||$scope.dateNow == 19 ||$scope.dateNow == 20 ||$scope.dateNow == 21) {

                  //  $rootScope.payPeriod = 22;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    
                  
                    $rootScope.payPeriod =11;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                    $scope.newPPObject = {}
                    $scope.newDeliquentObject = {}
                    $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                    console.log("$rootScope.userPayPeriod", $scope.userPayPeriod)

                    if ($scope.userPayPeriod !== $rootScope.payPeriod) {
                        $scope.loadingNewPayPeriod = true;
                        $scope.userPayPeriod = $rootScope.payPeriod
                        console.log("$rootScope.payPeriod2", $rootScope.payPeriod)
                        User.getUsers().then(function (data) {


                            for (var i = 0; i < data.data.users.length; i++) {

                                $scope.nameObjectForNewPayPeriodHistoryEntry = {
                                    name: data.data.users[i].name
                                }



                                data.data.users[i].jobDetails.push($scope.nameObjectForNewPayPeriodHistoryEntry)
                                $scope.newPayPeriodHistoryEntry = {
                                    entry: data.data.users[i].jobDetails
                                }

                                $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                $scope.newPPObject.oldpayperiod = 7
                                $scope.newPPObject.currentusername = data.data.users[i].name

                                $scope.currentusernameArray.push(data.data.users[i].name)
                                $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                            }
                            console.log("I'm heeeeer")
                            console.log($scope.newPPObject)
                            //This works..//
                            User.checkAndAddDelinquentTimeSheet($scope.newPPObject).then(function (data) {

                            })
                            //This works..//

                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                $scope.loadingAddToWorkHistory = true;
                                console.log(data)
                                console.log($scope.newPayPeriodHistoryEntry)
                                $scope.addPayPeriodToPayPeriodHistory();


                            })
                        })



                }
                }
                if ($scope.dateNow == 22 || 23 || 24 || 25 || 26 || 27 || 28) {

                   // $rootScope.payPeriod = 23;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)


                }
                if ($scope.dateNow == 29 || 30 || 31) {

                    //$rootScope.payPeriod = 24;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)


                }
            }
            if ($scope.month == 11) {

                if ($scope.dateNow == 1 || 2 || 3 || 4) {

                    $rootScope.payPeriod = 24;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 5 || 6 || 7 || 8 || 9 || 10 || 11) {

                    $rootScope.payPeriod = 25;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)


                }
                if ($scope.dateNow == 12 || 13 || 14 || 15 || 16 || 17 || 18) {

                    $rootScope.payPeriod = 26;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 19 || 20 || 21 || 22 || 23 || 24 || 25) {

                    $rootScope.payPeriod = 27;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 26 || 27 || 28 || 29 || 30) {

                    $rootScope.payPeriod = 28;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

            }
            if ($scope.month == 12) {

                if ($scope.dateNow == 1 || 2) {

                    $rootScope.payPeriod = 29;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 3 || 4 || 5 || 6 || 7 || 8 || 9) {

                    $rootScope.payPeriod = 30;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 10 || 11 || 12 || 13 || 14 || 15 || 16) {

                    $rootScope.payPeriod = 31;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 17 || 18 || 19 || 20 || 21 || 22 || 23) {

                    $rootScope.payPeriod = 32;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }
                if ($scope.dateNow == 24 || 25 || 26 || 27 || 28 || 29 || 30) {

                    $rootScope.payPeriod = 33;
                    console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                }

            }

            User.addApprovedJobsToJobCountArray($scope.countData).then(function (data) {

                console.log(data)
                $scope.dataMetrics[0] = data.data.user.jobcount
                $scope.dataMetrics[1] = data.data.user.reqjobcount
                $scope.dataMetrics = [
                    [5, 2, 4, 81, 89, 55, 10],
                    [5, 2, 4, 19, 86, 27, 90]
                ];

            })
       
        })
        $scope.openMessagePage = function () {

            if ($scope.messagePageOpen) {

                $scope.messagePageOpen = false;
                $scope.messagePageSelected = false;

            } else {

                $scope.messagePageOpen = true;
                $scope.messagePageSelected = true;
                $scope.composeMessagePageOpen = false;
                $scope.bookedJobsPageOpened = false;
                $scope.bookedJobsSelected = false;
                $scope.jobsPageOpen = true;
                $scope.timesheetsPageOpen = false;
                $scope.notesPageOpen = false;
                $scope.chartsPageOpen = false;
                $scope.historyPageOpenProfile = false;
                $scope.messagesLoading = true;
                $scope.currentIndex = null;
                $scope.messagesPaginated = [];
                $scope.messageForPagination = [];
                $scope.pageLimit = 4;

                User.getMessages($scope.currentUserId).then(function (data) {

                    console.log(data)
                    $scope.messagesArray = data.data.messages;
                    $scope.messagesLoading = false;

                    for (var i = 0; i <= $scope.messagesArray.length; i++) {

                        var page = 0;
                        //console.log($scope.employees)

                        if (i < $scope.pageLimit) {

                            //console.log("its less")

                        }
                        if (i < $scope.messagesArray.length) {

                            //console.log("yup,less")

                        }
                        if (i < $scope.pageLimit && i < $scope.messagesArray.length) {

                            //console.log("HELLO")
                          
                            if ($scope.messagesArray[i]) {

                                $scope.messageForPagination.push($scope.messagesArray[i])
                                //console.log(i)
                                //console.log("firstCondiation")
                                //console.log($scope.pageArray)

                            }

                        } else {

                            if (!$scope.usersLoaded) {

                                //console.log("else")
                                $scope.loadingUsers = false;
                                $scope.messagesPaginated.push($scope.messageForPagination)
                                $scope.messageForPagination = [];

                                if ($scope.messagesArray[i] !== undefined) {

                                    $scope.messageForPagination.push($scope.messagesArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    }

                })

            }

        }
        $scope.closeMessageAdminPage = function () {

            $scope.allFieldsMustBeInput = false;
            $scope.messageAdminPageOpen = false

        }
        $scope.closeAddHoursPage = function () {

            $scope.addHoursPageOpen = false;

        }
        $scope.openAddHoursPage = function () {

            $('select').material_select();
            if (!$scope.addHoursPageOpen) {

                $scope.addHoursPageOpen = true;

            }

        }
        $scope.openAddHoursPageDelinquent = function () {

            $('select').material_select();
            if (!$scope.addHoursDelinquentPageOpen) {

                $scope.addHoursDelinquentPageOpen = true;

            }

        }
        
        $scope.submitHoursDelinquent = function (index, client, location, currentuser, page, payperiodindex) {
            
            console.log(page)
            $scope.allFieldsMustBeInput = false
            $scope.timeData.payperiodhistoryindex = payperiodindex
            $scope.timeData.payperiodnum = $scope.globalPayPeriodIndexATM
            $scope.timeData.currentuser = currentuser
            $scope.timeData.location = location
            $scope.timeData.client = client;
            $scope.timeData.disputed = false;
            $scope.timeData.delinquent = false;

            if ($scope.timeData.ampmIn == null ||
                $scope.timeData.ampmOut == null ||
                $scope.timeData.hoursIn == null ||
                $scope.timeData.hoursOut == null ||
                $scope.timeData.minutesIn == null ||
                $scope.timeData.minutesOut == null) {
                $scope.allFieldsMustBeInput = true;
                console.log("Hello")
            }
            if ($scope.timeData.ampmIn !== null &&
                $scope.timeData.ampmOut !== null &&
                $scope.timeData.hoursIn !== null &&
                $scope.timeData.hoursOut !== null &&
                $scope.timeData.minutesIn !== null &&
                $scope.timeData.minutesOut !== null) {

                $scope.loadingAddDelinquentTimeSheet = true;
                $scope.timeData.currentjobindate = $scope.currentJobInDate
                $scope.timeData.index = index;
                $scope.timeData.sentFromDelinquent = true;
                $scope.timeData.page = page
                $scope.timeData.date = page.date
                $scope.timein = $scope.timeData.hoursIn + ":" + $scope.timeData.minutesIn + $scope.timeData.ampmIn
                $scope.timeout = $scope.timeData.hoursOut + ":" + $scope.timeData.minutesOut + $scope.timeData.ampmOut
                $scope.timeData.timein = $scope.timein;
                $scope.timeData.timeout = $scope.timeout
                $scope.timeData.client = client
                var startTime = moment($scope.timein, "HH:mm:ss a");
                var endTime = moment($scope.timeout, "HH:mm:ss a");
                var duration = moment.duration(endTime.diff(startTime));
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) - hours * 60;
                var hoursPositive = 0;
                var minsPositive = 0;
                var hoursDif = 0;
                console.log(startTime)
                console.log(hours)
                console.log(minutes)
                console.log($scope.timeData.client)
                console.log($scope.timein)
                console.log($scope.timeout)

                if (minutes == 0 && $scope.timeData.lunch == "Yes") {

                    minutes = 30
                    hours = hours - 1

                    if (minutes == 30) {

                        hours = hours + .5

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12.5 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)
                            hours = (hours - 1) + .5

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }

                    console.log("first condition")

                }
                else if (minutes == 15 && $scope.timeData.lunch == "Yes") {

                    minutes = 45
                    hours = hours - 1

                    if (minutes == 45) {

                        hours = hours + .75
                        $scope.timeData.hoursCalculated = hours;

                    }

                    console.log("second condition")

                }
                else if (minutes == 30 && $scope.timeData.lunch == "Yes") {

                    minutes = 0;

                    if (minutes == 0) {

                        $scope.timeData.hoursCalculated = hours;

                    }

                    console.log("third condition")
                }
                else if (minutes == 45 && $scope.timeData.lunch == "Yes") {

                    minutes = 15;

                    if (minutes == 15) {

                        hours = hours + .25
                        $scope.timeData.hoursCalculated = hours;

                    }

                    console.log("fourth condition")

                } else {

                    /* NO LUNCH */

                    console.log("NO LUNCH")

                    if (minutes == 15) {

                        console.log("Minutes == 15")
                        hours = hours + .25
                        console.log("Hours", hours)

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)
                            //hours= (hours-1)+.5

                        }
                        if (hours == 0) {

                            hours = 24

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }

                    if (minutes == 30) {

                        hours = hours + .5

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)
                            //hours= (hours-1)+.5
                        }
                        if (hours == 0) {

                            hours = 24

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }
                    if (minutes == 45) {

                        hours = hours + .75

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)
                            //hours= (hours-1)+.5

                        }
                        if (hours == 0) {

                            hours = 24

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }
                    if (minutes == 00) {

                        console.log("No lunch mins 00")

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)
                            //hours= (hours-1)+.5

                        }
                        if (hours == 0) {

                            hours = 24

                        }

                        $scope.timeData.hoursCalculated = hours;
                        console.log($scope.timeData.hoursCalculated)

                    }
                    if (Math.sign(minutes) == -1) {

                        minsPositive = Math.abs(minutes)

                        if (minsPositive == 15) {

                            console.log("Minutes == 15")
                            hours = hours - .25
                            console.log("Hours", hours)

                            if (Math.sign(hours) == -1) {

                                console.log("negative")
                                console.log(hours * -2)
                                console.log(hours)
                                hoursPositive = Math.abs(hours)
                                console.log(hoursPositive)
                                hoursDif = (12 - hoursPositive)
                                console.log("hoursDif", hoursDif)
                                hours = hoursDif + 12
                                console.log(hours)
                                //hours= (hours-1)+.5

                            }
                            if (hours == 0) {

                                hours = 24

                            }

                            $scope.timeData.hoursCalculated = hours;

                        }
                        if (minsPositive == 30) {

                            console.log("Minutes == 30")
                            hours = hours - .5
                            console.log("Hours", hours)

                            if (Math.sign(hours) == -1) {

                                console.log("negative")
                                console.log(hours * -2)
                                console.log(hours)
                                hoursPositive = Math.abs(hours)
                                console.log(hoursPositive)
                                hoursDif = (12 - hoursPositive)
                                console.log("hoursDif", hoursDif)
                                hours = hoursDif + 12
                                console.log(hours)
                                //hours= (hours-1)+.5

                            }
                            if (hours == 0) {

                                hours = 24

                            }

                            $scope.timeData.hoursCalculated = hours;

                        }
                        if (minsPositive == 45) {

                            console.log("Minutes == 45")
                            hours = hours - .75
                            console.log("Hours", hours)

                            if (Math.sign(hours) == -1) {

                                console.log("negative")
                                console.log(hours * -2)
                                console.log(hours)
                                hoursPositive = Math.abs(hours)
                                console.log(hoursPositive)
                                hoursDif = (12 - hoursPositive)
                                console.log("hoursDif", hoursDif)
                                hours = hoursDif + 12
                                console.log(hours)
                                //hours= (hours-1)+.5

                            }
                            if (hours == 0) {

                                hours = 24

                            }

                            $scope.timeData.hoursCalculated = hours;

                        }

                    }

                }
                //console.log($scope.timeData.hoursCalculated)
                User.addHoursToPayPeriod($scope.timeData).then(function (data) {

                    console.log(data)
                    $scope.loadingAddDelinquentTimeSheet = false;
                    $scope.timesheetPageOpen = false;
                    $scope.delinquentInfo = false;

                    User.getUsers().then(function (data) {

                        for (var i = 0; i < data.data.users.length; i++) {

                            if (data.data.users[i].userclass == "employee" && data.data.users[i].delinquenttimesheets.length > 0){
                                
                                $scope.delinquentTimeSheetArray.push(data.data.users[i].delinquenttimesheets)

                            }

                        for (var z = 0; z < $scope.delinquentTimeSheetArray.length; z++) {

                            for (var d = 0; d < $scope.delinquentTimeSheetArray[z].length; d++) {

                                for (var s = 0; s < $scope.delinquentTimeSheetArray[z].length; s++) {

                                    if ($scope.delinquentTimeSheetArray[z][d][s]) {

                                        $scope.delinquentTimeSheetsArray.push($scope.delinquentTimeSheetArray[z][d][s])
                                        console.log("DELINQUENT TIME SHEET ARRAY", $scope.delinquentTimeSheetArray[z][d][s])
                                    
                                    }

                                }

                            }
                        }

                    }

                    $scope.delinquentTimeSheetsForPagination = [];
                    $scope.delinquentTimeSheetsPaginated = [];
                    $scope.pageLimit = 4

                for (var i = 0; i <= $scope.delinquentTimeSheetsArray.length; i++) {

                    var page = 0;

                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.delinquentTimeSheetsArray.length) {

                        console.log("yup,less")
                    }

                    if (i < $scope.pageLimit && i < $scope.delinquentTimeSheetsArray.length) {

                        console.log("HELLO")
             
                        if ($scope.delinquentTimeSheetsArray[i]) {

                            $scope.delinquentTimeSheetsForPagination.push($scope.delinquentTimeSheetsArray[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.delinquentTimeSheetsArray[i])

                        }

                    } else {

                        console.log("else")
                        $scope.loadingUsers = false;
                        console.log($scope.delinquentTimeSheetsForPagination)
                        $scope.delinquentTimeSheetsPaginated.push($scope.delinquentTimeSheetsForPagination)
                        console.log($scope.delinquentTimeSheetsPaginated)
                        $scope.delinquentTimeSheetsForPagination = [];

                        if ($scope.delinquentTimeSheetsArray[i] !== undefined) {

                            $scope.delinquentTimeSheetsForPagination.push($scope.delinquentTimeSheetsArray[i])
                            console.log("not undefined")

                        }
                        $scope.pageLimit = $scope.pageLimit + 4;
                        page++  

                    }

                }
                $scope.loadingAddDelinquentTimeSheet = false;
                $scope.timesheetPageOpen = false;
                $scope.delinquentInfo = false;

                })

            })
        console.log(hours)
        console.log(minutes)
        }
            console.log(index)
console.log($scope.currentJobInDate)
        }


    $scope.submitHours = function (index, client, location, currentuser, page) {

        console.log(index)
        $scope.allFieldsMustBeInput = false
        $scope.timeData.payperiodhistoryindex = index
        $scope.timeData.currentuser = $scope.currentUserHistoryFile
        $scope.timeData.payperiodnum = $scope.globalPayPeriodIndexATM
        $scope.timeData.location = location
        $scope.timeData.page = page
        $scope.timeData.currentuser = currentuser
        $scope.timeData.disputed = false;

        if ($scope.timeData.ampmIn == null ||
            $scope.timeData.ampmOut == null ||
            $scope.timeData.hoursIn == null ||
            $scope.timeData.hoursOut == null ||
            $scope.timeData.minutesIn == null ||
            $scope.timeData.minutesOut == null) {

            $scope.allFieldsMustBeInput = true;
            console.log("Hello")

        }
        if ($scope.timeData.ampmIn !== null &&
            $scope.timeData.ampmOut !== null &&
            $scope.timeData.hoursIn !== null &&
            $scope.timeData.hoursOut !== null &&
            $scope.timeData.minutesIn !== null &&
            $scope.timeData.minutesOut !== null) {

            $scope.submitHoursLoading = true;
            $scope.timeData.currentjobindate = $scope.currentJobInDate
            $scope.timeData.index = index;
            console.log($scope.timeData)
            $scope.timein = $scope.timeData.hoursIn + ":" + $scope.timeData.minutesIn + $scope.timeData.ampmIn
            $scope.timeout = $scope.timeData.hoursOut + ":" + $scope.timeData.minutesOut + $scope.timeData.ampmOut
            $scope.timeData.timein = $scope.timein;
            $scope.timeData.timeout = $scope.timeout
            $scope.timeData.client = client
            console.log($scope.timeData.client)
            console.log($scope.timein)
            console.log($scope.timeout)
            var startTime = moment($scope.timein, "HH:mm:ss a");
            console.log(startTime)
            var endTime = moment($scope.timeout, "HH:mm:ss a");
            var duration = moment.duration(endTime.diff(startTime));
            var hours = parseInt(duration.asHours());
            var minutes = parseInt(duration.asMinutes()) - hours * 60;
            var hoursPositive = 0;
            var minsPositive = 0;
            var hoursDif = 0;
            console.log(hours)
            console.log(minutes)

            if (minutes == 0 && $scope.timeData.lunch == "Yes") {

                minutes = 30
                hours = hours - 1

                if (minutes == 30) {

                    hours = hours + .5

                    if (Math.sign(hours) == -1) {

                        console.log("negative")
                        console.log(hours * -2)
                        console.log(hours)
                        hoursPositive = Math.abs(hours)
                        console.log(hoursPositive)
                        hoursDif = (12.5 - hoursPositive)
                        console.log("hoursDif", hoursDif)
                        hours = hoursDif + 12
                        console.log(hours)
                        hours = (hours - 1) + .5

                    }

                    $scope.timeData.hoursCalculated = hours;

                }

                console.log("first condition")

            }
            else if (minutes == 15 && $scope.timeData.lunch == "Yes") {

                minutes = 45
                hours = hours - 1

                if (minutes == 45) {

                    hours = hours + .75

                    if (Math.sign(hours) == -1) {

                        hoursPositive = Math.abs(hours)
                        $scope.timeData.hoursCalculated = hoursPositive;

                    } else {

                        $scope.timeData.hoursCalculated = hours;

                    }

                }

                console.log("second condition")

            }
            else if (minutes == 30 && $scope.timeData.lunch == "Yes") {

                minutes = 0;

                if (minutes == 0) {

                    if (Math.sign(hours) == -1) {

                        hoursPositive = Math.abs(hours)
                        $scope.timeData.hoursCalculated = hoursPositive;

                    } else {

                        $scope.timeData.hoursCalculated = hours;

                    }

                }

                console.log("third condition")

            }
            else if (minutes == 45 && $scope.timeData.lunch == "Yes") {

                minutes = 15;

                if (minutes == 15) {

                    hours = hours + .25

                    if (Math.sign(hours) == -1) {

                        hoursPositive = Math.abs(hours)
                        $scope.timeData.hoursCalculated = hoursPositive;

                    } else {

                        $scope.timeData.hoursCalculated = hours;

                    }

                }

                console.log("fourth condition")

            } else {

                console.log("Do nothing")

                if (minutes == 15) {

                    console.log("Minutes == 15")
                    hours = hours + .25
                    console.log("Hours", hours)

                    if (Math.sign(hours) == -1) {

                        console.log("negative")
                        console.log(hours * -2)
                        console.log(hours)
                        hoursPositive = Math.abs(hours)
                        console.log(hoursPositive)
                        hoursDif = (12 - hoursPositive)
                        console.log("hoursDif", hoursDif)
                        hours = hoursDif + 12
                        console.log(hours)
                        //hours= (hours-1)+.5

                    }

                    $scope.timeData.hoursCalculated = hours;

                }
                if (minutes == 30) {

                    hours = hours + .5

                    if (Math.sign(hours) == -1) {

                        console.log("negative")
                        console.log(hours * -2)
                        console.log(hours)
                        hoursPositive = Math.abs(hours)
                        console.log(hoursPositive)
                        hoursDif = (12 - hoursPositive)
                        console.log("hoursDif", hoursDif)
                        hours = hoursDif + 12
                        console.log(hours)
                        //hours= (hours-1)+.5
                    }

                    $scope.timeData.hoursCalculated = hours;

                }
                if (minutes == 45) {

                    hours = hours + .75

                    if (Math.sign(hours) == -1) {

                        //console.log("negative")
                        //console.log(hours * -2)
                        //console.log(hours)
                        hoursPositive = Math.abs(hours)
                        //console.log(hoursPositive)
                        hoursDif = (12 - hoursPositive)
                        //console.log("hoursDif", hoursDif)
                        hours = hoursDif + 12
                        //console.log(hours)

                    }

                    $scope.timeData.hoursCalculated = hours;

                }
                if (minutes == 00) {

                    if (Math.sign(hours) == -1) {

                        console.log("negative")
                        console.log(hours * -2)
                        console.log(hours)
                        hoursPositive = Math.abs(hours)
                        console.log(hoursPositive)
                        hoursDif = (12 - hoursPositive)
                        console.log("hoursDif", hoursDif)
                        hours = hoursDif + 12
                        console.log(hours)

                    }

                    $scope.timeData.hoursCalculated = hours;

                }
                if (Math.sign(minutes) == -1) {

                    minsPositive = Math.abs(minutes)

                    if (minsPositive == 15) {

                        console.log("Minutes == 15")
                        hours = hours - .25
                        console.log("Hours", hours)

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)
                            //hours= (hours-1)+.5

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }
                    if (minsPositive == 30) {

                        console.log("Minutes == 30")
                        hours = hours - .5
                        console.log("Hours", hours)

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }
                    if (minsPositive == 45) {

                        console.log("Minutes == 45")
                        hours = hours - .75
                        console.log("Hours", hours)

                        if (Math.sign(hours) == -1) {

                            console.log("negative")
                            console.log(hours * -2)
                            console.log(hours)
                            hoursPositive = Math.abs(hours)
                            console.log(hoursPositive)
                            hoursDif = (12 - hoursPositive)
                            console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            console.log(hours)

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }

                }

            }

            if ($scope.timeData.hoursCalculated <= 4) {

                $scope.timeData.hoursCalculated = 4

            }

            console.log("$scope.timeData", $scope.timeData)

            User.addHoursToPayPeriod($scope.timeData).then(function (data) {
                
                console.log(data)
                $scope.payPeriodHistory = data.data.user.payperiodhistory
                $scope.submitHoursLoading = false
                $scope.addHoursPageOpen = false

            })

            console.log(hours)
            console.log(minutes)

        }

        console.log(index)
        console.log($scope.currentJobInDate)

    }
    $scope.markAsUnPaid = function (index, historyentry) {

        console.log(historyentry.entry[0][0])
        console.log(index)
        console.log($scope.currentUserHistoryFile)

        var payPeriodDetails = {

            name: $scope.currentUserHistoryFile,
            index: index,

        }
        historyentry.entry[0][0].paid = true;
        $scope.payPeriodUnPaidSwitch = true;

        User.changePayPeriodHistoryEntryToUnPaid(payPeriodDetails).then(function (data) {

            console.log(data)
            $scope.payPeriodHistory = []
            var name = $scope.currentUserHistoryFile
            var phonenumber = "#"
            $scope.openUserFileHistory2(name, phonenumber)

        })
    }
    $scope.markAsPaid = function (index, historyentry) {

        console.log(historyentry.entry[0][0])
        console.log(index)
        console.log($scope.currentUserHistoryFile)

        var payPeriodDetails = {
            name: $scope.currentUserHistoryFile,
            index: index,

        }
        $scope.payPeriodPaidSwitch = true;

        User.changePayPeriodHistoryEntryToPaid(payPeriodDetails).then(function (data) {

            console.log(data)
            $scope.payPeriodHistory = [];
            var name = $scope.currentUserHistoryFile
            var phonenumber = "#"
            $scope.openUserFileHistory2(name, phonenumber)

        })
        
    }
    $scope.closePayPeriodUpdatedPage = function () {

        $scope.payPeriodUpdated = false;
        $scope.clientsPage = false;
        $scope.employeePage = false;
        $scope.payslipPageOpen = false;
        $scope.employeeListOpen = false
        $scope.managementPage = true;

    }
    Auth.getUser().then(function (data) {

        console.log(data)

    if (data.data.success) {

            $rootScope.payPeriod = data.data.payperiod;
            $rootScope.userClassy = data.data.userclass;
            $rootScope.user_id = data.data._id
            $rootScope.messageCount = data.data.messages.length

        }else{

            //Auth.logout();

        }

        $scope.requestedJobsArray = data.data.requestedjobs
        $scope.approvedJobsArray = data.data.approvednotbooked;
        $scope.userName = data.data.name
        $rootScope.user_id = data.data._id

        User.findUser(data.data._id).then(function (data) {

            console.log(data)
            $scope.disputedTimeSheetsArray = data.data.user[0].disputedtimesheets
            $scope.adminMessagesArray = data.data.user[0].comments
            $scope.requestedJobsArray = data.data.user[0].requestedjobs
            $scope.approvedJobsArray = data.data.user[0].approvednotbooked
            $scope.payPeriodNum = data.data.user[0].payperiodnum

            for (var i = 0; i <= $scope.approvedJobsArray.length; i++) {

                var page = 0;
            
                if (i < $scope.pageLimit) {

                    console.log("its less")

                }
                if (i < $scope.approvedJobsArray.length) {

                    console.log("yup,less")

                }
                if (i < $scope.pageLimit && i < $scope.approvedJobsArray.length) {

                    console.log("HELLO")
                    
                    if ($scope.approvedJobsArray[i] && $scope.approvedJobsArray[i].approved) {

                        $scope.approvedJobsForPagination.push($scope.approvedJobsArray[i])
                        console.log(i)
                        console.log("firstCondiation")
                        console.log($scope.pageArray)

                    }

                } else {

                    console.log("else")
                    $scope.loadingUsers = false;
                    $scope.approvedJobsPaginated.push($scope.approvedJobsForPagination)
                    $scope.approvedJobsForPagination = [];

                    if ($scope.approvedJobsArray[i] !== undefined && $scope.approvedJobsArray[i].approved) {

                        $scope.approvedJobsForPagination.push($scope.approvedJobsArray[i])

                    }

                    $scope.pageLimit = $scope.pageLimit + 4;
                    page++

                }

            }

            for (var i = 0; i <= $scope.requestedJobsArray.length; i++) {

                var page = 0;
                ////console.log($scope.pageLimit, i, $scope.employees.length)
                //console.log($scope.employees)
                if (i < $scope.pageLimit) {
                    console.log("its less")

                }
                if (i < $scope.requestedJobsArray.length) {
                    console.log("yup,less")
                }

                if (i < $scope.pageLimit && i < $scope.requestedJobsArray.length) {//5
                    console.log("HELLO")
                    //console.log($scope.employees[i])
                    //console.log($scope.pageLimit, i, $scope.employees.length)
                    if ($scope.requestedJobsArray[i] && $scope.requestedJobsArray[i].length > 0) {
                        $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])
                        console.log(i)
                        console.log("firstCondiation")
                        console.log($scope.pageArray)

                    }



                } else {

                    console.log("else")
                    $scope.loadingUsers = false;
                    $scope.requestedJobsPaginated.push($scope.requestedJobsForPagination)
                    console.log($scope.requestedJobsPaginated)
                    $scope.requestedJobsForPagination = [];
                    if ($scope.requestedJobsArray[i] !== undefined) {
                        $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])
                    }
                    $scope.pageLimit = $scope.pageLimit + 4;
                    //console.log($scope.pageLimit, i, $scope.employees.length)

                    page++



                }

            }
        })

        $scope.name = data.data.name
        if ($scope.month == 5 && $scope.dateNow == 29) {
            /* User.updatePayPeriod(data.data.payperiod, data.data.username).then(function (data) {
                console.log(data)
                $rootScope.payPeriod= data.data.user.payperiodnum
                console.log($rootScope.payPeriod)
            })
            */
        }

    })
    $scope.removeRequestedJob = function (job) {

        console.log(job)

        User.removeRequestedJob(job).then(function (data) {

            console.log(data)
            $scope.requestedJobsArray = data.data.user.requestedjobs;
            $scope.pageLimit = 4;
            $scope.requestedJobsPaginated = [];
            $scope.requestedJobsForPagination = [];

            for (var i = 0; i <= $scope.requestedJobsArray.length; i++) {

                var page = 0;
    
                if (i < $scope.pageLimit) {

                    console.log("its less")

                }
                if (i < $scope.requestedJobsArray.length) {

                    console.log("yup,less")

                }
                if (i < $scope.pageLimit && i < $scope.requestedJobsArray.length) {

                    console.log("HELLO")
                
                    if ($scope.requestedJobsArray[i] && !$scope.requestedJobsArray[i].approved) {

                        $scope.requestedJobsArray[i].currentIndex = i
                        $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])
                        console.log(i)
                        console.log("firstCondiation")
                        console.log($scope.pageArray)

                    }

                } else {

                    console.log("else")
                    $scope.loadingUsers = false;
                    $scope.requestedJobsPaginated.push($scope.requestedJobsForPagination)
                    console.log($scope.requestedJobsPaginated)
                    $scope.requestedJobsForPagination = [];

                    if ($scope.requestedJobsArray[i] !== undefined && !$scope.requestedJobsArray[i].approved) {

                        $scope.requestedJobsArray[i].currentIndex = i
                        $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])

                    }

                    $scope.pageLimit = $scope.pageLimit + 4;
                    page++

                }

            }

        })

    }
    $scope.openGeneratePaySlipPage = function () {

        $scope.generatePaySlipPageOpen = true;
        $scope.historyPageOpen = false;
        $scope.incompletePayPeriodPageOpen = false;
        $scope.chartsPageOpen = false;
        $scope.employeesForPaySlipGeneration = [];

        User.getUsers().then(function (data) {

            console.log(data)
            $scope.employeesForPaySlipGeneration = data.data.users;

        })

    }
    $scope.openIndividualDelinquentTimeSheet = function (index, timesheetData) {

        console.log(index)
        console.log(timesheetData)
        $('select').material_select();

        if ($scope.timesheetEntryOpen && index !== $scope.curTimesheet) {

            $scope.curTimesheet = index;
            console.log("first")
            console.log($scope.timesheetEntryOpen)

        }
        else if (!$scope.timesheetEntryOpen && index == $scope.curTimesheet) {

            $scope.timesheetEntryOpen = true;
            console.log("second")
            console.log($scope.timesheetEntryOpen)

        }
        else if (!$scope.timesheetEntryOpen && index !== $scope.curTimesheet) {

            console.log("third")
            $scope.timesheetEntryOpen = true;
            console.log($scope.timesheetEntryOpen)
            $scope.curTimesheet = index;

        } else {

            console.log("last")
            $scope.curTimesheet = null

        }
    
        
    }
    $scope.openIndividualHistoryEntry = function (index) {

        console.log(index)
        $scope.showChart = false;

        $timeout(function () {

            $scope.removeChart = true;

            if ($scope.historyEntryOpen && index !== $scope.curHistory) {

                $scope.curHistory = index;
                console.log("first")

            }
            else if (!$scope.historyEntryOpen && index == $scope.curHistory) {

                $scope.historyEntryOpen = true;
                console.log("second")

            }
            else if (!$scope.historyEntryOpen && index !== $scope.curHistory) {

                console.log("third")
                $scope.historyEntryOpen = true;
                $scope.curHistory = index;

            } else {

                $scope.curHistory = null
                $scope.showChart = true;
                $scope.removeChart = false;

            }

        }, 500)

    }
    $scope.openIndividualPayPeriod = function (index) {

        console.log(index)
        console.log($scope.personalHistoryOpen)
        $scope.globalPayPeriodIndexATM = index;
        $scope.payPeriodHistoryIndex = index;
        $scope.turnOtherPayPeriodsOff = true;
        $scope.individualUser = false;
        $scope.loadingPersonalHistory = false;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        if ($scope.individualPayPeriodOpen && index !== $scope.curPeriod) {

            $scope.curPeriod = index;
            console.log("first")
            $scope.removeRightBorder = true;
            console.log($scope.removeRightBorder)
            User.findUser($scope.currentUserId).then(function (data) {

                $scope.payPeriodHistory = data.data.user[0].payperiodhistory
                console.log($scope.payPeriodHistory)

                for (var c = 0; c < $scope.payPeriodHistory[index].entry.length; c++) {

                    $scope.hoursCalcIterator = 0;
                    console.log($scope.payPeriodHistory[index].entry[c])

                    if ($scope.payPeriodHistory[index].entry[c][0].hoursCalculated !== undefined) {

                        $scope.labels[c] = $scope.payPeriodHistory[index].entry[c][0].date
                        console.log("HOlk")
                        $scope.data[0][c] = $scope.payPeriodHistory[index].entry[c][0].hoursCalculated + $scope.payPeriodHistory[index].entry[c][1].hoursCalculated;
                        console.log($scope.data[0][c], "c", c)
                        console.log($scope.data.toString())

                    }
                    var hoursIterator = 0;
                    var minIterator = 0;
                
                }

                $scope.loadingPersonalHistory = false;
                console.log($scope.payperiods)
                console.log($scope.currentUserFile)
                console.log($scope.payPeriodHistory)

            })

        }

        else if (!$scope.individualPayPeriodOpen && index == $scope.curPeriod) {

            $scope.individualPayPeriodOpen = true;
            console.log("second")

        }

        else if (!$scope.individualPayPeriodOpen && index !== $scope.curPeriod) {

            console.log("third")
            $scope.individualPayPeriodOpen = true;
            $scope.curPeriod = index;
            $scope.removeRightBorder = true;
            console.log($scope.removeRightBorder)

        } 
        else {

            console.log("fourth")
            $scope.curHistory = null;
            $scope.curPeriod = null
            $scope.showChart = true;
            $scope.removeRightBorder = false;
            console.log($scope.removeRightBorder)

        }

    }
    $scope.openIncompletePayPeriodPage = function () {

        $scope.incompletePayPeriodPageOpen = true;
        $scope.chartsPageOpen = false;
        $scope.historyPageOpen = false;
        $scope.generatePaySlipPageOpen = false;

    }
    $scope.openHistoryPage = function () {

        $scope.curPeriod = null;
        $scope.curHistory = null;
        $scope.generalHistoryTitle = true;
        $scope.personalHistoryTitle = false;
        $scope.historyPageOpen = true;
        $scope.chartsPageOpen = false;
        $scope.personalHistoryOpen = false;
        $scope.generatePaySlipPageOpen = false;
        $scope.loadingGeneralHistory = true;
        $scope.loadingPersonalHistory = false;
        $scope.showChart = true;
        $scope.generalHistoryOpen = true;
        console.log($scope.generalHistoryOpen)
        $scope.incompletePayPeriodPageOpen = false;
        $scope.employeesForHistory = [];
        $scope.pageLimit = 0;

        if ($scope.usersLoaded) {

            for (var i = 0; i <= $scope.employees.length; i++) {

                var page = 0;
                console.log($scope.pageLimit, i, $scope.employees.length)
                console.log($scope.employees)

                if (i < $scope.pageLimit) {

                    console.log("its less")

                }
                if (i < $scope.employees.length) {

                    console.log("yup,less")
                }

                if (i < $scope.pageLimit && i < $scope.employees.length) {

                    console.log("HELLO")
                    console.log($scope.employees[i])
                    console.log($scope.pageLimit, i, $scope.employees.length)

                    if ($scope.employees[i] && $scope.employees[i].userclass == "employee") {

                        $scope.employeesForHistory.push($scope.employees[i])
                        console.log(i)
                        console.log("firstCondiation")
                        console.log($scope.pageArray)

                    }

                } else {

                    if (!$scope.usersLoaded) {

                        console.log("else")
                        $scope.loadingUsers = false;
                        $scope.employeesPaginated.push($scope.employeesForHistory)
                        console.log($scope.employeesPaginated)
                        $scope.employeesForHistory = [];

                        if ($scope.employees[i] !== undefined) {

                            $scope.employeesForHistory.push($scope.employees[i])

                        }

                        $scope.pageLimit = $scope.pageLimit + 4;
                        console.log($scope.pageLimit, i, $scope.employees.length)
                        page++

                    }

                }

            }

            $scope.loadingGeneralHistory = false;

        } else {

            User.getUsers().then(function (data) {

                console.log(data)

                for (var z = 0; z < data.data.users.length; z++) {

                    $scope.employeesForHistory.push(data.data.users[z])
                    $scope.loadingGeneralHistory = false;
                }
                for (var i = 0; i <= $scope.employeesForHistory.length; i++) {

                    var page = 0;
                    console.log($scope.pageLimit)

                    if (i < $scope.pageLimit && i < $scope.employeesForHistory.length) {

                        if ($scope.employeesForHistory[i]) {

                            $scope.pageArray.push($scope.employeesForHistory[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.pageArray)

                        }

                    } else {

                        if (!$scope.usersLoaded) {

                            console.log("else")
                            console.log($scope.pageArray)
                            $scope.loadingUsers = false;
                            $scope.employeesPaginated.push($scope.pageArray)
                            console.log($scope.employeesPaginated)
                            $scope.pageArray = [];
                            $scope.pageLimit = $scope.pageLimit + 4;
                            page++

                        }

                    }

                }

                $scope.employeesPaginated.push($scope.pageArray)

            })

        }

    }
    $scope.openChartsPage = function () {

        $scope.chartsPageOpen = true;
        $scope.adminHome = false;
        $scope.historyPageOpen = false;
        $scope.delinquentTimeSheetPageOpened = false;
        $scope.incompletePayPeriodPageOpen = false;

    }
    $scope.finishSubmitTimesheet = function (decision) {

        console.log(decision)
        console.log($scope.delinquentJobDetails)
        $scope.loadingAddAndRemoveDelinquentTimeSheet = true;

        User.addJobToCurrentPayPeriod($scope.delinquentJobDetails).then(function (data) {

            console.log(data)

            if (data.data.success) {

                $scope.loadingAddAndRemoveDelinquentTimeSheet = false;
                $scope.areYouSure = false;
                $scope.openEmployeeList()

            } else {

            }

        })

        if (decision == "yes") {

            $scope.areYouSure = false;


        } else {

            $scope.areYouSure = false;
            
        }

    }
    $scope.submitTimeSheet = function (timesheet, index) {

        console.log($scope.timeData)
        console.log(timesheet)
        $scope.delinquentJobDetails = timesheet;
        $scope.delinquentJobDetails.index = index;
        $scope.delinquentJobDetails.currentuser = $scope.currentUserFile;
        $scope.delinquentJobDetails.delinquent = true;
        console.log($scope.areYouSure)
        $scope.minVarOut = "";
        $scope.minVarIn = "";
        $scope.hrVarOut = "";
        $scope.hrVarIn = "";

        if ($scope.timeData.hrsIn1 !== null && $scope.timeData.hrsIn2 !== null &&
            $scope.timeData.minsIn1 !== null && $scope.timeData.minsIn2 !== null
            && $scope.timeData.amPm1 !== null
            && $scope.timeData.hrsOut1 !== null
            && $scope.timeData.hrsOut2 !== null
            && $scope.timeData.minOut2 !== null
            && $scope.timeData.minsOut2 !== null
            && $scope.timeData.amPm2 !== null) {
            $scope.minVarOut = $scope.timeData.minsOut1 + $scope.timeData.minsOut2 + $scope.timeData.amPm2
            $scope.minVarIn = "" + $scope.timeData.minsIn1 + $scope.timeData.minsIn2 + $scope.timeData.amPm1
            $scope.hrVarOut = $scope.timeData.hrsOut1 + $scope.timeData.hrsOut2
            $scope.hrVarIn = $scope.timeData.hrsIn1 + $scope.timeData.hrsIn2
            $scope.delinquentJobDetails.timeout = $scope.hrVarOut + ":" + $scope.minVarOut
            $scope.delinquentJobDetails.timein = $scope.hrVarIn + ":" + $scope.minVarIn
            $scope.delinquentJobDetails.payperiodnum = $rootScope.payPeriod;
            $scope.delinquentJobDetails.user = $scope.currentUserFile;
            $scope.delinquentJobDetails.timesheetSubmitted = true;
            console.log($scope.hrVarOut)
            console.log($scope.hrVarIn)
            console.log($scope.minVarOut)
            console.log($scope.minVarIn)
            console.log($scope.timeData)
            $scope.areYouSure = true;
            console.log($scope.areYouSure)

        } else {
            console.log("null")
        }

    }
    $scope.createClient = function () {

        Client.create("Displayworks").then(function (data) {

            console.log(data);

        })

    }
    $scope.createLocation = function () {

        Location.create("Sky City").then(function (data) {
            // console.log(data.data.);
        })

    }
    $scope.createSupervisor = function () {

        Supervisor.create("Benjamin").then(function (data) {

            console.log(data);

        })

    }
    $scope.sendTimeSheetReminderText = function (date, userData) {


        $scope.loadingText = true;
        var userDetails = {}
        userDetails.name = userData.jobDetails[0].currentuser
        $scope.textName = userData.name[0]

        User.findUser(userData.jobDetails[0].currentuser).then(function (data) {

            console.log(data.data.user.payperiodnum)
            userDetails.phonenumber = data.data.user[0].phonenumber
            userDetails.from = "Hannah @ QLH"
            userDetails.text = "Just, a reminder that you're timesheet for " + userData.jobDetails[0].date + " (Benjamin @ SkyCity), has not been submitted, please submit by Sunday Evening, or it will be placed on a later pay period. Thanks...-Hannah @ QLH."
            
            User.sendSms(userDetails).then(function (data) {

                if (data.data.success) {
                    $scope.loadingText = false;
                    console.log(data)
                }

            })

        })

    }
    $scope.removeUser = function (name) {

        $scope.loadingRemoveUser = true;

        User.removeUser(name).then(function (data) {

            console.log(data)
            $scope.loadingRemoveUser = false;
            $scope.removeUserPageOpen = false;
            $scope.openEmployeeList();

        })

    }
    $scope.closeAreYouSureRemove2 = function () {

        console.log("HELo")
        $scope.areYouSureRemove3 = false;

    }
    $scope.openAreYouSureRemove = function () {

        if (!$scope.areYouSureRemove3) {

            $scope.areYouSureRemove3 = true;
            $scope.addJobPageOpen = false;

        }

    }
    $scope.areYouSureRMessage = false;
    $scope.openAreYouSure = function (index) {

        if (!$scope.areYouSureRMessage) {

            $scope.areYouSureRMessage = true;

        } else {
            // $scope.areYouSure 
        }

    }
    $scope.removeMessage = function (index, messageIndex) {

        $scope.messageLoading = true;
        $scope.currentIndex = index;
        $scope.areYouSureRMessage = false;
        console.log(index)

        User.removeMessage($scope.name, messageIndex).then(function (data) {

            console.log(data)
            $scope.pageLimit = 4;
            $scope.adminMessagesPaginated = [];
            $scope.adminMessagesForPagination = [];
            $scope.adminMessagesArray = data.data.user.comments;

            for (var i = 0; i <= $scope.adminMessagesArray.length; i++) {

                var page = 0;
                console.log($scope.employees)

                if (i < $scope.pageLimit) {

                    console.log("its less")

                }
                if (i < $scope.adminMessagesArray.length) {

                    console.log("yup,less")
                }

                if (i < $scope.pageLimit && i < $scope.adminMessagesArray.length) {

                    console.log("HELLO")
                    
                    if ($scope.adminMessagesArray[i]) {

                        $scope.adminMessagesArray[i].messageIndex = i
                        $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])
                        console.log(i)
                        console.log("firstCondiation")
                        console.log($scope.pageArray)

                    }

                } else {

                    console.log("else")
                    $scope.loadingUsers = false;
                    $scope.adminMessagesPaginated.push($scope.adminMessagesForPagination)
                    console.log($scope.adminMessagesPaginated)
                    $scope.adminMessagesForPagination = [];

                    if ($scope.adminMessagesArray[i] !== undefined) {

                        $scope.adminMessagesArray[i].messageIndex = i
                        $scope.adminMessagesForPagination.push($scope.adminMessagesArray[i])

                    }

                    $scope.pageLimit = $scope.pageLimit + 4;
                    page++

                }

            }

            $scope.messageLoading = false;
            $scope.messageIndex = null;

        })

    }
    $scope.closeAreYouSure = function (index) {

        $scope.areYouSureRMessage = false;

    }
    $scope.openRemoveUserPage = function () {

        if (!$scope.removeUserPageOpen) {

            $scope.removeUserPageOpen = true;
            $scope.userDetailsPageOpened = false;
            $scope.commentsPageOpened = false;
            $scope.notesPageOpen = false;

        } else {

            $scope.userDetailsPageOpened = true;
            $scope.removeUserPageOpen = false;

        }
    }
    $scope.submitNewPayRate = function (name) {

        console.log($scope.payRateData)

        var newinfo = {

            name: name

        }

        if ($scope.payRateData.payrate !== undefined && $scope.payRateData.payrate !== null) {

            $scope.editPayRateLoading = true;
            newinfo.newpayrate = $scope.payRateData.payrate

            User.editPayRate(newinfo).then(function (data) {

                console.log(data)
                $scope.editPayRateLoading = false;
                $scope.openUserFile(name)
                $scope.closeEditPayRatePage()

            })

        }

    }
    $scope.submitNewPhoneNumberClient = function (name) {

        console.log($scope.phoneNumberData)

        var newinfo = {

            name: name

        }

        if ($scope.phoneNumberData.phonenumber !== undefined && $scope.phoneNumberData.phonenumber !== null) {

            $scope.editPhoneNumberLoading = true;
            newinfo.newphonenumber = $scope.phoneNumberData.phonenumber

            User.editPhoneNumber(newinfo).then(function (data) {
                console.log(data)
                $scope.editPhoneNumberLoading = false;
                $scope.openClientFile(name)
                $scope.closeEditPhoneNumberPage()
            })

        }

    }
    $scope.submitNewPhoneNumber = function (name) {

        console.log($scope.phoneNumberData)
        var newinfo = {
            name: name

        }

        if ($scope.phoneNumberData.phonenumber !== undefined && $scope.phoneNumberData.phonenumber !== null) {

            $scope.editPhoneNumberLoading = true;
            newinfo.newphonenumber = $scope.phoneNumberData.phonenumber

            User.editPhoneNumber(newinfo).then(function (data) {

                console.log(data)
                $scope.editPhoneNumberLoading = false;
                $scope.openUserFile(name)
                $scope.closeEditPhoneNumberPage()

            })

        }

    }
    $scope.submitNewEmail = function (name) {

        console.log($scope.emailData)

        var newinfo = {

            name: name

        }

        if ($scope.emailData.email !== undefined && $scope.emailData.email !== null) {

            $scope.editEmailLoading = true;
            newinfo.newemail = $scope.emailData.email

            User.editEmail(newinfo).then(function (data) {

                console.log(data)
                $scope.editEmailLoading = false;
                $scope.openUserFile(name)
                $scope.closeEditEmailPage()

            })

        }

    }
    $scope.submitNewEmailClient = function (name) {

        console.log($scope.emailData)

        var newinfo = {

            name: name

        }

        if ($scope.emailData.email !== undefined && $scope.emailData.email !== null) {

            $scope.editEmailLoading = true;
            newinfo.newemail = $scope.emailData.email

            User.editEmail(newinfo).then(function (data) {

                console.log(data)
                $scope.editEmailLoading = false;
                $scope.openClientFile(name)
                $scope.closeEditEmailPage()

            })

        }

    }
    $scope.closeEditPayRatePage = function () {

        $scope.editPayRatePageOpen = false

    }
    $scope.closeEditPhoneNumberPage = function () {

        $scope.editPhoneNumberPageOpen = false;

    }
    $scope.closeEditEmailPage = function () {

        $scope.editEmailPageOpen = false;

    }
    $scope.openEditEmailPage = function () {

        if (!$scope.editEmailPageOpen) {

            $scope.editEmailPageOpen = true;

        }

    }
    $scope.openEditPhoneNumberPage = function () {

        if (!$scope.editPhoneNumberPageOpen) {

            $scope.editPhoneNumberPageOpen = true;

        }

    }
    $scope.openEditPayRatePage = function () {

        if (!$scope.editPayRatePageOpen) {

            $scope.editPayRatePageOpen = true;

        } else {

            $scope.editPayRatePageOpen = false;

        }

    }
    $scope.closeAreYouSureRemove = function () {

        $scope.areYouSureRemove2 = false;

    }
    $scope.areYouSureRemove = function (job, jobindex, indexofjob) {

        console.log('clicked')
        $scope.areYouSureRemove2 = true;
        $scope.jobData = {

            job: job,
            jobindex: jobindex,
            indexofjob: indexofjob

        }

    }
    $scope.removeJob = function () {

        $scope.removingJob = true;
        console.log($scope.jobData)

        User.removeJob($scope.jobData).then(function (data) {

            console.log(data)
            $scope.jobDetails = data.data.user.payperiods[0].jobDetails;
            $scope.increaseDay();
            $scope.removingJob = false;

        })

    }
    $scope.addJobData = function (month, date, day, fulldate, index, indexofdate) {

        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $scope.loadingNewJob = true;
        $scope.jobData.booked = true;
        $scope.jobData.timesheetSubmitted = false;
        $scope.jobData.dateNum = date;
        $scope.jobData.monthNum = month;
        $scope.jobData.date = fulldate;
        $scope.jobData.day = day;
        $scope.jobData.payperiodnum = $scope.payPeriodNum
        $scope.jobData.timein = ""
        $scope.jobData.timeout = ""
        $scope.jobData.hoursCalculated = 0;
        $scope.jobData.payperiodIndex = index;
        $scope.jobData.indexofdate = indexofdate;
        $scope.jobData.currentuser = $scope.currentUserFile;
        console.log($scope.jobData)

        User.addJob($scope.jobData).then(function (data) {

            console.log(data)

            if (data.data.success) {
                
                User.findUser($scope.currentUserFile).then(function (data) {

                    console.log(data.data.user.payperiodnum)
                    $scope.jobDetails = data.data.user[0].payperiods[0].jobDetails;
                    var userDetails = {}
                    var date = $scope.jobData.date;
                    var location = $scope.jobData.location
                    var client = $scope.jobData.client
                    console.log(data)
                    userDetails.phonenumber = data.data.user[0].phonenumber
                    userDetails.from = "Hannah @ QLH"
                    userDetails.text = "You've been booked for " + date + " @ " + location + " for " + client + ". Please text to confirm..."

                    User.sendSms(userDetails).then(function (data) {

                        console.log(data)
                        userDetails.text = $scope.jobData.notes;
                        User.sendSms(userDetails).then(function (data) {
                            console.log(data)
                        })

                    })

                    $scope.loadingNewJob = false;
                    $scope.addJobPageOpen = false;
                    $scope.jobsPageOpen = true;

                })
                
            }

        })

        console.log(index)
        console.log($scope.jobData)

    }
    $scope.openAddJobPage = function (job) {

        console.log(job)
        console.log($scope.clients)
        var userDetails = {}
        var date = job.date;
        var location = job.location
        var client = job.client
        $('select').material_select();

        User.findUser(job.currentuser).then(function (data) {

            console.log(data)
            userDetails.phonenumber = data.data.user[0].phonenumber
            userDetails.from = "Hannah @ QLH"
            userDetails.text = "You've been booked for " + date + " @ " + location + " for " + client + ". Please text to confirm..."

            User.sendSms(userDetails).then(function (data) {

                console.log(data)

            })

        })
        if (!$scope.addJobPage) {

            $scope.addJobPageOpen = true;
            $scope.jobsPageOpen = false;

        }

    }
    $scope.export = function () {

        $scope.pdfLoading = true;
        $timeout(function () {
            $scope.pdfLoading = false;
        }, 2000)
        console.log('clicked')
        var doc = new jsPDF()
        doc.getFontList();
        doc.text($scope.currentUserFile, 10, 10)
        doc.setFontSize(10)
        doc.text("Casual Labourer", 10, 20)
        doc.text($scope.currentUserPhoneNumber, 10, 30)
        doc.text("Quality Labour Hire Ltd.", 10, 60)
        doc.addImage($scope.qlhLogo, 'JPG', 180, 15, 15, 15);
        doc.save('a4.pdf')
        doc.addFont('Raleway', 'Raleway', 'normal');

    }
    $scope.generatePdf = function () {

        User.generatePdf().then(function (data) {

            console.log(data)

        })

    }
    User.getUsers().then(function (data) {

        console.log(data.data.users.length)

        for (var i = 0; i < data.data.users.length; i++) {

            if (data.data.users[i].name == $scope.currentUserFile) {

                data.data.users[i].jobDetails = $scope.jobDetails;
                data.data.users[i].comments = $scope.comments;

            }
            
            $scope.newPayPeriodObject.newpayperiod = $rootScope.payPeriod
            $scope.newPayPeriodObject.currentusername = data.data.users[i].name
            $scope.currentusernameArray.push(data.data.users[i].name)
            $scope.newPayPeriodObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name
            console.log($scope.newPayPeriodObject)

        }


        //RE ACTIVATE LATER //
        /* User.changeUserPayPeriod($scope.newPayPeriodObject).then(function (data) {
            console.log(data)
            if (data.data.success) {
                $scope.payPeriodUpdated = true;
                //$timeout(function(){
                //    $scope.payPeriodUpdated = false;
                //},)
            }
            //         $scope.addPayPeriodToPayPeriodHistory($scope.allEmployeesJobDetails)

        })*/

        //RE ACTIVATE LATER//



    })
    User.getUsers().then(function (data) {

        console.log(data)
        $scope.employees = data.data.users;
        console.log($scope.employees)
        console.log($scope.employeesPaginated)
        $scope.jobDetails = data.data.users.jobDetails;
        console.log(data)
        $scope.employees = data.data.users
        $scope.pageLimit = 4
        $scope.pageArray = []
        $scope.employeesPaginated = []

        for (var i = 0; i < $scope.employees.length; i++) {

            if ($scope.employees[i].userclass == "client") {

                $scope.clients.push($scope.employees[i].name)
                console.log($scope.clients)

            }

        }

        console.log($scope.clients)
        console.log("$scope.usersLoaded", $scope.usersLoaded)
        $scope.loadingUsers = false;

        for (var i = 0; i < data.data.users.length; i++) {

            if (data.data.users[i].name == $scope.currentUserFile) {

                data.data.users[i].jobDetails = $scope.jobDetails;
                data.data.users[i].comments = $scope.comments;

            }
            if ($scope.employees[i].payperiodnum !== $rootScope.payPeriod) {

                console.log($scope.employees[i])
                $scope.newPayPeriodObject.newpayperiod = $rootScope.payPeriod
                $scope.newPayPeriodObject.currentusername = data.data.users[i].name
                $scope.newPayPeriodObject.lootch = $scope.employees[i].name
                console.log($scope.newPayPeriodObject)
            
            }
            if (data.data.users[i].userclass == "employee" && data.data.users[i].delinquenttimesheets.length > 0)
                $scope.delinquentTimeSheetArray.push(data.data.users[i].delinquenttimesheets)

        }

        console.log($scope.delinquentTimeSheetArray)

        for (var z = 0; z < $scope.delinquentTimeSheetArray.length; z++) {

            for (var d = 0; d < $scope.delinquentTimeSheetArray[z].length; d++) {

                for (var s = 0; s < $scope.delinquentTimeSheetArray[z].length; s++) {

                    if ($scope.delinquentTimeSheetArray[z][d][s]) {

                        $scope.delinquentTimeSheetsArray.push($scope.delinquentTimeSheetArray[z][d][s])
                        console.log("DELINQUENT TIME SHEET ARRAY", $scope.delinquentTimeSheetArray[z][d][s])

                    }

                }

            }

        }

        $scope.adminMenuLoading = false;

    })
    $scope.closeSearchResults = function () {

        console.log("clicked")
        $scope.searchResults = false;
        $scope.page = 0;
        $scope.userList = true;

    }
    $scope.changePage = function () {

        if ($scope.page < $scope.employeesPaginated.length - 1) {

            $scope.page++

        }

        console.log($scope.page)

    }
    $scope.decreasePage = function () {

        if ($scope.page > 0) {

            $scope.page--
            console.log($scope.page)

        }

    }
    $scope.changePage2 = function () {

        if ($scope.page < $scope.employeesPaginated.length - 1) {

            $scope.page++

        }

        console.log($scope.page)
    }
    $scope.decreasePage2 = function () {

        if ($scope.page > 0) {

            $scope.page--
            console.log($scope.page)

        }

    }
    $scope.firstPageManageTimeSheets = function () {

        $scope.page = 0;

    }
    $scope.lastPageManageTimeSheets = function () {

        $scope.page = $scope.employeesPaginated.length - 1;
    }
    $scope.changePageManageTimeSheets = function () {

        if ($scope.page < $scope.employeesPaginated.length - 1) {

            $scope.page++

        }

        console.log($scope.page)
    }
    $scope.decreasePageManageTimeSheets = function () {

        if ($scope.page > 0) {

            $scope.page--
            console.log($scope.page)

        }

    }
    $scope.firstPageAdminMessages = function () {

        $scope.page = 0;

    }
    $scope.lastPageAdminMessages = function () {

        $scope.page = $scope.adminMessagesPaginated.length - 1;
    }
    $scope.changePageAdminMessages = function () {

        if ($scope.page < $scope.adminMessagesPaginated.length - 1) {

            $scope.page++

        }

        console.log($scope.page)
    }
    $scope.decreasePageAdminMessages = function () {

        if ($scope.page > 0) {

            $scope.page--
            console.log($scope.page)

        }

    }
    $scope.firstPageApprovedJobs = function () {

        $scope.page = 0;

    }
    $scope.lastPageApprovedJobs = function () {

        $scope.page = $scope.approvedJobsPaginated.length - 1;
    }
    $scope.changePageApprovedJobs = function () {

        if ($scope.page < $scope.approvedJobsPaginated.length - 1) {

            $scope.page++

        }

        console.log($scope.page)
    }
    $scope.decreasePageApprovedJobs = function () {

        if ($scope.page > 0) {

            $scope.page--
            console.log($scope.page)

        }

    }
    $scope.firstPageRequestedJobs = function () {

        $scope.page = 0;

    }
    $scope.lastPageRequestedJobs = function () {

        $scope.page = $scope.requestedJobsPaginated.length - 1;
    }
    $scope.changePageRequestedJobs = function () {

        if ($scope.page < $scope.requestedJobsPaginated.length - 1) {

            $scope.page++

        }

        console.log($scope.page)
    }
    $scope.decreasePageRequestedJobs = function () {

        if ($scope.page > 0) {

            $scope.page--
            console.log($scope.page)

        }

    }
    $scope.specificPage = function (page) {

        $scope.page = page;

    }
    $scope.lastPage = function () {

        $scope.page = $scope.employeesPaginated.length - 1;
    }
    $scope.firstPage = function () {

        $scope.page = 0;

    }
    $scope.searchData = {

        searchInput: "",

    }
    $scope.searchFunction = function (input) {

        $scope.loading = true;

        if ($scope.searchData.searchInput !== "") {

            var upperCaseFirstLetter = $scope.searchData.searchInput[0].toUpperCase()

        }

        if ($scope.searchData.searchInput.length == 1) {

            $scope.searchData.searchInput = upperCaseFirstLetter

        }

        console.log($scope.searchData)

        if ($scope.searchData.searchInput != "" && $scope.searchData.searchInput != null && $scope.searchData.searchInput != undefined) {

            $scope.loading = false;

            User.instaSearch($scope.searchData.searchInput).then(function (data) {

                if (data.data.users.length == 0) {

                    $scope.searchResults = false;
                    $scope.noSearchResults = true;
                    $scope.noInput = false;
                    $timeout(function () {

                        $scope.noSearchResults = false;

                    }, 3000)

                } else {

                    console.log("dog")
                    $scope.loading = false;
                    $scope.userList = false;
                    $scope.userSearchResults = data.data.users
                    console.log($scope.userSearchResults)
                    $scope.searchResults = true;
                    $scope.noInput = false;
                    $scope.noSearchResults = false;
                    $timeout(function () {

                    }, 3000)
                }

            })

        } else {

            $scope.loading = false;
            $scope.noInput = true;
            $scope.noSearchResults = false;
            $scope.searchResults = false;
            console.log("y")
            $timeout(function () {

                $scope.searchData.searchInput = ""
                $scope.noInput = false;
                
            }, 3000)

        }


    }
    $scope.inputTotalHoursIntoUserFile = function () {

        $scope.userListArray = []
        $scope.totalHoursArray = []
        $scope.finalTotalHoursArray = []

        User.getUsers().then(function (data) {

            console.log(data)

            for (var d = 0; d < data.data.users.length; d++) {

                $scope.userListArray.push(data.data.users[d].name)

                for (var x = 0; x < data.data.users[x].length; x++) {

                    for (var y = 0; y < data.data.users[x].payperiodhistory[$scope.payPeriod].length; y++) {

                        for (var z = 0; z < data.data.users[x].payperiodhistory[y].entry.length; z++) {

                            if (data.data.users[x].payperiodhistory[y].entry[z][0]) {

                                console.log($scope.payPeriodHistory[index].entry[z][0].hoursCalculated)
                                $scope.totalHours = $scope.totalHours + data.data.users[x].payperiodhistory[y].entry[z][0].hoursCalculated

                            }
                            if (data.data.users[x].payperiodhistory[y].entry[z][1]) {

                                console.log($scope.payPeriodHistory[index].entry[z][1].hoursCalculated)
                                $scope.totalHours = $scope.totalHours + data.data.users[x].payperiodhistory[y].entry[z][1].hoursCalculated

                            }

                            $scope.payPeriodStartDate = data.data.users[x].payperiodhistory[y].entry[0][0].date
                            $scope.payPeriodEndDate = data.data.users[x].payperiodhistory[y].entry[6][0].date

                        }

                        $scope.totalHoursArray.push($scope.totalHours)

                    }

                }

            }
            
            console.log("$scope.userListArray", $scope.userListArray)

        })

    }
    $scope.inputTotalHoursIntoUserFile()
    /* PAYSLIP LOGIC */

    $scope.addPayPeriodToPayPeriodHistory = function (details) {

        console.log(details)
        $scope.employeeJobDetails.payperiod = $rootScope.payPeriod;
        $scope.allEmployeesJobDetails = []

        User.getUsers().then(function (data) {

            for (var d = 0; d < data.data.users.length; d++) {

                $scope.newPayPeriodObject = {}
                $scope.newPayPeriodObject.payperiodnum = data.data.users[d].payperiodnum
                $scope.newPayPeriodObject.name = data.data.users[d].name

                for (var k = 0; k < data.data.users[d].payperiods.length; k++) {

                    if (data.data.users[d].payperiods[0].payperiodnum !== $rootScope.payPeriod) {

                        $scope.nameObject = {}
                        $scope.nameObject.name = data.data.users[d].name
                        data.data.users[d].payperiods[0].jobDetails.push($scope.nameObject)
                        $scope.allEmployeesJobDetails.push(data.data.users[d].payperiods[0].jobDetails)

                    }


                }

                $scope.employeeJobDetails.allEmployeesJobDetails = $scope.allEmployeesJobDetails;
                console.log($scope.allEmployeesJobDetails)
                $scope.payPeriodHistory = data.data.users[d].payperiodhistory
                console.log($scope.payPeriodHistory)
                User.addPayPeriodToPayPeriodHistory($scope.newPayPeriodObject).then(function (data) {

                    console.log(data)
                })

            }
            
        })



    }
    $scope.getLocations = function (name) {

        $scope.supervisorListLoading = true;
        $scope.locationsListLoading = true;
        $scope.loadingLists = true;
        console.log($scope.selectedItem)
        console.log($scope.jobData)
        $scope.jobData.client = $scope.selectedItem.name

        User.getSupervisors($scope.selectedItem.name).then(function (data) {

            $scope.supervisors = data.data.supervisors
            $scope.supervisorsListOn = true;
            console.log($scope.supervisors)
            console.log(data)

            User.getLocations($scope.selectedItem.name).then(function (data) {

                $scope.locationsListLoading = false;
                $scope.supervisorListLoading = false;
                $scope.loadingLists = false;
                $scope.locations = data.data.locations
                $scope.locationsListOn = true;
                $('select').material_select();
                console.log(data)

            })

        })

    }
    $scope.returnToPayPeriodList = function () {

        $scope.curPeriod = null;

    }
    $scope.openPayslipPage = function () {

        $scope.payslipPageOpen = true;
        $scope.historyPageOpen = false
        console.log("$scope.historyPageOpen", $scope.historyPageOpen)
        $scope.loadingUserList = true;
        $scope.curPeriod = null
        $scope.historyPageOpenProfile = false;
        $scope.curPeriod = null;
        $scope.curHistory = null;
        $scope.employeePage = false;
        $scope.adminHome = false;
        $scope.employeesPage = false;
        $scope.individualUser = false;
        $scope.clientsPage = false;
        $scope.allEmployeesJobDetails = [];

        User.getUsers().then(function (data) {

            $scope.employees = data.data.users;
            $scope.payPeriod = $scope.employees[0].payperiodnum
            $scope.report = {};
            $scope.countData = {}
            $scope.reportArray = [];
            $scope.nameArray = []
            $scope.dateArray = []
            $scope.timeArray = []
            $scope.jobDetailArray = [];
            $scope.hourIterator = 0;
            $scope.minIterator = 0;
            $scope.hoursArray = [];
            $scope.timeObject = {};
            $scope.nameVar = ""

            /*HISTORY PAGE VARIABLES */

            $scope.generalHistoryTitle = true;
            $scope.personalHistoryTitle = false;
            $scope.historyPageOpen = true;
            $scope.chartsPageOpen = false;
            $scope.personalHistoryOpen = false;
            $scope.generatePaySlipPageOpen = false;
            $scope.loadingGeneralHistory = true;
            $scope.loadingPersonalHistory = false;
            $scope.showChart = true;
            $scope.generalHistoryOpen = true;
            console.log($scope.generalHistoryOpen)
            $scope.incompletePayPeriodPageOpen = false;
            $scope.employeesPaginated = []
            $scope.employeesForHistory = [];
            $scope.pageLimit = 4;

            /* HISTORY PAGE VARIABLES */


            for (var i = 0; i <= $scope.employees.length; i++) {

                var page = 0;
                console.log($scope.pageLimit, i, $scope.employees.length)
                console.log($scope.employees[i])

                if (i < $scope.pageLimit) {

                    console.log("its less")

                }
                if (i < $scope.employees.length) {

                    console.log("yup,less")
                }

                if (i < $scope.pageLimit && i < $scope.employees.length) {

                    console.log("HELLO")
                    console.log($scope.employees[i])
                    console.log($scope.pageLimit, i, $scope.employees.length)

                    if ($scope.employees[i]) {

                        $scope.employeesForHistory.push($scope.employees[i])
                        console.log("$scope.employeesForHistory", $scope.employeesForHistory)
                        console.log(i)
                        console.log("firstCondiation")
                        console.log($scope.pageArray)

                    }

                } else {

                    console.log("else")
                    $scope.loadingUsers = false;
                    $scope.employeesPaginated.push($scope.employeesForHistory)
                    console.log($scope.employeesPaginated)
                    $scope.employeesForHistory = [];

                    if ($scope.employees[i] !== undefined) {

                        $scope.employeesForHistory.push($scope.employees[i])

                    }

                    $scope.pageLimit = $scope.pageLimit + 4;
                    console.log($scope.pageLimit, i, $scope.employees.length)
                    page++

                }

            }

            $scope.loadingUserList = false;
        
            if ($scope.minIterator >= 45) {

            }
            $scope.exportPdf = function () {

                $scope.pdfLoading = true;
                $timeout(function () {

                    $scope.pdfLoading = false;

                }, 2000)

                console.log('clicked')
                var doc = new jsPDF()
                doc.getFontList();
                doc.text($scope.currentUserFile, 10, 10)
                doc.setFontSize(10)
                doc.text("Casual Labourer", 10, 20)
                doc.text($scope.currentUserPhoneNumber, 10, 30)
                doc.text("Quality Labour Hire Ltd.", 10, 60)
                doc.text("Pay Period:", 10, 70)
                doc.text($scope.payPeriodStartDate, 30, 70)
                doc.text($scope.payPeriodEndDate, 46, 70)
                doc.text("Payed On:", 10, 75)
                doc.text($scope.payPeriodEndDate, 30, 75)
                doc.text("Tax Code:", 10, 80)
                doc.text("M", 30, 80)
                doc.setFontSize(13)
                doc.text("Taxable Earnings", 10, 90)
                doc.text("Rate", 120, 90)
                doc.text("Hours", 150, 90)
                doc.text("Amount", 170, 90)
                doc.setFontSize(10)
                doc.text("Oridinary Time", 10, 100)
                doc.text("Oridinary Time", 120, 100)
                doc.text(String($scope.finalHours), 150, 100)
                doc.text("Oridinary Time", 170, 100)
                doc.addImage($scope.qlhLogo, 'JPG', 180, 15, 15, 15);
                doc.save('a4.pdf')
                doc.addFont('Raleway', 'Raleway', 'normal');

            }

        })

    }
    $scope.openPayslipGenerationPage = function () {

        $scope.payslipGenerationOpen = true;
        $scope.commentsPageOpened = false;
        $scope.bookedJobsPageOpened = false;
        $scope.complaintsPageOpened = false;
        $scope.userDetailsPageOpened = false;

    }

    /*PAYSLIP LOGIC */

    $scope.openNotesPage = function (index) {

        $scope.usersPageIndex = index;

        if (!$scope.disputesPageOpen) {

            $scope.jobsPageOpen = false;
            $scope.notesPageOpen = true;
            $scope.timesheetsPageOpen = false;
            $scope.timesheetsSelected = false;
            $scope.payslipGenerationOpen = false;
            $scope.removeUserPageOpen = false;
            $scope.jobsSelected = false;
            $scope.notesSelected = true;
            $scope.delinquentTimeSheetSelected = false;
            $scope.disputesSelected = false;
            $scope.disputesPageOpen = false;

        } else {

            $scope.notesSelected = false;

        }

    }
    $scope.changeDelinquentJobInDate = function (entry) {

        $scope.slideOut = true;
        $scope.fadeOut2 = true;
        $scope.addJobPageOpen = false;
        console.log(entry)
        $scope.areYouSureRemove2 = false;

        $timeout(function () {

            if ($scope.currentJobInDate < entry - 1) {

                $scope.currentJobInDate++;

            } else {

                $scope.currentJobInDate = 0
                
            }

            console.log($scope.currentJobInDate)
            $scope.slideOut = false;
            $scope.fadeOut2 = false
            $scope.fadeIn2 = true;
            $scope.slideIn = true;
            $scope.jobsPageOpen = true;

        }, 500)

    }
    $scope.changeJobInDate = function (index) {

        $scope.slideOut = true;
        $scope.fadeOut2 = true;
        $scope.addJobPageOpen = false;
        console.log(index)
        $scope.areYouSureRemove2 = false;

        $timeout(function () {

            if ($scope.currentJobInDate == 0) {

                $scope.currentJobInDate++;

            } else {

                $scope.currentJobInDate = 0

            }
    
            
            $scope.slideOut = false;
            $scope.fadeOut2 = false
            $scope.fadeIn2 = true;
            $scope.slideIn = true;
            $scope.jobsPageOpen = true;

        }, 500)

    }
    $scope.changeJobInDate2 = function (index) {

        $scope.slideOut = true;
        $scope.fadeOut2 = true;

        $timeout(function () {

            if ($scope.currentJobInDate == 1) {

                $scope.currentJobInDate--;

            } else {

                $scope.currentJobInDate = 1

            }
    
            $scope.slideOut = false;
            $scope.fadeOut2 = false
            $scope.fadeIn2 = true;
            $scope.slideIn = true;

        }, 500)

    }
    $scope.decreaseDay = function () {

        $scope.currentJobInDate = 0;
        $scope.fadeIn2 = false;
        $scope.slidein = false;
        $scope.slidedownout = true;
        $scope.fadeOut = true;

        $timeout(function () {

            $scope.slidedownout = false;
            $scope.fadeOut = false;
            $scope.slidedownin = true;
            console.log($scope.jobDetails.length)

            if ($scope.openJob > 0) {

                $scope.openJob = $scope.openJob - 1;

            } else {

                if ($scope.jobDetails[$scope.jobDetails.length - 1].length > 1) {

                    $scope.openJob = $scope.jobDetails.length - 1;

                } else {

                    $scope.openJob = $scope.jobDetails.length - 2

                }

            }

        }, 500)

        console.log($scope.openJob)
    }

    $scope.increaseDay = function () {

        $scope.currentJobInDate = 0;
        $scope.fadeIn2 = false;
        $scope.slideout = true;
        $scope.fadeOut = true;

        $timeout(function () {

            $scope.slideout = false;
            $scope.fadeOut = false;
            $scope.slidein = true;
            console.log($scope.jobDetails.length)

            if ($scope.openJob < 6) {

                if ($scope.jobDetails[$scope.openJob + 1].length < 1) {

                    console.log("Oy")
                    $scope.openJob = 0;

                } else {

                    $scope.openJob = $scope.openJob + 1;

                }

            } else {

                $scope.openJob = 0;

            }

        }, 500)

    }
    $scope.openDelinquentTimeSheetPage = function () {

        console.log("Clicked")

        if (!$scope.delinquentTimeSheetPageOpened) {

            $scope.fadeIn = false;

            $timeout(function () {

                console.log($scope.delinquentTimeSheetsArray)
                $scope.delinquentTimeSheetSelected = true;
                $scope.adminHome = false;
                $scope.disputesSelected = false;
                $scope.timesheetsSelected = false;
                $scope.jobsSelected = false;
                $scope.complaintsSelected = false;
                $scope.delinquentTimeSheetPageOpened = true;
                console.log($scope.delinquentTimeSheetPageOpened)
                $scope.userDetailsPageOpened = false;
                $scope.bookedJobsPageOpened = false;
                $scope.complaintsPageOpened = false;
                $scope.commentsPageOpened = false;
                $scope.delinquentTimeSheetsForPagination = [];
                $scope.delinquentTimeSheetsPaginated = [];
                $scope.pageLimit = 4

                for (var i = 0; i <= $scope.delinquentTimeSheetsArray.length; i++) {

                    var page = 0;

                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.delinquentTimeSheetsArray.length) {

                        console.log("yup,less")
                    }

                    if (i < $scope.pageLimit && i < $scope.delinquentTimeSheetsArray.length) {
                
                        if ($scope.delinquentTimeSheetsArray[i]) {

                            $scope.delinquentTimeSheetsForPagination.push($scope.delinquentTimeSheetsArray[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.delinquentTimeSheetsArray[i])

                        }

                    } else {

                        console.log("else")
                        $scope.loadingUsers = false;
                        console.log($scope.delinquentTimeSheetsForPagination)
                        $scope.delinquentTimeSheetsPaginated.push($scope.delinquentTimeSheetsForPagination)
                        console.log($scope.delinquentTimeSheetsPaginated)
                        $scope.delinquentTimeSheetsForPagination = [];

                        if ($scope.delinquentTimeSheetsArray[i] !== undefined) {

                            $scope.delinquentTimeSheetsForPagination.push($scope.delinquentTimeSheetsArray[i])
                            console.log("not undefined")
                        }

                        $scope.pageLimit = $scope.pageLimit + 4;
                        page++

                    }

                }

            }, 500)

        } else {

            $scope.delinquentTimeSheetPageOpened = false;

        }

    }

    $scope.openJobsPage = function (index) {

        $scope.usersPageIndex = index;

        if (!$scope.jobsPageOpen) {

            $scope.jobsPageOpen = true;
            $scope.jobsSelected = true;
            $scope.addJobPageOpen = false;
            $scope.delinquentTimeSheetSelected = false;
            $scope.timeSheetEntryOpen = false;
            $scope.disputesSelected = false;
            $scope.timesheetsSelected = false;
            $scope.disputesPageOpen = false;
            $scope.timesheetsPageOpen = false;
            $scope.notesPageOpen = false;
            $scope.payslipGenerationOpen = false;

        } else {

            
        }

    }
    $scope.openTimesheetsPage = function (index) {

        $scope.usersPageIndex = index;
        $scope.openJob = index;

        if (!$scope.timesheetsPageOpen) {

            $scope.jobsPageOpen = false;
            $scope.disputesPageOpen = false;
            $scope.timesheetsPageOpen = true;
            $scope.timesheetsSelected = true;
            $scope.disputesSelected = false;
            $scope.delinquentTimeSheetSelected = false;
            $scope.payslipGenerationOpen = false;
            $scope.jobsSelected = false;
            $scope.addJobPageOpen = false;
            $scope.notesPageOpen = false;

        } else {

            //$scope.timesheetsSelected = false;

        }

    }
    $scope.openCommentsPage = function (index) {

        $scope.openJob = 0;

        if ($scope.commentsPageOpened) {

            $scope.userDetailsPageOpened = true;
            $scope.commentsPageOpened = false;

        } else {

            $scope.commentsSelected = true;
            $scope.commentsPageOpened = true
            $scope.complaintsPageOpened = false;
            $scope.delinquentTimeSheetSelected = false;
            $scope.delinquentTimeSheetPageOpened = false;
            $scope.removeUserPageOpen = false;
            $scope.complaintsSelected = false;
            $scope.userDetailsPageOpened = false;
            $scope.payslipGenerationOpen = false;
            $scope.bookedJobsPageOpened = false;
            $scope.bookedJobsSelected = false;
            $scope.userDetailsPageOpened = false;

        }

    }
    $scope.openComplaintsPage = function () {

        $scope.openJob = 0;

        if ($scope.complaintsSelected) {

            $scope.complaintsSelected = false;
            $scope.complaintsPageOpened = false;
            $scope.userDetailsPageOpened = true;

        } else {

            $scope.complaintsSelected = true;
            $scope.complaintsPageOpened = true;
            $scope.commentsSelected = false;
            $scope.delinquentTimeSheetPageOpened = false;
            $scope.userDetailsPageOpened = false;
            $scope.commentsPageOpened = false;
            $scope.bookedJobsPageOpened = false;
            $scope.delinquentTimeSheetSelected = false;
            $scope.payslipGenerationOpen = false;
            $scope.bookedJobsSelected = false;

        }

    }
    $scope.openBookedJobsPage = function () {

        if ($scope.bookedJobsSelected) {

            $scope.bookedJobsSelected = false;
            $scope.bookedJobsPageOpened = false;
            $scope.userDetailsPageOpened = true;

        } else {

            $scope.bookedJobsSelected = true;
            $scope.complaintsPageOpened = false;
            $scope.bookedJobsPageOpened = true;
            $scope.delinquentTimeSheetSelected = false;
            $scope.delinquentTimeSheetPageOpened = false;
            $scope.removeUserPageOpen = false;
            $scope.addJobPageOpen = false;
            $scope.jobsPageOpen = true
            $scope.complaintsSelected = false;
            $scope.complaintsSelected = false;
            $scope.userDetailsPageOpened = false;
            $scope.payslipGenerationOpen = false;
            $scope.complaintsPageOpened = false;
            $scope.commentsSelected = false;
            $scope.commentsPageOpened = false;

        }

    }
    $scope.openClientList = function () {

        if ($scope.clientListOpen) {

            $scope.userDetailsPageOpened = false;
            $scope.userFilePage = false;
            $scope.clientHome = false;
            console.log($scope.employeeHome)

        } else {

            //if (!$scope.usersLoaded) {
            $scope.loadingUsers = true;
            $scope.clientListOpen = true;
            $scope.clientHome = false;
            $scope.delinquentTimeSheetPageOpened = false;
            $scope.payslipGenerationOpen = false;
            $scope.userFilePage = false;
            $scope.userList = true;
            $scope.pageLimit = 4
            $scope.clientsForPagination = [];
            $scope.clientsPaginated = [];

            User.getUsers().then(function (data) {

                console.log(data)
                $scope.employees = data.data.users

                for (var i = 0; i <= $scope.employees.length; i++) {

                    var page = 0;
                    console.log($scope.pageLimit, i, $scope.employees.length)
                    console.log($scope.employees)

                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.employees.length) {

                        console.log("yup,less")
                    }

                    if (i < $scope.pageLimit && i < $scope.employees.length) {

                        console.log("HELLO")
                        console.log($scope.pageLimit, i, $scope.employees.length)

                        if ($scope.employees[i]) {

                            if ($scope.employees[i].userclass == "client") {

                                $scope.clientsForPagination.push($scope.employees[i])

                            }

                        }

                    } else {


                        console.log("else")
                        $scope.loadingUsers = false;
                        $scope.clientsPaginated.push($scope.clientsForPagination)
                        console.log($scope.clientsPaginated)
                        $scope.pageArray = [];

                        if ($scope.employees[i] !== undefined && $scope.employees[i].userclass == "client") {

                            $scope.clientsForPagination.push($scope.employees[i])

                        }

                        $scope.pageLimit = $scope.pageLimit + 4;
                        console.log($scope.pageLimit, i, $scope.employees.length)
                        page++

                    }

                }

                $scope.usersLoaded = true;
                $scope.loadingUsers = false;

            })
        

        }
    }
    $scope.openEmployeeListAdmin = function () {


        $scope.delinquentTimeSheet = false;
        $scope.bookedJobsPageOpened = false;
        $scope.bookedJobsSelected = false;
        $scope.removeUserPageOpen = false;
        $scope.complaintsPageOpened = false;
        $scope.timesheetsPageOpen = false;
        $scope.notesPageOpen = false;
        $scope.complaintsSelected = false;

        if ($scope.employeeListOpenAdmin) {

            // $scope.employeeListOpen = false;
            $scope.userDetailsPageOpened = false;
            $scope.userFilePage = false;
            $scope.employeeHome = false;
            console.log($scope.employeeHome)

        } else {

            if (!$scope.usersLoaded) {

                $scope.fadeIn = false;
                $timeout(function(){

                $scope.adminHome = false;
                $scope.employeesPaginated = [];
                $scope.pageArray = []
                $scope.loadingUsers = true;
                $scope.employeeListOpenAdmin = true;
                $scope.delinquentTimeSheetPageOpened = false;
                $scope.payslipGenerationOpen = false;
                $scope.userFilePage = false;
                $scope.userList = true;
                $scope.pageLimit = 4

                User.getUsers().then(function (data) {

                    console.log(data)
                    $scope.employees = data.data.users

                    for (var i = 0; i <= $scope.employees.length; i++) {

                        var page = 0;
                        console.log($scope.pageLimit, i, $scope.employees.length)
                        console.log($scope.employees)
                        // var pageLimit = 4;//3i
                        if (i < $scope.pageLimit) {

                            console.log("its less")

                        }
                        if (i < $scope.employees.length) {

                            console.log("yup,less")

                        }
                        if (i < $scope.pageLimit && i < $scope.employees.length) {

                            console.log("HELLO")
                            console.log($scope.employees[i])
                            console.log($scope.pageLimit, i, $scope.employees.length)

                            if ($scope.employees[i]) {

                                $scope.pageArray.push($scope.employees[i])
                                console.log(i)
                                console.log("firstCondiation")
                                console.log($scope.pageArray)

                            }

                        } else {
                            
                            console.log("else")
                            console.log($scope.pageArray)
                            $scope.loadingUsers = false;
                            $scope.employeesPaginated.push($scope.pageArray)
                            console.log($scope.employeesPaginated)
                            $scope.pageArray = [];

                            if ($scope.employees[i] !== undefined) {

                                $scope.pageArray.push($scope.employees[i])

                            }

                            $scope.pageLimit = $scope.pageLimit + 4;
                            console.log($scope.pageLimit, i, $scope.employees.length)
                            page++

                        }

                    }

                    $scope.usersLoaded = true;
                    $scope.loadingUsers = false;

                })

                },500)
            
            } else {
                console.log("HERE")
                $scope.fadeIn = false;
                $timeout(function(){
                    $scope.adminHome = false;
                    $scope.loadingUsers = true;
                $scope.employeeListOpenAdmin = true
                $scope.employeeHome = false;
                $timeout(function () {
                    $scope.loadingUsers = false;
                    $scope.usersLoaded = true;

                }, 1000)
                $scope.employeeListOpen = true;

                $scope.delinquentTimeSheetPageOpened = false;
                $scope.payslipGenerationOpen = false;
                $scope.userFilePage = false;
                $scope.userList = true;
                $scope.pageLimit = 4


                },500)
            
            }


        }
    }
    $scope.openEmployeeList = function () {


        $scope.delinquentTimeSheet = false;
        $scope.bookedJobsPageOpened = false;
        $scope.bookedJobsSelected = false;
        $scope.complaintsPageOpened = false;
        $scope.timesheetsPageOpen = false;
        $scope.notesPageOpen = false;
        $scope.complaintsSelected = false;

        if ($scope.employeeListOpen) {

            $scope.userDetailsPageOpened = false;
            $scope.userFilePage = false;
            $scope.employeeHome = false;
            console.log($scope.employeeHome)

        } else {

            if (!$scope.usersLoaded) {

                $scope.loadingUsers = true;
                $scope.employeeListOpen = true;
                $scope.delinquentTimeSheetPageOpened = false;
                $scope.payslipGenerationOpen = false;
                $scope.userFilePage = false;
                $scope.userList = true;
                $scope.pageLimit = 4

                User.getUsers().then(function (data) {

                    console.log(data)
                    $scope.employees = data.data.users

                    for (var i = 0; i <= $scope.employees.length; i++) {

                        var page = 0;
                        console.log($scope.pageLimit, i, $scope.employees.length)
                        console.log($scope.employees)

                        if (i < $scope.pageLimit) {

                            console.log("its less")

                        }
                        if (i < $scope.employees.length) {

                            console.log("yup,less")
                        }

                        if (i < $scope.pageLimit && i < $scope.employees.length) {

                            console.log("HELLO")
                            console.log($scope.employees[i])
                            console.log($scope.pageLimit, i, $scope.employees.length)

                            if ($scope.employees[i]) {

                                $scope.pageArray.push($scope.employees[i])
                                console.log(i)
                                console.log("firstCondiation")
                                console.log($scope.pageArray)

                            }

                        } else {

                            if (!$scope.usersLoaded) {

                                console.log("else")
                                console.log($scope.pageArray)
                                $scope.loadingUsers = false;
                                $scope.employeesPaginated.push($scope.pageArray)
                                console.log($scope.employeesPaginated)
                                $scope.pageArray = [];

                                if ($scope.employees[i] !== undefined) {

                                    $scope.pageArray.push($scope.employees[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                console.log($scope.pageLimit, i, $scope.employees.length)
                                page++

                            }

                        }

                    }

                    $scope.usersLoaded = true;
                    $scope.loadingUsers = false;

                })

            } else {

                console.log("HERE")
                $scope.loadingUsers = true;
                $scope.employeeHome = false;

                $timeout(function () {

                    $scope.loadingUsers = false;
                    $scope.usersLoaded = true;

                }, 1000)

                $scope.employeeListOpen = true;
                $scope.delinquentTimeSheetPageOpened = false;
                $scope.payslipGenerationOpen = false;
                $scope.userFilePage = false;
                $scope.userList = true;
                $scope.pageLimit = 4

            }

        }

    }
    $scope.openEmployeeHome = function () {

        console.log("clicked")
        $scope.employeeHome = true;
        $scope.employeeListOpen = false;

    }
    $scope.openCloseIssue = function () {

        console.log($scope.openIssue)

        if (!$scope.openIssue) {

            $scope.openIssue = true
            $scope.closeIssue = false;

        } else {

            $scope.openIssue = false
            $scope.closeIssue = true;

        }

    }
    $scope.openManagementPage = function () {

        User.findUser($rootScope.user_id).then(function (data) {

            console.log()
            $scope.disputedTimeSheetsArray = data.data.user[0].disputedtimesheets
            $scope.requestedJobsArray = data.data.user[0].requestedjobs
            $scope.approvedJobsArray = data.data.user[0].approvednotbooked
            $scope.payPeriodNum = data.data.user[0].payperiodnum
            $scope.adminMessagesArray = data.data.user[0].comments

        })
        $scope.managementPage = true;
        $scope.adminHome = true;
        $scope.delinquentIndex = null;
        $scope.disputeIndex = null
        $scope.messageIndex = null;
        $scope.approvedIndex = null;
        $scope.requestIndex = null;
        $scope.delinquentTimeSheetPageOpened = false;
        $scope.disputedInfo = false;
        $scope.delinquentTimeSheetInfo = false;
        $scope.employeeListOpenAdmin = false;
        $scope.employeeHome = true
        $scope.fadeIn = true;
        $scope.chartsPageOpen = false;
        $scope.disputedTimeSheetsPageOpen = false;
        $scope.approvedJobsPageOpen = false
        $scope.requestedJobsPageOpen = false;
        $scope.adminMessagesPageOpen = false;
        $scope.personalHistoryTitle = false;
        $scope.payslipPageOpen = false;
        $scope.employeesPage = false;
        $scope.payslipPageSelected = false;;
        $scope.clientsPage = false;
        $scope.payslipPageOpen = false;
        $scope.curPeriod = null;

    }
    $scope.openClientsHome = function () {

        $scope.clientHome = true;
        $scope.clientListOpen = false;

    }
    $scope.openClientsPage = function () {

        console.log("clicked")
        console.log($scope.clientsPage)

        if ($scope.clientsPage) {


        } else {

            $scope.clientsPage = true;
            $scope.adminHome = false;
            $scope.employeesPage = false;
            $scope.managementPage = false;
            $scope.payslipPageSelected = false;
            $scope.payslipPageOpen = false;

        }

    }
    $scope.openEmployeesPage = function () {

        console.log("clicked")
        console.log($scope.employeesPage)

        if ($scope.employeesPage) {

            //$scope.employeesPage = false;

        } else {

            $scope.employeesPage = true;
            $scope.employeeListOpen = false;
            $scope.employeeHome = true;
            $scope.historyPageOpen = false;
            $scope.generalHistoryOpen = false;
            $scope.personalHistoryOpen = false;
            $scope.curHistory = null;
            console.log($scope.employeesPage)
            $scope.currentUserFile = "";
            $scope.clientsPage = false;
            $scope.managementPage = false;
            $scope.payslipPageSelected = false;
            $scope.payslipPageOpen = false;
        }

    }
    $scope.openComplaints = function () {

        $scope.openJob = 0;

        if ($scope.bookedJobs) {

            $scope.bookedJobs = false;

        }
        if ($scope.complaintsOpened) {

            $scope.complaintsOpened = false;

        } else {

            $scope.complaintsOpened = true;

        }

    }
    $scope.openCloseBookedJobs = function () {

        if ($scope.complaintsOpened) {

            $scope.complaintsOpened = false;

        }
        if ($scope.bookedJobs) {

            $scope.bookedJobs = false;

        } else {

            $scope.bookedJobs = true;

        }

    }
    $scope.openUserFileHistoryManageTimeSheets = function (name, phonenumber,id) {

        $scope.openJob = 0;
        $scope.historyPageOpenProfile = true;
        $scope.generalHistoryOpen = false;
        $scope.generalHistoryTitle = false;
        $scope.loadingPersonalHistory = true;
        $scope.personalHistoryTitle = true;
        $scope.personalHistoryOpen = true;
        $scope.employeeHome = false;
        $scope.searchResults = false;
        $scope.userList = false;
        $scope.employeeListOpen = false;
        // $scope.userDetailsPageOpened = true;
        $scope.bookedJobsPageOpened = false;
        $scope.complaintsPageOpened = false;
        $scope.commentsPageOpened = false;
        console.log(phonenumber)
        console.log(name)
        //$scope.currentUserFile = name;
        $scope.currentUserHistoryFile = name;
        $scope.currentUserId = id;
        $scope.currentUserPhoneNumber = phonenumber;
        $scope.jobDetails = [];
        //$scope.employeesPaginated = [];
        $scope.hoursArrayForHistory = [];
    
        User.findUser(id).then(function (data) {

            console.log(data.data.user)
            $scope.payPeriodHistory = data.data.user[0].payperiodhistory
            console.log($scope.payPeriodHistory)

            for (var b = 0; b < $scope.payPeriodHistory.length; b++) {
            
                for (var c = 0; c < $scope.payPeriodHistory[b].entry.length; c++) {

                    $scope.hoursCalcIterator = 0;

                    for (var x = 0; x < $scope.payPeriodHistory[b].entry[x].length; x++) {

                        console.log($scope.payPeriodHistory[b].entry[c])

                        if ($scope.payPeriodHistory[b].entry[c][0] !== undefined) {

                            $scope.labels[c] = $scope.payPeriodHistory[b].entry[c][0].date

                            if ($scope.payPeriodHistory[b].entry[c][x + 1] !== undefined) {

                                console.log("HOlk")
                                $scope.hoursCalIterator = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1];
                                console.log($scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated)
                                $scope.data2[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated;

                            } else {

                                console.log("choOlk")
                                console.log($scope.payPeriodHistory[b].entry[c], x)

                                if ($scope.payPeriodHistory[b].entry[c][x]) {

                                    $scope.data2[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated;

                                }

                            }

                        }

                    }

                    var hoursIterator = 0;
                    var minIterator = 0;
                
                }

            }
            $scope.loadingPersonalHistory = false;
            console.log($scope.payperiods)
            console.log($scope.currentUserFile)
            console.log($scope.payPeriodHistory)

        })

        console.log(name);
        console.log("Curent User", $scope.currentUserFile)
        if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile !== name) {

            $scope.currentUserFile = name;
            $scope.userFilePage = true;

        }

    }
    $scope.openUserFileHistory = function (name, phonenumber) {

        $scope.openJob = 0;
        $scope.historyPageOpenProfile = true;
        $scope.individualUser = true;
        $scope.generalHistoryOpen = false;
        $scope.generalHistoryTitle = false;
        $scope.loadingPersonalHistory = true;
        $scope.personalHistoryTitle = true;
        $scope.personalHistoryOpen = true;
        $scope.employeeHome = false;
        $scope.searchResults = false;
        $scope.userList = false;
        $scope.employeeListOpen = false;
        $scope.userDetailsPageOpened = true;
        $scope.bookedJobsPageOpened = false;
        $scope.complaintsPageOpened = false;
        $scope.commentsPageOpened = false;
        console.log(phonenumber)
        console.log(name)
        //$scope.currentUserFile = name;
        $scope.currentUserHistoryFile = name;
        $scope.currentUserPhoneNumber = phonenumber;
        $scope.jobDetails = [];
        //$scope.employeesPaginated = [];
        $scope.hoursArrayForHistory = [];

        User.findUser($scope.currentUserHistoryFile).then(function (data) {

            $scope.payPeriodHistory = data.data.user[0].payperiodhistory
            console.log($scope.payPeriodHistory)


            for (var b = 0; b < $scope.payPeriodHistory.length; b++) {

                for (var c = 0; c < $scope.payPeriodHistory[b].entry.length; c++) {

                    $scope.hoursCalcIterator = 0;

                    for (var x = 0; x < $scope.payPeriodHistory[b].entry[x].length; x++) {

                        console.log($scope.payPeriodHistory[b].entry[c])
                        if ($scope.payPeriodHistory[b].entry[c][0] !== undefined) {

                            $scope.labels[c] = $scope.payPeriodHistory[b].entry[c][0].date

                            if ($scope.payPeriodHistory[b].entry[c][x + 1] !== undefined) {

                                console.log("HOlk")
                                $scope.hoursCalIterator = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1];
                                console.log($scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated)
                                $scope.data2[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated;


                            } else {

                                console.log("choOlk")
                                console.log($scope.payPeriodHistory[b].entry[c], x)

                                if ($scope.payPeriodHistory[b].entry[c][x]) {

                                    $scope.data2[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated;

                                }

                            }

                        }

                    }

                    var hoursIterator = 0;
                    var minIterator = 0;
                
                }


            }
            $scope.loadingPersonalHistory = false;
            console.log($scope.payperiods)
            console.log($scope.currentUserFile)
            console.log($scope.payPeriodHistory)

        })

        if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile !== name) {

            $scope.currentUserFile = name;
            $scope.userFilePage = true;

        }
    }
    $scope.openUserFileHistory2 = function (name, phonenumber) {

        $scope.openJob = 0;
        $scope.historyPageOpenProfile = true;
        $scope.generalHistoryOpen = false;
        $scope.generalHistoryTitle = false;
        $scope.loadingPersonalHistory = true;
        $scope.personalHistoryTitle = true;
        $scope.personalHistoryOpen = true;
        $scope.employeeHome = false;
        $scope.searchResults = false;
        $scope.userList = false;
        $scope.employeeListOpen = false;
        $scope.userDetailsPageOpened = true;
        $scope.bookedJobsPageOpened = false;
        $scope.complaintsPageOpened = false;
        $scope.commentsPageOpened = false;
        console.log(phonenumber)
        console.log(name)
        //$scope.currentUserFile = name;
        $scope.currentUserHistoryFile = name;
        $scope.currentUserPhoneNumber = phonenumber;
        $scope.jobDetails = [];
        //$scope.employeesPaginated = [];
        $scope.hoursArrayForHistory = [];

        User.findUser($scope.currentUserHistoryFile).then(function (data) {

            $scope.payPeriodHistory = data.data.user[0].payperiodhistory
            console.log($scope.payPeriodHistory)
            $scope.loadingPersonalHistory = false;
            console.log($scope.payperiods)
            console.log($scope.currentUserFile)

        })

        console.log(name);
        console.log("Curent User", $scope.currentUserFile)

        if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile !== name) {

            $scope.currentUserFile = name;
            $scope.userFilePage = true;
        }

    }
    $scope.approveJob = function (job, index, currentIndex) {

        job.index = index;
        job.currentIndex = currentIndex
        $scope.approvingRequest = true;
        console.log(job)
        job.approved = true;

        User.changeRequestedJobToApproved(job).then(function (data) {

            console.log(data)
            User.findUser($scope.name).then(function (data) {

                console.log(data.data)
                $scope.approvedJobsArray = data.data.user[0].approvednotbooked
                $scope.approvedJobsPaginated = []
                $scope.approvedJobsForPagination = []

                for (var i = 0; i <= $scope.approvedJobsArray.length; i++) {

                    var page = 0;
                
            
                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.approvedJobsArray.length) {

                        console.log("yup,less")
                    }
                    if (i < $scope.pageLimit && i < $scope.approvedJobsArray.length) {

                        console.log("HELLO")
                    
                        if ($scope.approvedJobsArray[i] && $scope.approvedJobsArray[i].approved) {

                            $scope.approvedJobsForPagination.push($scope.approvedJobsArray[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.pageArray)

                        }

                    } else {


                        console.log("else")
                        $scope.loadingUsers = false;
                        $scope.approvedJobsPaginated.push($scope.approvedJobsForPagination)
                        console.log($scope.approvedJobsPaginated)
                        $scope.approvedJobsForPagination = [];

                        if ($scope.approvedJobsArray[i] !== undefined && $scope.approvedJobsArray[i].approved) {

                            $scope.approvedJobsForPagination.push($scope.approvedJobsArray[i])

                        }
                        $scope.pageLimit = $scope.pageLimit + 4;
                        page++

                    }

                }

            })

            $scope.requestIndex = null;
            $scope.requestedJobsPageOpen = false;
            $scope.openRequestedJobsPage();
            $scope.approvingRequest = false;

        })

    }
    $scope.disApproveJob = function (job, index, currentIndex) {


        job.index = index;
        job.currentIndex = currentIndex
        job.approvedjobindex = index;
        job.approved = false;
        $scope.disApprovingRequest = true;
        console.log(job)

        User.changeRequestedJobToDisApproved(job).then(function (data) {

            console.log(data)

            User.findUser($scope.name).then(function (data) {

                $scope.requestedJobsArray = data.data.user[0].requestedjobs
                $scope.requestedJobsForPagination = []
                $scope.requestedJobsPaginated = []

                for (var i = 0; i <= $scope.requestedJobsArray.length; i++) {

                    var page = 0;
            
                    
                    if (i < $scope.pageLimit) {

                        console.log("its less")

                    }
                    if (i < $scope.requestedJobsArray.length) {

                        console.log("yup,less")
                    }

                    if (i < $scope.pageLimit && i < $scope.requestedJobsArray.length) {

                        console.log("HELLO")
                        
                        
                        if ($scope.requestedJobsArray[i] && !$scope.requestedJobsArray[i].approved) {

                            $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])
                            console.log(i)
                            console.log("firstCondiation")
                            console.log($scope.pageArray)

                        }

                    } else {

                        console.log("else")
                        $scope.loadingUsers = false;
                        $scope.requestedJobsPaginated.push($scope.requestedJobsForPagination)
                        console.log($scope.requestedJobsPaginated)
                        $scope.requestedJobsForPagination = [];

                        if ($scope.requestedJobsArray[i] !== undefined && !$scope.requestedJobsArray[i].approved) {

                            $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])

                        }

                        $scope.pageLimit = $scope.pageLimit + 4;
                        page++

                    }

                }

            })

            $scope.approvedIndex = null
            $scope.disApprovingRequest = false;
            $scope.approvedJobsPageOpen = false;
            $scope.openApprovedJobsPage();

        })

    }
    $scope.openIndividualRequestedJob = function (index) {

        $scope.removeRequestedJobPageOpen = false;

        if ($scope.individualRequestedJobOpen && index !== $scope.requestIndex) {

            $scope.messageLoading = true;
            $scope.requestIndex = index;
            console.log("first")
            console.log($scope.timesheetEntryOpen)

        }
        else if (!$scope.individualRequestedJobOpen && index == $scope.requestIndex) {

            $scope.individualSupervisorOpen = true;
            console.log("second")
            console.log($scope.timesheetEntryOpen)

        }
        else if (!$scope.individualRequestedJobOpen && index !== $scope.requestIndex) {

            console.log("third")
            $scope.individualRequestedJobOpen = true;
            console.log($scope.timesheetEntryOpen)
            $scope.requestIndex = index;

        } else {

            console.log("last")
            $scope.requestIndex = null

        }

    }
    $scope.openRequestedJobsPage2 = function () {

        console.log($scope.requestedJobsArray)
        $scope.requestedJobsPageSelected = true;

        if (!$scope.requestedJobsPageOpen) {

            $scope.requestedJobsPageOpen = true;
            $scope.pageLimit = 4;
            $scope.requestedJobsPaginated = [];
            $scope.requestedJobsForPagination = [];

            for (var i = 0; i <= $scope.requestedJobsArray.length; i++) {

                var page = 0;
    
                if (i < $scope.pageLimit) {

                    console.log("its less")

                }
                if (i < $scope.requestedJobsArray.length) {

                    console.log("yup,less")
                }
                if (i < $scope.pageLimit && i < $scope.requestedJobsArray.length) {

                    console.log("HELLO")
                    //console.log($scope.employees[i])
                    //console.log($scope.pageLimit, i, $scope.employees.length)

                    if ($scope.requestedJobsArray[i] && $scope.requestedJobsArray[i].length > 0) {

                        $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])
                        console.log(i)
                        console.log("firstCondiation")
                        console.log($scope.pageArray)

                    }

                } else {

                    console.log("else")
                    $scope.loadingUsers = false;
                    $scope.requestedJobsPaginated.push($scope.requestedJobsForPagination)
                    console.log($scope.requestedJobsPaginated)
                    $scope.requestedJobsForPagination = [];

                    if ($scope.requestedJobsArray[i] !== undefined) {

                        $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])

                    }

                    $scope.pageLimit = $scope.pageLimit + 4;
                    page++

                }

            }

        }

    }
    $scope.openClientFile = function (name) {

        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $scope.clientHome = false;
        $scope.clientListOpen = false;
        $scope.loadingCurrentClient = true;
        $scope.currentClientFile = name
        $scope.clientDetailsPageOpen = true;
        
        User.findUser($scope.currentClientFile).then(function (data) {

            console.log(data)
            $scope.requestedJobsArray = data.data.user[0].requestedjobs
            $scope.currentClientObject = data.data.user[0]

        })

    }
    $scope.closeAddJobPage = function () {

        $scope.addJobPageOpen = false;
        $scope.jobsPageOpen = true;

    }
    $scope.openUserFile = function (name, phonenumber,id) {

        $('html, body').animate({ scrollTop: 0 }, 'fast');
        console.log(id)
        $scope.openJob = 0;
        $scope.individualUser = true;
        $scope.employeeHome = false;
        $scope.loadingCurrentEmployee2 = true;
        $scope.searchResults = false;
        $scope.userList = false;
        $scope.employeeListOpen = false;
        $scope.employeeListOpenAdmin = false;
        $scope.userDetailsPageOpened = true;
        $scope.delinquentTimeSheetPageOpened = false;
        $scope.bookedJobsPageOpened = false;
        $scope.complaintsPageOpened = false;
        $scope.commentsPageOpened = false;
        console.log(phonenumber)
        console.log(name)
        $scope.currentUserFile = name;
        $scope.currentUserPhoneNumber = phonenumber;
        $scope.delinquentTimeSheetArray = [];
        $scope.jobDetails = [];

        if ($scope.usersLoaded) {

            console.log("users loaded")

            User.findUser(id).then(function (data) {

                console.log(data)
                $scope.currentEmployee = data.data.user
                $scope.loadingCurrentEmployee2 = false;
                console.log("$scope.loadingCurrentEMployee", $scope.loadingCurrentEmployee)
                $scope.payperiods = data.data.user[0].payperiods;
                $scope.payPeriodHistory = data.data.user[0].payperiodhistory
                $scope.delinquenttimesheets = data.data.user[0].delinquenttimesheets

                if ($scope.delinquenttimesheets.length > 0) {

                    $scope.delinquentTimeSheet = true;

                    for (var t = 0; t < $scope.delinquenttimesheets.length; t++) {

                        $scope.delinquentTimeSheetArray.push($scope.delinquenttimesheets[t])

                    }

                } else {

                    $scope.delinquentTimeSheet = false;

                }

                console.log($scope.delinquentTimeSheetArray)
                console.log($scope.payperiods)
                console.log($scope.currentUserFile)
                console.log($scope.payPeriodHistory)
                $scope.payperiod = data.data.user[0].payperiodnum;

                /*CHECK IF THE JOBDETAIL DATE HAS PASSED AND DISABLE IF TRUE*/

                for (var u = 0; u < $scope.payperiods[0].jobDetails.length; u++) {

                    console.log($scope.payperiods[0].jobDetails[u], $scope.dateNow)

                }      

                console.log($scope.month, $scope.payperiods[0].jobDetails[0][0].monthNum)
                console.log($scope.month, $scope.payperiods[0].jobDetails[1][0].monthNum)
                console.log($scope.month, $scope.payperiods[0].jobDetails[2][0].monthNum)
                console.log($scope.month, $scope.payperiods[0].jobDetails[3][0].monthNum)
                console.log($scope.month, $scope.payperiods[0].jobDetails[4][0].monthNum)
                console.log($scope.month, $scope.payperiods[0].jobDetails[5][0].monthNum)
                console.log($scope.month, $scope.payperiods[0].jobDetails[6][0].monthNum)

                if ($scope.payperiods[0].jobDetails[0][0].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[0][0].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[0][0].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[0][0].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[0][0].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[0][0].dateHasPassed = false;

                }

                if ( $scope.payperiods[0].jobDetails[0][1].dateNum < $scope.dateNow &&  $scope.payperiods[0].jobDetails[0][1].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[0][1].dateNum > $scope.dateNow &&  $scope.payperiods[0].jobDetails[0][1].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[0][1].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[0][1].dateHasPassed = false;

                }

                if ($scope.payperiods[0].jobDetails[1][0].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[1][0].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[1][0].dateNum > $scope.dateNow &&$scope.payperiods[0].jobDetails[1][0].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[1][0].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[1][0].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[1][1].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[1][1].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[1][1].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[1][1].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[1][1].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[1][1].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[2][0].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[2][0].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[0][0].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[0][0].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[2][0].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[2][0].dateHasPassed = false;

                }
                if ( $scope.payperiods[0].jobDetails[2][1].dateNum < $scope.dateNow &&  $scope.payperiods[0].jobDetails[2][1].monthNum == $scope.month
                    ||  $scope.payperiods[0].jobDetails[2][1].dateNum > $scope.dateNow &&  $scope.payperiods[0].jobDetails[2][1].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[2][1].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[2][1].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[3][0].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[3][0].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[3][0].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[3][0].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[3][0].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[3][0].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[3][1].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[3][1].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[3][1].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[3][1].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[3][1].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[3][1].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[4][0].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[4][0].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[4][0].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[4][0].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[4][0].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[4][0].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[4][1].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[4][1].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[4][1].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[4][1].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[4][1].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[4][1].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[5][0].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[5][0].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[5][0].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[5][0].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[5][0].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[5][0].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[5][1].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[5][1].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[5][1].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[5][1].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[5][1].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[5][1].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[6][0].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[6][0].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[6][0].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[6][0].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[6][0].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[6][0].dateHasPassed = false;

                }
                if ($scope.payperiods[0].jobDetails[6][1].dateNum < $scope.dateNow && $scope.payperiods[0].jobDetails[6][1].monthNum == $scope.month
                    || $scope.payperiods[0].jobDetails[6][1].dateNum > $scope.dateNow && $scope.payperiods[0].jobDetails[6][1].monthNum !== $scope.month) {

                    console.log($scope.jobDetails[u])
                    $scope.payperiods[0].jobDetails[6][1].dateHasPassed = true;

                } else {

                    $scope.payperiods[0].jobDetails[6][1].dateHasPassed = false;

                }

                $scope.jobDetails = $scope.payperiods[0].jobDetails
                console.log($scope.jobDetails)
                console.log($scope.month)

                /*CHECK IF THE JOBDETAIL DATE HAS PASSED AND DISABLE IF TRUE*/
                /*NOT NEEDED WHEN ONLY ONE PAY PERIOD EXISTS...*/

            })

        } else {

            console.log("Userlist not loaded")

            User.findUser($scope.currentUserFile).then(function (data) {

                console.log(data)
                $scope.currentEmployee = data.data.user
                $scope.loadingCurrentEmployee = false;
                $scope.comments = data.data.user[0].comments

                if ($scope.comments.length < 1) {

                    $scope.noComments = true;

                }
                if (data.data.user[0].complaints.length < 1) {

                    $scope.noComplaints = true;

                }

                $scope.payperiods = data.data.user[0].payperiods;
                $scope.payPeriodHistory = data.data.user[0].payperiodhistory
                $scope.delinquenttimesheets = data.data.user[0].delinquenttimesheets

                if ($scope.delinquenttimesheets.length > 0) {

                    $scope.delinquentTimeSheet = true;

                    for (var t = 0; t < $scope.delinquenttimesheets[0].length; t++) {

                        $scope.delinquentTimeSheetArray.push($scope.delinquenttimesheets[0][t])

                    }

                } else {

                    $scope.delinquentTimeSheet = false;
                }

                console.log($scope.delinquentTimeSheetArray)
                console.log($scope.payperiods)
                console.log($scope.currentUserFile)
                console.log($scope.payPeriodHistory)
                $scope.payperiod = data.data.user[0].payperiodnum;



                /* NOT NEEDED WHEN ONLY ONE PAY PERIOD EXISTS... */

                /* for (var k = 0; k < $scope.payperiods.length; k++) {
                    //console.log($scope.payperiods[k].payperiodnum)
                    //console.log($rootScope.payPeriod)
                    if ($scope.payperiods[k].payperiodnum == $rootScope.payPeriod) {
                        console.log($scope.payperiods[k].jobDetails)

                        $scope.jobDetails = $scope.payperiods[k].jobDetails
                    }

                }
                */

                /*CHECK IF THE JOBDETAIL DATE HAS PASSED AND DISABLE IF TRUE*/



                for (var u = 0; u < $scope.payperiods[0].jobDetails.length; u++) {


                    if ($scope.payperiods[0].jobDetails[u].dateNum < $scope.dateNow) {

                        $scope.payperiods[0].jobDetails[u].dateHasPassed = true;

                    } else {

                        $scope.payperiods[0].jobDetails[u].dateHasPassed = false;

                    }

                }
                $scope.jobDetails = $scope.payperiods[0].jobDetails

                /*CHECK IF THE JOBDETAIL DATE HAS PASSED AND DISABLE IF TRUE*/


                /*NOT NEEDED WHEN ONLY ONE PAY PERIOD EXISTS...*/

            })

        }

        console.log(name);
        console.log("Curent User", $scope.currentUserFile)

        if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if (!$scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile == name) {

            $scope.userFilePage = true;

        } else if ($scope.userFilePage && $scope.currentUserFile !== name) {

            $scope.currentUserFile = name;
            $scope.userFilePage = true;

        }

    }               

})

}());