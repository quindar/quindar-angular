# Quindar Overview
Updated: Jul 15, 2016 by Ray Lai

# High Level Architecture
## Front-end
### Web Page framework
Basic User Interface framework - Bootstrap-style navigation bar, side bar and CSS stylesheet with Audacy branding will be available.  But they are optional and can customizable for developers. This is suitable for developers who want their mission operations software to have Web page-like user experience with responsive design capability (e.g. resize the visual contents depending on the form-factor or mobile device).

### Widgets
AngularJS directives: Developers can build, customize or enhance their mission operations application by adding different widgets by using AngularJS directives, which behave like HTML buttons. The benefit is to hide the complexity of backend processing logic from the Web UI elements (aka enforce Model-View-Controller design pattern). This will be very useful for easier backend upgrade, manageable software versioning.

HTML "div" tags and JavaScript functions: If developers do not want to use UI framework such as AngularJS, they can use widgets like any <div> tags, where developers can modify or customize backend JavaScript functions to suit their needs.

### Simulator App
This front-end can simulate mission operations events and generate synthetic payloads.

## Middleware
### Messaging API
Current approach is to re-use CCSDS message payload standard, which is widely used for space satellite communications by NASA and ESA. The message payload API will create network packet header and body (message marshalling) over TCP/IP network. It is like layer 7 (application layer) of the 7-layer ISO network stack.

### Network Service API
This data transport API will be responsible to send or receive message payload between satellites and ground stations. This is like layer 5 of the 7-layer ISO network stack.

### Data Service API
This API is responsible to read or write data from backend database for pumping live data feeds for data visualization widgets, or for read/write access of system events and logs for audit trail and diagnostics use.

## Back-end
### Network service
This is the actual implementation of the network routing and forwarding capability, similar to physical network bridge and switches.
    
### Simulation engine
This is the backend implementation of the simulator that includes:
* Simulate mission operations by creating synthetic message payload and system events
* Generate bulk synthetic message payload for stress testing

### Data service
This is the persistence layer of the backend data store for (1) message payload from satellites, (2) meta-data for configuration, (3) system events and logs, and (4) data analytics for reporting and diagnostics.

## DevOps Infrastructure
This consists of the backend infrastructure that supports the implementation and execution of mission operations infrastructure, including:
* Load balancer (e.g. haproxy)
* Web server (e.g. nginx, node.js express server)
* Docker (container virtualization for server machines)
* Continuous integration (e.g. Jenkins server for build process and automation, Artifactory repository for storing components used in the build pipeline)
* GIT repository (currently we plan to use GitHub, public hosted repository)

From space and ground segments, we have included the orbit analysis and engineering.
