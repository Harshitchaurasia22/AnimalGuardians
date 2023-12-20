const express = require("express");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();
const mysql = require('mysql2');
const { log } = require("console");

const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


// database connection-------------------------------------------------------------------------------------

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'harshit123',
    database: 'websiteDatabase',
});

//HOME----------------------------------------------------------------------------------------------------
app.get("/", function (req, res) {

    res.sendFile(__dirname + "/home.html");
})
app.post("/", function (req, res) {
    res.sendFile(__dirname + "/home.html");
})

//Shop----------------------------------------------------------------------------------------------------
app.post("/shop", function (req, res) {
    res.sendFile(__dirname + "/shop.html");
})

//INSIDER CLUB == NEWSLETTER------------------------------------------------------------------------------
app.post("/stayinformed", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
    client.setConfig({
        apiKey: process.env.API_KEY,
        server: "us18"
    })

    app.post("/success", function (req, res) {
        const phone = req.body.phoneNumber;
        const name = req.body.name;
        const email = req.body.email;

        const run = async () => {
            try {
                const response = await client.lists.addListMember("8ff52b1a28", {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: name,
                        PHONE: phone
                    }
                });
                res.sendFile(__dirname + "/success.html");
            }
            catch (err) {
                res.sendFile(__dirname + "/failure.html")
            };
        }

        run();

    })

    app.post("/failure", function (req, res) {
        res.sendFile(__dirname + "/signup.html");
    })
})

//Blog-----------------------------------------------------------------------------------------------------
app.post("/blog", function (req, res) {
    res.sendFile(__dirname + "/blog.html");
})
app.post("/blog1", function (req, res) {
    res.sendFile(__dirname + "/blog1.html");
})
app.post("/blog2", function (req, res) {
    res.sendFile(__dirname + "/blog2.html");
})
app.post("/blog3", function (req, res) {
    res.sendFile(__dirname + "/blog3.html");
})
app.post("/blog4", function (req, res) {
    res.sendFile(__dirname + "/blog4.html");
})
app.post("/blog5", function (req, res) {
    res.sendFile(__dirname + "/blog5.html");
})
app.post("/blog6", function (req, res) {
    res.sendFile(__dirname + "/blog6.html");
})
app.post("/blog7", function (req, res) {
    res.sendFile(__dirname + "/blog7.html");
})

//LOGIN----------------------------------------------------------------------------------------------------
app.post("/login", function (req, res) {
    res.sendFile(__dirname + "/login.html");
})

//Register------------------------------------------------------------------------------------------------
app.post("/register", function (req, res) {
    res.sendFile(__dirname + "/register.html");
})

//Location--------------------------------------------------------------------------------------------------

var userId = 10000;
app.post("/location", function (req, res) {
    res.sendFile(__dirname + "/location.html");
    app.post("/getlocation", function (req, res) {
        const { latitude, longitude } = req.body;
        let status = 'created';
        const value = [userId, latitude, longitude, status];
        const insertQuery = 'insert into information (id,latitude,longitude,status) values(?,?,?,?);';
        connection.query(insertQuery, value, (err, result) => {
            res.render("locationsuccess", { userId: userId });
            userId += 1;
        })
    })
})

//Tracking-----------------------------------------------------------------------------------------------------------
app.post("/tracking", function (req, res) {
    res.sendFile(__dirname + "/tracking.html");
    app.post("/trackingresult", function (req, res) {
        const req_name = req.body.reqid;
        const fetchData = 'select status from information where id = ?;';
        var result1;
        connection.query(fetchData, req_name, (er, result) => {
            result1 = result
            try {
                var temp = result1[0].status;
                res.render('trackingsuccess', { req_name: req_name, status: result1[0].status })
            }
            catch (err) {
                res.sendFile(__dirname + "/failure.html")
            }
        })

    })

    app.post("/failure", function (req, res) {
        res.sendFile(__dirname + "/home.html");
    })

})


//Conatct--------------------------------------------------------------------------------------------------------------
app.post("/contactus", function (req, res) {
    res.sendFile(__dirname + "/contact.html");
})

//about us-----------------------------------------------------------------------------------------------------------------
app.post("/aboutus", function (req, res) {
    res.sendFile(__dirname + "/aboutus.html");
})

//Port----------------------------------------------------------------------------------------------------------
app.listen(PORT, function () {
    console.log("server is runnig!!!!");
})