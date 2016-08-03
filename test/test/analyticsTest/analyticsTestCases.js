// Program: analyticsTestCases.js
// Purpose: Testing using mocha
// Author:  Shalini Negi
// Updated: Jul 12, 2016
// License: MIT license

process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../../server/app');
var Attitude = require("../../server/models/attitude");
var Position = require("../../server/models/position");
var should = chai.should();
var url = require('url');
chai.use(chaiHttp);
var supertest = require("supertest");
var server = supertest.agent("http://platform.audacy.space:7902");

// *** UNIT test begin ***//
// *** GET - REST API For Analytics - attitude metrics by time period  ***//

describe(" GET - REST API For Analytics attitude by vehicleId and timestamp", function(){
    it("GET /services/v1/admin/metrics/attitude/total/:vehicleId/:fromTS/:toTS should return 200",function(done){
        server
            .get("/services/v1/admin/metrics/attitude/total/:vehicleId/:fromTS/:toTS")
            .end(function(err,res){
                console.log (res.should.have);
                res.status.should.equal(300);
                res.body.message.should.equal("User-related error encountered");
                res.body.message.should.not.equal("retrieve all attitude metrics");
                res.body.should.have.property("message");
                res.body.should.have.property("status");
                res.body.should.have.property("type");
                res.body.should.have.property("error");
                done();
            });
    });
});

// *** GET - REST API For Analytics - attitude metrics total count  ***//
describe(" GET - REST API For Analytics attitude metrics total count", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/attitude/total/all - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/attitude/total/all")
            .end(function (err, res) {
                //console.log (res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("Quindar attitude metrics updated successfully.");
                res.body.message.should.not.equal("retrieve all attitude metrics");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.should.have.property("count");
                res.body.collection.should.equal("attitude");
                done();
            });
    });
});

// *** GET - REST API For Analytics - attitude usage trend by vehicleId ***//
describe(" GET - REST API For Analytics attitude usage trend", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/trend/attitude/by/:vehicleId - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/trend/attitude/by/:vehicleId")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("Quindar attitude metrics trending updated successfully.");
                res.body.message.should.not.equal("retrieve all attitude metrics");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.collection.should.equal("attitude");
                res.body.should.have.property("trend");
                done();
            });
    });
});

// *** GET - REST API For Analytics - orbit metrics by time period ***//
describe(" GET - REST API For Analytics orbit by vehicleId and timestamp", function(){
    it("should return 200",function(done){
        server
            .get("/services/v1/admin/metrics/orbit/total/:vehicleId")
            .end(function(err,res){
                console.log (res.should.have);
                res.status.should.equal(300);
                res.body.message.should.equal("Cannot find orbit data for vehicle id " + ':vehicleId');
                res.body.message.should.not.equal("retrieve all orbit metrics");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.collection.should.equal("orbit");
                done();
            });
    });
});

// *** GET - REST API For Analytics - orbit usage trend BY vehicleId and number of items ***//
describe(" GET - REST API For Analytics orbit usage trend", function() {
    // #1 500 should return all total count
    it("GET /services/v1/admin/metrics/trend/orbit/:vehicleId/:nLimit - should return 500", function (done) {
        server
            .get("/services/v1/admin/metrics/trend/orbit/:vehicleId/:nLimit")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(500);
                res.body.message.should.equal("Internal system error encountered");
                res.body.message.should.not.equal("retrieve all orbit metrics");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("type");
                done();
            });
    });
});


// *** GET - REST API For Analytics - orbit usage trend  ***//
describe(" GET - REST API For Analytics orbit metrics trend total count", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/trend/orbit/all - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/trend/orbit/all")
            .end(function (err, res) {
                console.log(res.should.have);
                res.body.message.should.equal("Quindar orbit metrics trending updated successfully.");
                res.body.message.should.not.equal("retrieve all orbit metrics");
                res.body.should.have.property("collection");
                res.body.should.have.property("trend");
                done();
            });
    });
});

// *** GET - REST API For Analytics - position usage trend by vehicleId ***//
describe(" GET - REST API For Analytics position usage trend", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/position/total/:vehicleId - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/position/total/:vehicleId")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(300);
                res.body.message.should.equal("Cannot find position data for vehicle id "+ ':vehicleId');
                res.body.message.should.not.equal("retrieve all position metrics");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.collection.should.equal("position");
                done();
            });
    });
});

// *** GET - REST API For Analytics - position metrics total count  ***//
describe(" GET - REST API For Analytics position metrics total count", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/position/total/all - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/position/total/all")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("Quindar position metrics updated successfully.");
                res.body.message.should.not.equal("retrieve all position metrics");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.should.have.property("count");
                res.body.collection.should.have.equal("position");
                done();
            });
    });
});

// *** GET - REST API For Analytics - position collection metrics trend  ***//
describe(" GET - REST API For Analytics position collection metrics trend", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/trend/position/all - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/trend/position/all")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("Quindar position metrics trending updated successfully.");
                res.body.message.should.not.equal("retrieve all position metrics");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.should.have.property("trend");
                res.body.collection.should.have.equal("position");
                done();
            });
    });
});

// *** GET - REST API For Analytics - vehicle collection metrics total count by vehicleId from/to time period  ***//
describe(" GET - REST API For Analytics vehicle collection metrics total count", function() {
    // #1 300 should return all total count
    it("GET /services/v1/admin/metrics/vehicle/total/:vehicleId/:fromTS/:toTS - should return 300", function (done) {
        server
            .get("/services/v1/admin/metrics/vehicle/total/:vehicleId/:fromTS/:toTS")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(300);
                res.body.message.should.equal("User-related error encountered");
                res.body.message.should.not.equal("retrieve all vehicle metrics");
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                res.body.should.have.property("type");
                res.body.should.have.property("error");
                done();
            });
    });

});

// *** GET - REST API For Analytics - vehicle metrics total count by vehicleId ***//
describe(" GET - REST API For Analytics vehicle metrics total count by vehicleId", function() {
    // #1 300 should return all total count
    it("/services/v1/admin/metrics/vehicle/total/:vehicleId - should return 300", function (done) {
        var vehicle = new Attitude({
            vehicleId: 'IBEX'
        });
        vehicle.save(function(err, data) {
            server
                .get("/services/v1/admin/metrics/vehicle/total/"+ data.vehicleId)
                .end(function (err, res) {
                    console.log(res.should.have);
                    res.status.should.equal(200);
                    res.body.message.should.equal("Quindar vehicle metrics updated successfully.");
                    res.body.message.should.not.equal("retrieve all vehicle metrics");
                    res.body.should.have.property("status");
                    res.body.should.have.property("message");
                    res.body.should.have.property("collection");
                    done();
                });
        });

    });
});

// *** GET - REST API For Analytics - vehicle usage trend by vehicleId nLimit  ***//
describe(" GET - REST API For Analytics vehicle usage trend by vehicleId nLimit", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/trend/vehicle/:vehicleId/:nLimit - should return 200", function (done) {
        var vehicle = new Attitude({
            vehicleId: 'IBEX',
            nLimit:2
        });
        vehicle.save(function(err, data) {
            server
                .get("/services/v1/admin/metrics/trend/vehicle/"+data.vehicleId+ '/'+ data.nLimit)
                .end(function (err, res) {
                    console.log(res.should.have);
                    res.status.should.equal(200);
                    res.body.message.should.equal("Quindar vehicle metrics trending updated successfully.");
                    res.body.message.should.not.equal("retrieve all vehicle metrics");
                    res.body.should.have.property("message");
                    res.body.should.have.property("collection");
                    res.body.should.have.property("trend");
                    res.body.collection.should.have.equal("vehicle");
                    done();
                });
        });
    });
});

// *** GET - REST API For Analytics - vehicle collection metrics trend  ***//
describe(" GET - REST API For Analytics vehicle collection metrics trend", function() {
    // #1 200 should return all total count
    it("GET /services/v1/admin/metrics/trend/vehicle/all - should return 200", function (done) {
        server
            .get("/services/v1/admin/metrics/trend/vehicle/all")
            .end(function (err, res) {
                console.log(res.should.have);
                res.status.should.equal(200);
                res.body.message.should.equal("Quindar vehicle metrics trending updated successfully.");
                res.body.message.should.not.equal("retrieve all vehicle metrics");
                res.body.should.have.property("message");
                res.body.should.have.property("collection");
                res.body.should.have.property("trend");
                res.body.collection.should.have.equal("vehicle");
                done();
            });
    });
});

// *** GET - REST API For Analytics - position usage trend by vehicleId nLimit  ***//
describe(" GET - REST API For Analytics position usage trend by vehicleId nLimit", function() {
    // #1 200 should return all position trend by vehicleId
    it("GET /services/v1/admin/metrics/trend/position/:vehicleId/:nLimit - should return 200", function (done) {
        var position = new Attitude({
            vehicleId: 'IBEX',
            nLimit:2
        });
        position.save(function(err, data) {
            server
                .get("/services/v1/admin/metrics/trend/position/"+ data.vehicleId + '/'+ data.nLimit)
                .end(function (err, res) {
                    console.log(res.should.have);
                    res.status.should.equal(200);
                    res.body.message.should.equal("Quindar position metrics trending updated successfully.");
                    res.body.message.should.not.equal("retrieve all position metrics");
                    res.body.should.have.property("message");
                    res.body.should.have.property("collection");
                    res.body.should.have.property("trend");
                    res.body.collection.should.have.equal("position");
                    done();
                });
        });

    });
});