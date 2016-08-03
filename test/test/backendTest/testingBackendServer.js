// Program: coreAdmin.js
// Purpose: Testing using mocha
// Author:  Shalini Negi
// Updated: Jul 12, 2016
// License: MIT license

process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../server/app');
var Attitude = require("../server/models/attitude");
var should = chai.should();
var url = require('url');
chai.use(chaiHttp);

// *** UNIT test begin ***//
// *** GET - REST API For Telemetry position ***//
describe('GET - REST API For Telemetry attitude by vehicleId and timestamp', function() {      
    it('GET /services/v1/position', function(done) { 
       chai.request(server) 
        .get('/services/v1/position') 
        .end(function(err, res){ 
            console.log(res.should.have); 
            res.should.have.status(200); 
            res.should.be.json; 
            res.body.should.be.a('Object'); 
            res.body.should.have.property('status'); 
            res.body.should.have.property('message'); 
            res.body.should.have.property('data');
            res.body.message.should.equal("retrieve all position data points");
            res.body.message.should.not.equal("retrieve all attitude telemetry");
            done(); 
         }); 
    });     
 });

// *** GET - REST API For Telemetry attitude by vehicleId from time to time ***//
describe(" GET - REST API For Telemetry attitude by vehicleId and timestamp", function(){
    it("GET /services/v1/attitude/:vId/:fromTS/:toTS - should return 200",function(done){
        chai.request(server)
            .get("/services/v1/attitude/:vId/:fromTS/:toTS")
            .end(function(err,res){
                console.log (res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("retrieve all attitude data points");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                var url_parts = url.parse('/attitude?vId=IBEX&fromTime=10000&toTime=1457725800',true);
                var vehicle = url_parts.query.vId;
                var fromTime = url_parts.query.fromTime;
                var toTime = url_parts.query.toTime;
                //checking parameters -- This test will fail
                // res.body.data[0].vehicleId.should.equal(vehicle);
                done();
            });
    });
});

// *** GET - REST API For Telemetry attitude by vehicleId and numberOfItems ***//
/*
describe("GET - REST API For Telemetry attitude by vehicleId and numberOfItems",function() {

    // #1 should return 200 success and checking data parameters and url params
    it("GET /services/v1/attitude/:vId/:nLimit", function (done) {
        chai.request(server)
            .get("/services/v1/attitude/:vId/:nLimit")
            .end(function (err, res) {
                //console.log (res.should.have);
                // HTTP status should be 200
                res.status.should.equal(200);
                res.body.message.should.equal("retrieve all attitude data points");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                for(var dataLength=0; dataLength<res.body.data.length; dataLength++){
                    res.body.data[dataLength].should.have.property("_id");
                    res.body.data[dataLength].should.have.property("timestamp");
                    res.body.data[dataLength].should.have.property("vehicleId");
                    res.body.data[dataLength].should.have.property("q1");
                    res.body.data[dataLength].should.have.property("q2");
                    res.body.data[dataLength].should.have.property("q3");
                    res.body.data[dataLength].should.have.property("q4");
                    res.body.data[dataLength].should.have.property("__v");
                }
                //checking params
                var url_parts = url.parse('/attitude?vId=IBEX&nLimit=5',true);
                var vehicle = url_parts.query.vId;
                var numberOfItems = url_parts.query.nLimit;
                for(var dataLength=0; dataLength<res.body.data.length; dataLength++){
                    res.body.data[dataLength].vehicleId.should.equal(vehicle);
                }
                res.body.data.length.should.equal(parseInt(numberOfItems));
                done();
            });


    });

    // #2 404 error [Extreme cases where link is absent]
    it("GET /services/v1/attitude/:numberOfItems - should return 404",function(done){
        chai.request(server)
            .get("/services/v1/attitude/:nLimit")
            .end(function(err,res){
                res.status.should.equal(404);
                done();
            });
    });
    
    // #3 200 return all attitude data
    it("GET /services/v1/attitude - should return 200",function(done){
        chai.request(server)
            .get("/services/v1/attitude")
            .end(function(err,res){
                res.status.should.equal(200);
                //console.log (res.should.have);
                res.body.message.should.equal("retrieve all attitude data points");
                res.body.message.should.not.equal("retrieve all attitude telemetry");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                //failing test case --It should be XCOR Lynx
                // res.body.data[1000].vehicleId.should.equal('Orion MPCV');
                //failing test case -- It should be IBEX
                // res.body.data[1001].vehicleId.should.equal('XCOR Lynx');
                // res.body.data[1020].vehicleId.should.equal('ISRO OV');
                // res.body.data[1001].vehicleId.should.equal('XCOR Lynx');
                done();
            });
    });

});
*/

// *** POST - REST API For Telemetry attitude by vehicleId and numberOfItems ***//
describe("POST - REST API For Telemetry attitude by vehicleId and numberOfItems", function () {
    //#1 insert attitude data points by vehicleId limited by numberOfItems
    it("should return 200 and check all parameters", function (done) {
        chai.request(server)
            .post("/services/v1/attitude")
            .send({
                "vehicleId": "IBEX",
                "timestamp": 1468426687,
                "q1": 0.651781,
                "q2": -0.29526,
                "q3": -0.268266,
                "q4": 0.645009
            })
            .end(function (err, res) {
                console.log (res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("insert attitude data points");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("q1");
                res.body.data.q1.should.equal(0.651781);
                res.body.data.should.have.property("q2");
                res.body.data.q2.should.equal(-0.29526);
                res.body.data.should.have.property("q3");
                res.body.data.q3.should.equal(-0.268266);
                res.body.data.should.have.property("q4");
                res.body.data.q4.should.equal(0.645009);
                done();
            });
    });
});

// *** POST - REST API For Telemetry drop Attitude collection ***//
describe("POST - REST API For Telemetry drop Attitude collection",function () {
    //#1 drop Attitude collection
    it("POST /services/v1/admin/cleanup/attitude - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/admin/cleanup/attitude")
            .end(function (err, res) {
                // console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("attitude collection dropped");
                res.body.message.should.not.equal("retrieve all attitude");
                done();
            });
    });
});

// *** POST - REST API For Telemetry insert attitude data points ***//
describe("POST - REST API For Telemetry insert attitude data points",function () {
    //#1 insert attitude data
    it("POST /services/v1/attitude - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/attitude")
            .send({
                "vehicleId": "IBEX",
                "timestamp": 1457726400,
                "q1": 0.651781,
                "q2": -0.29526,
                "q3": -0.268266,
                "q4": 0.645009
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("insert attitude data points");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("q1");
                res.body.data.q1.should.equal(0.651781);
                res.body.data.should.have.property("q2");
                res.body.data.q2.should.equal(-0.29526);
                res.body.data.should.have.property("q3");
                res.body.data.q3.should.equal(-0.268266);
                res.body.data.should.have.property("q4");
                res.body.data.q4.should.equal(0.645009);
                done();
            });
    });
});

// *** POST - REST API For Telemetry send attitude data points to MQ ***//
describe("POST - REST API For Telemetry send attitude data points to MQ",function () {
    //#1 send attitude data points to MQ
    it("POST /services/v1/messaging/attitude/:topic - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/messaging/attitude/customer1.vehicle1.attitude")
            .send({
                "vehicleId": "IBEX",
                "timestamp": 1457726400,
                "q1": 0.651781,
                "q2": -0.29526,
                "q3": -0.268266,
                "q4": 0.645009
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send attitude data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all data attitude");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("q1");
                res.body.data.q1.should.equal(0.651781);
                res.body.data.should.have.property("q2");
                res.body.data.q2.should.equal(-0.29526);
                res.body.data.should.have.property("q3");
                res.body.data.q3.should.equal(-0.268266);
                res.body.data.should.have.property("q4");
                res.body.data.q4.should.equal(0.645009);
                done();
            });
    });

    //#2 send attitude data points to MQ
    it("POST /services/v1/messaging/attitude/:topic - should return 200",function(done){
        chai.request(server)
            .post("/services/v1/messaging/attitude/audacy.telemetry.attitude")
            .send({"vehicleId": "IBEX","timestamp" : 1457726400, "q1":0.651781, "q2": -0.29526, "q3": -0.268266, "q4": 0.645009 })
            .end(function(err,res){
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send attitude data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all data attitude");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("q1");
                res.body.data.q1.should.equal(0.651781);
                res.body.data.should.have.property("q2");
                res.body.data.q2.should.equal(-0.29526);
                res.body.data.should.have.property("q3");
                res.body.data.q3.should.equal(-0.268266);
                res.body.data.should.have.property("q4");
                res.body.data.q4.should.equal(0.645009);
                done();
            });
    });
});

// *** GET - REST API For Telemetry orbit by vehicleId and numberOfItems ***//
describe("GET - REST API For Telemetry orbit by vehicleId and numberOfItems",function() {
    // #1 should return 200 success and checking data parameters and url params
    it("GET /services/v1/orbit/:vehicleId/:numberOfItems", function (done) {
        chai.request(server)
            .get("/services/v1/orbit/:vId/:fromTS/:toTS")
            .end(function (err, res) {
                //console.log (res.should.have);
                // HTTP status should be 200
                res.status.should.equal(200);
                res.body.message.should.equal("retrieve all orbit data points");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                for (var dataLength = 0; dataLength < res.body.data.length; dataLength++) {
                    res.body.data[dataLength].should.have.property("_id");
                    res.body.data[dataLength].should.have.property("timestamp");
                    res.body.data[dataLength].should.have.property("vehicleId");
                    res.body.data[dataLength].should.have.property("trajectory");
                    res.body.data[dataLength].should.have.property("__v");
                }
                done();
            });

    });
});

// *** POST - REST API For Telemetry drop Orbit collection ***//
describe("POST - REST API For Telemetry drop Orbit collection",function () {
    //#1 drop orbit collection
    it("POST /services/v1/admin/cleanup/orbit - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/admin/cleanup/orbit")
            .end(function (err, res) {
                // console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("orbit collection dropped");
                res.body.message.should.not.equal("retrieve all attitude");
                done();
            });
    });
});

describe("GET - REST API For Telemetry orbit",function() {
    // #1 should return 200 success and checking data parameters and url params
    it("GET /services/v1/orbit", function (done) {
        chai.request(server)
            .get("/services/v1/orbit")
            .end(function (err, res) {
                //console.log (res.should.have);
                // HTTP status should be 200
                res.status.should.equal(200);
                res.body.message.should.equal("retrieve all orbit data points");
                res.body.message.should.not.equal("retrieve all attitude data points");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                for (var dataLength = 0; dataLength < res.body.data.length; dataLength++) {
                    res.body.data[dataLength].should.have.property("_id");
                    res.body.data[dataLength].should.have.property("timestamp");
                    res.body.data[dataLength].should.have.property("vehicleId");
                    res.body.data[dataLength].should.have.property("trajectory");
                }
                done();
            });
    });
});

// *** POST - REST API For Telemetry send orbit trajectory data points to MQ ***//
describe("POST - REST API For Telemetry send orbit data points to MQ",function () {
    //#1 send orbit data points to MQ
    it("POST /services/v1/messaging/orbit/:topic - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/messaging/orbit/customer1.vehicle1.attitude")
            .send({"vehicleId": "IBEX", "timestamp": 1457726400, "_id": "56f315e98caf28f687483230"})
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send orbit data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all data attitude");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.timestamp.should.equal(1457726400);
                res.body.data.should.have.property("_id");
                res.body.data._id.should.equal("56f315e98caf28f687483230");
                done();
            });
    });
    //#2 send orbit data points to MQ
    it("POST /services/v1/messaging/orbit/:topic - should return 200",function(){
        chai.request(server)
            .post("/services/v1/messaging/orbit/audacy.telemetry.attitude")
            .send({"vehicleId": "IBEX","timestamp" : 1457726400, "_id":"56f315e98caf28f687483230"})
            .end(function(err,res){
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send attitude data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all data attitude");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.timestamp.should.equal(1457726400);
                res.body.data.should.have.property("_id");
                res.body.data._id.should.equal("56f315e98caf28f687483230");
                done();
            });
    });

});

// *** POST - REST API For Telemetry send to MQ with numberOfItems of orbit trajectory data points ***//

describe("POST - REST API For Telemetry send to MQ with numberOfItems of orbit trajectory data points",function () {
    //#1 send orbit data points to MQ
    it("POST /services/v1/simulation/messaging/orbit/:topic/:numberOfItems", function (done) {
        chai.request(server)
            .post("/services/v1/simulation/messaging/orbit/audacy.telemetry.orbit/1")
            .send({
                "vehicleId": "IBEX", "timestamp": 1457726400, "trajectory": [[0.5881086154608056,
                    0.9237339675461108]]
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("generate test orbit data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all data attitude");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("trajectory");
                done();
            });
    });

    //#2 send orbit data points to MQ
    it("POST /services/v1/simulation/messaging/orbit/:topic/:numberOfItems - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/simulation/messaging/orbit/customer1.vehicle1.orbit/1")
            .send({
                "vehicleId": "IBEX", "timestamp": 1457726400, "trajectory": [[0.5881086154608056,
                    0.9237339675461108]]
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("generate test orbit data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all data attitude");
                res.body.data.should.have.property("vehicleId");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("trajectory");
                done();
            });
    });
});

// *** GET - REST API For Telemetry position from time to time***//
describe(" GET - REST API For Telemetry position by vehicleId and timestamp", function(){
    it("should return 200",function(done){
        chai.request(server)
            .get("/services/v1/position/:vId/:fromTS/:toTS")
            .end(function(err,res){
                //  console.log (res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("retrieve all position data points");
                res.body.message.should.not.equal("retrieve all attitude data points");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                var url_parts = url.parse('/attitude?vehicleId=IBEX&fromTime=1457726339&toTime=1457726340',true);
                var vehicle = url_parts.query.vehicleId;
                var fromTime = url_parts.query.fromTime;
                var toTime = url_parts.query.toTime;
                //checking parameters
                for(var dataLength=0; dataLength<res.body.data.length; dataLength++){
                    res.body.data[dataLength].vehicleId.should.equal(vehicle);
                    res.body.data[dataLength].timestamp.should.be.within(fromTime,toTime);
                }
                done();
            });
    });
});

// *** GET - REST API For Telemetry position***//
describe(" GET - REST API For Telemetry position by vehicleId and timestamp", function(){
    it("should return 200",function(done){
        chai.request(server)
            .get("/services/v1/position")
            .end(function(err,res){
                //  console.log (res.should.have);
                res.status.should.equal(200);
                //console.log (res.should.have);
                res.body.message.should.equal("retrieve all position data points");
                res.body.message.should.not.equal("retrieve all attitude telemetry");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                //failing test case --It should be XCOR Lynx
                //res.body.data[1000].vehicleId.should.equal('Orion MPCV');
                // failing test case -- It should be IBEX
                // res.body.data[1001].vehicleId.should.equal('XCOR Lynx');
                // res.body.data[1020].vehicleId.should.equal('ISRO OV');
                //  res.body.data[1001].vehicleId.should.equal('XCOR Lynx');
                done();
            });
    });
});

// *** POST - REST API For Telemetry drop Position collection ***//
describe("POST - REST API For Telemetry drop Position collection",function () {
    //#1 drop Position collection
    it("POST /services/v1/admin/cleanup/position - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/admin/cleanup/position")
            .end(function (err, res) {
                // console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("position collection dropped");
                res.body.message.should.not.equal("retrieve all attitude");
                done();
            });
    });
});

// *** GET - REST API For Telemetry position ***//
describe("GET - REST API For Telemetry position",function() {
    // #1 200 return all attitude data
    it("GET /services/v1/position - should return 200",function(done){
        chai.request(server)
            .get("/services/v1/position")
            .end(function(err,res){
                res.status.should.equal(200);
                console.log (res.should.have);
                res.body.message.should.equal("retrieve all position data points");
                res.body.message.should.not.equal("retrieve all attitude data points");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                done();
            });
    });
});

// *** POST - REST API For Telemetry upsert position data points ***//
describe("POST - REST API For Telemetry insert position data points",function () {
    //#1 insert position data
    it("POST /services/v1/position - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/position")
            .send({
                "_id": "56f3123e8caf28f687480f42", "vehicleId": "IBEX", "timestamp": 1457726400,
                "x": 236294.1956, "y": 116196.8879, "z": -34379.67682, "vx": -0.675287, "vy": 0.508343, "vz": 0.434496
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("insert all position data points");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.data.should.have.property("_id");
                res.body.data._id.should.equal("56f3123e8caf28f687480f42");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("x");
                res.body.data.x.should.equal(236294.1956);
                res.body.data.should.have.property("y");
                res.body.data.y.should.equal(116196.8879);
                res.body.data.should.have.property("z");
                res.body.data.z.should.equal(-34379.67682);
                res.body.data.should.have.property("vx");
                res.body.data.vx.should.equal(-0.675287);
                res.body.data.should.have.property("vy");
                res.body.data.vy.should.equal(0.508343);
                res.body.data.should.have.property("vz");
                res.body.data.vz.should.equal(0.434496);
                done();
            });
    });
});

// *** POST - REST API For Telemetry send position data points to MQ ***//

describe("POST - REST API For Telemetry send position data points to MQ",function () {
    //#1 send position data points to MQ
    it("POST /services/v1/messaging/position/:topic - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/messaging/position/customer1.vehicle1.attitude")
            .send({
                "_id": "56f3123e8caf28f687480f42", "vehicleId": "IBEX", "timestamp": 1457726400,
                "x": 236294.1956, "y": 116196.8879, "z": -34379.67682, "vx": -0.675287, "vy": 0.508343, "vz": 0.434496
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send position data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.data.should.have.property("_id");
                res.body.data._id.should.equal("56f3123e8caf28f687480f42");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.timestamp.should.equal(1457726400);
                res.body.data.should.have.property("x");
                res.body.data.x.should.equal(236294.1956);
                res.body.data.should.have.property("y");
                res.body.data.y.should.equal(116196.8879);
                res.body.data.should.have.property("z");
                res.body.data.z.should.equal(-34379.67682);
                res.body.data.should.have.property("vx");
                res.body.data.vx.should.equal(-0.675287);
                res.body.data.should.have.property("vy");
                res.body.data.vy.should.equal(0.508343);
                res.body.data.should.have.property("vz");
                res.body.data.vz.should.equal(0.434496);
                done();
            });
    });

    //#2 send position data points to MQ
    it("POST /services/v1/messaging/position/:topic - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/messaging/position/audacy.telemetry.attitude")
            .send({
                "_id": "56f3123e8caf28f687480f42", "vehicleId": "IBEX", "timestamp": 1457726400,
                "x": 236294.1956, "y": 116196.8879, "z": -34379.67682, "vx": -0.675287, "vy": 0.508343, "vz": 0.434496
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send position data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.data.should.have.property("_id");
                res.body.data._id.should.equal("56f3123e8caf28f687480f42");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.timestamp.should.equal(1457726400);
                res.body.data.should.have.property("x");
                res.body.data.x.should.equal(236294.1956);
                res.body.data.should.have.property("y");
                res.body.data.y.should.equal(116196.8879);
                res.body.data.should.have.property("z");
                res.body.data.z.should.equal(-34379.67682);
                res.body.data.should.have.property("vx");
                res.body.data.vx.should.equal(-0.675287);
                res.body.data.should.have.property("vy");
                res.body.data.vy.should.equal(0.508343);
                res.body.data.should.have.property("vz");
                res.body.data.vz.should.equal(0.434496);
                done();
            });
    });
});

// *** GET - REST API For Telemetry vehicle by vehicleId from time to time ***//

describe(" GET - REST API For Telemetry vehicle by vehicleId and timestamp", function(){
    it("should return 200",function(done){
        chai.request(server)
            .get("/services/v1/vehicle/:vId/:fromTS/:toTS")
            .end(function(err,res){
                //console.log (res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("retrieve all vehicle data points");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                var url_parts = url.parse('/vehicle?vId=IBEX&fromTS=1457726300&toTS=1457726400',true);
                var vehicle = url_parts.query.vId;
                var fromTime = url_parts.query.fromTS;
                var toTime = url_parts.query.toTS;
                //checking parameters
                for(var dataLength=0; dataLength<res.body.data.length; dataLength++){
                    res.body.data[dataLength].vehicleId.should.equal(vehicle);
                    res.body.data[dataLength].timestamp.should.be.within(fromTime,toTime);
                }
                done();
            });
    });
});


// *** GET - REST API For Telemetry vehicle by vehicleId and numberOfItems ***//
/*
describe("GET - REST API For Telemetry vehicle by vehicleId and numberOfItems",function() {
    // #1 should return 200 success and checking data parameters and url params
    it("GET /services/v1/vehicle/:vehicleId/:numberOfItems", function (done) {
        chai.request(server)
            .get("/services/v1/vehicle/:vId/:nLimit")
            .end(function (err, res) {
                //console.log (res.should.have);
                // HTTP status should be 200
                res.status.should.equal(200);
                res.body.message.should.equal("retrieve all vehicle data points");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                for (var dataLength = 0; dataLength < res.body.data.length; dataLength++) {
                    res.body.data[dataLength].should.have.property("_id");
                    res.body.data[dataLength].should.have.property("timestamp");
                    res.body.data[dataLength].should.have.property("vehicleId");
                    res.body.data[dataLength].should.have.property("value");
                    res.body.data[dataLength].should.have.property("calibrationFactor");
                    res.body.data[dataLength].should.have.property("uom");
                    res.body.data[dataLength].should.have.property("alertHigh");
                    res.body.data[dataLength].should.have.property("warnHigh");
                    res.body.data[dataLength].should.have.property("alertLow");
                    res.body.data[dataLength].should.have.property("warnLow");
                    res.body.data[dataLength].should.have.property("deviceId");

                }
                //checking params
                var url_parts = url.parse('/vehicle?vId=IBEX&nLimit=5', true);
                var vehicle = url_parts.query.vId;
                var numberOfItems = url_parts.query.nLimit;
                for (var dataLength = 0; dataLength < res.body.data.length; dataLength++) {
                    res.body.data[dataLength].vehicleId.should.equal(vehicle);
                }
                res.body.data.length.should.equal(parseInt(numberOfItems));
                done();
            });

    });
 });
 */

// *** POST - REST API For Telemetry vehicle ***//
describe("POST - REST API For Telemetry vehicle by vehicleId and numberOfItems", function () {
    //#1 insert position data points
    it("should return 500 and check all parameters", function (done) {
        chai.request(server)
            .post("/services/v1/vehicle")
            .send({
                "_id": "56f3123e8caf28f687480f42", "vehicleId": "IBEX", "timestamp": 1457726400,
                "value": 315, "calibrationFactor": "T = 3*x - 4*x^2 + 2", "uom": "Kelvin", "alertHigh": 330,
                "warnHigh": 321, "alertLow": 280, "warnLow": 274, "deviceId": "Battery01Temp"
            })
            .end(function (err, res) {
                console.log (res.should.have);
                console.log (res.should.have);
                res.status.should.equal(500);
                res.body.message.should.equal("Cannot insert vehicle data points due to internal system error");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("type");
                res.body.should.have.property("error");
                done();
            });
    });
});

// *** POST - REST API For Telemetry drop Vehicle collection ***//
describe("POST - REST API For Telemetry drop Vehicle collection",function () {
    //#1 drop Vehicle collection
    it("POST /services/v1/admin/cleanup/vehicle - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/admin/cleanup/vehicle")
            .end(function (err, res) {
                // console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("vehicle collection dropped");
                res.body.message.should.not.equal("retrieve all attitude");
                done();
            });
    });
});

// *** POST - REST API For Telemetry upsert vehicle data points ***//
describe("POST - REST API For Telemetry insert vehicle data points",function () {
    //#1 insert vehicle data
    it("POST /services/v1/vehicle - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/vehicle")
            .send({
                "_id": "56f3123e8caf28f687480f42", "vehicleId": "IBEX", "timestamp": 1457726400,
                "value": 315, "calibrationFactor": "T = 3*x - 4*x^2 + 2", "uom": "Kelvin", "alertHigh": 330,
                "warnHigh": 321, "alertLow": 280, "warnLow": 274, "deviceId": "Battery01Temp"
            })
            .end(function (err, res) {
                console.log (res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("insert vehicle data points");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("data");
                res.body.data.should.have.property("vehicleId");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.should.have.property("value");
                res.body.data.value.should.equal(315);
                res.body.data.should.have.property("calibrationFactor");
                res.body.data.calibrationFactor.should.equal("T = 3*x - 4*x^2 + 2");
                res.body.data.should.have.property("uom");
                res.body.data.uom.should.equal("Kelvin");
                res.body.data.should.have.property("alertHigh");
                res.body.data.alertHigh.should.equal(330);
                res.body.data.should.have.property("warnHigh");
                res.body.data.warnHigh.should.equal(321);
                res.body.data.should.have.property("alertLow");
                res.body.data.alertLow.should.equal(280);
                res.body.data.should.have.property("warnLow");
                res.body.data.warnLow.should.equal(274);
                res.body.data.should.have.property("deviceId");
                res.body.data.deviceId.should.equal("Battery01Temp");
                done();
            });
    });

});

// *** POST - REST API For Telemetry send vehicle data points to MQ ***//
describe("POST - REST API For Telemetry send vehicle data points to MQ",function () {
    //#1 send vehicle data points to MQ
    it("POST /services/v1/messaging/vehicle/:topic - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/messaging/position/customer1.vehicle1.attitude")
            .send({
                "_id": "56f3123e8caf28f687480f42", "vehicleId": "IBEX", "timestamp": 1457726400,
                "value": 315, "calibrationFactor": "T = 3*x - 4*x^2 + 2", "uom": "Kelvin", "alertHigh": 330,
                "warnHigh": 321, "alertLow": 280, "warnLow": 274, "deviceId": "Battery01Temp"
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send position data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.data.should.have.property("_id");
                res.body.data._id.should.equal("56f3123e8caf28f687480f42");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.timestamp.should.equal(1457726400);
                res.body.data.should.have.property("value");
                res.body.data.value.should.equal(315);
                res.body.data.should.have.property("calibrationFactor");
                res.body.data.calibrationFactor.should.equal("T = 3*x - 4*x^2 + 2");
                res.body.data.should.have.property("uom");
                res.body.data.uom.should.equal("Kelvin");
                res.body.data.should.have.property("alertHigh");
                res.body.data.alertHigh.should.equal(330);
                res.body.data.should.have.property("warnHigh");
                res.body.data.warnHigh.should.equal(321);
                res.body.data.should.have.property("alertLow");
                res.body.data.alertLow.should.equal(280);
                res.body.data.should.have.property("warnLow");
                res.body.data.warnLow.should.equal(274);
                res.body.data.should.have.property("deviceId");
                res.body.data.deviceId.should.equal("Battery01Temp");
                done();
            });
    });

    //#2 send vehicle data points to MQ
    it("POST /services/v1/messaging/vehicle/:topic - should return 200", function (done) {
        chai.request(server)
            .post("/services/v1/messaging/vehicle/audacy.telemetry.attitude")
            .send({
                "_id": "56f3123e8caf28f687480f42", "vehicleId": "IBEX", "timestamp": 1457726400,
                "value": 315, "calibrationFactor": "T = 3*x - 4*x^2 + 2", "uom": "Kelvin", "alertHigh": 330,
                "warnHigh": 321, "alertLow": 280, "warnLow": 274, "deviceId": "Battery01Temp"
            })
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("send vehicle data points to Audacy message queue");
                res.body.message.should.not.equal("retrieve all attitude");
                res.body.data.should.have.property("_id");
                res.body.data._id.should.equal("56f3123e8caf28f687480f42");
                res.body.data.vehicleId.should.equal("IBEX");
                res.body.data.should.have.property("timestamp");
                res.body.data.timestamp.should.equal(1457726400);
                res.body.data.should.have.property("value");
                res.body.data.value.should.equal(315);
                res.body.data.should.have.property("calibrationFactor");
                res.body.data.calibrationFactor.should.equal("T = 3*x - 4*x^2 + 2");
                res.body.data.should.have.property("uom");
                res.body.data.uom.should.equal("Kelvin");
                res.body.data.should.have.property("alertHigh");
                res.body.data.alertHigh.should.equal(330);
                res.body.data.should.have.property("warnHigh");
                res.body.data.warnHigh.should.equal(321);
                res.body.data.should.have.property("alertLow");
                res.body.data.alertLow.should.equal(280);
                res.body.data.should.have.property("warnLow");
                res.body.data.warnLow.should.equal(274);
                res.body.data.should.have.property("deviceId");
                res.body.data.deviceId.should.equal("Battery01Temp");
                done();
            });
    });
});

// *** GET - REST API For System heartbeat- verify if system is alive ***//

describe(" GET - REST API For System heartbeat- verify if system is alive", function() {
    //#1 should return 200
    it("should return 200", function (done) {
        chai.request(server)
            .get("/verifyMe")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("Quindar platform is alive");
                res.body.message.should.not.equal("retrieve all metrics");
                res.body.should.have.property("message");
                done();
            });
    });
});