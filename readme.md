# Overview
Updated: Jul 18, 2016 by Ray Lai

The rapidly falling cost of launching a satellite has resulted in near exponential growth in the number of spacecraft being deployed and operated. Most often, each spacecraft owner/operator conducts Mission Operations using specialized software developed in house. Mission Operations centers can range in size from something as modest as a single laptop connected to a backyard radio antenna, to multiple rooms housing dozens of consoles each equipped with as many as 10 displays and/or combined with very large projection systems at the front of the room. Due to its specialized nature, the software powering these displays is often developed in house by the user, and frequently does not have the benefits of a modern software design architecture, mainstream libraries, and graphical capabilities. 

This project aims to create a modern, browser based, real time data visualization platform to monitor and operate complex engineering systems in a spaceflight mission operations setting. While other FOSS (Free Open Source Software) projects of this nature exist, this particular project is commercially backed by Audacy (http://audacy.space), who is fully committed to maintain it as free (no cost, open source) to the growing worldwide community of spacecraft operators of all sizes, now and in perpetuity.

For those unfamiliar with space mission operations, or just getting started, here is a list of comparable projects which offer some useful context:

* ESA European Ground Systems - Common Core: http://www.egscc.esa.int 
* NASA OpenMCT: http://nasa.github.io/openmct/
* HSFL Cosmos: http://cosmos-project.org/
* G-Predict: http://gpredict.oz9aec.net/
* SatNOGS: https://satnogs.org/

# Project Goal
The resulting mission operations software aims to achieve a modular front-end (allowing users to develop application specific widgets), and an REST API based backend (allowing users to drive displays from their specific data source). The user interface will be browser based, using the MEAN technology stack, incorporating rapid maintenance and upgradability while operating in a mission critical environment. 

The technology stack includes:  JavaScript, SVG (Vector graph for 3D visualization), REST API (for backend integration and data sources).

# Benefits
* Ease of deployment and support - the framework has zero footprint, and light-weight stack. Thus, the browser does not require installing or upgrading software plugin for new software changes.
* Ease of use with responsive design, allowing for organization specific and user specific customization within the graphical interface. 

# Features
The data visualization framework (aka widgets) will be able to provide the following functionality:
* Ability to stream and pause live feed and capture a snapshot for export
* Hyperlinks for "drill down"
* Ability to zoom in/out
* Ability to save screen position & widget options

The widgets are grouped into the following categories:
* Maps
* 2D Graphics
* 3D Graphics
* Text Views
* Time Views
* Input Modules

# How to Install Quindar
## Pre-requisites
* You need to install NodeJS on your target host (e.g. laptop, Linux host) first.
Using NodeJS's Node Package Manager, you can install this ground track widget. 

You can refer to the installation instructions under https://nodejs.org/en/download or https://nodejs.org/en/download/package-manager.

* You need "git" binaries installed on your target host. 
  - Git is pre-installed on MacOS.
  - On Linux host, you can install Git by "sudo yum install git" (for CentOS, Redhat, Fedora), or "sudo apt-get install git" (for Ubuntu).

* You need to create a local copy of this project. For example,
```
git clone https://github.com/audacyDevOps/quindar-angular.git
``` 

## Dependencies
* AngularJS
* NodeJS
* quindar-platform
* quindar-gmat

Once you download the quindar-angular project, you need to run buildme.sh in the example folder to install required module. Refer to the "How to Run the Demo" section for details. 	
	
## How to Run the Demo
* After creating a local copy of this project, run the script "buildme.sh" to install NodeJS dependencies and libraries:

```
cd quindar-angular
./buildme.sh
```

If you use Windows machine, you can run the following commands as an alternative:
```
cd quindar-angular
npm install
mkdir log
```

* Go to the example folder and run server.js to start the HTTP Web server: 
```
node server.js
```

You can also use:
```
nodemon server.js
```

The utility "nodemon" is similar to "node" (HTTP Web server), and it will automatically reload the Web pages whenever any Web page is updated.

* Open a Web browser with the URL http://localhost:3000. You should see a Web page with widgets (e.g. line charts).

# How to Use Widgets
The widgets will be available in:
* AngularJS directives
AngularJS directives are similar to HTML buttons that developers find in many Web pages. They can add these directives in your Web pages, similar to adding buttons or "div" tags. Each directive denotes a widget function, with associated backend data sources you can configure or customize).
* Mission operations application
Quindar-angular project is a mission operations application that uses a variety of widgets. You can add or customize your own widgets too using the widget framework from quindar-angular project.

## How to Integrate with Quindar 
Quindar is a real-time mission operations application produced by Audacy. You can add your new AngularJS directive to grid-like window in Quindar as per the following steps:
	
* Create a copy of Quindar-angular on your target host 
  - e.g. git clone https://github.com/audacyDevOps/quindar-angular.git)
* Create a copy of your new AngularJS directive on your target host under a separate folder.
* Copy your new directive JavaScript file to quindar-angular project.

For example, you have a new directive called quindar-groundtrack.
  - From quindar-groundtrack project folder "/dist" (https://github.com/audacyDevOps/quindar-groundtrack/tree/master/dist) 
  - To the quindar-angular project folder "/app/directives".
* Copy your new directive factory JavaScript file to quindar-angular project.

For example, you have a new directive called quindar-groundtrack with a factory file factory-groundtrack.js:
  - From quindar-groundtrack project folder "/example/app/factories" (https://github.com/audacyDevOps/quindar-groundtrack/tree/master/example/app/factories)
  - To quindar-angular project folder "/app/factories"
* Edit the quindarWidgetsControllers.js (controller) to add the new widget:
  - Add your widget definition in the $scope.widgetDefinitions:
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
        style: {
          width: '100%'
        }
      }
    ];
```

  - Add your new widget in a page definition (e.g. page 4 with id=3) in the $scope.dashboards array, e.g.
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
        }]
      },
      ...
      {
        id: 3,
        name: 'Ground Operations',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 4 - Ground Track",
          directive: "groundtrack"
        }]
      },
      {
        id: 4,
        name: 'Custom',
        widgets: []
      }
    ];
```

From the above example, it will enable Quindar widget to render groundtrack widget on page 4, by specifying the directive name "groundtrack". 

* Add the controller quindarWidgetsControllers.js to include your new directive. Here is an example of the changes:
  - var app = angular.module('app')
  - Add your new directive (e.g. angular-groundtrack) as a dependency to the angular.module.

* Update the JavaScript and CSS stylesheet in the file index.html
  - Your new AngularJS directive probably requires new JS/CSS files. You may want to review the current index.html
to see if the versions are compatible.

For example:
  - quindar-groundtrack requires D3 and angular-d3 third party JS/CSS. They are consolidated and concatenated in the files "groundtrack-thirdparty.js" and "groundtrack-thirdparty.css" for convenience. Refer to https://github.com/audacyDevOps/quindar-groundtrack/tree/master/example/dist for details.
  - You can refer to the /example/index.html as an example.
  - e.g. for quindar-groundtrack project, you will need to add the following files:
```
  <script src="dist/angular-groundtrack.js"></script>
  <script src="app/controllers/app-groundtrack.js"></script>
  <script src="app/factories/factory-groundtrack.js"></script>
  <script src="config/clientSettings.js"></script>
```

* You can manually re-test your new quindar-angular mission operations application to verify if the application works as expected.
  - There will be some automated widget test scripts in the quindar-angular project.
  - You can run "nodemon server.js" and open a Web browser with the URL http://localhost:3000 to test the changes.

You will find detailed technical documentation (e.g. user guide) and examples in the subfolders.

# Folder Structure
* Widget is an AngularJS application
  - /app/controllers:  AngularJS controllers for the widgets
  - /app/directives: Quindar widget directives used for charts and graphs 
  - /app/factories: wrapper for REST API or backend services
  - /app/models: data schema for telemetry
  - /app/styles: CSS stylesheets for the widgets 
  - /app/views: UI views used in the widgets
  - /dist: consolidated JS/CSS used Web pages

* Configuration file under /config
   - system settings (e.g. server end-points) and credentials (e.g. username, password)

* Documentation under /docs

* Assets under /images

# Installation Guide
## Overview
* Git clone the platform project from Github, e.g. git clone https://github.com/audacyDevOps/quindar-angular
* Install NodeJS dependencies - use buildme.sh to install npm packages
* Start NodeJS server, e.g. node server.js

## Step-by-step installation
* Pre-requisites
  - You need to install NodeJS (which comes with Node Package Manager, or npm) on your target host. Refer to https://nodejs.org/en/download/package-manager/ for details.
  - For example, you can install NodeJS on Windows by downloading the binaries from http://nodejs.org/#download.
  - You can install NodeJS and npm on Linux by:
```
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
sudo yum -y install nodejs
```
 
* Git clone the platform project from Github, e.g. git clone https://github.com/audacyDevOps/quindar-angular
* Install NodeJS depencencies
```
./buildme.sh
```

If you run on Windows, you can run:
```
npm install
```

* To run your local instance of Quindar widgets, 
```
node server.js
```

Alternatively, you can run:
```
nodemon server.js
```

Open a Web browser with the URL http://localhost:3000 and you should see widgets.


# Testing
## Testing Overview
Tests may be performed on the backend by generating a specified number of concurrent server calls, or tests may be performed on the frontend by calling each tab on the website.

## Backend Testing
Testing of the backend involves running a sequence of API calls in parallel.

Backend testing is handled by running the shell script **backendLoadTest.sh**.
* This script runs through each type of API call in sequence and outputs the total amount of time taken for the given number of calls.
* This test will automatically run a specified number (default 50) of the following tests:
  - Attitude GET (attitudeGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/attitude/IBEX/5 >> /dev/null
  ```
  - Attitude POST (attitudePostTest.sh)
  ```
  curl -s POST -H "Content-Type: application/json" -d '{"vehicleId":"IBEX", "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}' http://platform.audacy.space:7902/services/v1/attitude >> /dev/null
  ```
  - RabbitMQ Simulation (rabbitMQSimTest.sh)
  ```
  curl -s POST -H "Content-Type: application/json" -d '' http://platform.audacy.space:7902/services/v1/simulation/messaging/attitude/audacy.telemetry.attitude/3 >> /dev/null
  ```
  - RabbitMQ (rabbitMQTest.sh)
  ```
  curl -s POST -H "Content-Type: application/json" -d '{"vehicleId":"IBEX", "q1":0.651781,"q2":-0.29526,"q3":-0.268266,"q4":0.645009}' http://platform.audacy.space:7902/services/v1/messaging/attitude/audacy.telemetry.attitude >> /dev/null
  ```
  - Metrics GET (metricsTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/admin/metrics/trend/attitude/1 >> /dev/null
  ```
* Optional tests can also be added:
  - Position GET (positionGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/position/SIRIUS-1/100 >> /dev/null
  ```
  - Orbit GET (orbitGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/orbit/IBEX/1 >> /dev/null
  ```
  - Vehicle GET (vehicleGetTest.sh)
  ```
  curl -s GET http://platform.audacy.space:7902/services/v1/vehicle/IBEX/7 >> /dev/null
  ```

## Frontend Testing
Frontend testing uses a shell script to automatically test the web page with multiple users.

Frontend testing is run using **frontendLoadTest.sh**.
* This script runs through a default of 50 users across three tabs on the webpage.
* The tested tabs include:
  - Dashboard
  ```
  curl -s "http://devops.audacy.space:7901/index.html#/dashboard" > /dev/null
  ```
  - Dashboard No Border
  ```
  curl -s "http://devops.audacy.space:7901/index.html#/dashboardnoborder" > /dev/null
  ```
  - About
  ```
  curl -s "http://devops.audacy.space:7901/index.html#/about" > /dev/null
  ```

## Time Output
The *time* command is used in each shell script to output information about the time taken to complete the process.

* REAL time means the actual time it has taken the total process to complete
* USER time is the time the CPU spends outside the kernel in the process
* SYS time is the time the CPU spends inside the kernel in the process

* USER + SYS provides the total CPU execution time
* Keep in mind that REAL does not necessarily equal USER + SYS because the CPU can run multiple processes at the same time.

For more information about the *time* command, check out this stackoverflow post:
[What do 'real', 'user' and 'sys' mean in the output of time?](http://stackoverflow.com/questions/556405/what-do-real-user-and-sys-mean-in-the-output-of-time1/556411#556411)

# Known Constraints
* No known constraints so far.

# Additional Information
* For license (terms of use), please refer to the file license.md.
* To contribute, or to extend the framework, you may want to refer to the "How to Contribute" document (contributing.md).
* For developers who want to modify or extend the framework, they may start with development guidelines (e.g. coding style, testing checklist) document in the contributing.md, and also additional checklists under the /docs folder. 
* The document features.md outlines the technical features and a list of widgets.
* The document frameworkDesign.md provides a high level summary of the software architecture.

# About Us
Audacy was launched in 2015 by Stanford graduates, SpaceX veterans, and NASA award winners. Audacy delivers anytime and effortless space connectivity, advancing humanity to a new age of commerce, exploration and discovery. Connect online at http://audacy.space.


