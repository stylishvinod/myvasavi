var databaseUrl = "mongodb://localhost:27017/todoApp";
var BUCKET_NAME = 'readytolearning';



var collections = ["models", "items","shops","events","committee","offers"];

var ObjectId  = require("mongodb").ObjectID;
var db = require("mongojs").connect(databaseUrl, collections);

var express = require('express');



var app = express();
var fs = require("fs");

var bodyParser = require('body-parser')
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/allModels/:modelFor', function(req, res) {
    var usersObj;
    console.log(req.params.modelFor);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.models.find({
        model_for: req.params.modelFor
    }, function(err, models) {
        if (err) throw err;

        res.send(models);
    });
    //	return exString;
});

app.get('/getPerticularEvent/:eventId', function(req, res) {
    var usersObj;
    console.log(req.params.modelFor);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.events.find({
        _id: ObjectId(req.params.eventId)
    }, function(err, event) {
        if (err) throw err;

        res.send(event);
    });
    //	return exString;
});

app.get('/listShops', function(req, res) {
    var shopObj;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.shops.find({
      "active" : "Y"
    }, function(err, shops) {
        if (err) throw err;
        shopObj = shops;
        res.send(shopObj);
    });
    //	return exString;
});

app.get('/shopInfo/:shopId', function(req, res) {
    var shopObj;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.shops.find({
        "_id": ObjectId(req.params.shopId)
    }, function(err, shops) {
        if (err) throw err;
        shopObj = shops;
        // object of all the users
        console.log(shopObj);
        res.send(shopObj);
    });
    //	return exString;
});


// Loading using modelId
app.get('/shopsUnderModel/:modelFor/:modelName', function(req, res) {
    var usersObj;
  //  console.log(req.params.modelId);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.shops.find({
      active : "Y",
        models_available :
                  {
                    $elemMatch :
                        {
                            model_for: req.params.modelFor,
                            models : {
                                $in :
                                    [
                                      req.params.modelName
                                    ]


                            }
                        }
                  }

    }, function(err, shopObj) {
        if (err) throw err;
        eachObj = shopObj;
        // object of all the users
        res.send(eachObj);
    });
    //	return exString;
});

app.get("/getEvents", function(request, response) {
    //var arr1 = itemIds.split(',')
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    db.events.find({
      "active" : "Y"
    }, function(err, eventObj) {
        if (err) throw err;
        response.send(eventObj);
    });

});
app.get("/getCommittee", function(request, response) {
    //var arr1 = itemIds.split(',')
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    db.committee.find( function(err, comminf) {
        if (err) throw err;
        response.send(comminf);
        console.log(comminf);
    });

});

app.get("/getOffers", function(request, response) {
    //var arr1 = itemIds.split(',')
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    db.offers.find( function(err, offerinf) {
        if (err) throw err;
        response.send(offerinf);
        console.log(offerinf);
    });

});
var server = app.listen(8080, 'localhost', function() {

    var host =  "localhost";//server.address().address
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);

});
