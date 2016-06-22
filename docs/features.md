# Data Visualization Framework for Mission Operations Software
Updated: Feb 10, 2016

## Overview
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


## Problem statement
Many existing mission operations software are built using legacy and/or platform-specific technologies that rely desktop plugins (thus, deployment and upgrade challenges), and are not designed for third party product integration (thus, limitation in customization).

They also have limited support in light-weight, zero footprint platform (such as Web browsers without plugin), and responsive design (for different desktop layout or mobile device form factor).
Solution

We would like to build a re-usable data visualization framework that can be used to build Web browser-based mission operations application, which does not require installing desktop plugin.

The target technology stack consists of: JavaScript, SVG (Vector graph for 3D visualization), REST API (for backend integration and data feeds).


## Benefits
* Zero footprint, light-weight stack – browser does not require installing or upgrading software plugin for new software changes.
* Responsive design – can customize (e.g. drag-n-drop) desktop and canvas.


## Technical Features
* Navigation
  - Users can drag and drop widgets to move to other positions within the same canvas (workspace of the Web browser).
  - Users can close any unused widgets.
* Responsive design
  - Users can resize the Web browser and the widget will automatically resize according to your device form factor, e.g. reflow your widget from left to right.
* Continuous integration support
  - We will include Jenkins continuous integration server integration with node.js for test automation and deployment using Docker container.


## List of Widgets 
The followings are a list of widgets we plan to build (by phases):

Widgets | Category | Example(s) | Description | Implementation
--- | --- | --- | --- | ---
System Map | Maps | ![system map](/docs/images/exampleSystemMap01.png "System Map Example 1") ![system map](/docs/images/exampleSystemMap02.png "System Map Example 2")| A system map is most often a functional block diagram or similar image, overlayed with live telemetry information. It needs to support both output (display of live telemetry) and input (toggle switches etc.) which can either trigger a change directly, or populate the command interface with an associated command. Maps can be hyperlinked to sub-maps to "drill down" to component levels. | D3.js
World Map |	Maps | ![system map](/docs/images/exampleWorldMap01.png "World Map Example 1") ![system map](/docs/images/exampleWorldMap02.png "World Map Example 2") ![system map](/docs/images/exampleWorldMap03.png "World Map Example 3")| World maps are a special case of a system map showing geographically positioned information. The most common example are orbit ground track visualization, and network assets. Supported functions are line trace overlay (e.g. orbit track, network link), object markers (e.g. ground station, spacecraft), and associated alphanumeric information displays. Both the telemetry (numbers, text) and the location on the map (coordinates) are time varying.	| D3.js
Line charts | 2D Graphics	| ![system map](/docs/images/exampleLineGraph01.png  "Line Graph Example 1") |	 Scatter or line plots are the most important, bar charts or pie charts are almost never used but could be nice to have). The data source for each axis is independently select able, so values can be plotted against time but also against other values. Axes support linear and logarithm scales, multiple traces lines, and multiple scales on a given axis. Grid lines should auto-scale, and hovering over a point displays the values at that point. | D3.js
World View | 3D Graphics	| ![system map](/docs/images/exampleWorldView01.png  "World View Example 1") | Spinning globe view with line trace overlay (e.g. orbit track), object markers (e.g. ground station, spacecraft), alphanumeric display (live parameter, state, or telemetry value) on markers, reference coordinate frames, ability to rotate view / zoom, etc.| Cesium.js
Object View	| 3D Graphics | ![system map](/docs/images/exampleObjectView01.png  "Object View Example 1") ![system map](/docs/images/exampleObjectView02.png  "Object view Example 2")| Used to visualize the 3D attitude (orientation) of an an object in space, and changes in the objects configuration. For example a spacecraft's attitude or the pointing of a ground antenna dish relative to various coordinate frames. The images then changes if the spacecraft deploys solar arrays or rotates a boom, etc. Also thruster firings, transmitter messages, or other activites can have real time indicators. The view can have overlays just like a 2D system map.| D3.js
Log View |Text Views| |	Running display of logging messages, command history, system messages, etc. | Build using HTML5/Bootstrap/CSS
Telemetry List | Text Views	| ![system map](/docs/images/exampleLogView01.png  "Log View Example 1") |	A table listing of various telemetry values, usually including an ID, description, limit values (alarm/warn, high/low), a status indicator coloring, the current value, etc. | Build using HTML5/Bootstrap/CSS
Message Board |	Text Views	| | Similiar to the Log View, but not auto-scrolling as events occur. Instead messages appear and stay "on the board" until acknowledge / removed by the user. There are usually multiple categories, like INFO, WARN, CRIT	| Build using HTML5/Bootstrap/CSS
Timers | Time Views	| ![system map](/docs/images/exampleTimerView01.png  "Timer View Example 1") |	Countdown timers, mission clocks, world time, for various timezones, events, etc.| Build using HTML5/Bootstrap/CSS
Swimlane Chart	| Time Views | ![system map](/docs/images/exampleSwimlane01.png "Swimlane Chart Example 1") | A view showing events as horizontal bars along a time track, with the current time as a vertical line across the center view. This is used for mission planning and tracking during implementation. The view support clicking on a bar (event) to pull up meta-data, selecting which tracks should be shown, scrolling through time, zooming etc. | Build using HTML5/Bootstrap/CSS
Command Module	| Input	 | |	Similar to a web form, with input verification and search capability as you type. There's a sequence which must be followed to enter a command (workflow) which should be customizable, and can require multiple user roles. Also needs to provide indication of cammnod path, timer that starts when command is sent, and indicator that command was received / acknowledged by the recipient (spacecraft or ground asset)	| HTML5/Bootstrap/CSS

 