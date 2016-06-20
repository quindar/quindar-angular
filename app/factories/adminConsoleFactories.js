// Program: adminConsoleDirectives.js
// Purpose: AngularJS router for quindar dashboard
// Author:  Ray Lai
// Updated: Jun 13, 2016
// License: MIT license

// AngularJS module definition
// Remark: 6/13/2016  Promise $q is added here, but not used yet
'use strict';
app.factory('adminFactory', ['$http', '$q', function($http, $q) {
  var admFactory = {};

  // ------ Category:  random data generation ----------

  // return a valid satellite vehicle identifier
  // remark: this function returns static, pre-defined satellite vehicles for testing purpose.
  //         we will change to a dynamic lookup function when we need to add/change vehicle ids dynamically
  admFactory.getVehicleId = function() {
    var vehicles = ["IBEX", "CST-100 Starliner", "Orion MPCV", "Dream Chaser CRS-2", "ISRO OV",
      "Skylon D1", "XCOR Lynx", "SIRIUS-1", "ISS (ZARYA)"];
    var x = Math.round((Math.random() * vehicles.length) - 1);
    return vehicles[x];
  };

  // return a set of random generated attitude quaterion data points (q1, q2, q3, q4)
  admFactory.generateAttitude = function() {
    const high = 0.999999;
    const low = -0.000001;
    var testData= {};

    var q1 =  Math.random() * (high - low) + low;
    var q2 =  Math.random() * (high - low) + low;
    var q3 =  Math.random() * (high - low) + low;
    var q4 =  Math.random() * (high - low) + low;
    var timestamp = Math.floor(new Date() / 1000);

    var vehicleId1 = admFactory.getVehicleId();

    testData = { "vehicleId": vehicleId1, "q1": Number(q1.toFixed(6)), "q2": Number(q2.toFixed(6)),
      "q3": Number(q3.toFixed(6)), "q4": Number(q4.toFixed(6)), "timestamp": timestamp};
    return testData;
  };

  // return a set of random generated satellite positions (x, y, z, velocity vx, 
  //   velocity vy, velocity vz)
  admFactory.generatePosition = function() {
    const high = 400000.0;
    const low = -400000.0;
    const velocityLow = 20.0;
    const velocityHigh = -20.0;
    var testData = {};

    var x = Math.random() * (high - low) + low;
    var y = Math.random() * (high - low) + low;
    var z = Math.random() * (high - low) + low;
    var vx = Math.random() * (velocityHigh - velocityLow) + velocityLow;
    var vy = Math.random() * (velocityHigh - velocityLow) + velocityLow;
    var vz = Math.random() * (velocityHigh - velocityLow) + velocityLow;
    var timestamp = Math.floor(new Date() / 1000);
    var vehicleId2 = admFactory.getVehicleId();

    testData = { "vehicleId": vehicleId2, "x": Number(x.toFixed(4)), "y": Number(y.toFixed(4)), "z": Number(z.toFixed(4)), "vx": Number(vx.toFixed(6)), "vy": Number(vy.toFixed(6)), "vz": Number(vz.toFixed(6)),
      "timestamp": timestamp };
    return testData;
  };

  // return a set of randomi generated satellite vehicle sensor readings
  //    including sensor id, sensor value, alert high, alert low, warning high, warning low,
  //    and calibration formula 
  admFactory.generateVehicle = function() {
    const high = 500.9999;
    const low = -500.9999;
    var testData = {};
   
    var calibrationHigh = 0.99999;
    var calibrationLow = -0.99999;
    var vehicleId3 = admFactory.getVehicleId();

    var vehicleValue = Math.random() * (high - low) + low;
    var alertHigh = (Math.random() * (high - low) + low) * 1.12;
    var alertLow = (Math.random() * (high - low) + low) * 0.85;
    var warnHigh = (Math.random() * (high - low) + low) * 1.09;
    var warnLow = (Math.random() * (high - low) + low) * 0.92;
    var uom = "Kevin";
    var calibrationFactor = (Math.random() * (calibrationHigh - calibrationLow) + calibrationLow).toString();
    var deviceId = "Battery-" + Math.random().toString(36).substring(3);
    var timestamp = Math.floor(new Date() / 1000);

    testData = { "vehicleId": vehicleId3, "value": vehicleValue, "uom": uom, "alertHigh": alertHigh, "alertLow": alertLow, "warnHigh": warnHigh, "warnLow": warnLow, "calibrationFactor": calibrationFactor,
        "deviceId": deviceId, "timestamp": timestamp };
    return testData;
  };

  // return a set of random generated orbit trajectory. default shows 350 data points in an array
  // remark: this sine wave-like trajectory is for demo or testing only. normally,
  //   orbit trajectory is calculated based on sallite positions
  admFactory.generateOrbit = function() {
    const initX = Math.random() * 0.2;
    const initY = Math.random() * 0.3;
    const nTimes = 350;
    var vehicleId4 = admFactory.getVehicleId();
    var timestamp = Math.floor(new Date() / 1000);
    var testData = {};

    var nData = [];
    var x = initX, y = initY; 

    for (var i=0; i < nTimes; i++) {
      x = x + 7 * Math.random() * 0.3 ;
      y = 45 * Math.sin(2 * x / 180 * Math.PI);
      nData.push([x, y]);
    }
    testData = { "vehicleId": vehicleId4, "orbit": nData, "timestamp": timestamp };
    return testData;
  };

  // ------ Category: Database ----------
  // retrieve all attitude data
  admFactory.getAttitudeAll = function() {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/attitude';
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getAttitudeAll() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
      console.error('Sorry, Quindar platform cannot serve admFactory.getAttitudeAll() immediately. Please retry later.');
    });
  };

  // retrieve attitude data by vehicleId, limited by nItems rows
  admFactory.getAttitudePartial = function(vehicleId, nItems) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/attitude/' + vehicleId
      + '/' + nItems;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getAttitudePartial() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
      console.error('Sorry, Quindar platform cannot serve admFactory.getAttitudePartial() immediately. Please retry later.');
    });
  };

  // retrieve attitude data by vehicleId within a time period fromTS to toTS
  admFactory.getAttitudeFromTo = function(vehicleId, fromTS, toTS) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/attitude/' + vehicleId
      + '/' + fromTS + '/' + toTS;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getAttitudePartial() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
      console.error('Sorry, Quindar platform cannot serve admFactory.getAttitudePartial() immediately. Please retry later.');
    });
  };

  // retrieve all position data
  admFactory.getPositionAll = function() {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/position';
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getPositionAll() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getPositionAll() immediately. Please retry later.');
    });
  };

  // retrieve position data by vehicleId, limited by nItems rows
  admFactory.getPositionPartial = function(vehicleId, nItems) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/position/' + vehicleId
      + '/' + nItems;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getPositionPartial() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getPositionPartial() immediately. Please retry later.');
    });
  };

  // retrieve position data by vehicleId within a time period fromTS to toTS
  admFactory.getPositionFromTo = function(vehicleId, fromTS, toTS) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/position/' + vehicleId
      + '/' + fromTS + '/' + toTS;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getPositionFromTo() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getPositionFromTo() immediately. Please retry later.');
    });
  };

  // retrieve all vehicle data
  admFactory.getVehicleAll = function() {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/vehicle';
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getVehicleAll() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getVehicleAll() immediately. Please retry later.');
    });
  };

  // retrieve vehicle data by vehicleId, limited by nItems rows
  admFactory.getVehiclePartial = function(vehicleId, nItems) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/vehicle/' + vehicleId
      + '/' + nItems;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getVehiclePartial() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getVehiclePartial() immediately. Please retry later.');
    });
  };

  // retrieve vehicle data by vehicleId within a time period fromTS to toTS
  admFactory.getVehicleFromTo = function(vehicleId, fromTS, toTS) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/vehicle/' + vehicleId
      + '/' + fromTS + '/' + toTS;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getVehicleFromTo() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getVehicleFromTo() immediately. Please retry later.');
    });
  };

  // retrieve all orbit trajectory data
  admFactory.getOrbitAll = function() {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/orbit';
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getOrbitAll () response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getOrbitAll() immediately. Please retry later.');
    });
  };

  // retrieve orbit trajectory data by vehicleId, limited by nItems rows
  admFactory.getOrbitPartial = function(vehicleId, nItems) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/orbit/' + vehicleId
      + '/' + nItems;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getOrbitPartial() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getOrbitPartial() immediately. Please retry later.');
    });
  };

  // retrieve orbit trajectory data by vehicleId within a time period fromTS to toTS
  admFactory.getOrbitFromTo = function(vehicleId, fromTS, toTS) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/orbit/' + vehicleId
      + '/' + fromTS + '/' + toTS;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getOrbitFromTo() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getOrbitFromTo() immediately. Please retry later.');
    });
  };

  // upsert attitude data point
  admFactory.postAttitude = function(vehicleId, q1, q2, q3, q4) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/attitude';
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "q1": q1, "q2": q2, "q3": q3, "q4": q4
      }
    )
    .success(function(response) {
      console.log("admFactory.postAttitude() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postAttitude() immediately. Please retry later.');
    });
  };

  // upsert position data point
  admFactory.postPosition = function(vehicleId, x, y, z, vx, vy, vz) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/position';
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "x": x, "y": y, "z": z, "vx": vx, "vy": vy, "vz": vz
      }
    )
    .success(function(response) {
      console.log("admFactory.postPosition() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postPosition() immediately. Please retry later.');
    });
  };

  // upsert vehicle data point
  admFactory.postVehicle = function(vehicleId, deviceId, value, uom, alertHigh, warnHigh, 
    alertLow, warnLow, calibrationFactor) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/vehicle';
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "deviceId": deviceId, "value": value, "uom": uom,
        "alertHigh": alertHigh, "warnHigh": warnHigh, "alertLow": alertLow, "warnLow": warnLow,
        "calibrationFactor": calibrationFactor
      }
    )
    .success(function(response) {
      console.log("admFactory.postVehicle() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postVehicle() immediately. Please retry later.');
    });
  };

 // upsert orbit data point
  admFactory.postOrbit = function(vehicleId, trajectory) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/orbit';
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "trajectory": trajectory
      }
    )
    .success(function(response) {
      console.log("admFactory.postOrbit() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postOrbit() immediately. Please retry later.');
    });
  };

  // generate simulated attitude data point @ nItems
  admFactory.generateAttitudeSimulated = function(nTimes) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/attitude/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generateAttitudeSimulated() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generateAttitudeSimulated() immediately. Please retry later.');
    })
  };

  // generate simulated position data point @ nItems
  admFactory.generatePositionSimulated = function() {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/position/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generatePositionSimulated() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generatePositionSimulated() immediately. Please retry later.');
    });
  };

  // generate simulated vehicle data point @ nItems
  admFactory.generateVehicleSimulated = function() {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/vehicle/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generateVehicleSimulated() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generateVehicleSimulated() immediately. Please retry later.');
    });
  };

  // generate simulated orbit data point @ nItems
  admFactory.generateOrbitSimulated = function() {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/orbit/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generateOrbitSimulated() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generateOrbitSimulated() immediately. Please retry later.');
    });
  };

  // ------ Category: Message Queue ----------
  // generate test data to MQ
  // generate simulated attitude data point @ nItems for RabbitMQ
  admFactory.generateAttitudeSimulatedMQ = function(topic, nTimes) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/messaging/attitude/'
       + topic + '/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generateAttitudeSimulatedMQ() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generateAttitudeSimulatedMQ() immediately. Please retry later.');
    });
  };

  // generate simulated position data point @ nItems for RabbitMQ
  admFactory.generatePositionSimulatedMQ = function(topic, nTimes) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/messaging/position/'
       + topic + '/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generatePositionSimulated() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generatePositionSimulated() immediately. Please retry later.');
    });
  };

  // generate simulated vehicle data point @ nItems for RabbitMQ
  admFactory.generateVehicleSimulatedMQ = function(topic, nTimes) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/messaging/vehicle/'
       + topic + '/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generateVehicleSimulatedMQ() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generateVehicleSimulatedMQ() immediately. Please retry later.');
    });
  };

  // generate simulated orbit data point @ nItems for RabbitMQ
  admFactory.generateOrbitSimulatedMQ = function(topic, nTimes) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/simulation/messaging/orbit/'
       + topic + '/' + nTimes;
    return $http.post(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.generateOrbitSimulatedMQ() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.generateOrbitSimulatedMQ() immediately. Please retry later.');
    });
  };

  // write to MQ
  // post attitude data point using RabbitMQ
  admFactory.postAttitudeMQ = function(topic, vehicleId, q1, q2, q3, q4) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/messaging/attitude/'
       + topic;
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "q1": q1, "q2": q2, "q3": q3, "q4": q4
      }
    )
    .success(function(response) {
      console.log("admFactory.postAttitudeMQ() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postAttitudeMQ() immediately. Please retry later.');
    });
  };

 // upsert position data point using RabbitMQ
  admFactory.postPositionMQ = function(topic, vehicleId, x, y, z, vx, vy, vz) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/messaging/position/' +
      + topic;
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "x": x, "y": y, "z": z, "vx": vx, "vy": vy, "vz": vz
      }
    )
    .success(function(response) {
      console.log("admFactory.postPositionMQ() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postPositionMQ() immediately. Please retry later.');
    });
  };

  // upsert vehicle data point using RabbitMQ
  admFactory.postVehicleMQ = function(topic, vehicleId, deviceId, value, uom, alertHigh, warnHigh, 
    alertLow, warnLow, calibrationFactor) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/messaging/vehicle/' +
      + topic;
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "deviceId": deviceId, "value": value, "uom": uom,
        "alertHigh": alertHigh, "warnHigh": warnHigh, "alertLow": alertLow, "warnLow": warnLow,
        "calibrationFactor": calibrationFactor
      }
    )
    .success(function(response) {
      console.log("admFactory.postVehicleMQ() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postVehicleMQ() immediately. Please retry later.');
    });
  };

  // upsert orbit data point using RabbitMQ
  admFactory.postOrbitMQ = function(topic, vehicleId, trajectory) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/messaging/orbit/' + 
      + topic;
    return $http.post(serviceEndpoint,
      { "vehicleId": vehicleId,
        "trajectory": trajectory
      }
    )
    .success(function(response) {
      console.log("admFactory.postOrbitMQ() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.postOrbitMQ() immediately. Please retry later.');
    });
  };

  // ------ Category: Database administration ----------
  // clean up database collections
  // collectionName values allowed:  attitude, position, vehicle, orbit
  admFactory.cleanupDBCollection = function(collectionName) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/admin/cleanup/' + 
      + collectionName;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.cleanupDBCollection() response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.cleanupDBCollection() immediately. Please retry later.');
    });
  };

  // ------ Category: Data analytics ----------
  // get metrics total by telemetry data types (e.g. attitude, position, vehicle)
  // valid telemetryDataType value: attitude, position, vehicle, orbit
  admFactory.getMetricsTotalAll = function(telemetryDataType) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/admin/metrics/' 
      + telemetryDataType + '/total/all/';
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getMetricsTotalAll() for " + telemetryDataType + 
        " response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getMetricsTotalAll() for ' +
        telemetryDataType + ' immediately. Please retry later.');
    });
  };

  // get metrics total by telemetry data types (e.g. attitude, position, vehicle) by vehicleId
  // valid telemetryDataType value: attitude, position, vehicle, orbit
  admFactory.getMetricsAttitudeTotalByVehicle = function(telemetryDataType, vehicleId) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/admin/metrics/' 
      + telemetryDataType + '/total/' + vehicleId;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getMetricsAttitudeTotalByVehicle() for " + telemetryDataType + 
        " response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getMetricsAttitudeTotalByVehicle() for ' +
        telemetryDataType + ' immediately. Please retry later.');
    });
  };

  // get metrics total by telemetry data types (e.g. attitude, position, vehicle) by vehicleId from/to timestamp
  // valid telemetryDataType value: attitude, position, vehicle, orbit
  admFactory.getMetricsAttitudeTotalByVehicleTimestamp = function(telemetryDataType, vehicleId,
      fromTS, toTS) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/admin/metrics/' 
      + telemetryDataType + '/total/' + vehicleId + '/' + fromTS + '/' + toTS;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getMetricsAttitudeTotalByVehicleTimestamp() for " + telemetryDataType + 
        " response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getMetricsAttitudeTotalByVehicleTimestamp() for ' +
        telemetryDataType + ' immediately. Please retry later.');
    });
  };

  // get metrics trend by telemetry data types (e.g. attitude, position, vehicle)
  // valid telemetryDataType value: attitude, position, vehicle, orbit
  admFactory.getMetricsTrendTotalAll = function(telemetryDataType) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/admin/metrics/trend/' 
      + telemetryDataType + '/all/';
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getMetricsTrendTotalAll() for " + telemetryDataType + 
        " response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getMetricsTrendTotalAll() for ' +
        telemetryDataType + ' immediately. Please retry later.');
    });
  };

  // get metrics trend by telemetry data types (e.g. attitude, position, vehicle) by vehicleId
  // valid telemetryDataType value: attitude, position, vehicle, orbit
  admFactory.getMetricsTrendTotalByVehicle = function(telemetryDataType, vehicleId) {
    var serviceEndpoint = 'http://platform.audacy.space:7902/services/v1/admin/metrics/trend/' 
      + telemetryDataType + '/' + vehicleId;
    return $http.get(serviceEndpoint)
    .success(function(response) {
      console.log("admFactory.getMetricsTrendTotalByVehicle() for " + telemetryDataType + 
        "  vehicleId=" + vehicleId +
        "  response.data=" + JSON.stringify(response));
    })
    .error(function(err) {
       console.error('Sorry, Quindar platform cannot serve admFactory.getMetricsTrendTotalByVehicle() for ' +
        telemetryDataType + ' immediately. Please retry later.');
    });
  };

  return admFactory;
}]);