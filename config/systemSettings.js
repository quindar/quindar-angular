module.exports = {
  'dbUrl': 'mongodb://data01.audacy.space:11001/telemetry',
  'dbOptions': {
    'user': 'audacy',
    'pass': 'audacy1234',
    'auth': {
      'authdb': 'admin'
    },
    "server": {   
      "auto_reconnect": true,
      "poolSize": 200,
      "socketOptions": {
         "keepAlive": 1
      }
    }
  },
  'secret': 'audacy1234',
  'maxRecords': 9999,
  'vehicles': ["IBEX", "CST-100 Starliner", "Orion MPCV", "Dream Chaser CRS-2", "ISRO OV",
    "Skylon D1", "XCOR Lynx", "SIRIUS-1", "ISS (ZARYA)"],
  'exchange':'quindarExchange04',
  'exchangeType': 'topic',
  'serverURL': 'data04.audacy.space/develop',
  'serverEndpoint': 'amqp://audacy:audacy1234@data04.audacy.space/develop',
  'mqConfig': {
    'user': 'audacy',
    'pass': 'audacy1234',
    'server': 'data04.audacy.space',
    'queue': 'develop'
  },
  // when starting NodeJS server, we can disable/enable modules
  'serverStartupOptions': {
    'apiHttp': true,
    'apiHttps': true,
    'socketHttp': true,
    'socketHttps': true
  }
};
