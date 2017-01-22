var http = require("http");
var client = require('twilio')('ACed20d8b1ee9e63bb3837285f53a82f16', 'cb76023ad776d2a2cd526a5a2ad404f1');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/glyphicons/js'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/success_message', function (req, res) {
    res.sendFile( __dirname + "/" + "success_message.html" );

    //res.send('Hello Message !!!');
})
app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
})





app.post('/send_message', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        phone_number:req.body.phone_number,
    };
    sendMessage(response.phone_number);

    res.redirect("/" + "success_message.html")
})

function sendMessage(phone_number) {
    var from_number = "+12345420399"
    var body_message = "";
    var time = new Date().getHours();

if (time > 6 && time < 12){
        body_message = "Good morning! Your promocode is AM123";
    } else {
        body_message = "Hello! Your promocode is PM456";
    };
/*    console.log(body_message);*/
    //Send an SMS text message
     client.messages.create({
     to: phone_number,
     from: from_number,
     body: body_message,
     }, function(err, message) {
     });
}



var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})















