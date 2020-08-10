var User = require('./models/user');
var PayPeriod = require('./models/payperiod')
var Client = require('./models/client')
var Location = require('./models/location');
var Supervisor = require('./models/supervisor')
var Hogan = require('hogan.js')
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var pdf = require('html-pdf');
var jwt = require('jsonwebtoken');
var secret = "negus";
var html = fs.readFileSync('./public/views/pages/management.html', 'utf8');
var resetpassword = fs.readFileSync('./public/views/pages/email/resetpassword.hjs', 'utf-8');
var resetPassword = Hogan.compile(resetpassword);

var options = { format: 'Letter' };
const Nexmo = require('nexmo')
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var text = require('textbelt');
var opts = {};
opts.region = 'intl'
console.log(text)

var client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "t.brixton",
        pass: 5613111111
    }
});


/*text.sendText('9491234567', 'A sample text message!', undefined, function(err) {
 if (err) {
   console.log(err);
 }
});*/
const nexmo = new Nexmo({
    apiKey: "77cb479c",
    apiSecret: "v9aUDYrRVOEMYIDA"
})


module.exports = function (app) {
    /*
        pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
            });
        app.get('/users/generatepdf', function (req, res) {
    
            pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
            });
    
        })

        */

    app.post('/users/addhourstopayperioddelinquent', function (req, res) {
        console.log(req.body)
        User.find({ name: req.body.currentuser }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                user[0].payperiodhistory[req.body.payperiodhistoryindex].entry[req.body.index][req.body.currentjobindate].timein = req.body.timein;
                user[0].payperiodhistory[req.body.payperiodhistoryindex].entry[req.body.index][req.body.currentjobindate].timeout = req.body.timeout;
                user[0].payperiodhistory[req.body.payperiodhistoryindex].entry[req.body.index][req.body.currentjobindate].hoursCalculated = req.body.hoursCalculated;
                user[0].payperiodhistory[req.body.payperiodhistoryindex].entry[req.body.index][req.body.currentjobindate].timesheetSubmitted = true
                user[0].payperiodhistory[req.body.payperiodhistoryindex].entry[req.body.index][req.body.currentjobindate].delinquent = false

                User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "user not found.." })
                    } else {
                        // res.json({success: true, message:"User found and update...", user:user})
                        User.findOneAndUpdate({ name: req.body.client }, { $push: { submittedtimesheets: req.body } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found.." })
                            } else {
                                res.json({ success: true, message: "Hours added to Client Submitted Time Sheets Section", user: user })
                            }
                        })
                    }
                })
            }
        })

    })
    app.post('/users/addhourstopayperiod', function (req, res) {
        console.log(req.body)
        User.find({ name: req.body.currentuser }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                if (req.body.sentFromDelinquent) {

                    user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.currentjobindate].timein = req.body.timein;
                    user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.currentjobindate].timeout = req.body.timeout;
                    user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.currentjobindate].hoursCalculated = req.body.hoursCalculated;
                    user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.currentjobindate].timesheetSubmitted = true
                    user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.currentjobindate].delinquent = false

                    user[0].delinquenttimesheets.splice(req.body.index, 1)
                    User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user[0].payperiodhistory, delinquenttimesheets: user[0].delinquenttimesheets } }, { new: true }, function (err, user) {
                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "user not found.." })
                        } else {
                            // res.json({success: true, message:"User found and update...", user:user})
                            User.findOneAndUpdate({ name: req.body.client }, { $push: { submittedtimesheets: req.body } }, { new: true }, function (err, user) {
                                if (err) throw err;
                                if (!user) {
                                    res.json({ success: false, message: "User not found.." })
                                } else {
                                    //res.json({success: true, message:"Hours added to Client Submitted Time Sheets Section", user:user})

                                    User.find({ userclass: "admin" }, function (err, user) {
                                        if (!user) {
                                            res.json({ success: false, message: "user not found.." })
                                        } else {
                                            user[0].delinquenttimesheets.splice(req.body.index, 1)
                                            User.findOneAndUpdate({ userclass: "admin" }, { $set: { delinquenttimesheets: user[0].delinquenttimesheets } }, { new: true }, function (err, user) {
                                                if (err) throw err;
                                                if (!user) {
                                                    res.json({ success: false, message: "user not found.." })
                                                } else {
                                                    res.json({ success: true, message: "Hours added to Client Submitted Time Sheets Section, Removed from Admin Delinquent Time Sheets, And Added To User Pay Period History..." })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {

                    //NORMAL SUBMIT HOURS//
                    console.log("NORMAL SUBMIT HOURS")
                    User.find({ name: req.body.client }, function (err, user) {

                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "User not found..." })
                        } else {
                            if (req.body.page.submittedtimesheetsindex || req.body.page.submittedtimesheetsindex ==0) {
                                console.log("SUBMITTED TIME SHEET INDEX EXISGS")
                                //user[0].submittedtimesheets.splice(req.body.page.submittedtimesheetsindex,1)
                                user[0].submittedtimesheets[req.body.page.submittedtimesheetsindex].timein = req.body.timein
                                user[0].submittedtimesheets[req.body.page.submittedtimesheetsindex].timeout = req.body.timeout
                                user[0].submittedtimesheets[req.body.page.submittedtimesheetsindex].hoursCalculated = req.body.hoursCalculated
                                user[0].submittedtimesheets[req.body.page.submittedtimesheetsindex].disputed = false


                                User.findOneAndUpdate({ name: req.body.client }, { $set: { submittedtimesheets: user[0].submittedtimesheets } }, { new: true }, function (err, user) {

                                    if (err) throw err
                                    if (!user) {
                                        res.json({ success: false, message: "user not found" })
                                    } else {
                                        User.findOne({ name: req.body.currentuser }, function (err, user) {
                                            if (err) throw err;
                                            if (!user) {
                                                res.json({ success: false, message: "User not found.." })
                                            } else {

                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].timein = req.body.timein;
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].timeout = req.body.timeout;
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].hoursCalculated = req.body.hoursCalculated;
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].timesheetSubmitted = true
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].disputed = false
                                                console.log("179", user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate])
                                                User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user.payperiodhistory } }, { new: true }, function (err, user) {

                                                    if (err) throw err;
                                                    if (!user) {
                                                        res.json({ success: false, message: "User not found..." })
                                                    } else {
                                                        res.json({ success: true, message: "User Time Sheet Submitted..", user: user })
                                                    }
                                                })

                                            }
                                        })


                                        //res.json({success})

                                    }

                                })

                            } else {
console.log('Hereo')
                                User.findOneAndUpdate({ name: req.body.client }, { $push: { submittedtimesheets: req.body } }, { new: true }, function (err, user) {

                                    if (err) throw err
                                    if (!user) {
                                        res.json({ success: false, message: "user not found" })
                                    } else {
                                        User.findOne({ name: req.body.currentuser }, function (err, user) {
                                            if (err) throw err;
                                            if (!user) {
                                                res.json({ success: false, message: "User not found.." })
                                            } else {
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].timein = req.body.timein;
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].timeout = req.body.timeout;
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].hoursCalculated = req.body.hoursCalculated;
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].timesheetSubmitted = true
                                                user.payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodhistoryindex][req.body.currentjobindate].disputed = false
                                                User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user.payperiodhistory } }, { new: true }, function (err, user) {

                                                    if (err) throw err;
                                                    if (!user) {
                                                        res.json({ success: false, message: "User not found..." })
                                                    } else {
                                                        res.json({ success: true, message: "User Time Sheet Submitted..", user: user })
                                                    }
                                                })

                                            }
                                        })


                                        //res.json({success})

                                    }

                                })

                            }

                        }
                    })

                    /* User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                         if (err) throw err;
                         if (!user) {
                             res.json({ success: false, message: "user not found.." })
                         } else {
                             // res.json({success: true, message:"User found and update...", user:user})
                             User.find({ name: req.body.client }, function (err, user) {
 
                                 if (err) throw err;
                                 if (!user) {
                                     res.json({ success: false, message: "User not foundd...." })
                                 } else {
                                     if (req.body.page.submittedtimesheetsindex) {
                                         user[0].submittedtimesheets.splice(req.body.page.submittedtimesheetsindex, 1)
 
                                     }
                                 }
                             })
                             User.findOneAndUpdate({ name: req.body.client }, { $push: { submittedtimesheets: req.body } }, { new: true }, function (err, user) {
                                 if (err) throw err;
                                 if (!user) {
                                     res.json({ success: false, message: "User not found.." })
                                 } else {
                                     res.json({ success: true, message: "Hours added to Client Submitted Time Sheets Section", user: user })
                                 }
                             })
                         }
                     })*/
                }

            }





        })
    })
    app.put('/users/findbytoken/:token', function (req, res) {

        User.findOne({ resettoken: req.params.token }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found." })
            } else {
                res.json({ success: true, message: "User found..", user: user })
            }
        })
    })
    app.post('/users/savepassword', function (req, res) {

        console.log(req.body)
        User.findOne({ name: req.body.name }).select('username name password resettoken email').exec(function (err, user) {

            if (err) throw err;
            if (req.body.password == null || req.body.password == "") {

                res.json({ success: false, message: "Password not provided..." })

            } else {

                console.log(user)
                user.password = req.body.password;
                user.resettoken = false;
                user.save(function (err) {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {

                        res.json({ success: true, message: "Password has been reset..." })
                    }

                });
            }
        })
    });
    app.post('/users/resetpassword', function (req, res) {

        User.findOne({ username: req.body.username }).select('username active email name resettoken').exec(function (err, user) {

            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'User could not be found...' + err });

            } else {
                user.resettoken = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });
                user.save(function (err) {

                    if (err) {

                        res.json({ success: false, message: err })
                    } else {

                        // If e-mail found in database, create e-mail object
                        var email = {
                            from: 'Localhost Staff, cruiserweights@zoho.com',
                            to: user.email,
                            subject: 'Password Reset',
                            text: 'Hello ' + user.name + ', You recently requested a password reset link. Please use this link below to reset your password:"http://localhost:8081/reset/"' + user.resettoken,
                            //html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested a password reset link. Please click on the link below to reset your password:<br> <a href="http://localhost:8080/reset/'+user.resettoken+'">"http://localhost:8080/reset/"</a>' 
                            html: resetPassword.render({ user: user.name, resettoken: user.resettoken })
                        };

                        // Function to send e-mail to user
                        client.sendMail(email, function (err, info) {
                            if (err) {
                                console.log(err); // If error in sending e-mail, log to console/terminal
                            } else {
                                console.log(info); // Log confirmation to console
                            }
                        });

                        res.json({ success: true, message: 'Please check your email for password reset link...' })
                    }

                })
            }
        })
    });
    app.post('/users/addhourstoclientsubmittedtimesheets', function (req, res) {
        User.findOneAndUpdate({ name: req.body.client }, { $push: { submittedtimesheets: req.body } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "User found and updated..", user: user })
            }
        })
    })
    app.put('/users/getapprovedjobs/:client', function (req, res) {
        User.find({ name: req.params.client }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "Requested Jobs Found..", approvednotbooked: user[0].approvednotbooked })
            }
        })
    })
    app.put('/users/getrequestedjobs/:client', function (req, res) {
        User.find({ _id: req.params.client }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "Requested Jobs Found..", requestedjobs: user[0].requestedjobs })
            }
        })
    })
    app.post('/users/changedisputedtimesheettounresolved', function (req, res) {
        User.find({ name: req.body.currentuser }, function (err, user) {

            console.log(user[0])
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                //user[0].payperiods[0].jobDetails[req.body.payperiodIndex][req.body.indexofdate] = req.body
                user[0].payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodIndex][req.body.currentjobindate].disputed = true
                User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User found and updated.." })
                    } else {
                        User.find({ name: req.body.client }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found..." })
                            } else {
                                user[0].submittedtimesheets[req.body.submittedtimesheetsindex] = req.body
                                User.findOneAndUpdate({ name: req.body.client }, { $set: { submittedtimesheets: user[0].submittedtimesheets } }, { new: true }, function (err, user) {
                                    if (err) throw err;
                                    if (!user)
                                    { res.json({ success: false, message: "User not found." }) }
                                    else {
                                        User.find({ userclass: "admin" }, function (err, user) {
                                            if (err) throw err;
                                            if (!user) {
                                                res.json({ success: false, message: "USer not found.." })
                                            } else {
                                                user[0].disputedtimesheets[req.body.submittedtimesheetsindex] = req.body
                                                User.findOneAndUpdate({ userclass: "admin" }, { $set: { disputedtimesheets: user[0].disputedtimesheets } }, { new: true }, function (err, user) {
                                                    if (err) throw err;
                                                    if (!user) {
                                                        res.json({ success: false, message: "User Not FOund..." })
                                                    } else {
                                                        res.json({ success: true, message: "User found and updated..", user: user })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                })
            }

        })
    })
    app.post('/users/changedisputedtimesheettoresolved', function (req, res) {
        console.log(req.body)
        User.find({ name: req.body.currentuser }, function (err, user) {

            //console.log(user[0])
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                //user[0].payperiods[0].jobDetails[req.body.payperiodIndex][req.body.currentjobindate] = req.body
                user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.page.indexofdate].disputed = false

                User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User found and updated.." })
                    } else {
                        User.find({ name: req.body.client }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found..." })
                            } else {
                                user[0].submittedtimesheets[req.body.page.submittedtimesheetsindex] = req.body
                                User.findOneAndUpdate({ name: req.body.client }, { $set: { submittedtimesheets: user[0].submittedtimesheets } }, { new: true }, function (err, user) {
                                    if (err) throw err;
                                    if (!user)
                                    { res.json({ success: false, message: "User not found." }) }
                                    else {
                                        User.find({ userclass: "admin" }, function (err, user) {
                                            if (err) throw err;
                                            if (!user) {
                                                res.json({ success: false, message: "USer not found.." })
                                            } else {
                                                user[0].disputedtimesheets[req.body.page.submittedtimesheetsindex] = req.body
                                                for (var z = 0; z < user[0].disputedtimesheets.length; z++) {
                                                    if (user[0].disputedtimesheets[z].date == req.body.date && user[0].disputedtimesheets[z].indexofdate == req.body.indexofdate) {
                                                        console.log("MATCH")
                                                        user[0].disputedtimesheets.splice(user[0].disputedtimesheets[z], 1)
                                                    }
                                                }
                                                User.findOneAndUpdate({ userclass: "admin" }, { $set: { disputedtimesheets: user[0].disputedtimesheets } }, { new: true }, function (err, user) {
                                                    if (err) throw err;
                                                    if (!user) {
                                                        res.json({ success: false, message: "User Not FOund..." })
                                                    } else {
                                                        res.json({ success: true, message: "User found and updated..", user: user })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                })
            }

        })
    })
    app.post('/users/changerequestedjobtodisapproved', function (req, res) {
        User.find({ userclass: "admin" }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                user[0].approvednotbooked.splice(req.body.approvedjobindex,1)
                user[0].requestedjobs.push(req.body)
            
              
              
                   // user[0].approvednotbooked[req.body.index].approved = false;
                    User.findOneAndUpdate({ userclass: "admin" }, { $set: { requestedjobs: user[0].requestedjobs, approvednotbooked: user[0].approvednotbooked } }, { new: true }, function (err, user) {

                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "User not found.." })
                        } else {
                            User.find({ name: req.body.client }, function (err, user) {
                                if (err) throw err;
                                if (!user) {
                                    res.json({ success: false, message: "User found.." })
                                } else {
                                    user[0].requestedjobs[req.body.index].approved = false;
                                    User.findOneAndUpdate({ name: req.body.client }, { $set: { requestedjobs: user[0].requestedjobs, approvednotbooked: user[0].requestedjobs } }, { new: true }, function (err, user) {
                                        if (err) throw err;
                                        if (!user) {
                                            res.json({ success: false, message: "User not found.." })
                                        } else {
                                            res.json({ success: true, message: "User found and updated...", user: user })
                                        }
                                    })
                                }
                            })
                        }
                    })
               
                   
                


            }
        })
    })
    app.get('/users/getadmin', function (req, res) {
        User.find({ userclass: "admin" }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                res.json({ success: true, message: "Admin found..", user: user[0] })
            }
        })
    })
    app.post('/users/addapprovedjobstojobcountarray', function (req, res) {

        User.find({ userclass: "admin" }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                //consoconsole.log(user[0].name)
                console.log(req.body)
                user[0].jobcount[req.body.index] = req.body.countData
                user[0].reqjobcount[req.body.index] = req.body.reqData
                User.findOneAndUpdate({ userclass: 'admin' }, { $set: { jobcount: user[0].jobcount }, reqjobcount: user[0].reqjobcount }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found" })
                    } else {
                        res.json({ success: true, message: "User found and updated", user: user })
                    }
                })
            }
        })
    })
    app.post('/users/changerequestedjobtoapproved', function (req, res) {
        console.log(req.body)
        User.find({ userclass: "admin" }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                req.body.approved = true;
                req.body.booked = false;

                //IF APPROVED REQUEST ARRAY VALUE DOES EXIST//

                user[0].requestedjobs.splice(req.body.index,1)
                req.body.requestedjoblocation = req.body.currentIndex
                user[0].approvednotbooked.push(req.body)


             
                    console.log("approvednotbooked index exists")
                   

                   // user[0].requestedjobs[req.body.index].booked = false;


                    User.findOneAndUpdate({ userclass: "admin" }, { $set: { requestedjobs: user[0].requestedjobs, approvednotbooked: user[0].approvednotbooked } }, { new: true }, function (err, user) {

                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "User not found.." })
                        } else {
                            User.find({ name: req.body.client }, function (err, user) {
                                if (err) throw err;
                                if (!user) {
                                    res.json({ success: false, message: "User found.." })
                                } else {
                                    user[0].requestedjobs[req.body.index].approved = true;
                                    User.findOneAndUpdate({ name: req.body.client }, { $set: { requestedjobs: user[0].requestedjobs } }, { new: true }, function (err, user) {

                                        if (err) throw err;
                                        if (!user) {
                                            res.json({ success: false, message: "User not found" })
                                        } else {

                                            res.json({ success: true, message: "User found and upated...", user: user })
                                        }
                                    })



                                }
                            })
                        }
                    })

                
                
              //IF IT DOESN'T EXIST (WHICH IT SHOULDN'T)//  
            


            }
        })

    })
   /* app.post('/users/removerequestedjob', function (req, res) {

        User.find({ userclass: "admin" }, function (err, user) {

            if (err) throw err;
            if (!user)
            { res.json({ success: false, message: "User Not Found" }) }
            else {
                user[0].requestedjobs.splice(req.body.index, 1)
                User.findOneAndUpdate({ userclass: "admin" }, { $set: { requestedjobs: user[0].requestedjobs } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found" })
                    } else {
                        User.find({ name: req.body.name }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found.." })
                            } else {
                                user[0].requestedjobs.splice(req.body.index, 1)
                                User.findOneAndUpdate({ name: req.body.name }, { $set: { requestedjobs: user[0].requestedjobs } }, { new: true }, function (err, user) {
                                    if (err) throw err;
                                    if (!user) {
                                        res.json({ success: false, message: "User not found.." })
                                    } else {
                                        res.json({ success: true, message: "User found and updated", user: user })
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    })*/
    app.post('/users/requestjob', function (req, res) {

        User.find({ userclass: "admin" }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                console.log(user[0])
                user[0].requestedjobs.push(req.body)
                User.findOneAndUpdate({ userclass: "admin" }, { $set: { requestedjobs: user[0].requestedjobs } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found" })
                    } else {
                        User.findOneAndUpdate({ name: req.body.client }, { $push: { requestedjobs: req.body } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found.." })
                            } else {
                                res.json({ success: true, message: "User Found And uPDated...", user: user })
                            }
                        })
                    }
                })
            }
        })
    })
    app.post('/users/changepayperiodhistoryentrytounpaid', function (req, res) {
        //User.findOneAndUpdate({name:req.body.name}, {$set:{}})
        User.find({ name: req.body.name }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "user not found so not updated..." })
            } else {
                user[0].payperiodhistory[req.body.index].entry[0][0].paid = false;
                User.findOneAndUpdate({ name: req.body.name }, { $set: { payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found" })
                    } else {
                        res.json({ success: true, message: "User found and updated..", user: user })
                    }
                })
            }
        })
    })
    app.post('/users/changepayperiodhistoryentrytopaid', function (req, res) {
        //User.findOneAndUpdate({name:req.body.name}, {$set:{}})
        User.find({ name: req.body.name }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "user not found so not updated..." })
            } else {
                user[0].payperiodhistory[req.body.index].entry[0][0].paid = true;
                User.findOneAndUpdate({ name: req.body.name }, { $set: { payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found" })
                    } else {
                        res.json({ success: true, message: "User found and updated..", user: user })
                    }
                })
            }
        })
    })
    app.put('/users/removeuser/:name', function (req, res) {
        User.findOneAndRemove({ name: req.params.name }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                res.json({ success: true, message: "User fond and deleted..", user: user })
            }
        })
    })
    app.post('/users/marktimesheetasapproved', function (req, res) {

        console.log(req.body)
        User.find({ userclass: "admin" }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                for (var z = 0; z < user[0].disputedtimesheets.length; z++) {

                    if (user[0].disputedtimesheets[z].page.date == req.body.page.date && user[0].disputedtimesheets[z].page.indexofdate == req.body.page.indexofdate) {
                        console.log("MATCH")
                        user[0].disputedtimesheets.splice(user[0].disputedtimesheets.indexOf(user[0].disputedtimesheets[z]), 1)
                        //console.log(user[0].disputedtimesheets)
                    }


                }
                User.findOneAndUpdate({userclass:"admin"}, {$set:{disputedtimesheets:user[0].disputedtimesheets}}, {new:true}, function(err,user){
                    if(err)throw err;
                    if(!user){
                        res.json({success:false, message:"User not found.."})
                    }else{
                        console.log("Admin Disputed Time Sheets Updated..")
                    }
                })
            }
        })
        User.findOneAndUpdate({ userclass: "admin" }, { $pull: { disputedtimesheets: req.body } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                User.find({ name: req.body.currentuser }, function (err, user) {

                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found.." })
                    } else {

                        //user[0].payperiods[0].jobDetails[req.body.payperiodIndex][req.body.indexofdate].disputed = false;
                        console.log(user[0].payperiodhistory[req.body.payperiodnum].entry[req.body.index])
                        user[0].payperiodhistory[req.body.payperiodnum].entry[req.body.index][req.body.currentjobindate].disputed = false
                        user[0].payperiodhistory[req.body.payperiodnum].entry[req.body.index][req.body.currentjobindate].submittedtimesheetsindex = req.body.submittedtimesheetsindex
                        User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found.." })
                            } else {
                                //res.json({success: true, mesaage: "User found and updated..",user:user})
                                // User.findOneAndUpdate({name:req.body.client}, {})
                                User.find({ name: req.body.client }, function (err, user) {
                                    if (err) throw err;
                                    if (!user) {
                                        res.json({ success: false, message: "User not found" })
                                    } else {
                                        user[0].submittedtimesheets[req.body.submittedtimesheetsindex].disputed = false;
                                        User.findOneAndUpdate({ name: req.body.client }, { $set: { submittedtimesheets: user[0].submittedtimesheets } }, { new: true }, function (err, user) {
                                            if (err) throw err;
                                            if (!user) {
                                                res.json({ success: false, message: "User found.." })
                                            } else {
                                                res.json({ success: true, message: "User found and updated..", user: user })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }

                })
            }
        })

    })
    app.post('/users/marktimesheetasdisputed', function (req, res) {
        console.log(req.body)
        User.findOneAndUpdate({ userclass: "admin" }, { $push: { disputedtimesheets: req.body } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                User.find({ name: req.body.currentuser }, function (err, user) {

                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found.." })
                    } else {

                        //user[0].payperiods[0].jobDetails[req.body.payperiodIndex][req.body.indexofdate] = req.body;
                        user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.page.indexofdate].disputed = true
                        user[0].payperiodhistory[req.body.page.payperiodnum].entry[req.body.page.payperiodIndex][req.body.page.indexofdate].submittedtimesheetsindex = req.body.submittedtimesheetsindex
                        User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiods: user[0].payperiods, payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found.." })
                            } else {
                                User.find({ name: req.body.client }, function (err, user) {
                                    if (err) throw err;
                                    if (!user) {
                                        res.json({ success: false, message: "User not found" })
                                    } else {
                                        user[0].submittedtimesheets[req.body.currentIndex].disputed = true;
                                        User.findOneAndUpdate({ name: req.body.client }, { $set: { submittedtimesheets: user[0].submittedtimesheets } }, { new: true }, function (err, user) {
                                            if (err) throw err;
                                            if (!user) {
                                                res.json({ success: false, message: "User found.." })
                                            } else {
                                                res.json({ success: true, message: "User found and updated..", user: user })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }

                })
            }
        })

    })
    app.post('/users/addlocation', function (req, res) {
        User.findOneAndUpdate({ name: req.body.username }, { $push: { locations: req.body } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                res.json({ success: true, message: "Location Successfully Loaded..", user: user })
            }
        })
    })
    app.put('/users/getlocations/:username', function (req, res) {
        User.find({ name: req.params.username }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                res.json({ success: true, message: "Location Successfully Loaded..", locations: user[0].locations })
            }
        })
    })
    app.post('/users/removelocation', function (req, res) {
        User.find({ name: req.body.name }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                user[0].locations.splice(req.body.index, 1)
                User.findOneAndUpdate({ name: req.body.name }, { $set: { locations: user[0].locations } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found..." })
                    } else {
                        res.json({ success: true, message: "User found and updated", user: user })
                    }
                })
            }
        })
    })
    app.put('/users/getsupervisors/:username', function (req, res) {
        console.log("here")
        User.find({ name: req.params.username }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                res.json({ success: true, message: "Supervisors Successfully Loaded..", supervisors: user[0].supervisors })
            }
        })
    })

    app.post("/users/addsupervisor", function (req, res) {
        User.findOneAndUpdate({ name: req.body.username }, { $push: { supervisors: req.body } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                res.json({ success: true, message: "Supervisor Successfully Loaded...", user: user })
            }
        })
    })
    app.post('/users/removesupervisor', function (req, res) {
        User.find({ name: req.body.name }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                user[0].supervisors.splice(req.body.index, 1)
                User.findOneAndUpdate({ name: req.body.name }, { $set: { supervisors: user[0].supervisors } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found..." })
                    } else {
                        res.json({ success: true, message: "User found and updated", user: user })
                    }
                })
            }
        })
    })

    app.post('/users/addhourstobookedjob', function (req, res) {
        console.log(req.body)
        User.findOneAndUpdate({ name: req.body.client }, { $push: { submittedtimesheets: req.body } }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                User.find({ name: req.body.currentuser }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found..." })
                    } else {
                        console.log(user)
                        user[0].payperiods[0].jobDetails[req.body.payperiodIndex][req.body.indexofdate] = req.body
                        User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiods: user[0].payperiods } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found..." })
                            } else {
                                res.json({ success: true, message: "User found and updated...", user: user })
                            }
                        })

                    }
                })
            }
        })


    })
    app.put('/users/removemessage/:name/:index', function (req, res) {
        User.find({ name: req.params.name }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                //res.json({success: true,})
                console.log(req.params.index)
                console.log(user[0].comments[req.params.index])
                user[0].comments[req.params.index].read = false;
                user[0].comments.splice(req.params.index, 1)
                console.log(user[0].comments[req.params.index])
                User.findOneAndUpdate({ name: req.params.name }, { $set: { comments: user[0].comments } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User found and updated..." })
                    } else {
                        res.json({ success: true, message: "Message Read Status Changed To true...", user: user })
                    }
                })
            }
        })
    })
    app.put('/users/changemessagetounread/:id/:index', function (req, res) {
        User.find({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                //res.json({success: true,})
                user[0].comments[req.params.index].read = false;
                User.findOneAndUpdate({ _id: req.params.id }, { $set: { comments: user[0].comments } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User found and updated..." })
                    } else {
                        res.json({ success: true, message: "Message Read Status Changed To true...", user: user })
                    }
                })
            }
        })
    })
    app.put('/users/changemessagetoread/:id/:index', function (req, res) {
        User.find({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                //res.json({success: true,})
                user[0].comments[req.params.index].read = true;
                User.findOneAndUpdate({ _id: req.params.id}, { $set: { comments: user[0].comments } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User found and updated..." })
                    } else {
                        res.json({ success: true, message: "Message Read Status Changed To true...", user: user })
                    }
                })
            }
        })
    })
    app.put('/users/getmessages/:id', function (req, res) {

        User.find({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "User found...", messages: user[0].comments })
            }
        })

    })
    app.post('/users/sendmessage', function (req, res) {
        User.findOneAndUpdate({ name: req.body.to }, { $push: { comments: req.body } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found" })
            } else {
                res.json({ success: true, message: "User found and updated...", user: user })
            }
        })
    })
    app.post('/users/sendsms', function (req, res) {

        const from = req.body.from
        const to = req.body.phonenumber
        const text = req.body.text

        nexmo.message.sendSms(from, to, text)
        res.send({ success: true, message: "Text Message Successfully Sent", text: text })

    })
    app.post('/users/changeuserpayperiod', function (req, res) {
        var currentName = ""
        //console.log(req.body.currentusernamearray)


        PayPeriod.find({ payperiodnum: req.body.newpayperiod }, function (err, payperiod) {
            // payperiod.jobDetails.push([])
            var newJobDetails = payperiod.jobDetails

            for (var i = 0; i < req.body.currentusernamearray.length; i++) {
                // console.log(req.body.currentusernamearray[i])
                var currentName = req.body.currentusernamearray[i]

                User.findOneAndUpdate({ name: req.body.currentusernamearray[i] }, { $set: { historyupdated: false, payperiodnum: req.body.newpayperiod } }, { new: true }, function (err, user2) {
                    if (err) throw err;
                    if (!user2) {
                        res.json({ success: false, message: "User not found so not updated..." })
                    } else {


                        // res.json({success: true, message:"User found and updated..."})
                        console.log("User History Updated...")
                        // console.log(payperiod[0].jobDetails)
                        //  console.log(user2)

                        user2.payperiods[0].jobDetails = payperiod[0].jobDetails
                        User.findOneAndUpdate({ name: user2.name }, { $set: { payperiods: user2.payperiods, historyupdated: true } }, { new: true }, function (err, user3) {
                            if (err) throw err;
                            if (!user3) {
                                res.json({ success: false, message: "User not found so not updated.." })
                            } else {
                                console.log("Pay Period updated, and History Updated Parameter Changed To True...")
                            }
                        })
                    }
                })

            }


            console.log(payperiod)
        })
        User.find({}, function (err, users) {
            if (err) throw err;
            if (!users) {
                res.json({ success: false, message: "Users not found..." })
            } else {
                res.json({ success: true, message: "Users found..", users: users })
            }
        })
        //res.json({ success: true, message: "Payperiod Update, and History Updated Parameter Update, Complete...", users: user })


    })

    app.post('/users/checkandadddelinquenttimesheet', function (req, res) {
        console.log(req.body, "813")
        for (var z = 0; z < req.body.currentusernamearray.length; z++) {
            User.find({ name: req.body.currentusernamearray[z] }, function (err, user) {
                console.log(user[0].name)

                for (var d = 0; d < user.length; d++) {

                    //console.log(user[d].payperiods)

                    for (var s = 0; s < user[d].payperiodhistory[req.body.oldpayperiod].entry.length; s++) {

                        // console.log(user[d].payperiods[0].jobDetails[s][0])
                        if (user[d].payperiodhistory[req.body.oldpayperiod].entry[s]) {


                            if (user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0]) {
                                console.log("Its Truee")
                                // console.log(user[d].payperiods[0].jobDetails[s][0].booked)
                                if (user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0].booked && user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0].timesheetSubmitted == false) {
                                    console.log("EMMET")
                                    console.log("DELINUENTO")
                                    adminDelinquentTimeSheetArray = [];
                                    user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0].delinquent = true;
                                    userDelinquentTimeSheetArray = []
                                    userDelinquentTimeSheetArray.push(user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0])
                                    user[d].delinquenttimesheets.push(userDelinquentTimeSheetArray)
                                    //user[d].delinquenttimesheets.push(user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0])
                                    adminDelinquentTimeSheetArray.push(user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0])
                                    User.find({ userclass: "admin" }, function (err, user) {
                                        if (err) throw err;
                                        if (!user) {
                                            res.json({ success: false, message: "User not found.." })
                                        } else {
                                            //res.json({success: true, })
                                            console.log("EKKIO")

                                            // user[0].delinquenttimesheets.push(user[d].payperiodhistory[req.body.oldpayperiod].entry[s][0])
                                            User.findOneAndUpdate({ userclass: "admin" }, { $push: { delinquenttimesheets: adminDelinquentTimeSheetArray } }, { new: true }, function (err, user) {

                                                if (err) throw err;
                                                if (!user) {
                                                    res.json({ success: false, message: "User not found..." })
                                                } else {
                                                    console.log("Deliinquent Time Sheet Added To Admin Delinquent Time SHeet Array")
                                                }

                                            })
                                        }
                                    })
                                }
                                if (user[d].payperiodhistory[req.body.oldpayperiod].entry[s][1].booked && user[d].payperiodhistory[req.body.oldpayperiod].entry[s][1].timesheetSubmitted == false) {
                                    console.log("EMMET")
                                    console.log("DELINUENTO")
                                    user[d].payperiodhistory[req.body.oldpayperiod].entry[s][1].delinquent = true;
                                    adminDelinquentTimeSheetArray = [];
                                    userDelinquentTimeSheetArray = []
                                    userDelinquentTimeSheetArray.push(user[d].payperiodhistory[req.body.oldpayperiod].entry[s][1])
                                    user[d].delinquenttimesheets.push(userDelinquentTimeSheetArray)
                                    adminDelinquentTimeSheetArray.push(user[d].payperiodhistory[req.body.oldpayperiod].entry[s][1])
                                    User.find({ userclass: "admin" }, function (err, user) {
                                        if (err) throw err;
                                        if (!user) {
                                            res.json({ success: false, message: "User not found.." })
                                        } else {
                                            //res.json({success: true, })
                                            console.log("EKKI")
                                            //user[0].delinquenttimesheets.push(user[d].payperiodhistory[req.body.oldpayperiod].entry[s][1])
                                            User.findOneAndUpdate({ userclass: "admin" }, { $push: { delinquenttimesheets: adminDelinquentTimeSheetArray } }, { new: true }, function (err, user) {

                                                if (err) throw err;
                                                if (!user) {
                                                    res.json({ success: false, message: "User not found..." })
                                                } else {
                                                    console.log("Deliinquent Time Sheet Added To Admin Delinquent Time SHeet Array")
                                                }

                                            })
                                        }
                                    })

                                }
                            }

                        }

                    }

                    User.findOneAndUpdate({ name: user[0].name }, { $set: { delinquenttimesheets: user[0].delinquenttimesheets } }, { new: true }, function (err, user) {
                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "User not found.." })
                        } else {
                            //res.json({success: true, mes})
                            
                            console.log("User Delinquent Time Sheets Updated...")

                        }
                    })
                }
            })
        }
        res.json({ success: true, message: "Delinquent Time Sheets Updated.." })

    })
    app.post('/users/addpayperiodtopayperiodhistory', function (req, res) {
        console.log(req.body)

        //console.log(req.body.allEmployeesJobDetails[z])
        //  for (var d= 0; d < req.body.allEmployeesJobDetails[z].length;d++){
        //console.log(req.body.allEmployeesJobDetails[z][d])

        if (req.body.name !== undefined) {
            //console.log(z)
            var name = req.body.name;
            var newPayPeriod = [];
            var payperiodHistoryEntry = {}
            payperiodHistoryEntry.payperiod = req.body.payperiod;
            payperiodHistoryEntry.entry = req.body.entry
            //console.log("ITS PAY PERIOD HISTORY TIME!!!", payperiodHistoryEntry.entry[3])

            console.log("ITS NAME TIME", name)
            PayPeriod.find({ payperiodnum: req.body.payperiodnum }, function (err, payperiod) {
                if (err) throw err;
                if (!payperiod) {
                    res.json({ success: false, message: "Pay Period Not Found.." })
                } else {
                    newPayPeriod = payperiod[0].jobDetails
                    User.find({ name: req.body.name }, function (err, user) {
                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "User not found..." })
                        } else {
                            var ppObject = {}
                            ppObject.entry = newPayPeriod
                            user[0].payperiodhistory.push(ppObject)
                            User.findOneAndUpdate({ name: req.body.name }, { $set: { payperiodhistory: user[0].payperiodhistory } }, function (err, user) {
                                if (err) throw err;
                                if (!user) {
                                    res.json({ succes: false, message: "User not found.." })
                                } else {
                                    res.json({ success: true, message: "User found and updated...", user: user })
                                }
                            })
                        }

                    })
                }
            })
        }
        /*   User.findOne({ name: name }, function (err, user) {
               if (err) throw err; 
               if (!user) {
                   res.json({ success: false, message: "User not found.." })
               } else {
                   console.log(user.historyupdated)
                   console.log('history not update' + user.name)
//console.log("ITS PAY PERIOD HISTORY TIME!!!2222222", payperiodHistoryEntry.entry[3])
       
                   User.findOneAndUpdate({ name: user.name }, {$push: { payperiodhistory: payperiodHistoryEntry } }, { new: true }, function (err, user) {
 
                       if (err) throw err;
                       if (!user) {
                           res.json({ success: false, message: "User not found, so not updated" })
                       } else {
                           console.log("User updated..." + user.name)
                           // console.log(req.body.allEmployeesJobDetails[z][7].name)
                           User.findOneAndUpdate({ name: user.name }, { $set: { historyupdated: true } }, { new: true }, function (err, user) {
 
                               if (err) throw err;
                               if (!user) {
                                   res.json({ success: false, message: "User not found, so not updated" })
                               } else {
                                   console.log("User History indicator Updated... " + user.name)
                                   // console.log(name)
                               }
                           })
                       }
                   })
 
 
               }
           })
 
       }
*/
        // }

        //  payperiodHistoryEntroy.historyentered = true;
        //  console.log(req.body.allEmployeesJobDetails[z][7].name)



        //res.json({ success: true, message: "User Pay Period History Successfully Updated..." })

    })
    app.post('/users/addjobtocurrentpayperiod', function (req, res) {
        req.body[0].currentuser
        User.find({ name: req.body[0].currentuser }, function (err, user) {

            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                // res.json({success: true, message: "User fou"}
                console.log(user[0].payperiods[0].jobDetails[0])
                user[0].payperiods[0].jobDetails[7][0].push(req.body[0])
                for (var z = 0; z < req.body.length; z++) {
                    req.body[z].delinquent = true;
                }

                user[0].delinquenttimesheets.splice(req.body.index, 1)
                User.findOneAndUpdate({ name: req.body[0].currentuser },
                    {
                        $set: {
                            payperiods: user[0].payperiods,
                            delinquenttimesheets: user[0].delinquenttimesheets
                        }
                    }, function (err, user) {

                        if (err) throw err;
                        if (!user) {
                            console.log("here")
                            res.json({ success: false, message: "User not found so not updated.." })
                        } else {
                            console.log("herer")
                            res.json({ success: true, message: "Current Pay Period Successfully Updated With Delinquent Time Sheet", user: user })

                            //res.json({success: true, message:"User found and updated..", user: user})
                            /* User.find({name: req.body.user}, function(err,user){
 
                                 for(var z=0; z< user[0].delinquenttimesheets.length;z++){
                                     console.log("Holaa")
                                    // console.log(user[0].delinquenttimesheets[z].payperiod)
                                     for(var d=0; d< user[0].delinquenttimesheets[z].length;d++){
                                         console.log(user[0].delinquenttimesheets[z][d])
                                       if(user[0].delinquenttimesheets[z][d].date == req.body.date){
                                           console.log("2")
                                           user[0].delinquenttimesheets[z].splice(user[0].delinquenttimesheets[z].indexOf(user[0].delinquenttimesheets[z][d]),1)
                                           console.log(user[0].delinquenttimesheets[z])
                                           User.findOneAndUpdate({name: req.body.user}, {$set:{delinquenttimesheets: user[0].delinquenttimesheets[z]}},{new:true}, function(err,user){
                                               if(err)throw err;
                                               if(!user){
                                                   res.json({success: false, message:"User not found so no updated.."})
                                               }else{
 
                                                  // res.json({success: true, message:"User found "})
                                                  console.log("Delinquent Timesheet Removed..")
                                               }
                                           })
                                       }
                                     }
                                 }
                             })*/
                        }
                    })





            }
        })
    })
    app.post('/users/adddelinquenttimesheet', function (req, res) {
        //console.log(req.body)
        var delinquentTimeSheetArray = [];
        User.find({ name: req.body.name[0] }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                console.log("userfnd")
                // console.log(user[0].delinquenttimesheets)
                //user[0].push(req.body.)

                for (var z = 0; z < req.body.date.length; z++) {
                    console.log("userfound")

                    if (user[0].delinquenttimesheets.length > 0) {
                        for (var d = 0; d < user[0].delinquenttimesheets.length; d++) {
                            console.log("hello")
                            //console.log(user[0].delinquenttimesheets[d])
                            for (var s = 0; s < user[0].delinquenttimesheets[d].length; s++) {

                                if (req.body.date[z] == user[0].delinquenttimesheets[d][s].date && user[0].delinquenttimesheets[d][s].date !== undefined) {

                                    console.log("Delinquent Time SHeet Already Exists")

                                } else {
                                    console.log("COLI")
                                    req.body.jobDetails[0].payperiod = req.body.payperiod;
                                    delinquentTimeSheetArray.push(req.body.jobDetails)
                                    user[0].delinquenttimesheets.push(delinquentTimeSheetArray)
                                    User.findOneAndUpdate({ name: req.body.name[0] }, { $set: { delinquenttimesheets: user[0].delinquenttimesheets } }, { new: true }, function (err, user) {

                                        if (err) throw err;
                                        if (!user) {
                                            res.json({ success: false, message: "User not found, so not updated..." })
                                        } else {
                                            res.json({ success: true, message: "User found and updated..", user: user })
                                        }
                                    })

                                }


                            }




                        }
                    } else {
                        req.body.jobDetails[0].payperiod = req.body.payperiod;

                        user[0].delinquenttimesheets.push(req.body.jobDetails)
                        User.findOneAndUpdate({ name: req.body.name[0] }, { $set: { delinquenttimesheets: user[0].delinquenttimesheets } }, { new: true }, function (err, user) {

                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found, so not updated..." })
                            } else {
                                res.json({ success: true, message: "User found and updated..", user: user })
                                //console.log("user found and updated..")
                            }
                        })
                    }

                    //if(user[0].delinquenttimesheets[z].date == req.body.date)

                }


                //res.json({success: true, message: "User found..."})
            }
            // res.json({success: false, message:"User Delinquent Time Sheet Already Exists!"})
        })
    })
    app.put('/clients/create/:clientName', function (req, res) {

        var client = new Client();
        client.name = req.params.clientName;
        if (req.params.clientName !== "" || undefined) {
            client.save(function (err, client) {
                if (err) {
                    res.json({ success: false, message: "Save failed.." })
                } else {
                    res.json({ success: true, message: "Save successfull...", client: client })
                }
            })
        }
    })
    app.put('/locations/create/:locationName', function (req, res) {

        var location = new Location();
        location.name = req.params.locationName;
        if (req.params.locationName !== "" || undefined) {
            location.save(function (err, location) {
                if (err) {
                    res.json({ success: false, message: "Save failed.." })
                } else {
                    res.json({ success: true, message: "Save successfull...", location: location })
                }
            })
        }
    })
    app.put('/supervisors/create/:supervisorName', function (req, res) {

        var supervisor = new Supervisor();
        supervisor.name = req.params.supervisorName;
        if (req.params.supervisorName !== "" || undefined) {
            supervisor.save(function (err, supervisor) {
                if (err) {
                    res.json({ success: false, message: "Save failed.." })
                } else {
                    res.json({ success: true, message: "Save successfull...", supervisor: supervisor })
                }
            })
        }
    })
    app.get('/clients', function (req, res) {
        Client.find({}, function (err, clients) {

            if (err) throw err;
            if (!clients) {
                res.json({ success: false, message: "Clients not founds..." })
            } else {
                res.json({ success: true, message: "Clients found...", clients: clients })
            }
        })
    })
    app.get('/locations', function (req, res) {
        Location.find({}, function (err, location) {

            if (err) throw err;
            if (!location) {
                res.json({ success: false, message: "Location not founds..." })
            } else {
                res.json({ success: true, message: "Location found...", location: location })
            }
        })
    })
    app.get('/supervisors', function (req, res) {
        Supervisor.find({}, function (err, supervisors) {

            if (err) throw err;
            if (!supervisors) {
                res.json({ success: false, message: "Supervisors not founds..." })
            } else {
                res.json({ success: true, message: "Supervisors found...", supervisors: supervisors })
            }
        })
    })
    app.put('/users/finduser/:id', function (req, res) {
       //s console.log(req.params.name)
        User.find({ _id: req.params.id }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                res.json({ success: true, message: "User found", user: user })
            }
        })
    })

    app.post('/users/editphonenumber', function (req, res) {

        User.findOneAndUpdate({ name: req.body.name }, { $set: { phonenumber: req.body.newphonenumber } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "User found and updated..", user: user })
            }
        })

    })
    app.post('/users/editemail', function (req, res) {
        User.findOneAndUpdate({ name: req.body.name }, { $set: { email: req.body.newemail } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "User found and updated..", user: user })
            }
        })
    })
    app.post('/users/editpayrate', function (req, res) {
        User.findOneAndUpdate({ name: req.body.name }, { $set: { payrate: req.body.newpayrate } }, { new: true }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "User found and updated..", user: user })
            }
        })
    })
    app.post('/users/removejob', function (req, res) {
        console.log(req.body)
        User.find({ name: req.body.job.currentuser }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                console.log(user)
                // user[0].payperiods[0].jobDetails[req.body.jobindex].splice(req.body.indexofjob,1)
                if (user[0].payperiods[0].jobDetails[req.body.jobindex].length == 0) {

                    var defaultJobDetail = {
                        date: req.body.job.date,
                        booked: false,
                        default: true,
                        timesheetSubmitted: false,

                    }
                    if (req.body.jobindex == 7) {
                        user[0].payperiods[0].jobDetails[req.body.jobindex].splice(req.body.indexofjob, 1)
                        User.findOneAndUpdate({ name: req.body.job.currentuser }, { $set: { payperiods: user[0].payperiods } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found so not updated..." })
                            } else {
                                res.json({ success: true, message: "User updated", user: user })
                            }
                        })

                    } else {
                        user[0].payperiods[0].jobDetails[req.body.jobindex].push(defaultJobDetail)
                        User.findOneAndUpdate({ name: req.body.job.currentuser }, { $set: { payperiods: user[0].payperiods } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found so not updated..." })
                            } else {
                                res.json({ success: true, message: "User updated", user: user })
                            }
                        })
                    }

                } else {
                    if (req.body.jobindex == 7) {
                        user[0].payperiods[0].jobDetails[req.body.jobindex].splice(req.body.indexofjob, 1)
                        User.findOneAndUpdate({ name: req.body.job.currentuser }, { $set: { payperiods: user[0].payperiods } }, { new: true }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found so not updated..." })
                            } else {
                                res.json({ success: true, message: "User updated", user: user })
                            }
                        })

                    } else {
                        if (req.body.indexofjob == 1) {
                            user[0].payperiods[0].jobDetails[req.body.jobindex].splice(req.body.indexofjob, 1)
                            var defaultJobDetail = {
                                date: req.body.job.date,
                                booked: false,
                                default: true,
                                timesheetSubmitted: false,

                            }
                            user[0].payperiods[0].jobDetails[req.body.jobindex].push(defaultJobDetail)
                            User.findOneAndUpdate({ name: req.body.job.currentuser }, { $set: { payperiods: user[0].payperiods } }, { new: true }, function (err, user) {
                                if (err) throw err;
                                if (!user) {
                                    res.json({ success: false, message: "User not found so not updated..." })
                                } else {
                                    res.json({ success: true, message: "User updated", user: user })
                                }
                            })

                        }
                        if (req.body.indexofjob == 0) {
                            user[0].payperiods[0].jobDetails[req.body.jobindex].splice(req.body.indexofjob, 1)
                            var defaultJobDetail = {
                                date: req.body.job.date,
                                booked: false,
                                default: true,
                                timesheetSubmitted: false,

                            }
                            user[0].payperiods[0].jobDetails[req.body.jobindex].push(defaultJobDetail)
                            User.findOneAndUpdate({ name: req.body.job.currentuser }, { $set: { payperiods: user[0].payperiods } }, { new: true }, function (err, user) {
                                if (err) throw err;
                                if (!user) {
                                    res.json({ success: false, message: "User not found so not updated..." })
                                } else {
                                    res.json({ success: true, message: "User updated", user: user })
                                }
                            })

                        }

                    }

                    /* if(user[0].payperiods[0].jobDetails[req.body.jobindex][0].default){
     
                         res.json({success: false, message: "Cannot delete default job.."})
                     }*/
                    /*    User.findOneAndUpdate({name: req.body.job.currentuser},{$set:{payperiods:user[0].payperiods}},{new:true}, function(err,user){
        if(err)throw err;
        if(!user){
            res.json({success: false, message:"User not found so not updated..."})
        }else{
            res.json({success: true, message:"User updated", user:user})
        }
    })*/
                }

            }
        })
    })
    app.post('/users/addjob', function (req, res) {
        console.log(req.body)
        console.log("HOLLA")
        // res.json({success: true, message:"Client found...", client:client})


        User.find({ name: req.body.currentuser }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                // console.log(user[0])
                // for (var z = 0; z < user[0].payperiods[0].length; z++) {
                //if (user[0].payperiods[0].payperiodnum == user[0].payperiodnum) {
                console.log(user[0].payperiods[0].jobDetails[req.body.payperiodIndex])
                if (req.body.indexofdate == 0) {
                    user[0].payperiods[0].jobDetails[req.body.payperiodIndex][0] = req.body
                    user[0].payperiods[0].jobDetails[req.body.payperiodIndex][0].booked = true;
                    user[0].payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodIndex][0] = req.body
                }
                if (req.body.indexofdate == 1) {
                    console.log("Here")
                    user[0].payperiods[0].jobDetails[req.body.payperiodIndex][1] = req.body
                    user[0].payperiods[0].jobDetails[req.body.payperiodIndex][1].booked = true;
                    user[0].payperiodhistory[req.body.payperiodnum].entry[req.body.payperiodIndex][1] = req.body


                }


                User.findOneAndUpdate({ name: req.body.currentuser }, { $set: { payperiods: user[0].payperiods, payperiodhistory: user[0].payperiodhistory } }, { new: true }, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: "User not found.." })
                    } else {
                        res.json({ success: true, message: "User found and updated...", user: user })
                    }
                })
                //}
                //}

            }
        })






    })
    app.post('/users/removerequestedjob', function(req,res){
        
        User.find({name:req.body.client}, function(err,user){
            if(err)throw err;
            if(!user){
                res.json({success: false, message:"User not found.."})
            }else{
                for(var z=0;z<user[0].requestedjobs.length;z++){
                    if(user[0].requestedjobs[z].numberofworkers == req.body.numberofworkers && user[0].requestedjobs[z].hours == req.body.hours
                    && user[0].requestedjobs[z].monthNum == req.body.monthNum  && user[0].requestedjobs[z].dateNum == req.body.dateNum){
                        user[0].requestedjobs.splice(z,1)
                    }
                }
                User.findOneAndUpdate({name:req.body.client}, {$set:{requestedjobs:user[0].requestedjobs}},{new:true}, function(err,user){
                    if(err)throw err;
                    if(!user){
                        res.json({success: false, message:"User not found.."})
                    }else{
                        User.find({userclass:"admin"}, function(err,user){
                            if(err)throw err;
                            if(!user){
                                res.json({success: false, message:"user not found.."})
                            }else{
                                user[0].requestedjobs.splice(req.body.requestedjoblocation,1)
                                User.findOneAndUpdate({userclass:"admin"}, {$set:{requestedjobs: user[0].requestedjobs}},{new:true}, function(err,user){
                                    if(err)throw err;
                                    if(!user){
                                        res.json({success: false, message:"User not found.."})
                                    }else{
                                        res.json({sucess: true, message:"Requested Job removed..", user:user})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    })
    app.post('/payperiod/updatepayperiodjobdetails', function (req, res) {
        console.log(req.body)
        PayPeriod.find({}, function (err, payperiods) {
            if (err) throw err;
            if (!payperiods) {
                res.json({ success: false, message: "Payperiods not found.." })
            } else {
                // console.log(payperiods.length)
                // console.log(req.body.length)
                // console.log(payperiods[0])
                //console.log(req.body[0])
                for (var i = 0; i < payperiods.length; i++) {
                    // console.log(i)
                    // console.log(payperiods[i])
                    for (var d = 0; d < payperiods[i].jobDetails.length; d++) {


                        //payperiods[51].jobDetails[6] = req.body;
                        //payperiods[i].jobDetails[d].booked = req.body.booked
                        //console.log(d,payperiods[i].jobDetails[d],payperiods[i].payperiodnum)
                        console.log(payperiods)
                        PayPeriod.findOneAndUpdate({ payperiodnum: payperiods[i].payperiodnum }, { $set: { jobDetails: req.body[i].jobDetails } }, { new: true }, function (err, payperiod) {

                            if (err) throw err;
                            if (!payperiod) {
                                console.log("payperiod not found...")
                            } else {
                                console.log("Payperiod found and updated...")
                            }
                        })
                    }

                }
                res.json({ success: true, message: "PayPeriods Successfully Updated", payperiods: payperiods })
            }
        })
    })
    app.post('/payperiod/createpayperiod', function (req, res) {

        var payperiod = new PayPeriod();
        //payperiod.date = req.body.date;
        payperiod.payperiodnum = req.body.payperiod;
        payperiod.jobDetails = req.body.jobDetails;
        payperiod.booked = req.body.booked;
        payperiod.monthName = req.body.month;
        console.log(payperiod)
        payperiod.save(function (err, user) {

            if (err) {
                res.json({ success: false, message: "Save failed...", err: err })
            } else {
                res.json({ successs: true, message: "Save Successful..." })
            }


        })

    })
    app.get('/payperiod/getallpayperiods', function (req, res) {
        PayPeriod.find({}, function (err, payperiods) {

            if (err) throw err;
            if (!payperiods) {
                res.json({ success: false, message: "Payperiods not found.." })
            } else {
                res.json({ success: true, message: "PayPeriods found..", payperiods: payperiods })
            }

        })
    })
    app.put('/users/updatepayperiod/:payperiod/:username', function (req, res) {
        console.log("hello")
        console.log("HELLODFLKSDJFKLDJ")
        User.findOneAndUpdate({ username: req.params.username }, { $inc: { payperiodnum: 1 } }, { new: true }, function (err, user) {

            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found so not updated.." })
            } else {
                res.json({ success: true, message: "User found and updated..", user: user })
            }

        })
    })

    app.put('/users/:input', function (req, res) {
        User.find({ name: { $regex: "^" + req.params.input } }, function (err, users) {
            if (err) throw err;
            if (!users) {
                res.json({ success: false, message: "Users not found.." })
            } else {
                res.json({ success: true, message: "Users found", users: users })
            }
        })
    })

    app.get('/users', function (req, res) {

        User.find({}, function (err, users) {
            if (err) throw err;
            if (!users) {
                res.json({ success: false, message: "Users not found.." })
            } else {
                res.json({ success: true, message: "Users found..", users })
            }
        })
    })
    app.put('/users/:userid/:month/:date/:boolean', function (req, res) {

        User.findOne({ _id: req.params.userid }, function (err, user) {

            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "User not found.." })
            } else {
                //res.json({success: true, message: "User found..", user.})
                console.log(user)
                if (req.params.month == "June") {
                    if (req.params.boolean == "false") {
                        user.june[req.params.date - 1] = false;
                        User.findOneAndUpdate({ _id: req.params.userid }, { $set: { June: user.June } }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found..." })
                            } else {
                                res.json({ success: true, message: "User found and updated..", user })
                            }
                        })
                    } else {
                        user.june[req.params.date - 1] = true;
                        User.findOneAndUpdate({ _id: req.params.userid }, { $set: { June: user.June } }, function (err, user) {
                            if (err) throw err;
                            if (!user) {
                                res.json({ success: false, message: "User not found..." })
                            } else {
                                res.json({ success: true, message: "User found and updated..", user })
                            }
                        })
                    }

                }
                //res.json({success: true, message: "User's availability modified", user: user})
            }

        })

    })

    app.post('/bookjob', function (req, res) {
        console.log(req.body)
        User.findOneAndUpdate({ _id: req.body.userid }, { $push: { jobDetails: req.body.jobDetails } }, function (err, user) {
            if (err) throw (err)
            if (!user) {
                res.json({ success: false, message: "User not found" })

            } else {
                res.json({ success: true, message: "User found and updated", user })
            }
        })
    })
    app.put('/users/:userId/:date/:boolean', function (req, res) {

        User.findOne({ _id: req.params.userId }, function (err, user) {


            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: "User not found" })

            } else {
                if (req.params.boolean == "true") {
                    user.calender[0][req.params.date] = true;
                    console.log(user.calender[0][req.params.date])
                    User.findOneAndUpdate({ _id: req.params.userId }, { $set: { calender: user.calender } }, function (err, user) {
                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "User not found" })
                        } else {
                            res.json({ success: true, message: "User found and updated...", user: user })
                        }
                    })
                } else {
                    user.calender[0][req.params.date] = false;

                    User.findOneAndUpdate({ _id: req.params.userid }, { $set: { calender: user.calender } }, function (err, user) {
                        if (err) throw err;
                        if (!user) {
                            res.json({ success: false, message: "User not found" })
                        } else {
                            res.json({ success: true, message: "User found and updated...", user: user })
                        }
                    })
                }

            }

        })
    })
    app.put('/users/:userid', function (req, res) {
        // console.log(req.params.userid,"OU")
        User.findOne({ _id: req.params.userid }, function (err, user) {
            if (!user) {
                res.json({ success: false, message: "User not found..." })
            } else {
                res.json({ success: true, message: "User found..", user: user })
            }
        })

    })

    app.post('/authenticate', function (req, res) {

        //res.send("testing new route")
        console.log("authenticate Route Hit");
        console.log(req.body)
        User.findOne({ username: req.body.username }).select('email username password name payrate payperiodnum userclass phonenumber comments supervisors locations approvednotbooked requestedjobs submittedtimesheets')
            .exec(function (err, user) {

                if (err) throw err;
                if (!user) {
                    console.log("ppocher")
                    res.json({ success: false, message: "User Not Found..." })
                } else if (user) {
                    //START PASSWORD VALIDATION
                    console.log("hello")
                    var validPassword = user.comparePassword(req.body.password)

                    console.log("IS IT VALID?")

                    console.log("validPassword", validPassword)

                    //console.log(validPassword)
                    if (!validPassword) {
                        res.json({ success: false, message: "Incorrect Password..." })
                    } else {
                        var token = jwt.sign({ success:true,username: user.username, email: user.email, payrate: user.payrate, userclass: user.userclass, payperiod: user.payperiodnum, name: user.name, _id: user._id, phonenumber: user.phonenumber, messages: user.comments, locations: user.locations, supervisors: user.supervisors, approvednotbooked: user.approvednotbooked, requestedjobs: user.requestedjobs, submittedtimesheets: user.submittedtimesheets }, secret, { expiresIn: '3h' });
                        var timelefttoken =  jwt.sign({ username: user.username, email: user.email}, secret, { expiresIn: '3h' });
                        res.json({ success: true, message: 'User authenticated', token: token,timelefttoken:timelefttoken, user: user });
                        //res.json({ success: true, message: "User authenticated...", user: user })
                    }
                }
            })

    })
    app.post('/users', function (req, res) {
        console.log("Route Hit")
        var user = new User();
        var date = new Date();
        var dateNow = date.getDate()
        var month = date.getMonth() + 1;
        console.log(month)
        var payperiodnum = 0;

        if (month == 6) {

            if (dateNow == 1 || dateNow == 2 || dateNow == 3) {

                payperiodnum = 1;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 4 || dateNow == 5 || dateNow == 6 || dateNow == 7 || dateNow == 8 || dateNow == 9 || dateNow == 10) {

                payperiodnum = 2;
                console.log("payperiodnum", payperiodnum)
                newPPObject = {}
                newPPObject.newpayperiod = payperiodnum;


            }
            if (dateNow == 11 || dateNow == 12 || dateNow == 13 || dateNow == 14 || dateNow == 15 || dateNow == 16 || dateNow == 17) {

                payperiodnum = 3;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 18 || dateNow == 19 || dateNow == 20 || dateNow == 21 || dateNow == 22 || dateNow == 23 || dateNow == 24) {

                payperiodnum = 4;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 25 || dateNow == 26 || dateNow == 27 || dateNow == 28 || dateNow == 39 || dateNow == 30) {

                payperiodnum = 5;
                console.log("payperiodnum", payperiodnum)


            }
        }
        if (month == 7) {
            if (dateNow == 1) {

                payperiodnum = 5;
                console.log("payperiodnum", payperiodnum)

            }
            if (dateNow == 2 || dateNow == 3 || dateNow == 4 || dateNow == 5 || dateNow == 6 || dateNow == 7 || dateNow == 8) {

                payperiodnum = 6;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 9 || dateNow == 10 || dateNow == 11 || dateNow == 12 || dateNow == 13 || dateNow == 14 || dateNow == 15) {

                payperiodnum = 7;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 16 || dateNow == 17 || dateNow == 18 || dateNow == 19 || dateNow == 20 || dateNow == 21 || dateNow == 22) {

                payperiodnum = 8;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 23 || dateNow == 24 || dateNow == 25 || dateNow == 26 || dateNow == 27 || dateNow == 28 || dateNow == 29) {

                payperiodnum = 9;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 30 || dateNow == 31) {

                payperiodnum = 10;
                console.log("payperiodnum", payperiodnum)


            }
        }
        if (month == 8) {
            if (dateNow == 1 || dateNow == 2 || dateNow == 3 || dateNow ==4 || dateNow == 5) {

                payperiodnum = 2;
                console.log("payperiodnum", payperiodnum)

            }
            if (dateNow == 6 || dateNow ==7 || dateNow ==8 ||dateNow == 9 ||dateNow == 10 ||dateNow == 11 ||dateNow == 12) {

                payperiodnum = 3;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 13 ||dateNow == 14 ||dateNow == 15 ||dateNow == 16 || dateNow ==17 ||dateNow == 18 ||dateNow == 19) {

                payperiodnum = 4;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 20 ||dateNow == 21 ||dateNow == 22 ||dateNow ==23 || dateNow ==24 ||dateNow == 25 || dateNow ==26) {

                payperiodnum = 5;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 27 || dateNow == 28 ||dateNow == 29 ||dateNow == 30 ||dateNow == 31) {

                payperiodnum = 6;
                console.log("payperiodnum", payperiodnum)


            }
        }
        if (month == 9) {
            if (dateNow == 1 || 2) {

                payperiodnum = 15;
                console.log("payperiodnum", payperiodnum)

            }
            if (dateNow == 3 || 4 || 5 || 6 || 7 || 8 || 9) {

                payperiodnum = 16;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 10 || 11 || 12 || 13 || 14 || 15 || 16) {

                payperiodnum = 17;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 17 || 18 || 19 || 20 || 21 || 22 || 23) {

                payperiodnum = 18;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 24 || 25 || 26 || 27 || 28 || 29 || 30) {

                payperiodnum = 19;
                console.log("payperiodnum", payperiodnum)


            }
        }
        if (month == 10) {
            if (dateNow == 1 || 2 || 3 || 4 || 5 || 6 || 7) {

                payperiodnum = 20;
                console.log("payperiodnum", payperiodnum)

            }
            if (dateNow == 8 || 9 || 10 || 11 || 12 || 13 || 14) {

                payperiodnum = 21;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 15 || 16 || 17 || 18 || 19 || 20 || 21) {

                payperiodnum = 22;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 22 || 23 || 24 || 25 || 26 || 27 || 28) {

                payperiodnum = 23;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 29 || 30 || 31) {

                payperiodnum = 24;
                console.log("payperiodnum", payperiodnum)


            }
        }
        if (month == 11) {
            if (dateNow == 1 || 2 || 3 || 4) {

                payperiodnum = 24;
                console.log("payperiodnum", payperiodnum)

            }
            if (dateNow == 5 || 6 || 7 || 8 || 9 || 10 || 11) {

                payperiodnum = 25;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 12 || 13 || 14 || 15 || 16 || 17 || 18) {

                payperiodnum = 26;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 19 || 20 || 21 || 22 || 23 || 24 || 25) {

                payperiodnum = 27;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 26 || 27 || 28 || 29 || 30) {

                payperiodnum = 28;
                console.log("payperiodnum", payperiodnum)


            }
        }
        if (month == 12) {
            if (dateNow == 1 || 2) {

                payperiodnum = 29;
                console.log("payperiodnum", payperiodnum)

            }
            if (dateNow == 3 || 4 || 5 || 6 || 7 || 8 || 9) {

                payperiodnum = 30;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 10 || 11 || 12 || 13 || 14 || 15 || 16) {

                payperiodnum = 31;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 17 || 18 || 19 || 20 || 21 || 22 || 23) {

                payperiodnum = 32;
                console.log("payperiodnum", payperiodnum)


            }
            if (dateNow == 24 || 25 || 26 || 27 || 28 || 29 || 30) {

                payperiodnum = 33;
                console.log("payperiodnum", payperiodnum)


            }
        }






        user.username = req.body.userName;
        user.phonenumber = req.body.phonenumber;
        user.password = req.body.password.toString(),
        user.email = req.body.email;
        user.userclass = req.body.userclass;
        user.delinquenttimesheets = [[]];
        user.disputedtimesheets= [];

        user.payrate = 17;
        user.requestedjobs = [];
        user.approvedjobs = [];
        user.name = req.body.name;
        user.payperiodnum = payperiodnum;
        user.historyupdated = false;
        //user.complaints = []
        user.comments = []
        console.log(user)

        if (req.body.userName == null || req.body.userName == "" || req.body.password == null || req.body.password == "" ||
            req.body.email == null || req.body.email == "" || req.body.name == null || req.body.name == '') {
            res.json({ success: false, message: "Ensure username, email, name and password are provided" });


        } else {
            console.log("Here i am")
            PayPeriod.find({ payperiodnum: payperiodnum }, function (err, payperiod) {

                if (err) throw err;
                if (!user) {
                    res.json({ success: false, message: "Pay Period Not Found..." })
                } else {
                    for (var z = 0; z < payperiod[0].jobDetails.length; z++) {
                        payperiod[0].jobDetails[z].currentuser = req.body.name
                    }
                    console.log(payperiod)
                    user.payperiods = payperiod
                    user.save(function (err) {
                        if (err) {
                            res.json({ success: false, message: "Save Failed..." })
                        } else {
                            res.json({ success: true, message: "Save Successful,", user: user })
                        }

                    })

                }

            })
            /* PayPeriod.find({payperiodnum:payperiodnum}, function (err, payperiods) {
                 console.log("hello", payperiods.length)
                 for (var i = 0; i < payperiods.length; i++) {
                     payperiods[i].currentuser = req.body.name;
                     //console.log(payperiods[0].currentuser)
                 }
                 console.log(payperiods[0].currentuser)
                 user.payperiods = payperiods;
                 console.log(user.payperiods[0].currentuser)
                 //user.payperiodnum = 5;
                 user.save(function (err) {
                     if (err) {
 
                         //res.send("Ensure all fields input")
                         res.json({ success: false, message: "There was an error..." })
                         console.log(err)
                     } else {
 
                         /* if (err) {
                              res.send("Username or email already exists..")
                              res.json({success: false, message: "Username or email already exists.."})
                          } else {*/
            //res.send("userCreated");
            //res.json({ success: true, message: "User Created Successfully.", user: user })
            /* }*/


            /*  }
          })
 
      })*/

        }

    })
    //EXPRESS MIDDLEWARE
    app.use(function (req, res, next) {
        // console.log(req.body.token)
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        //from jwt documentation
        if (token) {
            // verify token
            jwt.verify(token, secret, function (err, decoded) {

                if (err) {
                    res.json({ success: false, message: "Token invalid" })
                } else {
                    req.decoded = decoded;
                    next(); //continue to post method...
                }

            })

        } else {
            res.json({ success: false, message: "No token provided" });
        }


    });
    app.post('/me', function (req, res) {

        res.send(req.decoded);



    });
    app.put('/api/getuserclass', function (req, res) {
        User.findOne({ username: req.decoded.username }, function (err, user) {

            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: "No user found..." });
            } else {
                res.json({ success: true, userclass: user.userclass });
            }

        });


    });



    return app;

}