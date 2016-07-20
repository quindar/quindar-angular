# Quindar Project Standard and Coding Style Guide
Updated: Jul 19, 2016 by Ray Lai

This is a proposed project standard how to structure the folders, naming convention and some coding style best practices with examples.

## Web Page Structure
* The default landing page is index.html (not index.js).
* We use a common navbar style using Bootstrap.
* We use a top level AngularJS controller (e.g. quindarWidgetsControllers.js), specified in the index.html.
* We use AngularJS ui-router (not ng-router) to control Web page navigation. The Web page index.html has a placeholder for each AngularJS view. 

## Folder Structure
We are inspired by Yeoman generator (https://github.com/yeoman/generator-angular) and uses the following folder structure:
* AngularJS folder structure (Followup work in #1533, #1535, #1170)
  * /app.js consolidates ui-router (partial HTML Web pages)
  * /app/controllers stores all AngularJS controller JavaScript files
  * /app/directives stores all AngularJS directives for widgets (aka applications)
  * /app/factories (and in some cases, /app/services if we have AngularJS factories) stores backend APIs and functions. They are basically wrappers for REST APIs. 
  * /app/views to contain HTML Web pages.
* Assets (e.g. images)
  * /images stores images in PNG, JPG or SVG format.
* Configuration file
  * /config stores server-side configuration files (e.g. systemSettings.js).
  
We explicitly do not want to create sub-folder structure by AngularJS directives or by widget categories, because we want to keep simple and flat folder structure.

## Coding Style
* Use 2 hard spaces instead of TAB to indent codes.
* Use a standard project header to describe the program purpose, author, copyright and coding history, e.g.
```
// Program: adminConsoleController.js
// Purpose: AngularJS controller for quindar platform admin console
// Author:  Ray Lai
// Updated: Jun 10, 2016
// License: MIT license
//
```
* Use camel style typography (e.g. 'var thisIsAVariable = 0' instead of var 'this-is-a-variable=0' or 'var thisisavariable = 0') for variables.
* Use meaningful naming convention, e.g.
  * Use "quindarWidgetsControllers.js" instead of "index08aController.js"
  * Use consistent prefix or suffix for JS and CSS, e.g. "quindarWidgetsControllers.js" and "quindarWidgets.css"
* Indent your HTML elements in pairs (begin & end tags) consistently to ease reading.  
* Produce basic documentation for (1) installation, (2) how to invoke API, (3) how to troubleshoot. Put them under /docs folder. 
  * You can put summary and URL links in readme.md (top folder), and detailed documents under /docs.
* Use a startup script to install (e.g. buildme.sh) or to run the application (e.g. gruntfile).
  * We may need both shell scripts and gruntfiles since different users may have different needs.

Detailed coding styles can be referred to the Reference and Appendix sections.

## Error Handling and Diagnosis
* Use "Winston" and "morgan" for logging. 
  * All console messages will be automatically appended to Apache-style log messages. The log files will be rotated if they grow too big.
  * buildme.sh will create a subfolder /log to store all log files (rotation is enabled).
* Generally speaking, we add log messages for errors and warning.
  * For client-side, you can use "console.log" for error messages.
  * For server-side (e.g. REST API), we capture the status code, message, and error message details in the HTTP response, e.g. 
```
res.status(500).send({"status": 500, "message": "Cannot insert attitude data points due to internal system error", "type":"internal","error": err});
```

* In medium term (after Aug 1, 2016), we will introduce data input validation checking for both UI elements and backend API. With Flash capability (e.g. connect-flash), all error messages will be flashed on the UI view, and also stored in a buffer. 
  * You can use validator for input data validation, and store the error messages in flash variables.

## Testing Checklist
Use cases for unit testing. Make sure to right click the page and select "Inspect" for an interactive activity console.
### Positive test cases
Front-end/UI Application
* Test expected input/output for each Quindar widget directive (e.g. functions defined in each .js)
* Test number, string, date and email format in each UI data input fields (e.g. drop-down box, widget settings, etc.)
* Test if each UI widget feature handles the expected input and output (e.g. push "resume" button should resume plotting the graph)
* Check if there is any global variable or unused data element in JS 

Backend
* Test expected input/output for each API function
* Test number, string, date and email format
* Test if each REST API (e.g. app.get, app.post) handles expected data payload, e.g. /services/v1/telemetry/1 should take in a number '1' at the end 

### Negative test cases
Front-end/UI Application
* Test each UI element (e.g. button, drop down box) handles invalid cases, e.g. specifying invalid width and height for each widget directive should return error message
* Test extreme cases for data input field of each widget, e.g. number field > 999999999999, string field handles
* Test coverage - test if each parameter in a function is all covered, e.g. function x(a,b,c) - permutate each test case for x(a,_,_), x(a,b,_), ... where _ denotes null data input. 

Backend
* Test each input data field handles invalid cases
* Test each REST API has valid error pages for HTTP response 3xx, 4xx, and 5xx
* Test extreme cases for each data input field, e.g. number field > 999999999999, string field handles
* Check for cross-domain CORS, e.g. localhost client calling API with domain audacy.space
* Test coverage - test if each parameter in a function is all covered, e.g. function x(a,b,c) - permutate each test case for x(a,_,_), x(a,b,_), ... where _ denotes null data input.
* Test rate limit for each REST API, e.g. REST API can be served up to 10000 requests per nodejs web server instance before the server crashes 

### Example: Manual Test for Widgets
for (1) quindar-angular, and (2) quindar-platform admin UI
* quindar widgets URL: http://widgets.audacy.space
* quindar platform admin UI URL: http://platform.audacy.space:7902

Widgets: Positive test cases
* Test expected input/output for each Quindar widget directive (e.g. functions defined in each .js)
 * Test number, string, date and email format in each UI data input fields, e.g. drop-down box, button
 * Test if each UI widget feature handles the expected input and output, e.g. push "resume" button should resume plotting the graph
 * Check if there is any global variable or unused data element in JS

Widgets: Negative test cases
* Test each UI element (e.g. button, drop down box) handles invalid cases, e.g. specifying invalid width and height for each widget directive should return error message
* Test extreme cases for data input field of each widget, e.g. number field > 999999999999, string field handles
* Test coverage, e.g.
  - Add 2 pages, delete 3 pages, save, restore widgets. open a new browser to see if you see those changes
  - Delete all pages, save, open a new browser to see if you see all blank pages. Try different browsers to see compatibility.
  - edit widget settings, add special characters or javascript to see if it breaks or crashes the app
  - edit widget settings to have negative numbers for width, column, height, row, etc. to see if it breaks or crashes the app
  - lineplot widget:   load, plot, pause, pan, and hit multiple special characters or mouse actions to see if it breaks or crashes the app
  - ground track widget: connect, stream, clear, stop and hit multiple special characters or mouse actions to see if it breaks or crashes the app
  - for both widgets, find out any combination of key sequences that may break or crash the app

Platform admin UI
  - Clear database (Database | Vehicle), Create 1 new data (e.g. from Data Generator | Vehicle | enter generated data: 1) and verify if you see 1 new data added under Data Browser and also from Metrics

  - Re-try the previous steps with 10, or 20, or 100 to see if all data points are created correctly
  - check all API docs are matching actual programs, e.g. http://platform.audacy.space:7902/api should match /app/scripts/coreAdmin.js code comments and app.get() or app.post() function definitions


## Coding Checklist 
This checklist can be used for design and/or code review before Code Merge (pull request):
* Program file header (e.g. purpose, author)
* Automated test scripts (e.g. smoke test for API)
* Design document to show sequence diagram, schema and end-to-end flow scenarios.
* API annotation for each backend function
* For widgets and UI application
  * Input data validation exists for each UI element and backend function
  * Do not invoke REST API directly from HTML Web page, or from AngularJS controller. Wrap API call using AngularJS factories or services
* For REST API
  * Each error condition is logged with details, but exclude sensitive system information
  * Always use micro-service design approach to build independent, self-contained Web service because they can be deployed as single thread under a docker container
  * Add CORS (cross-domain) by rewriting the HTTP headers
  * Annotate API function so that we can generate REST API documentation
* Security
  * Secure data at rest. Use data encryption for sensitive information in the backend
  * Secure data transport. Use security access token (e.g. JSON web token)
  * Use HTTPS for production
* System reliability and availability
  * Always test failover scenarios
  * Ensure data backup and restore

## Package Management 
We use NPM (Node Package Manager) package manager for backend NodeJS packages, and also for client-side packages and dependencies.  In the short term, we manually consolidate third party dependencies and concatenate into one single JavaScript file, the same with third party CSS files. This reduces page load times particularly if we have more than 25 files to load. 

* package.json will be the single source of truth for both backend and client side packages. If creating new applications for Audacy, Create package.json to define the dependencies (e.g.JS/CSS, NPM packages). NPM package manager will manage them
  * Developers will add server side NodeJS packages into package.json. They can use the NPM option "-save" to add (e.g. "npm install nodemon -save". It will automatically update the file package.json)
  * In the short term, developers will manually add the client side packages in the file package.json. This will allow package management automation tools such as "napa" and "grunt" to consolidate, concatenate, minify/uglify JS/CSS files in the next phase (medium term).  With the file package.json, we have all backend and client side packages maintained centrally
  * If we need to update or downgrade any software version, we simply modify package.json

* Server-side package management
  * Currently we have all NodeJS packages and dependencies added to package.json. No need for any additional change.
  * In future, if developers need new packages and dependencies, they can add to package.json by either (1) npm install <package> -save, or (2) edit package.json manually
  * For NPM packages that require global install using root privilege, you may want to use the option "-g", e.g. "sudo npm install nodemon -save -g". If you run on Windows, you probably do not need to worry about "sudo"

* Client-side package management
  * In the short term, we do not consolidate, concatenate, minify/uglify custom JS/CSS files before we introduce any automation tools
  * Developers will follow our folder structure (a la Yeoman's style), say, directives files placed under /app/directives

* Front-end, client-side JS/CSS packages - custom JS/CSS to be hosted separately as github projects. Use Napa or Duo (and NPM) to package these JS/CSS files from Github as part of auto-deployment and continuous integration
* Backend JS and API packages - use NPM to package. Don't mix with bower packages (because these package managers overlap, and bower has limited packages in their repository)
* Package dependencies are stored in package.json in github project. node_modules should be excluded from github project code checkins (e.g. 'git add *' which ignores .gitIgnore and node_modules)
* Need to upgrade Jenkins deployment job for the package management change (Followup work in #1204)

In the medium term, we will build deployment tools to automate the packaging of client-side JS/CSS such that all necessary JavaScript and CSS files will be consolidated, concatenated, minified/uglified respectively into one file each.  This package management mechanism will ease software update, and optimizing page load time (after JS/CSS files consolidation).

## Backend changes
* Add logging to backend NodeJS codes (Followup work in #1204)
* Add AngularJS service or factory structure to existing REST API. (Followup work in #1535)

## Change management
* When more developers start to contribute new directives:
  * New AngularJS directives will be added to /app/directives
  * New functionality or backend codes will be added to /app/factories
  * New Web pages will be added to /app/views, and both index.html and the ui-router section in /app.js will be updated accordingly

* Proposed process
  * Contact AudacyDevOps (email listed under http://github.com/audacyDevOps profile)
  * Create a separate GitHub project for your new widget as independent AngularJS directive
  * Create a branch from quindar-angular
  * Build your codes, test them. Add automated test scripts
  * Submit a pull request for code merge. AudacyDevOps will conduct design and code review

### Step-by-step Instructions to Add a New Widget
Use Case: developers add a new widget (e.g. quindar-lineplot and quindar-groundtrack), which will be stored in separate GitHub projects.  They will first modify the ng-controller (e.g. quindarWidgetsControllers.js) to add New processing logic will be encapsulated in separate JS files under /apps/scripts. New controllers will be added, and variables are stored and managed in ng-model, managed by the corresponding controllers.

* Create a branch
* Define, code and test your AngularJS directive as separate GitHub project
* Define a new, independent AngularJS directive under /app/directives (e.g. "quindar-lineplot.js")
* Register your new AngularJS directive (e.g. ground track) in ng-controller (e.g. quindarWidgetsControllers.js)
e.g.
```  
 $scope.dashboards = [
      {
        id: 0,
        name: 'Basic',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 1 - Line Plot",
          directive: "lineplot"
        },
        {
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 1 - Ground Track",
          directive: "grounddtrack"
        }]
      },
      {
        id: 1,
        name: 'Advanced',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 2 - Temperataure",
          directive: "lineplot"
        }]
      },
      ...
      {
        id: 4,
        name: 'Custom',
        widgets: []
      }
    ];

```
also you need to register in the widget definition section too:
e.g.
```
var widgetDefinitions = [
      {
        name: 'Line Plot',
        directive: 'lineplot',
        style: {
          width: '33%'
        }
      },
      {
        name: 'Ground Track',
        directive: 'groundtrack',
        dataAttrName: 'chart',
        style: {
          width: '100%'
        }
      }
    ];
```
Once you register your directives, you can do a regression test for your branch. 

## References
* NodeJS coding style and best practices
https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

* JavaScript coding pitfalls
https://www.toptal.com/angular-js/top-18-most-common-angularjs-developer-mistakes

* JavaScript error handling techniques
https://www.joyent.com/blog/best-practices-for-error-handling-in-node-js

## Appendix: Quindar JavaScript Cookbook Recipes
This is a collection of design patterns and cookbook recipes used in Quindar projects for consistency. 

### System Settings 
* Do not hard-code port number in the main codes; use variable to define process environment variable.

In your NodeJS startup file (server.js) or any JavaScript file, you can use Linux environment variable to specify a particular port number (process.env.SECUREPORT is a Linux variable), instead of defining "var securePort = 3001), e.g.

```
var securePort = process.env.SECUREPORT || 3001;
```

The benefit is that this construct allows DevOps administrators to change the port at deploy time without binding to a pre-defined port 3001.  It is one of good DevOps security practices.

* do not hard code username and password in main source codes. use config file.
In this example, we create a config file under /config subfolder. You can reference the server end-points, username and password by using the prefix systemSettings.

```
var systemSettings = require('./config/systemSettings.js');
...
mongoose.connect(systemSettings.dbUrl, systemSettings.dbOptions); 
```

For example, in coreAdmin.js, it loads the file systemSettings.js. You can connect to MongoDB database via the middleware mongoose by passing the database URL (systemSettings.dbUrl) and the database username/password (systemSettings.dbOptions).

In the config file systemSettings.js, the database URL and username/passwords are defined as:
```
 'dbUrl': 'mongodb://data01.audacy.space:11001/telemetry',
  'dbOptions': {
    'user': 'xxx',
    'pass': 'yyy',
    'auth': {
      'authdb': 'admin'
   },
```

The benefit is that you will not find any hard-coded server endpoints, URL or username/password in the source codes. If you need to change the service endpoints or password, you can change the password. This is more manageable and secure.
### Writing Modular Codes
* Load different NodeJS files by modules and use dependency injection (pass variables to modules).

In your NodeJS startup file (server.js) or any JavaScript file), you can build separate JavaScript files (e.g. by categories), and load them when needed.  If you put all the backend process logic into one single JavaScript file, the file will be too large to read and debug. If you write in modules, you can load certain modules based on specific condition. In quindar-platform project, the common data services APIs are defined in a module called coreAdmin.js, the messaging APIs are defined in messageQueue.js.

Here is an example in server.js from the quindar-platform project, where you load different modules. In this example, each module will re-use different variables (or dependencies).

```
require('./app/scripts/verifyMe.js')(app);
require('./app/scripts/telemetryRead.js')(app, mongoose, syslogger, logger);
require('./app/scripts/coreAdmin.js')(app, bodyParser, mongoose, fs, syslogger, logger, helper);
require('./app/scripts/messageQueue.js')(app, bodyParser, fs, syslogger, logger, helper);
require('./app/scripts/webSocket.js')(app, socketPort, syslogger, logger, helper);
require('./app/scripts/webSocketSSL.js')(app, secureSocketServer, secureSocketPort, io, syslogger, logger, helper);
```

### Logging
* Use logging plugins such as winston and morgan to allow log file rotation.

NodeJS does not provide native logging. This example will leverage NPM modules winston and morgan, such that any console.log messages will be appended in a log file with the suffix "access-YYYYMMDD.log" under the subfolder /log.  The file will be rotated such that when the file is growing too large, it will automatically rotated by removing the older records.

```
var logDirectory = __dirname + '/log'
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
})
app.use(syslogger('combined', {stream: accessLogStream}))
```

* Input data validation on client-side and also on backend. Use "flash" for error notification.
One best practice is to validate the data format in both client-side (data input form, or HTML form), in the backend REST API.  On the client side, we also need to return or display the error on the screen.  connect-flash is an NPM package that helps storing the error messages into a flash message (which will appear for a few seconds and dismiss automatically).

```
var flash = require('connect-flash');
...
app.use(flash());
```

## Package Management
* Optimize your client-side JS/CSS packages in build process. Verify your client side web page performance using tools like PageSpeed, or chrome plugin such as https://gtmetrix.com/

## Page Navigation 
* Use ui-router for page navigation.
ui-router is an NPM package that allows developers to define which UI view (e.g. Web page) will be displayed when certain mouse click actions occur. It could be stored in separate JavaScript file (e.g. ui-router.js), or embedded in your HTML Web page under "script" tag, or even in your JavaScript files.

For example, in quindar-platform project, you can define 4 UI views (Web pages) users can navigate: (1) data generator Web page, (2) data metrics Web page, (3) data browser Web page, (4) data clean up Web page.  You can define the HTML Web page name, URL and angularJS controller files.  

The benefit for using ui-router (over ng-router package) is that you can use multiple UI views on the same Web page. For example, if you need to display a footer to show "Powered by RackSpace", you do not want to hard-wire this phrase in each Web page. Thus, using ui-router can give you more flexibility to build and organize your Web pages.  Similarly, if you need to display different contents or UI views depending on user actions (e.g. mouse click), ui-router will give you flexibility to combine or mix-and-match different UI views.

```
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/dataGenerator");

  $stateProvider
  .state("dataGenerator", {
      url: "/dataGenerator",
      views: {
         "dataGenerator" : {
           templateUrl: "app/views/dataGenerator.html"
         }
      },
      controller: 'adminConsoleController'
  })
  .state("dataMetrics", {
      url: "/dataMetrics",
      views: {
        "dataMetrics": {
           templateUrl: "app/views/dataMetrics.html"
         }
      },
      controller: 'adminConsoleController'
  })
  .state("dataBrowser", {
      url: "/dataBrowser",
      views: {
        "dataBrowser": {
           templateUrl: "app/views/dataBrowser.html"
         }
      },
      controller: 'adminConsoleController'
  })  
  .state("dataCleanup", {
      url: "/dataCleanup",
      views: {
        "dataCleanup": {
           templateUrl: "app/views/dataCleanup.html"
         }
      },
      controller: 'adminConsoleController'
  })  
}]);
```

## Backend API
* Use REST API via factories (or services). Do not invoke REST API directly in controller without factories or services
* Use directives - they are independent modules with dependency injection capability.
They can be used standalone without quindar-angular.
* Leverage angularjs to benefit from 2-way binding (auto-refresh contents), e.g. use ng-click instead of onclick.
* Always define variables up front (or on top) in a program instead of in-line code changes. for example, you can define your web service end-point URL in a config file instead of putting the variable endpoint in each of JS function. Thus, if you want to change the endpoint, you only change once in 1 place instead of every function.
* Add your regression test script earlier. For example, 
shell script https://github.com/audacyDevOps/quindar-platform/blob/master/test/smoketest01.sh will test most REST API, if not all.

