# Overview
The rapidly falling cost of launching a satellite has resulted in near exponential growth in the number of spacecraft being deployed and operated. Most often, each spacecraft owner / operator conducts Mission Operations using specialized software developed in house. Mission Operations centers can range in size from something as modest as a single laptop connected to a backyard radio antenna, to multiple rooms housing dozens of consoles each equipped with as many as 10 displays and/or combined with very large projection systems at the front of the room. Due to its specialized nature, the software powering these displays is often developed in house by the user, and frequently does not have the benefits of a modern software design architecture, mainstream libraries, and graphical capabilities. 

This project aims to create a modern, browser based, real time data visualization platform to monitor and operate complex engineering systems in a spaceflight mission operations setting. While other FOSS (Free Open Source Software) projects of this nature exist, this particular project is commercially backed by Audacy (http://audacy.space), who is fully committed to maintain it as free (no cost, open source) to the growing worldwide community of spacecraft operators of all sizes, now and in perpetuity.

For those unfamiliar with space mission operations, or just getting started, here is a list of comparable projects which offer some useful context:

* ESA European Ground Systems - Common Core: http://www.egscc.esa.int 
* NASA OpenMCT: https://sites.google.com/site/openmct/
* HSFL Cosmos: http://cosmos-project.org/
* G-Predict: http://gpredict.oz9aec.net/
* SatNOGS: https://satnogs.org/

# Project Goal
The resulting mission operations software will aim achieve a modular front-end (allowing users to develop application specific widgets), and an REST API based backend (allowing users to drive displays from their specific data source). The user interface will be browser based, using the MEAN technology stack, incorporating rapid maintenance and upgradability while operating in a mission critical environment. 

The technology stack includes:  JavaScript, SVG (Vector graph for 3D visualization), REST API (for backend integration and data sources).

# Benefits
* Ease of deployment and support - the framework has zero footprint, and light-weight stack. Thus, the browser does not require installing or upgrading software plugin for new software changes.
* Ease of use with responsive design, allowing for organization specific and user specific customization within the graphical interface. 

# Features
The data visualization framework (aka widgets) will be able to provide the following functionality:
* Ability to pause live feed and capture a snapshot for export
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

# How to Use Widgets
The widgets will be available in at least 2 ways:
* AngularJS directives
AngularJS directives are similar to HTML buttons that developers find in many Web pages. They can add these directives in your Web pages, similar to adding buttons or "div" tags. Each directive denotes a widget function, with associated backend data sources you can configure or customize).

* JavaScript functions
If developers want to modify or extend these directives, they may want to consider native JavaScript functions for these widget functionalities. The choice of JavaScript functions is targeted for short learning curve and the popularity of JavaScript across different software platforms (e.g. MEAN stack).

You will find detailed technical documentation (e.g. user guide) and examples in the subfolders.

# For More Information
* For license (terms of use), please refer to the file license.md.
* If you want to contribute, or to extend the framework, you may want to refer to the "How to Contribute" document (contributing.md).
* For developers who want to modify or extend the framework, they may start with development guidelines (e.g. coding style, testing checklist) document in the contributing.md, and also additional checklists under the /docs folder. 
* The document features.md outlines the technical features and a list of widgets.
* The document frameworkDesign.md provides a high level summary of the software architecture.

# About Us
Audacy was launched in 2015 by Stanford graduates, SpaceX veterans, and NASA award winners. Audacy delivers anytime and effortless space connectivity, advancing humanity to a new age of commerce, exploration and discovery. Connect online at http://audacy.space.


