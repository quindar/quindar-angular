// Program: coreAdmin.js
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
var Vehicle = require("../../server/models/vehicle");
//var should = chai.should();
var should = require('should');
var url = require('url');
chai.use(chaiHttp);
var supertest = require("supertest");
var server = supertest.agent("http://platform.audacy.space:7902");

// *** UNIT test begin ***//
// *** GET - REST API For Telemetry position ***//
describe('GET - REST API For Telemetry attitude by vehicleId and timestamp', function() {
    it('GET /services/v1/position', function(done) {
        server
            .get('/services/v1/position')
            .end(function(err, res){
                //console.log(res.should.have);
                res.should.be.json;
                res.body.should.have.property('status');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.message.should.equal("retrieve all position data points");
                res.body.message.should.not.equal("retrieve all attitude telemetry");
                done();
            });
    });
});

// *** GET - REST API For Telemetry vehicle by vehicleId and numberOfItems ***//

describe("GET - REST API For Telemetry vehicle by vehicleId and numberOfItems",function() {
    // #1 should return 200 success and checking data parameters and url params
    it("GET /services/v1/vehicle/:vehicleId/:numberOfItems", function (done) {
        var vehicle = new Vehicle({
            vehicleId: 'IBEX',
            nLimit:2
        });
        vehicle.save(function(err, data) {
            server
                .get("/services/v1/vehicle/"+ data.vehicleId + '/' + data.nLimit)
                .end(function (err, res) {
                    console.log (res.should.have);
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
                        res.body.data[dataLength].should.have.property("alertHigh");
                        res.body.data[dataLength].should.have.property("warnHigh");
                        res.body.data[dataLength].should.have.property("alertLow");
                        res.body.data[dataLength].should.have.property("warnLow");
                        res.body.data[dataLength].should.have.property("createdAt");

                    }
                    done();
                });

        });

    });
});