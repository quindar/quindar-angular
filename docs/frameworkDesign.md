# Data Visualization High Level Design
Updated: Feb 10, 2016

# Technology Stack

## Client-side
* HTML 5
* CSS 3.0
* Bootstrap 
* AngularJS

## Backend
* node.js
* REST API for backend calls

## Data Visualization
* vector graphics - d3.js
* 3D objects - WebGL


# Design Principles
* Single Page Application 
  - Adopt decouping user interface from processing logic (Model-View-Controller design pattern).
  - Allow visual contents to be automatically resized on different mobile devices (Responsive design).
* REST API-centric architecture
  - Backend uses REST API to extract data sources. The use of REST API provides a standard programmatic interface (aka API contract) and it will hide the complexity of any backend changes without the need to upgrade the user interface simultaneously.
* Light-weight, small footprint
  - The use of plugin-less Web browser does not require any client-side plugin installation.

# Architecture Overview
 The open source mission operations software consists of front-end, middleware and back-end components. The data visualization project contributes to the widgets in the front-end components. The following diagram outline the major components of the overall architecture.

![system map](/docs/images/missionOpsComponents.png  "Mission Operations software high level architecture")

# Front-end
* Web Page Framework
  - Basic User Interface framework:  Bootstrap-style navigation bar, side bar and CSS stylesheet with Audacy branding will be available.  But they are optional and can customizable for developers. This is suitable for developers who want their mission operations software to have Web page-like user experience with responsive design capability (e.g. resize the visual contents depending on the form-factor or mobile device).
* Widgets
  - AngularJS directives: Developers can build, customize or enhance their mission operations application by adding different widgets by using AngularJS directives, which behave like HTML buttons. The benefit is to hide the complexity of backend processing logic from the Web UI elements (aka enforce Model-View-Controller design pattern). This will be very useful for easier backend upgrade, manageable software versioning.
  - HTML 'div' tags and JavaScript functions: If developers do not want to use UI framework such as AngularJS, they can use widgets like any 'div' tags, where developers can modify or customize backend JavaScript functions to suit their needs.
* Simulator App: This front-end can simulate mission operations events and generate synthetic payloads.
 

# Middleware
* Messaging API
  - Current approach is to re-use CCSDS message payload standard, which is widely used for space satellite communications by NASA and ESA. The message payload API will create network packet header and body (message marshalling) over TCP/IP network. It is like layer 7 (application layer) of the 7-layer ISO network stack.
* Network Service API
  - This data transport API will be responsible to send or receive message payload between satellites and ground stations. This is like layer 5 of the 7-layer ISO network stack.
* Data Service API
  - This API is responsible to read or write data from backend database for pumping live data feeds for data visualization widgets, or for read/write access of system events and logs for audit trail and diagnostics use.

# Back-end
* Network Service
  - This is the actual implementation of the network routing and forwarding capability (aka network plane), similar to physical network bridge and switches.
* Simulation Engine - This is the backend implementation of the simulator that includes:
  - Simulate mission operations by creating synthetic message payload and system events
  - Generate bulk synthetic message payload for stress testing
* Data Service
  - This is the persistence layer (aka databases) of the backend data store for (1) message payload from satellites, (2) meta-data for configuration, (3) system events and logs, and (4) data analytics for reporting and diagnostics.


# Data Visualization Framework Design

The following diagram depicts the high level data visualization framework design:
![system map](/docs/images/dataVisualizationFramework.png  "Data visualization framework")

* AngularJS framework is used to implement Model-View-Controller design pattern.
* Widgets (e.g. swimlane chart) are vector graphics, maps or tables customized for mission operations software. They depend on the backend data sources via REST API. We leverage D3.js, Cesium.js and other open source visualization libraries.
* Web page framework refers to navigation bar or side bar that is usually used in a typical Web application using custom CSS stylesheet. We leverage Bootstrap framework.
