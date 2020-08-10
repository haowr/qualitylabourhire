(function () {


    var app = angular.module('profileController', ['userServices'])

    app.config(function () {

        //console.log("Profile Controller Loaded")

    })

    app.controller('profileCtrl', function ($scope, User, $routeParams, Auth, $timeout, $window, $rootScope) {

        $scope.$on('$routeChangeSuccess', function () {

            $('.carousel').carousel();

        });
        $rootScope.$on('$routeChangeStart', function () {

            $rootScope.loggedIn = Auth.isLoggedIn()

            Auth.getUser().then(function (data) {

                $rootScope.payPeriod = data.data.payperiod;
                $rootScope.userClassy = $rootScope.userClass

            })

        })

        $scope.loadingProfile = true;
        
               if (Auth.isLoggedIn()) {
                   //console.log("Logged In")
                    //$rootScope.payPeriod = data.data.payperiod;
                   // $rootScope.userClassy = $rootScope.userClass
                }else{
                   Auth.logout();
                }
                        $rootScope.userClassy = $rootScope.userClass

        $scope.name = "";
        $scope.email = "";
        $scope.clientPage = false;
        $scope.userClass = "";
        $scope.userToken = "";
        $scope.userPhoneNumber = "";
        $scope.userEmail = ""
        $scope.userPayRate = "";
        $scope.currentJobInDate = 0;
        $scope.test = "tes"
        $scope.monthPosition = 1;
        $scope.currentMonth = "JANUARY";
        $scope.qlhLogo = 'data:image/jpeg;base64,/9j/4QaiRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAeAAAAcgEyAAIAAAAUAAAAkIdpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxODowNToyNiAxNjozNDo1MAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAY6ADAAQAAAABAAAAVAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAAVsAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/' +
            'bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAVABjAwEiAAIRAQMRAf/dAAQAB//EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A9VSSSSUpJJJJSkkkklKSSSSUpJJJJSkkkklKSSSSU//Q9USSSSUpJJJJSkHJzMbEZvyLG1jtPJ/qt+kq+Xd1Oy44+HUK2j6WTZwJ/wBGz89LF6Rj0v8AXuJyck83W6/5jfosUMsk5Exxx20M5+mA/uj5sjKIQAEpy32hDWf1/cRjq+Rd7sTBtur7PdFYP9Xep1dYo3ivKY/EsOgFohp/q2/QV9RsrrtYWWND2nlrhIS9vMNfd4j2lGPB/wA31/8APVx4zp7dDuJHj/53pZAgiRqElTZhWYxnCs2198ewks/6276dStVuc5suaWO7tMH8QpIyJ0lHhP8AjR/' +
            'wZLJRA1BsfZL/ABWSSSSctUkkkkp//9H1VJJJJSG6q95/R3GryDWn/qlVtxOoAF56iWNaJJNbIAHclaC5v/GKckfUzqf2ad/pjdt52b2et/4Fv3JksUZbmX0nOP8A0ZL45DHbh+sYy/6Qa+P9Y+l5eaMHG+s1L8hx2tYGMhzv3WPP6N/9hyvl946i3ph6z+vOr9ZuP6TdxrB2+p/V3LkPrTX9Wm/4tcV2EKBfsx/sTq9vqm6Wert2/pPV/nfWWhTY+v8Axj9OdmODLf2KPVLjHv3e/n+Umfdsfef/AIbl/wC/Xe/PtD/wvH/3r2FnUsLEycXAyshozMsEUMdo6wsE2FoHtUh1PAd1F3Sxc05za/WdRruFZO31P6u5cX9eHZ9n1u+rB6Q+j7YftXoPv3Opnazd6no+/wCju+iodAHWm/4y8kdbdjPzP2YNcQPFez1GbP5/371MxPoKSSSSlJJJJKUkkkkp/9L1RJOkkpZM9jHscx7Q5jgQ5pEgg8ghSSSU8b1H/Fv0sdQxOqdBrp6fmYt3qvY9hsosH7rqHO/ROb/g31La6r9U/q91q9uV1XCZk5DWCsPLniGgl232OZ+c5bCSSnLx/qz0LGOE6jEaw9M3/YiC79H6utu2Xfn/AMtWW9K6e3qbuqikDPfV6Dr5MmsHd6cTs+l/JVtJJSySdJJSySdJJSySdJJT/9P1RJOkkpZJOkkpZJOkkpZJOkkpZJOkkpZJOkkpZJOkkp//1PVUl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKf/2f/' +
            'tDpxQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNBDoAAAAAAOUAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAADABQAHIAbwBvAGYAIABTAGUAdAB1AHAAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4Qkl' +
            'NBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAI4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADSQAAAAYAAAAAAAAAAAAAAFQAAABjAAAACgBVAG4AdABpAHQAbABlAGQALQAyAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAABjAAAAVAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAVAAAAABSZ2h0bG9uZwAAAGMAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAFQAAAAAUmdodGxvbmcAAABjAAAAA3VybFRFWFQAAAABAAAAAAAAbnVsbFRFWFQAAAABAAAAAAAATXNnZVRFWFQAAAABAAAAAAAGYWx0VGFnVEVYVAAAAAEAAAAAAA5jZWxsVGV4dElzSFRNTGJvb2wBAAAACGNlbGxUZXh0VEVYVAAAAAEAAAAAAAlob3J6QWxpZ25lbnVtAAAAD0VTbGljZUhvcnpBbGlnbgAAAAdkZWZhdWx0AAAACXZlcnRBbGlnbmVudW0AAAAPRVNsaWNlVmVydEFsaWduAAAAB2RlZmF1bHQAAAALYmdDb2xvclR5cGVlbnVtAAAAEUVTbGljZUJHQ29sb3JUeXBlAAAAAE5vbmUAAAAJdG9wT3V0c2V0bG9uZwAAAAAAAAAKbGVmdE91dHNldGxvbmcAAAAAAAAADGJvdHRvbU91dHNldGxvbmcAAAAAAAAAC3JpZ2h0T3V0c2V0bG9uZwAAAAAAO' +
            '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' +
            'rZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNS0yNlQxNjozNDo1MCsxMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNS0yNlQxNjozNDo1MCsxMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDUtMjZUMTY6MzQ6NTArMTI6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTlGRTczQ0I5RDYwRTgxMUI4QjdDNzJCOEFGQzhBNTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OThGRTczQ0I5RDYwRTgxMUI4QjdDNzJCOEFGQzhBNTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5OEZFNzNDQjlENjBFODExQjhCN0M3MkI4QUZDOEE1OCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4RkU3M0NCOUQ2MEU4MTFCOEI3QzcyQjhBRkM4QTU4IiBzdEV2dDp3aGVuPSIyMDE4LTA1LTI2VDE2OjM0OjUwKzEyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTlGRTczQ0I5RDYwRTgxMUI4QjdDNzJCOEFGQzhBNTgiIHN0RXZ0OndoZW49IjIwMTgtMDUtMjZUMTY6MzQ6NTArMTI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI' +
            'CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2M' +
            'Tk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVN' +
            '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' +
            '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' +
            '/6O9+6916x/r/ANDf9He/de69Y/1/6G/6O9+6916x/r/0N/0d7917r1j/AF/6G/6O9+6916x/r/0N/wBHe/de6//R3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9k='

        $scope.availability
        $scope.availability = 2;
        $scope.userObject = {};
        $scope.user_id = "";
        $scope.calander = [[], [], []];
        $scope.june1 = false;
        $scope.june1Booked = false;
        $scope.areYouSure = false;
        $scope.composeMessagePage = false;
        $scope.messagePageSelected = false;
        $scope.chartsPageSelected = false
        $scope.messagePageSelected = false;
        $scope.composeMessagePageSelected = false;
        $scope.workHistoryProfileSelected = false;
        $scope.currentClientObject = {}
        $scope.reviewSubmittedTimeSheetsPageOpen = false;
        $scope.composeMessagePageLoading = false;
        $scope.messageSuccessfullySent = false;
        $scope.sendMessageLoading = false;
        $scope.allFieldsMustBeInput = false;
        $scope.june2 = false;
        $scope.june2Booked = false;
        $scope.june3 = false;
        $scope.june4 = false;
        $scope.june5 = false;
        $scope.june6 = false;
        $scope.june7 = false;
        $scope.june8 = false;
        $scope.june9 = false;
        $scope.june10 = false;
        $scope.june11 = false;
        $scope.june12 = false;
        $scope.june13 = false;
        $scope.june14 = false;
        $scope.june15 = false;
        $scope.june16 = false;
        $scope.june17 = false;
        $scope.june18 = false;
        $scope.historyEntryOpen = true;
        $scope.slideOutDown = false;
        $scope.slidedownout = false;
        $scope.slidedownin = false;
        $scope.slideInDown = false;
        $scope.messagesArray = []
        $scope.messageCompositionPageOpen = false;
        $scope.requestEmployeePageOpen = false;
        $scope.addLocationPageOpen = false;
        $scope.addSupervisorPageOpen = false;
        $scope.messagesPaginated = [];
        $scope.usersArray = [];
        $scope.currentusernameArray = [];
        $scope.employeeJobDetails = {};
        $scope.profileHome = true;
        $scope.clientHome = true;
        $scope.requestEmployeePageLoading = false;
        $scope.loadingRequestJob = false;
        $scope.loadingChart = false;
        $scope.loadingWorkHistoryProfile = false;
        $scope.loadingNewPayPeriod = false;
        $scope.loadingAddToWorkHistory = false;
        $scope.finishedChangingPayPeriod = false;
        $scope.loadingRequestJobSuccessful = false;
        $scope.submittedTimeSheetsArray = []
        $scope.individualSubmittedTimeSheetOpen = true;
        $scope.timeSheetDataNotComplete = false;
        $scope.submittedIndex = null;
        $scope.curPeriod = null;
        $scope.messageIndex = "";
        $scope.editEmailPageOpen = false;
        $scope.editPhoneNumberPageOpen = false;
        $scope.submitJobDetailsPageOpen = false;
        $scope.submitSupervisorPageOpen = false;
        $scope.individualSupervisorOpen = true;
        $scope.submitLocationPageOpen = false;
        $scope.individualLocationOpen = true;
        $scope.areYouSureSubmitRequestJob = false;
        $scope.messageAdminPageOpen = false;
        $scope.individualRequestedJobOpen = true;
        $scope.requestIndex = null;
        $scope.subconIndex = null;
        $scope.locationIndex = null;
        $scope.removeLocationLoading = false;
        $scope.removeSupervisorLoading = false;
        $scope.removeRequestedJobLoading = false;
        $scope.removeRequestedJobSuccessful = false;
        $scope.supervisorsArray = []
        $scope.locationsArray = [];
        $scope.submittedTimeSheetsArray = [];
        $scope.addLocationSuccessful = false;
        $scope.addSupervisorSuccessful = false;
        $scope.submitLocationLoading = false;
        $scope.submitSupervisorLoading = false;
        $scope.ppeCannotBeEmpty = false;
        $scope.worksiteDetailsCannotBeEmpty = false;
        $scope.descriptionOfWorkCannotBeEmpty = false;
        $scope.numberOfWorkersCannotBeEmpty = false
        $scope.worksiteAddressCannotBeEmpty = false;
        $scope.clientCannotBeEmpty = false;
        $scope.supervisorCannotBeEmpty = false;
        $scope.locationCannotBeEmpty = false;
        $scope.timeDataCannotBeEmpty = false;
        $scope.locationNameNotProvided = false;
        $scope.locationAddressNotProvided = false;
        $scope.locationPhoneNumberNotProvided = false;
        $scope.locationContactNotProvided = false;
        $scope.locationEmailNotProvided = false;
        $scope.supervisorNameNotProvided = false;
        $scope.supervisorEmailNotProvided = false;
        $scope.supervisorPhoneNumberNotProvided = false;
        $scope.shakeOn = false;
        $scope.jobData = {};
        $scope.timeData = {

        };
        $scope.messagePageOpen = false;
        $scope.complaintsPageClientOpen = false;
        $scope.messagePageSelected = false;
        $scope.messagesLoading = false;
        $scope.messageOpen = true;
        $scope.areYouSure = false;
        $scope.removeRightBorder = false
        $scope.addHoursPageOpen = false;
        $scope.timeData = {};
        $scope.message = {
            message: null,
            subject: null
        };
        $scope.currentIndex = null;
        $scope.currentIndex = null;
        $scope.page = 0;
        $scope.date = new Date();
        $scope.dateNow = $scope.date.getDate()
        $scope.month = $scope.date.getMonth() + 1;
        $scope.year = $scope.date.getFullYear()
        $scope.getOrdinalSuffix = function (number) {

            var suffixes = ["'th'", "'st'", "'nd'", "'rd'"];
            var relevantDigits = (number < 30) ? number % 20 : number % 30;
            return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];

        };
        $scope.suffix = $scope.getOrdinalSuffix($scope.dateNow)
        $scope.phoneData = {
            newphonenumber: null
        }
        $scope.emailData = {
            email: null
        }
              $scope.phoneNumberDataClient = {
            newphonenumber: null
        }
        $scope.emailDataClient = {
            newemail: null
        }
        $scope.phoneDataCannotBeEmpty = false;
        $scope.emailDataCannotBeEmpty = false;
        $scope.showChart = true;
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.labels2 = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.labelsForChartsPage = ["#1", "#2", "#3", "#4", "#5", "#6", ""];
        $scope.series = ['Series A'];
        $scope.series2 = ['Series A'];
        $scope.data = [
            [0, 0, 0, 81, 56, 55, 40]

        ];
        $scope.data2 = [
            [0, 0, 0, 81, 56, 55, 40]

        ];
        $scope.dataForChartsPage = [
            [0, 0, 0, 0, 0, 0, 0]

        ];
        $scope.onClick = function (points, evt) {

        };
        setTimeout(function () {

            $('select').material_select();

        }, 15000);
        $scope.datasetOverrideLineChart = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }, { backgroundColor: "rgba( 0,203,254,0.3)" }];
        $scope.optionsLineChart = {
            responsive: true,
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
        };
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options = {
            responsive: true,
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
        $scope.delinquentTimeSheetPageOpen = false
        $scope.delinquentJobDetails = {};
        $scope.clientSubmittedJobDetails = {};
        $scope.timesheetEntryOpen = true;
        $scope.curTimesheet = null;
        $scope.areYouSureTimeSheet = false;
        $scope.minVarOut = ""
        $scope.minVarIn = ""
        $scope.hrVarOut = ""
        $scope.hrVarIn = ""
        $scope.supervisorListOpen = false;
        $scope.payPeriodHistoryIndex = ""
        //$scope.currentUserHistoryFile = "";
        $scope.submitHoursLoading = false;
        $scope.delinquentTimeSheetInPayPeriod = false;
        $scope.locationListOpen = false;
        $scope.firstAddSupervisors = false;
        $scope.thenAddLocations = false;
        $scope.youCanNowRequestJobs = false;
        $scope.composeSupervisorPageOpen = false;
        $scope.composeLocationPageOpen = false;
        $scope.sendingFrom = $scope.userName
        $scope.sendingTo = "ohrha harho"
        $scope.sendingDate = ""
        $scope.submitAdminMessageLoading = false;
        $scope.submitAdminMessageSuccessfullySent = false;
        $scope.timeSheetMessage = {
            to: $scope.sendingTo,
            from: $scope.sendingFrom,
            subject: null,
            body: null
        }
        $scope.requestJobFormOpen = false;
        $scope.requestEmployeePageLoading = false;
        $scope.globalPayPeriodIndexATM = ""
        $scope.turnOffOthers= false;

        $scope.submitNewPhoneNumberClient = function () {


            $scope.phoneNumberDataClient.name = $scope.currentClientObject.name;

            if ($scope.phoneNumberDataClient.newphonenumber !== null) {


                User.editPhoneNumber($scope.phoneNumberDataClient).then(function (data) {
                    //console.log(data)
                    $scope.currentClientObject.phonenumber= data.data.user.phonenumber
                    $scope.closeEditPhoneNumberPage();

                })

            } else {

                $scope.phoneDataCannotBeEmpty = true;

                $timeout(function () {

                    $scope.phoneDataCannotBeEmpty = false;

                }, 1000)

            }

        }

        $scope.submitNewPhoneNumber = function () {

            $scope.phoneData.name = $scope.userName;

            if ($scope.phoneData.newphonenumber !== null) {


                User.editPhoneNumber($scope.phoneData).then(function (data) {

                    $scope.userPhoneNumber = data.data.user.phonenumber
                    $scope.closeEditPhoneNumberPage();

                })

            } else {

                $scope.phoneDataCannotBeEmpty = true;

                $timeout(function () {

                    $scope.phoneDataCannotBeEmpty = false;

                }, 1000)

            }

        }
        $scope.submitNewEmailClient = function () {

            $scope.emailDataClient.name = $scope.currentClientObject.name;

            if ($scope.emailDataClient.newemail !== null) {

                $scope.emailDataClient.newemail = $scope.emailDataClient.newemail   

                User.editEmail($scope.emailDataClient).then(function (data) {

                    $scope.currentClientObject.email = data.data.user.email
                    $scope.closeEditEmailPage();

                })

            } else {

                $scope.emailDataCannotBeEmpty = true;

                $timeout(function () {

                    $scope.emailDataCannotBeEmpty = false;

                }, 2500)

            }

        }
        $scope.submitNewEmailAddress = function () {

            $scope.emailData.name = $scope.userName;

            if ($scope.emailData.email !== null) {

                $scope.emailData.newemail = $scope.emailData.email

                User.editEmail($scope.emailData).then(function (data) {

                    $scope.userEmail = data.data.user.email
                    $scope.closeEditEmailPage();

                })

            } else {

                $scope.emailDataCannotBeEmpty = true;

                $timeout(function () {

                    $scope.emailDataCannotBeEmpty = false;

                }, 1000)

            }

        }
        $scope.openEditEmailPage = function () {

            if (!$scope.editEmailPageOpen) {

                $scope.editEmailPageOpen = true;

            }

        }
        $scope.closeEditEmailPage = function () {

            if ($scope.editEmailPageOpen) {

                $scope.editEmailPageOpen = false;

            }

        }
        $scope.openEditPhoneNumberPage = function () {

            if (!$scope.editPhoneNumberPageOpen) {

                $scope.editPhoneNumberPageOpen = true;

            }

        }
        $scope.closeEditPhoneNumberPage = function () {

            if ($scope.editPhoneNumberPageOpen) {

                $scope.editPhoneNumberPageOpen = false;

            }

        }
        $scope.markAsApproved = function (index, timesheet) {

            timesheet.disputed = false
            timesheet.submittedtimesheetsindex = index;

            User.markTimeSheetAsApproved(timesheet).then(function (data) {

            })

        }
        $scope.markAsDisputed = function (index, timesheet) {

            timesheet.disputed = true;
            timesheet.submittedtimesheetsindex = index;

            User.markTimeSheetAsDisputed(timesheet).then(function (data) {

            })

        }
        $scope.openIndividualSubmittedTimeSheet = function (index) {

            if ($scope.individualSubmittedTimeSheetOpen && index !== $scope.submittedIndex) {

                $scope.submittedIndex = index;

            }
            else if (!$scope.individualSubmittedTimeSheetOpen && index == $scope.submittedIndex) {

                $scope.individualSubmittedTimeSheetOpen = true;
            
            }
            else if (!$scope.individualSubmittedTimeSheetOpen && index !== $scope.submittedIndex) {

                $scope.individualSubmittedTimeSheetOpen = true;
                $scope.submittedIndex = index;

            } else {

                $scope.submittedIndex = null

            }

        }
        $scope.openReviewSubmittedTimeSheetsPage = function () {

            if (!$scope.reviewSubmittedTimeSheetsPageOpen) {

                $scope.reviewSubmittedTimeSheetsPageOpen = true;
                $scope.addSupervisorPageOpen = false;
                $scope.clientHome = false;
                $scope.addLocationPageOpen = false;
                $scope.addSupervisorPageOpen = false;
                $scope.messagePageOpen = false;
                $scope.composeMessagePageOpen = false
                $scope.requestEmployeePageOpen = false;
                $scope.complaintsPageClientOpen = false;
                $scope.pageLimit = 4;
                $scope.submittedTimeSheetsPaginated = [];
                $scope.submittedTimeSheetsForPagination = [];

                User.findUser($rootScope.user_id).then(function (data) {

                    $scope.submittedTimeSheetsArray = data.data.user[0].submittedtimesheets;

                    for (var i = 0; i <= $scope.submittedTimeSheetsArray.length; i++) {

                        var page = 0;
                       
                        if (i < $scope.pageLimit) {

                        }
                        if (i < $scope.submittedTimeSheetsArray.length) {

                        }

                        if (i < $scope.pageLimit && i < $scope.submittedTimeSheetsArray.length) {
                                        
                            if ($scope.submittedTimeSheetsArray[i]) {

                                $scope.submittedTimeSheetsArray[i].currentIndex = i
                                $scope.submittedTimeSheetsForPagination.push($scope.submittedTimeSheetsArray[i])

                            }

                        } else {


                            $scope.loadingUsers = false;
                            $scope.submittedTimeSheetsPaginated.push($scope.submittedTimeSheetsForPagination)
                            $scope.submittedTimeSheetsForPagination = [];

                            if ($scope.submittedTimeSheetsArray[i] !== undefined) {

                                $scope.submittedTimeSheetsArray[i].currentIndex = i
                                $scope.submittedTimeSheetsForPagination.push($scope.submittedTimeSheetsArray[i])

                            }

                            $scope.pageLimit = $scope.pageLimit + 4;
                            page++

                        }

                    }

                })

            } else {

                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.clientHome = true;

            }

        }
        $scope.requestedJobData = {

            client: null,
            worksitedetails: null,
            ppe: null,
            descriptionofwork: null,
            supervisor: null,
            location: null,
            amPm1: null,
            amPm2: null,
            hrsIn1: null,
            hrsIn2: null,
            hrsOut1: null,
            hrsOut2: null,
            minsIn1: null,
            minsIn2: null,
            minsOut1: null,
            minsOut2: null

        }
        $scope.locationData = {

            name: null,
            email: null,
            phonenumber: null,
            address: null,
            contact: null

        };
        $scope.supervisorData = {

            name: null,
            email: null,
            phonenumber: null

        };
        
        if ($scope.month == 1) {

            $scope.monthName = "January"

        } else if ($scope.month == 2) {

            $scope.monthName = "February"

        } else if ($scope.month == 3) {

            $scope.monthName = "March"

        } else if ($scope.month == 4) {

            $scope.monthName = "April"

        } else if ($scope.month == 5) {

            $scope.monthName = "May"

        } else if ($scope.month == 6) {

            $scope.monthName = "June"

        } else if ($scope.month == 7) {

            $scope.monthName = "July"

        } else if ($scope.month == 8) {

            $scope.monthName = "August"

        } else if ($scope.month == 9) {

            $scope.monthName == "September"

        } else if ($scope.month == 10) {

            $scope.monthName == "October"

        } else if ($scope.month == 11) {

            $scope.monthName == "November"

        } else if ($scope.month == 12) {

            $scope.monthName == "December"

        }

        
        $scope.openSupervisorList = function(){

            if(!$scope.supervisorListOpen){

                $scope.supervisorListOpen = true;
                $scope.submitSupervisorPageOpen = false;
                
            }else{

                $scope.supervisorListOpen = false;

            }

        }
        $scope.openLocationList = function(){

            if(!$scope.locationListOpen){
                
                $scope.locationListOpen = true;
                $scope.submitLocationPageOpen = false;

            }else{

                $scope.locationListOpen = false;

            }

        }
        $scope.finishSubmitDelinquentTimesheet = function (decision) {
         
            $scope.clientSubmittedJobDetails = $scope.delinquentJobDetails[0]
            $scope.clientSubmittedJobDetails.disputed = false;
            $scope.clientSubmittedJobDetails.currentuser = $scope.name
            $scope.clientSubmittedJobDetails.timesheetSubmitted = true;
            $scope.clientSubmittedJobDetails.client = $scope.delinquentJobDetails[0].client
            $scope.loadingAddAndRemoveDelinquentTimeSheet = true;

            if (decision == "yes") {

                User.addJobToCurrentPayPeriod($scope.delinquentJobDetails).then(function (data) {

                })

            } else {

                $scope.areYouSure = false;

            }

        }
        $scope.openDelinquentTimeSheetPage = function () {

            if (!$scope.delinquentTimeSheetPageOpen) {

                $scope.delinquentTimeSheetPageOpen = true;
                $scope.profileHome = false;

            }

        }
        $scope.submitTimeSheet = function (timesheet, index) {
            
            $scope.delinquentJobDetails = timesheet;
            $scope.delinquentJobDetails.index = index;
            $scope.delinquentJobDetails.currentuser = $scope.name;
            $scope.delinquentJobDetails.user = $scope.name
            $scope.disputed = false;
            $scope.delinquentJobDetails.delinquent = true;
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
                $scope.areYouSureTimeSheet = true;

            } else {

            }

        }
        $scope.openIndividualDelinquentTimeSheet = function (index, timesheetData) {
  
            $('select').material_select();
     
            if ($scope.timesheetEntryOpen && index !== $scope.curTimesheet
            ) {

                $scope.curTimesheet = index;
    
            }
            else if (!$scope.timesheetEntryOpen && index == $scope.curTimesheet) {

                $scope.timesheetEntryOpen = true;
              
            }
            else if (!$scope.timesheetEntryOpen && index !== $scope.curTimesheet) {

                $scope.timesheetEntryOpen = true;
                $scope.curTimesheet = index;

            } else {

                $scope.curTimesheet = null

            }

        }
        $scope.openComposeLocationPage = function () {

            if (!$scope.composeLocationPageOpen) {

                $scope.composeLocationPageOpen = true;

            }

        }
        $scope.openComposeSupervisorPage = function () {

            if (!$scope.composeSupervisorPageOpen) {

                $scope.composeSupervisorPageOpen = true;

            }

        }
        if ($window.localStorage.getItem('token')) {

            $scope.userToken = $window.localStorage.getItem('token');

            Auth.getUser($scope.userToken).then(function (data) {

                $scope.userName = data.data.name;
                $scope.requestedJobData.client = $scope.userName
                $scope.userClass = data.data.userclass;
                $rootScope.userClassy = data.data.userclass
                $rootScope.user_id = data.data._id
                $scope.userPayRate = data.data.payrate;

                User.findUser($rootScope.user_id).then(function (data) {

                    $scope.userPhoneNumber = data.data.user[0].phonenumber
                    $scope.userPayPeriod = data.data.user[0].payperiodnum
                    $scope.userEmail = data.data.user[0].email
                    $scope.supervisorsArray = data.data.user[0].supervisors
                    $scope.locationsArray = data.data.user[0].locations
                    $scope.currentClientObject = data.data.user[0]
                    $scope.loadingProfile = false;
                   
                    if (!$scope.supervisorsArray.length) {

                        $scope.firstAddSupervisors = true;

                    }

                    if ($scope.month == 1) {

                        if ($scope.dateNow == 1 || 2 || 3 || 4 || 5 || 6 || 7) {

                            $rootScope.payPeriod = 1;

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
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 29 || 30 || 31) {

                            $rootScope.payPeriod = 5;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 2) {

                        if ($scope.dateNow == 1 || 2 || 3 || 4) {

                            $rootScope.payPeriod = 5;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 5 || 6 || 7 || 8 || 9 || 10 || 11) {

                            $rootScope.payPeriod = 6;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 12 || 13 || 14 || 15 || 16 || 17 || 18) {

                            $rootScope.payPeriod = 7;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 19 || 20 || 21 || 22 || 23 || 24 || 25) {

                            $rootScope.payPeriod = 8;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 26 || 27 || 28) {

                            $rootScope.payPeriod = 9;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 3) {

                        if ($scope.dateNow == 1 || 2 || 3 || 4) {

                            $rootScope.payPeriod = 9;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 5 || 6 || 7 || 8 || 9 || 10 || 11) {

                            $rootScope.payPeriod = 10;
                            //console.log('imm here')
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 12 || 13 || 14 || 15 || 16 || 17 || 18) {

                            $rootScope.payPeriod = 11;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 19 || 20 || 21 || 22 || 23 || 24 || 25) {

                            $rootScope.payPeriod = 12;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 26 || 27 || 28 || 29 || 30 || 31) {

                            $rootScope.payPeriod = 13;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 4) {

                        if ($scope.dateNow == 1) {

                            $rootScope.payPeriod = 13;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 2 || 3 || 4 || 5 || 6 || 7 || 8) {

                            $rootScope.payPeriod = 14;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 9 || 10 || 11 || 12 || 13 || 14 || 15) {

                            $rootScope.payPeriod = 15;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 16 || 17 || 18 || 19 || 20 || 21 || 22) {

                            $rootScope.payPeriod = 16;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 24 || 25 || 26 || 27 || 28 || 29 || 30) {

                            $rootScope.payPeriod = 18;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 5) {

                        if ($scope.dateNow == 1 || 2 || 3 || 4 || 5 || 6 || 7) {

                            $rootScope.payPeriod = 19;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 8 || 9 || 10 || 11 || 12 || 13 || 14) {

                            $rootScope.payPeriod = 20;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 15 || 16 || 17 || 18 || 19 || 20 || 21) {

                            $rootScope.payPeriod = 21;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 22 || 23 || 24 || 25 || 26 || 27 || 28) {

                            $rootScope.payPeriod = 22;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 28 || 29 || 30 || 31) {

                            $rootScope.payPeriod = 1;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 6) {

                        if ($scope.dateNow == 1 || $scope.dateNow == 2 || $scope.dateNow == 3) {

                            $rootScope.payPeriod = 1;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 4 || $scope.dateNow == 5 || $scope.dateNow == 6 || $scope.dateNow == 7 || $scope.dateNow == 8 || $scope.dateNow == 9 || $scope.dateNow == 10) {

                            $rootScope.payPeriod = 2;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                            $scope.newPPObject = {}
                            $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                            /* User.getUsers().then(function(data){
                                 for(var z= 0; z< data.data.users.length;z++){
                                     for(var d = 0; d< data.data.users[z].length; d++){
             
                                     }
                                 }
                             })
                             */
                            /*
                            User.changeUserPayPeriod($scope.newPPObject).then(function (data) {
                                //console.log(data)
                                if (data.data.success) {
                                    $scope.payPeriodUpdated = true;
                                    //$timeout(function(){
                                    //    $scope.payPeriodUpdated = false;
                                    //},)
                                }
                            })
                            */

                        }
                        if ($scope.dateNow == 11 || $scope.dateNow == 12 || $scope.dateNow == 13 || $scope.dateNow == 14 || $scope.dateNow == 15 || $scope.dateNow == 16 || $scope.dateNow == 17) {

                            $rootScope.payPeriod = 3;
                            $scope.newPPObject = {}
                            $scope.newPPObject.newpayperiod = $rootScope.payPeriod;


                        }
                        if ($scope.dateNow == 18 || $scope.dateNow == 19 || $scope.dateNow == 20 || $scope.dateNow == 21 || $scope.dateNow == 22 || $scope.dateNow == 23 || $scope.dateNow == 24) {

                            $scope.newPPObject = {}
                            $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                            $rootScope.payPeriod = 4;

                            if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                                $scope.userPayPeriod = $rootScope.payPeriod
                                //console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                                User.getUsers().then(function (data) {

                                    for (var i = 0; i < data.data.users.length; i++) {


                                        $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                        $scope.newPPObject.currentusername = data.data.users[i].name
                                        $scope.currentusernameArray.push(data.data.users[i].name)
                                        $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name


                                    }

                                    User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                        //console.log(data)
                                        $scope.addPayPeriodToPayPeriodHistory();

                                    })

                                })


                            } else {

                                //console.log("Pay Periods Match")

                            }

                        }
                        if ($scope.dateNow == 25 || $scope.dateNow == 26 || $scope.dateNow == 27 || $scope.dateNow == 28 || $scope.dateNow == 39 || $scope.dateNow == 30) {

                            $rootScope.payPeriod = 5;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)
                            $scope.newPPObject = {}
                            $scope.newPPObject.newpayperiod = $rootScope.payPeriod;

                            if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                                $scope.userPayPeriod = $rootScope.payPeriod
                                //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                                User.getUsers().then(function (data) {

                                    for (var i = 0; i < data.data.users.length; i++) {

                                        $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                        $scope.newPPObject.currentusername = data.data.users[i].name
                                        $scope.currentusernameArray.push(data.data.users[i].name)
                                        $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name

                                    }

                                    User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                        //console.log(data)
                                        $scope.addPayPeriodToPayPeriodHistory();

                                    })

                                })

                            } else {

                                //console.log("Pay Periods Match")

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

                                User.getUsers().then(function (data) {

                                    for (var i = 0; i < data.data.users.length; i++) {

                                        $scope.newPPObject.newpayperiod = $rootScope.payPeriod
                                        $scope.newPPObject.currentusername = data.data.users[i].name
                                        $scope.currentusernameArray.push(data.data.users[i].name)
                                        $scope.newPPObject.currentusernamearray = $scope.currentusernameArray                 // $scope.newPayPeriodObject.lootch = $scope.employees[i].name

                                    }

                                    User.changeUserPayPeriod($scope.newPPObject).then(function (data) {

                                        $scope.addPayPeriodToPayPeriodHistory();

                                    })

                                })

                            } else {

                                //console.log("Pay Periods Match")

                            }

                        }
                        if ($scope.dateNow == 2 || $scope.dateNow == 3 || $scope.dateNow == 4 || $scope.dateNow == 5 || $scope.dateNow == 6 || $scope.dateNow == 7 || $scope.dateNow == 8) {

                            $rootScope.payPeriod = 6;
                            $scope.newPPObject = {}
                            $scope.newPPObject.newpayperiod = $rootScope.payPeriod;

                            if ($scope.userPayPeriod !== $rootScope.payPeriod) {

                                $scope.newPayPeriodLoading = true;
                                $scope.userPayPeriod = $rootScope.payPeriod

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

                                        $scope.addPayPeriodToPayPeriodHistory();

                                    })

                                })

                            } else {

                                //console.log("Pay Periods Match")

                            }

                        }
                        if ($scope.dateNow == 9 || $scope.dateNow == 10 || $scope.dateNow == 11 || $scope.dateNow == 12 || $scope.dateNow == 13 || $scope.dateNow == 14 || $scope.dateNow == 15) {

                            $rootScope.payPeriod = 7;
                            $scope.newPPObject = {}
                            $scope.newDeliquentObject = {}
                            $scope.newPPObject.newpayperiod = $rootScope.payPeriod;
                            
                        }
                        if ($scope.dateNow == 16 || $scope.dateNow == 17 || $scope.dateNow == 18 || $scope.dateNow == 19 || $scope.dateNow == 20 || $scope.dateNow == 21 || $scope.dateNow == 22) {

                            $rootScope.payPeriod = 8;

                        }
                        if ($scope.dateNow == 23 || $scope.dateNow == 24 || $scope.dateNow == 25 || $scope.dateNow == 26 || $scope.dateNow == 27 || $scope.dateNow == 28 || $scope.dateNow == 29) {

                            $rootScope.payPeriod = 9;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 30 || $scope.dateNow == 31) {

                            $rootScope.payPeriod = 10;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 8) {

                        if ($scope.dateNow == 1 || 2 || 3 || 4 || 5) {

                            $rootScope.payPeriod = 10;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 6 || 7 || 8 || 9 || 10 || 11 || 12) {

                            $rootScope.payPeriod = 11;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 13 || 14 || 15 || 16 || 17 || 18 || 19) {

                            $rootScope.payPeriod = 12;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 20 || 21 || 22 || 23 || 24 || 25 || 26) {

                            $rootScope.payPeriod = 13;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 27 || 28 || 29 || 30 || 31) {

                            $rootScope.payPeriod = 14;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 9) {

                        if ($scope.dateNow == 1 || 2) {

                            $rootScope.payPeriod = 15;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 3 || 4 || 5 || 6 || 7 || 8 || 9) {

                            $rootScope.payPeriod = 16;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 10 || 11 || 12 || 13 || 14 || 15 || 16) {

                            $rootScope.payPeriod = 17;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 17 || 18 || 19 || 20 || 21 || 22 || 23) {

                            $rootScope.payPeriod = 18;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 24 || 25 || 26 || 27 || 28 || 29 || 30) {

                            $rootScope.payPeriod = 19;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 10) {

                        if ($scope.dateNow == 1 || 2 || 3 || 4 || 5 || 6 || 7) {

                            $rootScope.payPeriod = 20;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 8 || 9 || 10 || 11 || 12 || 13 || 14) {

                            $rootScope.payPeriod = 21;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 15 || 16 || 17 || 18 || 19 || 20 || 21) {

                            $rootScope.payPeriod = 22;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 22 || 23 || 24 || 25 || 26 || 27 || 28) {

                            $rootScope.payPeriod = 23;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 29 || 30 || 31) {

                            $rootScope.payPeriod = 24;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 11) {
                        if ($scope.dateNow == 1 || 2 || 3 || 4) {

                            $rootScope.payPeriod = 24;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 5 || 6 || 7 || 8 || 9 || 10 || 11) {

                            $rootScope.payPeriod = 25;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 12 || 13 || 14 || 15 || 16 || 17 || 18) {

                            $rootScope.payPeriod = 26;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 19 || 20 || 21 || 22 || 23 || 24 || 25) {

                            $rootScope.payPeriod = 27;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 26 || 27 || 28 || 29 || 30) {

                            $rootScope.payPeriod = 28;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }
                    if ($scope.month == 12) {
                        if ($scope.dateNow == 1 || 2) {

                            $rootScope.payPeriod = 29;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 3 || 4 || 5 || 6 || 7 || 8 || 9) {

                            $rootScope.payPeriod = 30;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 10 || 11 || 12 || 13 || 14 || 15 || 16) {

                            $rootScope.payPeriod = 31;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 17 || 18 || 19 || 20 || 21 || 22 || 23) {

                            $rootScope.payPeriod = 32;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }
                        if ($scope.dateNow == 24 || 25 || 26 || 27 || 28 || 29 || 30) {

                            $rootScope.payPeriod = 33;
                            //console.log("$rootScope.payPeriod", $rootScope.payPeriod)

                        }

                    }

                })

                $scope.submittedTimeSheetsArray = data.data.submittedtimesheets

            })

        } else {

        }
        $scope.openDisputedTimeSheetsPage = function () {

            if (!$scope.disputedTimeSheetsPageOpen) {

                $scope.disputedTimeSheetsPageOpen = true;

            }

        }
        $scope.removeRequestedJob = function (index) {

            var jobData = {
                index: index,
                name: $scope.userName
            }
            $scope.removeRequestedJobLoading = true;
            $scope.removeRequestedJobSuccessful = false;
            
            User.removeRequestedJob(jobData).then(function (data) {

                //console.log(data)

                if (data.data.success) {

                    $scope.removeRequestedJobLoading = false;
                    $scope.removeRequestedJobSuccessful = true;

                    $timeout(function () {

                        $scope.removeRequestedJobSuccessful = false;
                        $scope.openRequestEmployeePage()

                    }, 2000)

                }

            })

        }
        $scope.submitRequest = function () {

            $scope.loadingRequestJob = true;
            //console.log($scope.requestedJobData)
            $scope.requestedJobData.approved = false;
            $scope.requestedJobData.dateNum = $scope.dateNow;
            $scope.requestedJobData.monthNum = $scope.month;

            User.requestJob($scope.requestedJobData).then(function (data) {
                //console.log(data)
                if (data.data.success) {

                    $scope.loadingRequestJob = false;
                    $scope.areYouSureSubmitRequestJob = false
                    $scope.loadingRequestJobSuccessful = true;

                    $timeout(function () {

                        $scope.loadingRequestJobSuccessful = false;
                        $scope.openRequestEmployeePage();

                    })

                }
                $scope.requestedJobData = {

                    client: null,
                    worksitedetails: null,
                    ppe: null,
                    descriptionofwork: null,
                    supervisor: null,
                    location: null,
                    amPm1: null,
                    amPm2: null,
                    hrsIn1: null,
                    hrsIn2: null,
                    hrsOut1: null,
                    hrsOut2: null,
                    minsIn1: null,
                    minsIn2: null,
                    minsOut1: null,
                    minsOut2: null

                }

            })

        }
        $scope.closeAreYouSureSubmitRequest = function () {

            $scope.areYouSureSubmitRequestJob = false;

        }
        $scope.areYouSureSubmitRequest = function () {

            $('select').material_select();

            if ($scope.requestedJobData.ppe == null) {

                $scope.ppeCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.worksitedetails == null) {

                $scope.worksiteDetailsCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.descriptionofwork == null) {

                $scope.descriptionOfWorkCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.numberofworkers == null) {

                $scope.numberOfWorkersCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.workdetails == null) {

                $scope.worksiteAddressCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.client == null) {

                $scope.clientCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.supervisor == null) {

                $scope.supervisorCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.location == null) {

                $scope.locationCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.hrsIn1 == null ||
                $scope.requestedJobData.hrsIn2 == null ||
                $scope.requestedJobData.hrsOut1 == null ||
                $scope.requestedJobData.hrsOut2 == null ||
                $scope.requestedJobData.minsIn1 == null ||
                $scope.requestedJobData.minsIn2 == null ||
                $scope.requestedJobData.minsOut1 == null ||
                $scope.requestedJobData.minsOut2 == null ||
                $scope.requestedJobData.amPm1 == null ||
                $scope.requestedJobData.amPm2 == null) {

                $scope.timeDataCannotBeEmpty = true;

            }
            if ($scope.requestedJobData.hrsIn1 !== null &&
                $scope.requestedJobData.hrsIn2 !== null &&
                $scope.requestedJobData.hrsOut1 !== null &&
                $scope.requestedJobData.hrsOut2 !== null &&
                $scope.requestedJobData.minsIn1 !== null &&
                $scope.requestedJobData.minsIn2 !== null &&
                $scope.requestedJobData.minsOut1 !== null &&
                $scope.requestedJobData.minsOut2 !== null &&
                $scope.requestedJobData.amPm1 !== null &&
                $scope.requestedJobData.amPm2 !== null) {

                    $scope.requestedJobData.hours =
                    $scope.requestedJobData.hrsIn1 + $scope.requestedJobData.hrsIn2 + ":" +
                    $scope.requestedJobData.minsIn1 + $scope.requestedJobData.minsIn2 + $scope.requestedJobData.amPm1 + " - " +
                    $scope.requestedJobData.hrsOut1 + $scope.requestedJobData.hrsOut2 + ":" +
                    $scope.requestedJobData.minsOut1 + $scope.requestedJobData.minsOut2 + $scope.requestedJobData.amPm1

                if ($scope.requestedJobData.location !== null &&
                    $scope.requestedJobData.supervisor !== null &&
                    $scope.requestedJobData.client !== null &&
                    $scope.requestedJobData.workdetails !== null &&
                    $scope.requestedJobData.numberofworkers !== null &&
                    $scope.requestedJobData.descriptionofwork !== null &&
                    $scope.requestedJobData.ppe !== null

                ) {
                    //console.log($scope.requestJobDetails)
                    $scope.areYouSureSubmitRequestJob = true;
                }

            }

        }
        $scope.submitSupervisorSetupPhase = function () {
           
            
            if ($scope.supervisorData.name == null || $scope.supervisorData.name == undefined) {

                $scope.supervisorNameNotProvided = true;

                setTimeout(function () {

                    $scope.supervisorNameNotProvided = false;

                }, 2000)

            }


            if ($scope.supervisorData.email == null || $scope.supervisorData.email == undefined) {

                $scope.supervisorEmailNotProvided = true;

                setTimeout(function () {

                    $scope.supervisorEmailNotProvided = false;

                }, 2000)

            }
            if ($scope.supervisorData.phonenumber == null || $scope.supervisorData.phonenumber == undefined) {

                $scope.supervisorPhoneNumberNotProvided = true;

                setTimeout(function () {

                    $scope.supervisorPhoneNumberNotProvided = false;

                }, 2000)

            }
            if ($scope.supervisorData.phonenumber !== null &&
                $scope.supervisorData.email !== null &&
                $scope.supervisorData.name !== null

            ) {
                $scope.submitSupervisorLoading = true;
                $scope.supervisorData.username = $scope.userName;

                User.addSupervisor($scope.supervisorData).then(function (data) {

                    //console.log(data)
                    $scope.addSupervisorSuccessful = true;

                    $timeout(function () {

                        $scope.submitSupervisorLoading = false;
                        $scope.addSupervisorSuccessful = false;
                        $scope.composeSupervisorPageOpen = false;
                        $scope.firstAddSupervisors = false;
                        $scope.thenAddLocations = true;
                        $scope.supervisorData = {
                            name: null,
                            email: null,
                            phonenumber: null
                        };

                    }, 1500)

                })

            }

        }
        $scope.submitSupervisor = function () {
           
            if ($scope.supervisorData.name == null || $scope.supervisorData.name == undefined) {

                $scope.supervisorNameNotProvided = true;

                setTimeout(function () {

                    $scope.supervisorNameNotProvided = false;

                }, 2000)

            }
            if ($scope.supervisorData.email == null || $scope.supervisorData.email == undefined) {

                $scope.supervisorEmailNotProvided = true;

                setTimeout(function () {

                    $scope.supervisorEmailNotProvided = false;

                }, 2000)

            }
            if ($scope.supervisorData.phonenumber == null || $scope.supervisorData.phonenumber == undefined) {

                $scope.supervisorPhoneNumberNotProvided = true;

                setTimeout(function () {

                    $scope.supervisorPhoneNumberNotProvided = false;

                }, 2000)

            }
            if ($scope.supervisorData.phonenumber !== null &&
                $scope.supervisorData.email !== null &&
                $scope.supervisorData.name !== null

            ) {
                $scope.submitSupervisorLoading = true;
                $scope.supervisorData.username = $scope.userName;

                User.addSupervisor($scope.supervisorData).then(function (data) {

                    //console.log(data)
                    $scope.addSupervisorSuccessful = true;

                    $timeout(function () {

                        $scope.submitSupervisorLoading = false;
                        $scope.addSupervisorSuccessful = false;
                        $scope.addSupervisorPageOpen = false;
                        $scope.supervisorData = {
                            name: null,
                            email: null,
                            phonenumber: null
                        };
                        $scope.openAddSupervisorPage();

                    }, 1500)

                })

            }

        }
        $scope.submitTimeSheetMessage = function () {

            $scope.allFieldsMustBeInput = false;

            if ($scope.timeSheetMessage.body == null) {

                $scope.allFieldsMustBeInput = true;

            } else {

                $scope.submitAdminMessageLoading = true;

                User.sendMessage($scope.timeSheetMessage).then(function (data) {

                    //console.log(data)
                    $scope.submitAdminMessageLoading = false;
                    $scope.submitAdminMessageSuccessfullySent = true;

                    $timeout(function () {

                        $scope.submitAdminMessageSuccessfullySent = false;
                        $scope.closeMessageAdminPage()

                    }, 1500)

                })

            }

        }
        $scope.closeMessageAdminPage = function () {

            $scope.allFieldsMustBeInput = false;
            $scope.messageAdminPageOpen = false

        }
        $scope.openMessageAdminPage = function (date,employee,client) {
            
            $scope.sendingDate = date;
            $scope.timeSheetMessage.subject = "Disputed Time Sheet(" + $scope.sendingDate + ")"

            if (!$scope.messageAdminPageOpen) {

                $scope.messageAdminPageOpen = true;

            }

        }
        $scope.openSubmitLocationPage = function () {

            if (!$scope.submitLocationPageOpen) {

                $scope.submitLocationPageOpen = true;
                $scope.locationListOpen = false

            } else {

                $scope.submitLocationPageOpen = false;

            }

        }
        $scope.openSubmitSupervisorPage = function () {

            if (!$scope.submitSupervisorPageOpen) {

                $scope.submitSupervisorPageOpen = true;
                $scope.supervisorListOpen = false;

            } else {

                $scope.submitSupervisorPageOpen = false;

            }

        }
        $scope.submitLocationSetupPhase = function () {
      
            if ($scope.locationData.name == null || $scope.locationData.name == undefined) {

                $scope.locationNameNotProvided = true;

                setTimeout(function () {

                    $scope.locationNameNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.address == null || $scope.locationData.address == undefined) {

                $scope.locationAddressNotProvided = true;

                setTimeout(function () {

                    $scope.locationAddressNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.contact == null || $scope.locationData.contact == undefined) {

                $scope.locationContactNotProvided = true;

                setTimeout(function () {

                    $scope.locationContactNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.email == null || $scope.locationData.email == undefined) {

                $scope.locationEmailNotProvided = true;

                setTimeout(function () {

                    $scope.locationEmailNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.phonenumber == null || $scope.locationData.phonenumber == undefined) {

                $scope.locationPhoneNumberNotProvided = true;

                setTimeout(function () {

                    $scope.locationPhoneNumberNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.phonenumber !== null &&
                $scope.locationData.email !== null &&
                $scope.locationData.name !== null &&
                $scope.locationData.contact !== null &&
                $scope.locationData.address !== null) {

                $scope.submitLocationLoading = true;
                $scope.locationData.username = $scope.userName;

                User.addLocation($scope.locationData).then(function (data) {

                    $scope.addLocationSuccessful = true;

                    $timeout(function () {

                        $scope.submitLocationLoading = false;
                        $scope.addLocationSuccessful = false;
                        $scope.composeLocationPageOpen = false;
                        $scope.thenAddLocations = false;
                        $scope.youCanNowRequestJobs = true;
                        $scope.locationData = {
                            name: null,
                            email: null,
                            phonenumber: null,
                            address: null,
                            contact: null
                        };

                    }, 1500)

                })

            }

        }
        $scope.submitLocation = function () {
           
            if ($scope.locationData.name == null || $scope.locationData.name == undefined) {

                $scope.locationNameNotProvided = true;

                setTimeout(function () {

                    $scope.locationNameNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.address == null || $scope.locationData.address == undefined) {

                $scope.locationAddressNotProvided = true;

                setTimeout(function () {

                    $scope.locationAddressNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.contact == null || $scope.locationData.contact == undefined) {

                $scope.locationContactNotProvided = true;

                setTimeout(function () {

                    $scope.locationContactNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.email == null || $scope.locationData.email == undefined) {

                $scope.locationEmailNotProvided = true;

                setTimeout(function () {

                    $scope.locationEmailNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.phonenumber == null || $scope.locationData.phonenumber == undefined) {

                $scope.locationPhoneNumberNotProvided = true;

                setTimeout(function () {

                    $scope.locationPhoneNumberNotProvided = false;

                }, 2000)

            }
            if ($scope.locationData.phonenumber !== null &&
                $scope.locationData.email !== null &&
                $scope.locationData.name !== null &&
                $scope.locationData.contact !== null &&
                $scope.locationData.address !== null) {
                    
                $scope.submitLocationLoading = true;
                $scope.locationData.username = $scope.userName;

                User.addLocation($scope.locationData).then(function (data) {

                    $scope.addLocationSuccessful = true;

                    $timeout(function () {

                        $scope.submitLocationLoading = false;
                        $scope.addLocationSuccessful = false;
                        $scope.addLocationPageOpen = false;
                        $scope.locationData = {
                            name: null,
                            email: null,
                            phonenumber: null,
                            address: null,
                            contact: null
                        };

                        $scope.openAddLocationPage();

                    }, 1500)

                })

            }

        }
        $scope.openComplaintsPageClient = function () {

            if (!$scope.complaintsPageClientOpen) {
                
                $scope.complaintsPageClientOpen = true;
                $scope.requestEmployeePageOpen = false;
                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.addSupervisorPageOpen = false;


            } else {

                $scope.complaintsPageClientOpen = false;

            }

        }
        
$scope.openRequestJobForm = function(){

    if(!$scope.requestJobFormOpen){

        $scope.requestJobFormOpen = true
        $scope.requestListOpen = false;

    }else{

        $scope.requestJobFormOpen = false;

    }

}
$scope.openRequestList = function(){

    if(!$scope.requestListOpen){

        $scope.requestListOpen = true;
        $scope.requestJobFormOpen = false;

    }else{

        $scope.requestListOpen = false;

    }

}

        $scope.openRequestEmployeePage = function () {

            $scope.requestEmployeePageLoading = true;
            $('select').material_select();
            $('select').material_select();
            $scope.requestEmployeePageLoading = false;

            if (!$scope.requestEmployeePageOpen) {

                $scope.page=0;
                $('select').material_select();
                $scope.requestEmployeePageOpen = true;
                $scope.composeMessagePageOpen = false;
                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.messagePageOpen = false;
                $scope.addLocationPageOpen = false;
                $scope.locationListOpen = false;
                $scope.supervisorListOpen = false;
                $scope.requestListOpen = false;
                $scope.requestJobFormOpen = false;
                $scope.submitSupervisorPageOpen = false;
                $scope.submitLocationPageOpen = false;
                $scope.complaintsPageClientOpen = false;
                $scope.clientHome = false;
                $scope.addSupervisorPageOpen = false;

                User.getRequestedJobs($scope.user_id).then(function (data) {

                    $scope.requestedJobsArray = data.data.requestedjobs;
                    $scope.pageLimit = 4;
                    $scope.requestedJobsPaginated = [];
                    $scope.requestedJobsForPagination = [];

                    for (var i = 0; i <= $scope.requestedJobsArray.length; i++) {

                        var page = 0;

                        if (i < $scope.pageLimit) {

                        }
                        if (i < $scope.requestedJobsArray.length) {

                        }
                        if (i < $scope.pageLimit && i < $scope.requestedJobsArray.length) {
                        
                            if ($scope.requestedJobsArray[i]) {

                                $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])

                            }

                        } else {

                            if (!$scope.usersLoaded) {

                                $scope.loadingUsers = false;
                                $scope.requestedJobsPaginated.push($scope.requestedJobsForPagination)
                                $scope.requestedJobsForPagination = [];

                                if ($scope.requestedJobsArray[i] !== undefined) {

                                    $scope.requestedJobsForPagination.push($scope.requestedJobsArray[i])

                                }
                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    }

                })

            } else {

                $scope.requestEmployeePageOpen = false;
                $scope.addSupervisorPageOpen = false;
                $scope.addLocationPageOpen = false;
                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.messageCompositionPageOpen = false;
                $scope.messagPageOpen = false;
                $scope.clientHome = true;

            }

        }
      
        Auth.getUser().then(function (data) {

            //console.log(data)
            $scope.name = data.data.name;
            $scope.email = data.data.email;
            $scope.user_id = $routeParams.userid
            //console.log($scope.user_id)

            User.findUser($rootScope.user_id).then(function (data) {

                //console.log(data)
                $scope.locationsArray = data.data.user[0].locations;
                $scope.supervisorsArray = data.data.user[0].supervisors
                $scope.delinquentTimeSheetArray = data.data.user[0].delinquenttimesheets
                $scope.payPeriodHistory = data.data.user[0].payperiodhistory

                for (var z = 0; z < $scope.payPeriodHistory.length; z++) {

                    for (var d = 0; d < $scope.payPeriodHistory[z].entry.length; d++) {

                        $scope.payPeriodHistory[z].entry[d]

                        if ($scope.payPeriodHistory[z].entry[d][0].delinquent || $scope.payPeriodHistory[z].entry[d][1].delinquent) {
                            
                            $scope.delinquentTimeSheetInPayPeriod = true;
                            //console.log("DELINQUENT")
                        }

                    }

                }

            })

        })
   
        $scope.addPayPeriodToPayPeriodHistory = function (details) {

            $scope.employeeJobDetails.payperiod = $rootScope.payPeriod;
            $scope.allEmployeesJobDetails = []

            User.getUsers().then(function (data) {

                for (var d = 0; d < data.data.users.length; d++) {

                    for (var k = 0; k < data.data.users[d].payperiods.length; k++) {

                        if (data.data.users[d].payperiods[0].payperiodnum !== $rootScope.payPeriod) {

                            $scope.nameObject = {}
                            $scope.nameObject.name = data.data.users[d].name
                            data.data.users[d].payperiods[0].jobDetails.push($scope.nameObject)
                            $scope.allEmployeesJobDetails.push(data.data.users[d].payperiods[0].jobDetails)

                        }

                    }

                    $scope.employeeJobDetails.allEmployeesJobDetails = $scope.allEmployeesJobDetails;
                    $scope.payPeriodHistory = data.data.users[d].payperiodhistory

                }

                for (var z = 0; z < $scope.employeeJobDetails.allEmployeesJobDetails.length; z++) {
                 
                    for (var x = 0; x < $scope.employeeJobDetails.allEmployeesJobDetails[z].length; x++) {

                        for (var y = 0; y < $scope.employeeJobDetails.allEmployeesJobDetails[z][x].length; y++) {

                            if ($scope.employeeJobDetails.allEmployeesJobDetails[z][x][y].timesheetSubmitted) {

                                var startTime = moment($scope.employeeJobDetails.allEmployeesJobDetails[z][x][y].timein, "HH:mm:ss a");
                                var endTime = moment($scope.employeeJobDetails.allEmployeesJobDetails[z][x][y].timeout, "HH:mm:ss a");
                                var duration = moment.duration(endTime.diff(startTime));
                                var hours = parseInt(duration.asHours());
                                var minutes = parseInt(duration.asMinutes()) - hours * 60;
                                //console.log(hours)
                                //console.log(minutes)

                                if (minutes == 15) {

                                    hours = hours + .25
                                    minIterator = 0;

                                }
                                if (minutes == 30) {

                                    hours = hours + .50

                                }
                                if (minutes == 45) {

                                    hours = hours + .75

                                }
                                if ($scope.employeeJobDetails.allEmployeesJobDetails[z][x][y].lunch) {

                                    hours = hours - .5

                                }

                                $scope.employeeJobDetails.allEmployeesJobDetails[z][x][y].hoursCalculated = hours;

                            } else {

                                $scope.employeeJobDetails.allEmployeesJobDetails[z][x][y].hoursCalculated = 0;
                                $scope.employeeJobDetails.allEmployeesJobDetails[z][x][y].datebooked = false;

                            }

                        }

                    }
                    $scope.payPeriodObject = {
                        entry: $scope.employeeJobDetails.allEmployeesJobDetails[z]
                    }

                    User.addPayPeriodToPayPeriodHistory($scope.payPeriodObject).then(function (data) {

                        //console.log(data)
                        $scope.loadingAddToWorkHistory = false
                        $scope.finishedChangingPayPeriod = true;

                        $timeout(function () {

                            $scope.finishedChangingPayPeriod = false
                            $scope.loadingNewPayPeriod = false;

                        }, 2500)

                    })

                }

            })

        }
        $scope.openIndividualHistoryEntry = function (index) {
           
            $scope.showChart = false;

            $timeout(function () {

                $scope.removeChart = true;

                if ($scope.historyEntryOpen && index !== $scope.curHistory
                ) {
                    
                    $scope.curHistory = index;

                }
                else if (!$scope.historyEntryOpen && index == $scope.curHistory) {

                    $scope.historyEntryOpen = true;
 
                }
                else if (!$scope.historyEntryOpen && index !== $scope.curHistory) {

                    $scope.historyEntryOpen = true;
                    $scope.curHistory = index;

                } else {

                    $scope.curHistory = null
                    $scope.showChart = true;
                    $scope.removeChart = false;

                }

            }, 500)

        }
        $scope.openMessageCompositionPage = function (index) {
            $('.tooltipped').tooltip();
     
            if ($scope.messageCopositionPageOpen && index !== $scope.currentIndex2
            ) {

                // $scope.individualPayPeriodOpen = false;
                $scope.currentIndex2 = index;
                //console.log("first")

            }
            else if (!$scope.messageCopositionPageOpen && index == $scope.currentIndex2) {

                $scope.messageCopositionPageOpen = true;

            }
            else if (!$scope.messageCopositionPageOpen && index !== $scope.currentIndex2) {

                $scope.messageCopositionPageOpen = true;
                $scope.currentIndex2 = index;

            } else {

                $scope.currentIndex2 = null
                $scope.showChart = true;
                $scope.removeChart = false;

            }

        }
        $scope.openAreYouSure = function (index) {

            if (!$scope.areYouSure) {

                $scope.areYouSure = true;

            } else {

                // $scope.areYouSure 

            }

        }
        $scope.closeAreYouSure = function (index) {

            $scope.areYouSure = false;

        }
        $scope.removeMessage = function (index) {

            $scope.messageLoading = true;
            $scope.currentIndex = index;
            $scope.areYouSure = false;

            User.removeMessage($scope.name, $scope.messageIndex).then(function (data) {
                //console.log(data)
                $scope.page=0;
                $scope.pageLimit = 4;
                $scope.messagesPaginated = [];
                $scope.messageForPagination = [];
                $scope.messagesArray = data.data.user.comments;

                for (var i = 0; i <= $scope.messagesArray.length; i++) {

                    var page = 0;
      
                    if (i < $scope.pageLimit) {

                        //console.log("its less")

                    }
                    if (i < $scope.messagesArray.length) {

                        //console.log("yup,less")

                    }
                    if (i < $scope.pageLimit && i < $scope.messagesArray.length) {
                  
                        if ($scope.messagesArray[i]) {

                            $scope.messagesArray[i].messageIndex = i
                            $scope.messageForPagination.push($scope.messagesArray[i])

                        }

                    } else {

                        if (!$scope.usersLoaded) {

                            $scope.loadingUsers = false;

                            if ($scope.messageForPagination.length > 0) {

                                $scope.messagesPaginated.push($scope.messageForPagination)

                            }
                            $scope.messageForPagination = [];
                            if ($scope.messagesArray[i] !== undefined) {

                                $scope.messagesArray[i].messageIndex = i
                                $scope.messageForPagination.push($scope.messagesArray[i])

                            }

                            $scope.pageLimit = $scope.pageLimit + 4;
                            page++

                        }

                    }

                }

                $scope.messageLoading = false;
                $scope.currentIndex = null;

            })

        }
        $scope.markAsUnread = function (index, messageindex) {

            $scope.messageLoading = true;
            $scope.currentIndex = index;
            $scope.messageIndex = messageindex

            User.changeMessageToUnRead($scope.name, $scope.messageIndex).then(function (data) {

                $scope.pageLimit = 4;
                $scope.messagesPaginated = [];
                $scope.messageForPagination = [];
                $scope.messagesArray = data.data.user.comments;

                for (var i = 0; i <= $scope.messagesArray.length; i++) {

                    var page = 0;
   
                    if (i < $scope.pageLimit) {
                        
                    }
                    if (i < $scope.messagesArray.length) {

                    }

                    if (i < $scope.pageLimit && i < $scope.messagesArray.length) {
                
                        if ($scope.messagesArray[i]) {

                            $scope.messagesArray[i].messageIndex = i
                            $scope.messageForPagination.push($scope.messagesArray[i])
                
                        }

                    } else {

                        if (!$scope.usersLoaded) {

                            $scope.loadingUsers = false;
                            $scope.messagesPaginated.push($scope.messageForPagination)
                            $scope.messageForPagination = [];

                            if ($scope.messagesArray[i] !== undefined) {

                                $scope.messagesArray[i].messageIndex = i
                                $scope.messageForPagination.push($scope.messagesArray[i])

                            }

                            $scope.pageLimit = $scope.pageLimit + 4;
                            page++

                        }

                    }

                }

                $scope.messageLoading = false;
                $scope.currentIndex = null;

            })

        }
        $scope.removeSupervisor = function (index) {

            $scope.removeSupervisorLoading = true;

            var supervisorData = {
                index: index,
                name: $scope.userName
            }

            User.removeSupervisor(supervisorData).then(function (data) {

                //console.log(data)
                $scope.supervisorsArray = data.data.supervisors;
                $scope.removeSupervisorLoading = false;
                $scope.addSupervisorPageOpen = false;
                $scope.subconIndex = null;
                $scope.page = 0;
                $scope.openAddSupervisorPage();

            })

        }
        $scope.removeLocation = function (index) {

            $scope.removeLocationLoading = true;

            var locationData = {
                index: index,
                name: $scope.userName
            }

            User.removeLocation(locationData).then(function (data) {

                //console.log(data)
                $scope.locationsArray = data.data.locations;
                $scope.removeLocationLoading = false;
                $scope.addLocationPageOpen = false;
                $scope.locationIndex = null;
                $scope.openAddLocationPage();
                $scope.page=0;

            })

        }
        $scope.openIndividualLocation = function (index) {

            if ($scope.individualLocationOpen && index !== $scope.locationIndex
            ) {

                $scope.locationIndex = index;

            }
            else if (!$scope.individualLocationOpen && index == $scope.locationIndex) {

                $scope.individualLocationOpen = true;
                //console.log("second")
                //console.log($scope.timesheetEntryOpen)
                //$scope.curPeriod = index;

            }
            else if (!$scope.individualLocationOpen && index !== $scope.locationIndex) {

                //console.log("third")
                $scope.individualLocationOpen = true;
                //console.log($scope.timesheetEntryOpen)
                $scope.locationIndex = index;

            } else {

                //console.log("last")
                $scope.locationIndex = null
                // $scope.showChart = true;
                //$scope.removeChart = false;

            }

        }
        $scope.openIndividualRequestedJob = function (index) {

            if ($scope.individualRequestedJobOpen && index !== $scope.requestIndex
            ) {
                // $scope.individualPayPeriodOpen = false;
                $scope.messageLoading = true;
                $scope.requestIndex = index;
                individualRequestedJobOpen
                //console.log("first")
                // //console.log($scope.timesheet)
                //console.log($scope.timesheetEntryOpen)

            }
            else if (!$scope.individualRequestedJobOpen && index == $scope.requestIndex) {

                $scope.individualSupervisorOpen = true;
                //console.log("second")
                //console.log($scope.timesheetEntryOpen)
                //$scope.curPeriod = index;

            }
            else if (!$scope.individualRequestedJobOpen && index !== $scope.requestIndex) {

                //console.log("third")
                $scope.individualRequestedJobOpen = true;
                //console.log($scope.timesheetEntryOpen)
                $scope.requestIndex = index;

            } else {

                //console.log("last")
                $scope.requestIndex = null
                // $scope.showChart = true;
                //$scope.removeChart = false;

            }

        }
        $scope.openIndividualSupervisor = function (index) {

            if ($scope.individualSupervisorOpen && index !== $scope.subconIndex
            ) {

                // $scope.individualPayPeriodOpen = false;
                $scope.messageLoading = true;
                $scope.subconIndex = index;
                //console.log("first")
                // //console.log($scope.timesheet)
                //console.log($scope.timesheetEntryOpen)

            }
            else if (!$scope.individualSupervisorOpen && index == $scope.subconIndex) {

                $scope.individualSupervisorOpen = true;
                //console.log("second")
                //console.log($scope.timesheetEntryOpen)
                //$scope.curPeriod = index;

            }
            else if (!$scope.individualSupervisorOpen && index !== $scope.subconIndex) {

                //console.log("third")
                $scope.individualSupervisorOpen = true;
                //console.log($scope.timesheetEntryOpen)
                $scope.subconIndex = index;

            } else {

                //console.log("last")
                $scope.subconIndex = null
                // $scope.showChart = true;
                //$scope.removeChart = false;

            }

        }
        $scope.openClientHome = function(){

            $scope.clientHome= true;
            $scope.addLocationPageOpen = false;
            $scope.addSupervisorPageOpen = false;
            $scope.requestListOpen = false;
            $scope.messagePageOpen = false;
            $scope.messagePageSelected = false;
            $scope.composeMessagePageOpen = false;
            $scope.reviewSubmittedTimeSheetsPageOpen = false;
            $scope.currentIndex2 = null

        }
        $scope.openAddSupervisorPage = function (index) {

            if (!$scope.addSupervisorPageOpen) {

                $scope.page=0;
                $scope.addSupervisorPageOpen = true;
                $scope.addLocationPageOpen = false
                $scope.requestEmployeePageOpen = false;
                $scope.requestEmployeePageOpen = false;
                $scope.messagePageOpen = false;
                $scope.composeMessagePageOpen = false;
                $scope.locationListOpen = false;
                $scope.supervisorListOpen = false;
                $scope.requestListOpen = false;
                $scope.requestJobFormOpen = false;
                $scope.submitSupervisorPageOpen = false;
                $scope.submitLocationPageOpen = false;
                $scope.clientHome = false;
                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.complaintsPageClientOpen = false;

                User.getSupervisors($scope.userName).then(function (data) {
                   // //console.log(data)
                    $scope.supervisorsArray = data.data.supervisors
                    $scope.subconIndex = index;
                    $scope.pageLimit = 4;
                    $scope.supervisorsPaginated = [];
                    $scope.supervisorsForPagination = [];

                    for (var i = 0; i <= $scope.supervisorsArray.length; i++) {

                        var page = 0;

                        if (i < $scope.pageLimit) {

                          //  //console.log("its less")

                        }
                        if (i < $scope.supervisorsArray.length) {

                            //console.log("yup,less")
                        }
                        if (i < $scope.pageLimit && i < $scope.supervisorsArray.length) {
                        
                            if ($scope.supervisorsArray[i]) {

                                $scope.supervisorsForPagination.push($scope.supervisorsArray[i])
                
                            }

                        } else {

                            if (!$scope.usersLoaded) {

                                $scope.loadingUsers = false;
                                $scope.supervisorsPaginated.push($scope.supervisorsForPagination)
                                //console.log($scope.supervisorsPaginated)
                                $scope.supervisorsForPagination = [];

                                if ($scope.supervisorsArray[i] !== undefined) {

                                    $scope.supervisorsForPagination.push($scope.supervisorsArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    }
                    if ($scope.individualSupervisorOpen && index !== $scope.subconIndex
                    ) {

                        $scope.subconIndex = index;
                        $scope.pageLimit = 4;
                        $scope.supervisorsPaginated = [];
                        $scope.supervisorsForPagination = [];

                        for (var i = 0; i <= $scope.supervisorsArray.length; i++) {

                            var page = 0;

                            if (i < $scope.pageLimit) {

                                //console.log("its less")

                            }
                            if (i < $scope.supervisorsArray.length) {

                                //console.log("yup,less")

                            }
                            if (i < $scope.pageLimit && i < $scope.supervisorsArray.length) {

                                //console.log("HELLO")
                                ////console.log($scope.employees[i])
                                ////console.log($scope.pageLimit, i, $scope.employees.length)

                                if ($scope.supervisorsArray[i]) {

                                    $scope.supervisorsForPagination.push($scope.supervisorsArray[i])

                                }


                            } else {

                                if (!$scope.usersLoaded) {

                                    $scope.loadingUsers = false;
                                    $scope.supervisorsPaginated.push($scope.supervisorsForPagination)
                                    //console.log($scope.supervisorsPaginated)
                                    $scope.supervisorsForPagination = [];

                                    if ($scope.supervisorsArray[i] !== undefined) {

                                        $scope.supervisorsForPagination.push($scope.supervisorsArray[i])

                                    }

                                    $scope.pageLimit = $scope.pageLimit + 4;
                                    page++

                                }

                            }

                        }

                    }

                    else if (!$scope.individualSupervisorOpen && index == $scope.subconIndex) {

                        $scope.individualSupervisorOpen = true;
                
                    }
                    else if (!$scope.individualSupervisorOpen && index !== $scope.subconIndex) {

                        //console.log("third")
                        $scope.individualSupervisorOpen = true;
                        //console.log($scope.timesheetEntryOpen)
                        $scope.subconIndex = index;

                    } else {

                        //console.log("last")
                        $scope.subconIndex = null
                        // $scope.showChart = true;
                        //$scope.removeChart = false;
                    }

                })

            } else {

                $scope.addSupervisorPageOpen = false;
                $scope.addLocationPageOpen = false
                $scope.requestEmployeePageOpen = false;
                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.complaintsPageClientOpen = false;
                $scope.clientHome = true;

            }

        }
        $scope.openAddLocationPage = function () {

            if (!$scope.addLocationPageOpen) {

                $scope.page=0;
                $scope.addLocationPageOpen = true;
                $scope.reviewSubmittedTimeSheetsPageOpen= false;
                $scope.messagePageOpen = false;
                $scope.composeMessagePageOpen = false;
                $scope.locationListOpen = false;
                $scope.supervisorListOpen = false;
                $scope.requestListOpen = false;
                $scope.requestJobFormOpen = false;
                $scope.submitSupervisorPageOpen = false;
                $scope.submitLocationPageOpen = false;
               // $scope.addLocationPageOpen = false;
                $scope.addSupervisorPageOpen = false;
                $scope.requestEmployeePageOpen = false;
                $scope.clientHome = false;

                User.getLocations($scope.userName).then(function (data) {

                    //console.log(data)
                    $scope.locationsArray = data.data.locations;
                    //$scope.locationIndex = index;
                    $scope.pageLimit = 4;
                    $scope.locationsPaginated = [];
                    $scope.locationsForPagination = [];

                    for (var i = 0; i <= $scope.locationsArray.length; i++) {

                        var page = 0;
        
                        if (i < $scope.pageLimit) {

                            //console.log("its less")

                        }
                        if (i < $scope.locationsArray.length) {

                            //console.log("yup,less")

                        }
                        if (i < $scope.pageLimit && i < $scope.locationsArray.length) {
                            
                            if ($scope.locationsArray[i]) {

                                $scope.locationsForPagination.push($scope.locationsArray[i])
                      
                            }

                        } else {

                            if (!$scope.usersLoaded) {

                                //console.log("else")
                                $scope.loadingUsers = false;
                                $scope.locationsPaginated.push($scope.locationsForPagination)
                                //console.log($scope.locationsPaginated)
                                $scope.locationsForPagination = [];

                                if ($scope.locationsArray[i] !== undefined) {

                                    $scope.locationsForPagination.push($scope.locationsArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    }

                })

            } else {

                $scope.addSupervisorPageOpen = false;
                $scope.clientHome = true;
                $scope.addLocationPageOpen = false
                $scope.requestEmployeePageOpen = false;
                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.complaintsPageClientOpen = false;

            }

        }
        $scope.openMessage = function (index, timesheetData, messageindex) {

          
            $('select').material_select();

            if ($scope.messageOpen && index !== $scope.currentIndex
            ) {

                // $scope.individualPayPeriodOpen = false;
                $scope.messageLoading = true;
                $scope.currentIndex = index;
                $scope.messageIndex = messageindex
                $scope.messageLoading = false;

                User.changeMessageToRead($scope.name, $scope.messageIndex).then(function (data) {

                    //console.log(data)
                    $scope.pageLimit = 4;
                    $scope.messagesPaginated = [];
                    $scope.messageForPagination = [];
                    $scope.messagesArray = data.data.user.comments;

                    for (var i = 0; i <= $scope.messagesArray.length; i++) {

                        var page = 0;
                      
                        if (i < $scope.pageLimit) {

                            //console.log("its less")

                        }
                        if (i < $scope.messagesArray.length) {

                            //console.log("yup,less")

                        }
                        if (i < $scope.pageLimit && i < $scope.messagesArray.length) {
                            
                            if ($scope.messagesArray[i]) {

                                $scope.messagesArray[i].messageIndex = i
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
                                //console.log($scope.messagesPaginated)
                                $scope.messageForPagination = [];

                                if ($scope.messagesArray[i] !== undefined) {

                                    $scope.messagesArray[i].messageIndex = i
                                    $scope.messageForPagination.push($scope.messagesArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    }

                })

            }
            else if (!$scope.messageOpen && index == $scope.currentIndex) {

                $scope.messageOpen = true;
        
            }
            else if (!$scope.messageOpen && index !== $scope.currentIndex) {

                //console.log("third")
                $scope.messageOpen = true;
                //console.log($scope.timesheetEntryOpen)
                $scope.currentIndex = index;

            } else {

                //console.log("last")
                $scope.currentIndex = null
                // $scope.showChart = true;
                //$scope.removeChart = false;

            }

        }
        $scope.closeAddHours = function () {

            $scope.addHoursPageOpen = false;

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
        $scope.openNotesPage = function (index) {

            $scope.usersPageIndex = index;

            if (!$scope.disputesPageOpen) {

                $scope.jobsPageOpen = false;
                $scope.notesPageOpen = true;
                $scope.timesheetsPageOpen = false;
                $scope.timesheetsSelected = false;
                $scope.payslipGenerationOpen = false;
                $scope.jobsSelected = false;
                $scope.notesSelected = true;
                $scope.delinquentTimeSheetSelected = false;
                $scope.disputesSelected = false;
                $scope.disputesPageOpen = false;

            } else {

                $scope.notesSelected = false;

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

                //$scope.jobsSelected = false;

            }

        }
        $scope.openBookedJobsPage = function () {

            if ($scope.bookedJobsSelected) {

    
            } else {

                //console.log("second")
                $scope.bookedJobsSelected = true;
                $scope.complaintsPageOpened = false;
                $scope.messageCompositionPageOpen = false;
                $scope.composeMessagePageOpen = false;
                $scope.messagePageSelected = false;
                $scope.messagePageOpen = false;
                $scope.bookedJobsPageOpened = true;
                $scope.delinquentTimeSheetSelected = false;
                $scope.historyPageOpenProfile = false;
                $scope.delinquentTimeSheetPageOpened = false;
                $scope.chartsPageOpen = false;
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
        $scope.openUserFileHistory = function (name, phonenumber) {

            $scope.openJob = 0;
            $scope.historyPageOpenProfile = true;
            $scope.currentUserHistoryFile = name;
            $scope.generalHistoryOpen = false;
            $scope.generalHistoryTitle = false;
            $scope.chartsPageOpen = false;
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
            //console.log(phonenumber)
            //console.log(name)
            //$scope.currentUserFile = name;
            $scope.currentUserHistoryFile = name;
            $scope.currentUserPhoneNumber = phonenumber;
            $scope.jobDetails = [];
            //$scope.employeesPaginated = [];
            $scope.hoursArrayForHistory = [];

            if ($scope.usersLoaded) {

                User.findUser($rootScope.user_id).then(function (data) {

                    $scope.payPeriodHistory = data.data.user[0].payperiodhistory
                  
                    for (var b = 0; b < $scope.payPeriodHistory.length; b++) {
                  
                        for (var c = 0; c < $scope.payPeriodHistory[b].entry.length; c++) {

                            $scope.hoursCalcIterator = 0;

                            for (var x = 0; x < $scope.payPeriodHistory[b].entry[x].length; x++) {


                                if ($scope.payPeriodHistory[b].entry[c][0] !== undefined) {

                                    $scope.labels[c] = $scope.payPeriodHistory[b].entry[c][0].date
                                    
                                    if ($scope.payPeriodHistory[b].entry[c][x + 1] !== undefined) {

                                        //console.log("HOlk")
                                        $scope.hoursCalIterator = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1];
                                        //console.log($scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated)
                                        $scope.data[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated;


                                    } else {

                                        //console.log("choOlk")
                                        $scope.data[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated;

                                    }

                                }

                            }

                            var hoursIterator = 0;
                            var minIterator = 0;
                           
                        }

                    }

                    $scope.loadingPersonalHistory = false;

                })

            } else {

                User.getUsers().then(function (data) {

                    //console.log(data)
                    // $scope.employees = data.data.users;
                    //$scope.jobDetails = data.data.users.jobDetails;

                    for (var i = 0; i < data.data.users.length; i++) {

                        if (data.data.users[i].name == $scope.currentUserHistoryFile) {

                            //console.log($scope.currentUserFile)
                            // $scope.jobDetails = data.data.users[i].jobDetails;
                            $scope.comments = data.data.users[i].comments;
                            $scope.payperiods = data.data.users[i].payperiods;
                            $scope.payPeriodHistory = data.data.users[i].payperiodhistory
                            $scope.loadingPersonalHistory = false;
                            //console.log($scope.payperiods)
                            //console.log($scope.currentUserFile)
                            //console.log($scope.payPeriodHistory)

                            for (var b = 0; b < $scope.payPeriodHistory.length; b++) {

                                //$scope.data
                                // $scope.data[0][b]= hoursIterator;

                                for (var c = 0; c < $scope.payPeriodHistory[b].entry.length; c++) {

                                    var hoursIterator = 0;
                                    var minIterator = 0;
                                    $scope.labels[c] = $scope.payPeriodHistory[b].entry[c].date
                                    var startTime = moment($scope.payPeriodHistory[b].entry[c].timein, "HH:mm:ss a");
                                    var endTime = moment($scope.payPeriodHistory[b].entry[c].timeout, "HH:mm:ss a");
                                    var duration = moment.duration(endTime.diff(startTime));
                                    var hours = parseInt(duration.asHours());
                                    var minutes = parseInt(duration.asMinutes()) - hours * 60;
  
                                    if (minutes == 15) {

                                        hours + .25
                                        minIterator = 0;

                                    }
                                    if (minutes == 30) {

                                        hours + .30

                                    }
                                    if (minutes == 45) {

                                        hours + .75

                                    }

                                    $scope.data[0][c] = hours + minutes

                                }

                            }
                         
                            for (var k = 0; k < $scope.payperiods.length; k++) {

                                ////console.log($scope.payperiods[k].payperiodnum)
                                ////console.log($rootScope.payPeriod)

                                if ($scope.payperiods[k].payperiodnum == $rootScope.payPeriod) {

                                    //console.log($scope.payperiods[k].jobDetails)
                                    $scope.jobDetails = $scope.payperiods[k].jobDetails

                                }

                            }

                        }

                    }

                    //console.log($scope.payperiods)
                    //console.log($scope.jobDetails)
                })

            }

            //console.log(name);
            //console.log("Curent User", $scope.currentUserFile)

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
        $scope.changePage = function () {

            $scope.currentIndex = null; 
            if ($scope.page < $scope.messagesPaginated.length - 1) {

                $scope.page++
            }

        }
        $scope.decreasePage = function () {

            $scope.currentIndex = null;

            if ($scope.page > 0) {

                $scope.page--

            }

        }
        $scope.changePageAddSupervisorsPage = function () {

            $scope.currentIndex = null;

            if ($scope.page < $scope.supervisorsPaginated.length - 1) {

                $scope.page++
            }

            //console.log($scope.page)

        }
        $scope.decreasePageAddSupervisorsPage = function () {

            $scope.currentIndex = null;

            if ($scope.page > 0) {

                $scope.page--
                //console.log($scope.page)
            }

        }
        $scope.changePage2 = function () {

            if ($scope.page < $scope.usersPaginated.length - 1) {

                $scope.page++

            }
        
        }
        $scope.decreasePage2 = function () {

            if ($scope.page > 0) {

                $scope.page--
                //console.log($scope.page)
            }

        }
        $scope.changePageRequestedJobsPage = function () {

            //$scope.messageIndex = null

            if ($scope.page < $scope.requestedJobsPaginated.length - 1) {

                $scope.page++

            }
            //console.log($scope.page)
            
        }
        $scope.decreasePageRequestedJobsPage = function () {
            
            if ($scope.page > 0) {

                $scope.page--
                //console.log($scope.page)
            }

        }
        $scope.changePageLocationsPage = function () {

            //$scope.messageIndex = null

            if ($scope.page < $scope.locationsPaginated.length - 1) {

                $scope.page++

            }

            //console.log($scope.page)
            
        }
        $scope.decreasePageLocationsPage = function () {

            if ($scope.page > 0) {

                $scope.page--
                //console.log($scope.page)
            }

        }
        $scope.changePageTimeSheets = function () {

            if ($scope.page < $scope.submittedTimeSheetsPaginated.length - 1) {

                $scope.page++
            }

            //console.log($scope.page)

        }
        $scope.decreasePageTimeSheets = function () {

            if ($scope.page > 0) {

                $scope.page--
                //console.log($scope.page)

            }

        }
        $scope.submitMessage = function (name) {

            //console.log($scope.message)
            //console.log($scope.name)

            if ($scope.message.subject == null || $scope.message.body == null) {

                $scope.allFieldsMustBeInput = true;

                $timeout(function () {

                    $scope.allFieldsMustBeInput = false;

                }, 2000)

            } else {

                if ($scope.message.subject !== null && $scope.message.body !== null) {

                    $('html, body').animate({ scrollTop: $(window).scrollTop() - 200 }, 'fast');
                    $scope.sendMessageLoading = true;
                    $scope.message.to = name
                    $scope.message.from = $scope.name;
                    $scope.message.read = false;

                    User.sendMessage($scope.message).then(function (data) {

                        //console.log(data)
                        // $scope.sendMessageLoading = false;
                        $scope.sendMessageLoading = false;
                        $scope.messageSuccessfullySent = true;

                        $timeout(function () {

                            $scope.messageSuccessfullySent = false;
                            $scope.message.from = null;
                            $scope.message.body = null;
                            $scope.message.subject = null;
                            $scope.openMessageCompositionPage()

                        }, 2500)

                    })

                }

            }

        }
        $scope.openComposeMessagePage = function () {


            if (!$scope.composeMessagePageOpen) {

                $scope.clientHome = false;
                $scope.composeMessagePageLoading = true;
                $scope.composeMessagePageOpen = true;
                $scope.composeMessagePageSelected = true;
                $scope.requestEmployeePageOpen = false;
                $scope.addLocationPageOpen = false;
                $scope.reviewSubmittedTimeSheetsPageOpen = false
                $scope.addSupervisorPageOpen = false;
                $scope.messagePageSelected = false
                $scope.chartsPageSelected = false;
                $scope.workHistoryProfileSelected = false;
                $scope.profileHome = false;
                $scope.messagePageOpen = false;
                $scope.bookedJobsSelected = false;
                $scope.historyPageOpen = false;
                $scope.chartsPageOpen = false;
                $scope.historyPageOpenProfile = false;
                $scope.bookedJobsPageOpened = false;
                $scope.messagePageSelected = false;
                $scope.currentIndex = null;
                $scope.usersPaginated = [];
                $scope.usersLoading = true;
                $scope.usersForPagination = [];
                $scope.pageLimit = 4;

                User.getUsers().then(function (data) {

                    //console.log(data)
                    $scope.usersArray = data.data.users;

                    for (var i = 0; i <= $scope.usersArray.length; i++) {

                        var page = 0;

                        if (i < $scope.pageLimit) {

                            //console.log("its less")

                        }
                        if (i < $scope.usersArray.length) {

                            //console.log("yup,less")

                        }
                        if (i < $scope.pageLimit && i < $scope.usersArray.length) {

                            if ($scope.usersArray[i]) {

                                $scope.usersForPagination.push($scope.usersArray[i])

                            }

                        } else {
                            
                            if (!$scope.usersLoaded) {

                                //console.log("else")
                                $scope.loadingUsers = false;
                                $scope.usersPaginated.push($scope.usersForPagination)
                                // //console.log($scope.messagesPaginated)
                                $scope.usersForPagination = [];

                                if ($scope.usersArray[i] !== undefined) {

                                    $scope.usersForPagination.push($scope.usersArray[i])

                                }

                                $scope.pageLimit = $scope.pageLimit + 4;
                                page++

                            }

                        }

                    }
                    
                    $scope.composeMessagePageLoading = false;

                })

            } else {

                $scope.composeMessagePageOpen = false;
                $scope.clientHome = true;

            }
            
        }
        $scope.decreaseJobInDate = function () {

            $scope.slideOut = true;
            $scope.fadeOut2 = true;

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

            }, 500)

        }
        $scope.changeJobInDate = function (index) {

            $scope.slideOut = true;
            $scope.fadeOut2 = true;

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
        $scope.finishSubmitTimesheet = function (decision) {
      
            $scope.loadingAddHours = true;

            if (decision == "yes") {

                $scope.areYouSure = false;

                User.addHoursToBookedJob($scope.jobData).then(function (data) {

                    User.addHoursToClientSubmittedTimeSheets($scope.jobData).then(function (data) {

                        //console.log(data)

                        if (data.data.success) {

                            $scope.loadingAddHours = false;
                            $scope.areYouSure = false;
                            $scope.openUserFile($scope.name)

                        } else {

                        }
                    })
                
                })

            } else {

                $scope.areYouSure = false;

            }

        }
        $scope.addHours = function (currentJobInDate, index, jobData) {

            //console.log($scope.timeData)
            // //console.log($scope.currentJobInDate)
            //console.log(jobData)
            //console.log($scope.userName)

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
                jobData.timein = "" + $scope.timeData.hrsIn1 + $scope.timeData.hrsIn2 + ":" + $scope.timeData.minsIn1 + $scope.timeData.minsIn2 + $scope.timeData.amPm1
                jobData.timeout = "" + $scope.timeData.hrsOut1 + $scope.timeData.hrsOut2 + ":" + $scope.timeData.minsOut1 + $scope.timeData.minsOut2 + $scope.timeData.amPm2
                jobData.payperiodnum = $rootScope.payPeriod;
                jobData.currentuser = $scope.name;
                jobData.lunch = $scope.timeData.lunch;
                jobData.booked = true;
                jobData.timesheetSubmitted = true;
                $scope.jobData = jobData;
                $scope.jobData.disputed = false;
                $scope.areYouSure = true;

            } else {

                $scope.timeSheetDataNotComplete = true;

                $timeout(function () {

                    $scope.timeSheetDataNotComplete = false;

                }, 3000)

            }

        }
        $scope.openAddHoursPage = function () {

            $('select').material_select();

            if (!$scope.addHoursPageOpen) {

                $scope.addHoursPageOpen = true;

            } else {

                $scope.addHoursPageOpen = false;

            }

        }
        $scope.submitHours = function (index, client, location, currentuser, page, payperiodindex) {

            $scope.allFieldsMustBeInput = false
            //console.log(index)
            //console.log(page)
            $scope.timeData.payperiodhistoryindex = $scope.payPeriodHistoryIndex
            $scope.timeData.currentuser = $scope.userName
            $scope.timeData.page = page
            $scope.timeData.payperiodnum = $scope.globalPayPeriodIndexATM;
            $scope.timeData.location = location
            $scope.timeData.disputed = false;

            if ($scope.timeData.ampmIn == null ||
                $scope.timeData.ampmOut == null ||
                $scope.timeData.hoursIn == null ||
                $scope.timeData.hoursOut == null ||
                $scope.timeData.minutesIn == null ||
                $scope.timeData.minutesOut == null) {

                $scope.allFieldsMustBeInput = true;
                //console.log("Hello")

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
                //console.log($scope.timeData)
                $scope.timein = $scope.timeData.hoursIn + ":" + $scope.timeData.minutesIn + $scope.timeData.ampmIn
                $scope.timeout = $scope.timeData.hoursOut + ":" + $scope.timeData.minutesOut + $scope.timeData.ampmOut
                $scope.timeData.timein = $scope.timein;
                $scope.timeData.timeout = $scope.timeout
                $scope.timeData.client = client
                //console.log($scope.timeData.client)
                //console.log($scope.timein)
                //console.log($scope.timeout)
                var startTime = moment($scope.timein, "HH:mm:ss a");
                //console.log(startTime)
                var endTime = moment($scope.timeout, "HH:mm:ss a");
                var duration = moment.duration(endTime.diff(startTime));
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) - hours * 60;
                var hoursPositive = 0;
                var minsPositive = 0;
                var hoursDif = 0;
                //console.log(hours)
                //console.log(minutes)
              
                 if (minutes == 0 && $scope.timeData.lunch == "Yes") {

                    minutes = 30
                    hours = hours - 1

                    if (minutes == 30) {

                        hours = hours + .5
                        //hours+12

                        if (Math.sign(hours) == -1) {

                            //console.log("negative")
                            //console.log(hours * -2)
                            //console.log(hours)
                            hoursPositive = Math.abs(hours)
                            //console.log(hoursPositive)
                            hoursDif = (12.5 - hoursPositive)
                            //console.log("hoursDif", hoursDif)
                            hours = hoursDif + 12
                            //console.log(hours)
                            hours = (hours - 1) + .5

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }

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

                } else {

                    //console.log("Do nothing")

                    if (minutes == 15) {

                        //console.log("Minutes == 15")
                        hours = hours + .25
                        //console.log("Hours", hours)

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
                            //hours= (hours-1)+.5

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }
                    if (minutes == 30) {

                        hours = hours + .5

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
                            //hours= (hours-1)+.5

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }
                    if (minutes == 00) {

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
                            //hours= (hours-1)+.5

                        }

                        $scope.timeData.hoursCalculated = hours;

                    }
                    if (Math.sign(minutes) == -1) {

                        minsPositive = Math.abs(minutes)

                        if (minsPositive == 15) {

                            //console.log("Minutes == 15")
                            hours = hours - .25
                            //console.log("Hours", hours)

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
                                //hours= (hours-1)+.5

                            }

                            $scope.timeData.hoursCalculated = hours;

                        }
                        if (minsPositive == 30) {

                            //console.log("Minutes == 30")
                            hours = hours - .5
                            //console.log("Hours", hours)

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
                                //hours= (hours-1)+.5

                            }

                            $scope.timeData.hoursCalculated = hours;

                        }
                        if (minsPositive == 45) {

                            //console.log("Minutes == 45")
                            hours = hours - .75
                            //console.log("Hours", hours)

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
                                //hours= (hours-1)+.5

                            }

                            $scope.timeData.hoursCalculated = hours;

                        }

                    }

                }
                if ($scope.timeData.hoursCalculated <= 4) {

                    $scope.timeData.hoursCalculated = 4

                }

                User.addHoursToPayPeriod($scope.timeData).then(function (data) {
                        //console.log(data)
                        $scope.payPeriodHistory = data.data.user.payperiodhistory
                        $scope.timeData = {}
                        $scope.submitHoursLoading = false;
                        $scope.addHoursPageOpen = false;

                    })
                
            }
          
        }
        $scope.openUserFile = function (name, phonenumber) {

            $('html, body').animate({ scrollTop: 0 }, 'fast');

            if ($scope.bookedJobsSelected) {

                $scope.bookedJobsSelected = false;
                $scope.profileHome = true;
                $scope.bookedJobsPageOpened = false;
                ;

            } else {

                $scope.bookedJobsSelected = true;
                $scope.bookedJobsPageOpened = true;
                $scope.workHistoryProfileSelected = false;
                $scope.chartsPageSelected = false;
                $scope.messagePageSelected = false;
                $scope.composeMessagePageSelected = false;
                $scope.profileHome = false;
                $scope.complaintsPageOpened = false;
                $scope.composeMessagePageOpen = false;
                $scope.addHoursPageOpen = false;
                $scope.messagePageOpen = false;
                $scope.chartsPageOpen = false;
                $scope.historyPageOpenProfile = false;
                //console.log($scope.bookedJobsPageOpened)
                $scope.delinquentTimeSheetSelected = false;
                $scope.delinquentTimeSheetPageOpened = false;
                $scope.addJobPageOpen = false;
                $scope.jobsPageOpen = true
                $scope.complaintsSelected = false;
                $scope.complaintsSelected = false;
                $scope.userDetailsPageOpened = false;
                $scope.payslipGenerationOpen = false;
                $scope.complaintsPageOpened = false;
                $scope.commentsSelected = false;
                $scope.commentsPageOpened = false;
                $scope.openJob = 0;
                $scope.employeeHome = false;
                $scope.loadingCurrentEmployee = true;
                $scope.searchResults = false;
                $scope.userList = false;
                $scope.employeeListOpen = false;
                $scope.userDetailsPageOpened = true;
                $scope.delinquentTimeSheetPageOpened = false;
                //$scope.bookedJobsPageOpened = false;
                $scope.complaintsPageOpened = false;
                $scope.commentsPageOpened = false;
                //console.log(phonenumber)
                //console.log(name)
                $scope.currentUserFile = name;
                $scope.currentUserPhoneNumber = phonenumber;
                $scope.delinquentTimeSheetArray = [];
                $scope.jobDetails = [];

                User.findUser($rootScope.user_id).then(function (data) {

                    //console.log(data)
                    $scope.currentEmployee = data.data.user
                    $scope.loadingCurrentEmployee = false;
                    // //console.log
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

                    $scope.payperiod = data.data.user[0].payperiodnum;
                  
                    for (var u = 0; u < $scope.payperiods[0].jobDetails.length; u++) {
                        // //console.log($scope.jobDetails[u].dateNum,$scope.dateNow)
                        for (var x = 0; x < $scope.payperiods[0].jobDetails[u].length; x++) {

                            //console.log($scope.payperiods[0].jobDetails[u][x])

                        }
                        if ($scope.payperiods[0].jobDetails[u].dateNum < $scope.dateNow) {

                            //console.log($scope.jobDetails[u])
                            $scope.payperiods[0].jobDetails[u].dateHasPassed = true;

                        } else {

                            //$scope.payperiods[0].jobDetails[u].dateHasPassed = false;

                            if ($scope.payperiods[0].jobDetails[u][0]) {

                                if ($scope.payperiods[0].jobDetails[u][0].dateNum < $scope.dateNow) {

                                    $scope.payperiods[0].jobDetails[u][0].dateHasPassed = true;

                                } else {

                                    $scope.payperiods[0].jobDetails[u][0].dateHasPassed = false;

                                }

                                //console.log($scope.payperiods[0].jobDetails[u][0])

                            }

                        }

                    }

                    $scope.jobDetails = $scope.payperiods[0].jobDetails
        
                })

            }

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
        $scope.openChartsPage = function () {

            if (!$scope.chartsPageOpen) {

                $scope.chartsPageOpen = true;
                $scope.loadingChart = true;
                $scope.chartsPageSelected = true;
                $scope.workHistoryProfileSelected = false
                $scope.messagePageSelected = false;
                $scope.composeMessagePageSelected = false;
                $scope.profileHome = false;
                $scope.composeMessagePageOpen = false;
                $scope.historyPageOpen = false;
                $scope.bookedJobsSelected = false;
                $scope.messagePageOpen = false;
                $scope.messagePageSelected = false;
                $scope.timesheetsPageOpen = false;
                $scope.notesPageOpen = false;
                $scope.jobsPageOpen = true;
                // $scope.openComposeMessagePage = false;
                $scope.historyPageOpenProfile = false;
                $scope.bookedJobsPageOpened = false;
                $scope.messageCompositionPageOpen = false;
                $scope.incompletePayPeriodPageOpen = false;

                User.findUser($rootScope.user_id).then(function (data) {

                    //console.log(data)
                    $scope.payPeriodHistory = data.data.user[0].payperiodhistory
                    //console.log($scope.payPeriodHistory)
                    $scope.positionIterator = 0;

                    for (var b = 0; b < $scope.payPeriodHistory.length; b++) {
               
                        $scope.hoursCalcIterator = 0;
                        $scope.newPageArray = []
                        // $scope.data[0][b]= hoursIterator;
                        //console.log($scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date)

                        for (var c = 0; c < $scope.payPeriodHistory[b].entry.length; c++) {

                            for (var x = 0; x < $scope.payPeriodHistory[b].entry[c].length; x++) {

                                $scope.hoursCalcIterator = $scope.hoursCalcIterator + $scope.payPeriodHistory[b].entry[c][x].hoursCalculated
                                $scope.loadingChart = false;

                            }

                            if (b > 6) {
                              
                                if ((b - $scope.positionIterator) == 1) {

                                    //console.log($scope.hoursCalcIterator, b)
                                    $scope.dataForChartsPage[0][0] = $scope.hoursCalcIterator
                                    $scope.labelsForChartsPage[0] = $scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date
                                    $scope.positionIterator = $scope.positionIterator - 1
                                    //console.log("position 2")

                                }else if ((b - $scope.positionIterator) == 0) {

                                    $scope.dataForChartsPage[0][1] = 5
                                    $scope.labelsForChartsPage[1] = $scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date
                                    $scope.positionIterator = $scope.positionIterator - 1
                                    //console.log("position 1")

                                }else if (b - ($scope.positionIterator) == 2) {

                                    $scope.dataForChartsPage[0][2] = $scope.hoursCalcIterator
                                    $scope.labelsForChartsPage[2] = $scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date
                                    $scope.positionIterator = $scope.positionIterator - 1

                                }else if (b - $scope.positionIterator == 3) {

                                    //console.log("position 4")
                                    $scope.dataForChartsPage[0][3] = $scope.hoursCalcIterator
                                    $scope.labelsForChartsPage[3] = $scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date
                                    $scope.positionIterator = $scope.positionIterator - 1

                                }else if (b - $scope.positionIterator == 4) {

                                    //console.log('position 5')
                                    $scope.dataForChartsPage[0][4] = $scope.hoursCalcIterator
                                    $scope.labelsForChartsPage[4] = $scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date
                                    $scope.positionIterator = $scope.positionIterator - 1

                                } else if (b - $scope.positionIterator == 5) {

                                    //console.log('position 6')
                                    //console.log($scope.hoursCalcIterator, b)
                                    $scope.dataForChartsPage[0][5] = $scope.hoursCalcIterator
                                    $scope.labelsForChartsPage[5] = $scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date
                                    $scope.positionIterator = $scope.positionIterator - 1

                                }

                              
                            } else {
                    
                                $scope.dataForChartsPage[0][$scope.positionIterator] = $scope.hoursCalcIterator
                                $scope.labelsForChartsPage[0] = $scope.payPeriodHistory[b].entry[0][0].date + "-" + $scope.payPeriodHistory[b].entry[6][0].date

                            }

                            var hoursIterator = 0;
                            var minIterator = 0;

                        }

                        $scope.positionIterator++

                    }

                })

            } else {

                $scope.chartsPageOpen = false;
                $scope.profileHome = true;

            }

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
                //console.log($scope.jobDetails.length)

                if ($scope.openJob < 6) {

                    if ($scope.jobDetails[$scope.openJob + 1].length < 1) {

                        //console.log("Oy")
                        $scope.openJob = 0;

                    } else {

                        $scope.openJob = $scope.openJob + 1;

                    }


                } else {

                    $scope.openJob = 0;

                }

            }, 500)

        }
        $scope.openMessagePage2 = function () {

            $scope.currentIndex = null;
            $scope.messagePageOpen = true;
            $scope.bookedJobsPageOpened = false;
            $scope.chartsPageOpen = false;
            $scope.historyPageOpenProfile = false;
            $scope.messagePageSelected = true;
            $scope.messagesLoading = true;
            $scope.messageForPagination = [];
            $scope.pageLimit = 4;

            User.getMessages($scope.name).then(function (data) {

                //console.log(data)
                $scope.messagesArray = data.data.messages;
                $scope.messagesLoading = false;

                for (var i = 0; i <= $scope.messagesArray.length; i++) {

                    var page = 0;
                   
                    if (i < $scope.pageLimit) {

                        //console.log("its less")

                    }
                    if (i < $scope.messagesArray.length) {

                        //console.log("yup,less")

                    }

                    if (i < $scope.pageLimit && i < $scope.messagesArray.length) {
                        
                        if ($scope.messagesArray[i]) {

                            $scope.messageForPagination.push($scope.messagesArray[i])
                 
                        }

                    } else {

                        if (!$scope.usersLoaded) {

                            //console.log("else")
                            $scope.loadingUsers = false;
                            $scope.messagesPaginated.push($scope.messageForPagination)
                            //console.log($scope.messagesPaginated)
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
        $scope.openMessagePage = function () {

            if ($scope.messagePageOpen) {

                $scope.messagePageOpen = false;
                $scope.clientHome = true;
                $scope.profileHome = true;
                $scope.messagePageSelected = false;

            } else {

                $scope.messagePageOpen = true;
                $scope.profileHome = false;
                $scope.clientHome = false;
                $scope.requestEmployeePageOpen = false;
                $scope.addLocationPageOpen = false
                $scope.addSupervisorPageOpen = false
                $scope.reviewSubmittedTimeSheetsPageOpen = false;
                $scope.messagePageSelected = true;
                $scope.chartsPageSelected = false
                $scope.workHistoryProfileSelected = false;
                $scope.composeMessagePageSelected = false;
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

                User.getMessages($scope.name).then(function (data) {

                    //console.log(data)
                    $scope.messagesArray = data.data.messages;
                    $scope.messagesLoading = false;

                    for (var i = 0; i <= $scope.messagesArray.length; i++) {

                        var page = 0;
                    
                        if (i < $scope.pageLimit) {

                        }
                        if (i < $scope.messagesArray.length) {

                        }
                        if (i < $scope.pageLimit && i < $scope.messagesArray.length) {
                           
                            
                            if ($scope.messagesArray[i]) {

                                $scope.messagesArray[i].messageIndex = i
                                $scope.messageForPagination.push($scope.messagesArray[i])

                            }

                        } else {

                            if (!$scope.usersLoaded) {

                                //console.log("else")
                                $scope.loadingUsers = false;
                                $scope.messagesPaginated.push($scope.messageForPagination)
                                //console.log($scope.messagesPaginated)
                                //console.log($scope.messagesPaginated.length)
                                $scope.messageForPagination = [];

                                if ($scope.messagesArray[i] !== undefined) {

                                    $scope.messagesArray[i].messageIndex = i
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
        $scope.generatePaySlip = function (index) {

            //console.log(index)
            //console.log($scope.payPeriodHistory[index])
            $scope.totalHours = 0;

            for (var z = 0; z < $scope.payPeriodHistory[index].entry.length; z++) {

                $scope.totalHoursIterator = 0;
               
                if ($scope.payPeriodHistory[index].entry[z][0]) {

                    //console.log($scope.payPeriodHistory[index].entry[z][0].hoursCalculated)

                    $scope.totalHours = $scope.totalHours + $scope.payPeriodHistory[index].entry[z][0].hoursCalculated

                }
                if ($scope.payPeriodHistory[index].entry[z][1]) {

                    //console.log($scope.payPeriodHistory[index].entry[z][1].hoursCalculated)
                    $scope.totalHours = $scope.totalHours + $scope.payPeriodHistory[index].entry[z][1].hoursCalculated

                }

                $scope.payPeriodStartDate = $scope.payPeriodHistory[index].entry[0][0].date
                $scope.payPeriodEndDate = $scope.payPeriodHistory[index].entry[6][0].date

            }
         
            $scope.exportPdf()

        }
        $scope.exportPdf = function () {

            $scope.pdfLoading = true;
            $timeout(function () {
                $scope.pdfLoading = false;
            }, 2000)
            //console.log('clicked')
            var doc = new jsPDF()
            doc.getFontList();
            doc.text($scope.name, 10, 10)
            doc.setFontSize(10)
            doc.text("Casual Labourer", 10, 20)
            doc.text(String($scope.userPhoneNumber), 10, 30)
            doc.text("Quality Labour Hire Ltd.", 10, 65)
            doc.text("Pay Period:", 10, 70)
            doc.text($scope.payPeriodStartDate, 30, 70)
            doc.text($scope.payPeriodEndDate, 46, 70)
            doc.text("Payed On:", 10, 75)
            doc.text($scope.payPeriodEndDate, 30, 75)
            doc.text("Tax Code:", 10, 80)
            doc.text("M", 30, 80)
            doc.setFontSize(13)
            doc.setDrawColor(0,0,0)
            doc.setFillColor(175, 175, 175);
            doc.rect(0, 83,250, 10,'f');
            doc.text("Taxable Earnings", 10, 87)
            doc.text("Rate", 120, 90)
            doc.text("Hours", 150, 90)
            doc.text("Amount", 170, 90)
            doc.setFontSize(10)
            doc.text("Oridinary Time", 10, 100)
            doc.text(String($scope.userPayRate) + "/hr", 120, 100)
            doc.text(String($scope.totalHours), 150, 100)
            doc.text(String($scope.totalHours * $scope.userPayRate), 170, 100)
            doc.text(String("Holiday Pay @ 8% (Pay As You Go)"), 10, 120)
            doc.text(String(Number(($scope.totalHours * $scope.userPayRate) * .08).toFixed(2)), 170, 120)
            doc.setDrawColor(0,0,0);
            doc.rect(0, 132,250, 0);
            doc.text(String("Total Gross Earnings"), 10, 130)
            doc.text(String(($scope.totalHours * $scope.userPayRate) * .08 + ($scope.totalHours * $scope.userPayRate)), 170, 130)
            doc.setDrawColor(100,0,0);
            doc.rect(0, 142,250, 0);
            doc.text(String("Taxable Earnings"), 10, 140)
            doc.text(String($scope.totalHours * $scope.userPayRate), 170, 140)
            doc.text(String("Less PAYE"), 10, 150)//NEED TO ADD TAX CODE TO USER MODEL TO CALCULATE THIS...
            doc.text(String((($scope.totalHours * $scope.userPayRate) * .1)), 170, 150)
            doc.text(String("Take Home Pay"), 10, 160)//NEED TO ADD TAX CODE TO USER MODEL TO CALCULATE THIS...
            doc.text(String(($scope.totalHours * $scope.userPayRate) - (($scope.totalHours * $scope.userPayRate) * .1)), 170, 160)
            doc.setDrawColor(0,0,0)
            doc.setFillColor(175, 175, 175);
            doc.rect(130, 172,30, 5,'FD');
            doc.setDrawColor(0,0,0)
            doc.setFillColor(175, 175, 175);
            doc.rect(160, 172,30, 5,'FD');
            doc.setDrawColor(0,0,0)
            doc.setFillColor(175, 175, 175);
            doc.rect(190, 172,30, 5,'FD');
            doc.setDrawColor(0,0,0)
            doc.setFillColor(175, 175, 175);
            doc.rect(130, 182,30, 13,'FD');
            doc.setDrawColor(0,0,0)
            doc.setFillColor(175, 175, 175);
            doc.rect(160, 182,30, 13,'FD');
            doc.setDrawColor(0,0,0)
            doc.setFillColor(175, 175, 175);
            doc.rect(190, 182,30, 13,'FD');
            doc.setDrawColor(0,0,0);
            doc.rect(0, 172,250, 0);
            doc.text(String("Summary"), 133, 176)
            doc.text(String("This Pay"), 162, 176)
            doc.text(String("YTD"), 190, 176)
            doc.text(String("Gross"), 133, 185)
            doc.text(String("PAYE"), 133, 189)
            doc.text(String("Take Home"), 133, 193)
            doc.text(String(($scope.totalHours * $scope.userPayRate) * .08 + ($scope.totalHours * $scope.userPayRate)),162,185)
            doc.text(String((($scope.totalHours * $scope.userPayRate) * .1)), 162, 189)
            doc.text(String(($scope.totalHours * $scope.userPayRate) - (($scope.totalHours * $scope.userPayRate) * .1)), 162, 193)
            doc.addImage($scope.qlhLogo, 'JPG', 180, 15, 15, 15);
            doc.save($scope.name+' Payslip for .'+$scope.payPeriodStartDate+'-'+$scope.payPeriodEndDate+'.pdf')
            doc.addFont('Raleway', 'Raleway', 'normal');

        }
        $scope.openHistoryPageProfile = function () {

            if (!$scope.historyPageOpenProfile) {

                $scope.openJob = 0;
                $scope.delinquenttimesheetPageOpen = false
                $scope.chartsPageOpen = false;
                $scope.workHistoryProfileSelected = true;
                $scope.chartsPageSelected = false;
                $scope.generalHistoryOpen = false;
                $scope.generalHistoryTitle = false;
                $scope.bookedJobsSelected = false;
                $scope.profileHome = false;
                $scope.historyPageOpenProfile = true;
                $scope.loadingWorkHistoryProfile = true;
                $scope.timesheetsPageOpen = false;
                $scope.notesPageOpen = false;
                $scope.jobsPageOpen = true;
                $scope.bookedJobsPageOpened = false;
                $scope.composeMessagePageOpen = false;
                $scope.messageCompositionPageOpen = false;
                $scope.messagePageOpen = false;
                $scope.messagePageSelected = false;
                $scope.bookedJobsSelected = false;
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

                User.findUser($rootScope.user_id).then(function (data) {
                    
                    //console.log(data)
                    $scope.payPeriodHistory = data.data.user[0].payperiodhistory
                    $scope.loadingWorkHistoryProfile = false;
                    //console.log($scope.payPeriodHistory)

                    for (var b = 0; b < $scope.payPeriodHistory.length; b++) {
                      
                        for (var c = 0; c < $scope.payPeriodHistory[b].entry.length; c++) {

                            $scope.hoursCalcIterator = 0;

                            for (var x = 0; x < $scope.payPeriodHistory[b].entry[x].length; x++) {

                                //console.log($scope.payPeriodHistory[b].entry[c])

                                if ($scope.payPeriodHistory[b].entry[c][0] !== undefined) {

                                    $scope.labels[c] = $scope.payPeriodHistory[b].entry[c][0].date

                                    if ($scope.payPeriodHistory[b].entry[c][x + 1] !== undefined) {

                                        //console.log("HOlk")
                                        $scope.hoursCalIterator = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1];
                                        //console.log($scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated)
                                        $scope.data[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated + $scope.payPeriodHistory[b].entry[c][x + 1].hoursCalculated;

                                    } else {

                                        //console.log("choOlk")
                                        $scope.data[0][c] = $scope.payPeriodHistory[b].entry[c][x].hoursCalculated;

                                    }

                                }

                            }

                            var hoursIterator = 0;
                            var minIterator = 0;
                          
                        }


                    }
                })

                $scope.loadingPersonalHistory = false;
                //console.log($scope.bookedJobsPageOpened)

            } else {

                $scope.profileHome = true;
                $scope.historyPageOpenProfile = false;

            }

        }
        $scope.openIndividualHistoryEntry = function (index) {
          
            $scope.payPeriodHistoryIndex = index;
            $scope.showChart = false;
            $timeout(function () {
                $scope.removeChart = true;
                if ($scope.historyEntryOpen && index !== $scope.curHistory
                ) {
                    // $scope.individualPayPeriodOpen = false;
                    $scope.curHistory = index;
                    //console.log("first")

                }
                else if (!$scope.historyEntryOpen && index == $scope.curHistory) {

                    $scope.historyEntryOpen = true;
                    //console.log("second")
                    //$scope.curPeriod = index;

                }
                else if (!$scope.historyEntryOpen && index !== $scope.curHistory) {

                    //console.log("third")
                    $scope.historyEntryOpen = true;
                    $scope.curHistory = index;

                } else {

                    $scope.curHistory = null
                    $scope.showChart = true;
                    $scope.removeChart = false;

                }

            }, 500)

        }
        $scope.openProfileHome = function(){

            $scope.profileHome =  true;
            $scope.historyPageOpenProfile = false;
            $scope.turnOffOthers = false;
            $scope.chartsPageOpen = false;
            $scope.messagePageOpen = false;
            $scope.composeMessagePageOpen = false
            $scope.curPeriod = null;

        }
        $scope.closeIndividualPayPeriod = function(){

            $scope.turnOffOthers = false;
            $scope.curPeriod = null;
            $scope.removeRightBorder = false;

        }
        $scope.openIndividualPayPeriod = function (index, history) {

            //console.log(index)
            //console.log(history)
            $scope.turnOffOthers=true;
            $scope.globalPayPeriodIndexATM = index;
            $scope.labels[0] = history.entry[0][0].date
            $scope.labels[1] = history.entry[1][0].date
            $scope.labels[2] = history.entry[2][0].date
            $scope.labels[3] = history.entry[3][0].date
            $scope.labels[4] = history.entry[4][0].date
            $scope.labels[5] = history.entry[5][0].date
            $scope.labels[6] = history.entry[6][0].date
            $scope.data[0] = history.entry[0][0].hoursCalculated

            if ($scope.data[0] = history.entry[0][1]) {

                $scope.data[0] = history.entry[0][0].hoursCalculated + history.entry[0][1].hoursCalculated

            } else {

                $scope.data[0] = history.entry[0][0].hoursCalculated

            }

            $scope.data[1] = history.entry[1][0].date

            if ($scope.data[1] = history.entry[1][1]) {

                $scope.data[1] = history.entry[1][0].hoursCalculated + history.entry[1][1].hoursCalculated

            } else {

                $scope.data[1] = history.entry[1][0].hoursCalculated

            }

            $scope.data[2] = history.entry[2][0].date

            if ($scope.data[2] = history.entry[2][1]) {

                $scope.data[2] = history.entry[2][0].hoursCalculated + history.entry[2][1].hoursCalculated

            } else {

                $scope.data[2] = history.entry[2][0].hoursCalculated

            }

            $scope.data[3] = history.entry[3][0].date

            if ($scope.data[3] = history.entry[3][1]) {

                $scope.data[3] = history.entry[3][0].hoursCalculated + history.entry[3][1].hoursCalculated

            } else {

                $scope.data[3] = history.entry[3][0].hoursCalculated

            }

            $scope.data[4] = history.entry[4][0].date

            if ($scope.data[4] = history.entry[4][1]) {

                $scope.data[4] = history.entry[4][0].hoursCalculated + history.entry[4][1].hoursCalculated

            } else {

                $scope.data[4] = history.entry[4][0].hoursCalculated

            }

            $scope.data[5] = history.entry[5][0].hoursCalculated

            if ($scope.data[5] = history.entry[5][1]) {

                $scope.data[5] = history.entry[5][0].hoursCalculated + history.entry[5][1].hoursCalculated

            } else {

                $scope.data[5] = history.entry[5][0].hoursCalculated

            }
            if ($scope.data[6] = history.entry[6][1]) {

                $scope.data[6] = history.entry[6][0].hoursCalculated + history.entry[6][1].hoursCalculated

            } else {

                $scope.data[6] = history.entry[6][0].hoursCalculated

            }

            // $scope.historyEntryOpen = false;

            if ($scope.individualPayPeriodOpen && index !== $scope.curPeriod
            ) {

                // $scope.individualPayPeriodOpen = false;
                $scope.curPeriod = index;
                $scope.removeRightBorder = true;
                //console.log($scope.removeRightBorder)
                //console.log("first")

            }
            else if (!$scope.individualPayPeriodOpen && index == $scope.curPeriod) {

                $scope.individualPayPeriodOpen = true;
                //console.log("second")
                //$scope.curPeriod = index;

            }
            else if (!$scope.individualPayPeriodOpen && index !== $scope.curPeriod) {

                //console.log("third")
                $scope.removeRightBorder = true;
                //console.log($scope.removeRightBorder)
                $scope.individualPayPeriodOpen = true;
                $scope.curPeriod = index;

            } else {

                //console.log("fourth")
                $scope.curHistory = null;
                $scope.curPeriod = null
                $scope.showChart = true;
                $scope.removeRightBorder = false;
                //console.log($scope.removeRightBorder)

            }

        }
        $scope.areYouAvailable = function () {

            if ($scope.availability == 1) {

                $scope.availability = 2;
                //console.log($scope.availability)

            } else if ($scope.availability == 2) {

                $scope.availability = 3;
                //console.log($scope.availability)

            } else if ($scope.availability == 3) {

                $scope.availability = 1;
                //console.log($scope.availability)

            }

        }
        $scope.previousMonth = function () {

            if ($scope.monthPosition === 1) {

                //console.log("hello")
                $scope.currentMonth = "DECEMBER";
                $scope.monthPosition = 12

            }
            else if ($scope.monthPosition === 12) {

                $scope.currentMonth = "NOVEMBER";
                $scope.monthPosition = 11

            }
            else if ($scope.monthPosition === 11) {

                $scope.currentMonth = "OCTOBER";
                $scope.monthPosition = 10

            }
            else if ($scope.monthPosition === 10) {

                $scope.currentMonth = "SEPTEMBER";
                $scope.monthPosition = 9

            }
            else if ($scope.monthPosition === 9) {

                $scope.currentMonth = "AUGUST";
                $scope.monthPosition = 8

            }
            else if ($scope.monthPosition === 8) {

                $scope.currentMonth = "JULY";
                $scope.monthPosition = 7

            }
            else if ($scope.monthPosition === 7) {

                $scope.currentMonth = "JUNE";
                $scope.monthPosition = 6

            }
            else if ($scope.monthPosition === 6) {

                $scope.currentMonth = "MAY";
                $scope.monthPosition = 5

            }
            else if ($scope.monthPosition === 5) {

                $scope.currentMonth = "APRIL";
                $scope.monthPosition = 4

            }
            else if ($scope.monthPosition === 4) {

                $scope.currentMonth = "MARCH";
                $scope.monthPosition = 3

            }
            else if ($scope.monthPosition === 3) {

                $scope.currentMonth = "FEBRUARY";
                $scope.monthPosition = 2

            }
            else {

                $scope.currentMonth = "JANUARY";
                $scope.monthPosition = 1
                //console.log($scope.monthPosition)

            }

        }
        $scope.nextMonth = function () {

            if ($scope.monthPosition == 1) {

                $scope.currentMonth = "FEBRUARY";
                $scope.monthPosition = 2

            }
            else if ($scope.monthPosition === 2) {

                $scope.currentMonth = "MARCH";
                $scope.monthPosition = 3

            }
            else if ($scope.monthPosition === 3) {

                $scope.currentMonth = "APRIL";
                $scope.monthPosition = 4

            }
            else if ($scope.monthPosition === 4) {

                $scope.currentMonth = "MAY";
                $scope.monthPosition = 5

            }
            else if ($scope.monthPosition === 5) {

                $scope.currentMonth = "JUNE";
                $scope.monthPosition = 6

            }
            else if ($scope.monthPosition === 6) {

                $scope.currentMonth = "JULY";
                $scope.monthPosition = 7

            }
            else if ($scope.monthPosition === 7) {

                $scope.currentMonth = "AUGUST";
                $scope.monthPosition = 8

            }
            else if ($scope.monthPosition === 8) {

                $scope.currentMonth = "SEPTEMBER";
                $scope.monthPosition = 9

            }
            else if ($scope.monthPosition === 9) {

                $scope.currentMonth = "OCTOBER";
                $scope.monthPosition = 10

            }
            else if ($scope.monthPosition === 10) {

                $scope.currentMonth = "NOVEMBER";
                $scope.monthPosition = 11

            }
            else if ($scope.monthPosition === 11) {

                $scope.currentMonth = "DECEMBER";
                $scope.monthPosition = 12

            }
            else {


            }

        }

    })

}())