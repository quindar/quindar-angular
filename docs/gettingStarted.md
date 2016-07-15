# Getting Started with Quindar
Updated: Jul 15, 2016 by Ray Lai

This is a guide for new JavaScript/HTML/AngularJS developers at Audacy! Depending on your skill level, feel free to skip any steps that don't apply to you, or refresh your skills.

To learn most effectively, try to write code as you follow tutorials and guides.

## Step 1: Starting with the Fundamentals
Web applications are often built using HTML (HyperText Markup Language), JS (JavaScript), CSS (Cascading Style Sheets), Bootstrap (a framework for responsive websites), and JQuery (simplifies JavaScript programming). The first step in understanding the development of Quindar's application and widgets involves building these fundamental skills. Some good tutorials with interactive code can be found at W3 Schools:

* W3 Schools HTML Tutorial http://www.w3schools.com/html/default.asp
* W3 Schools JavaScript Tutorial http://www.w3schools.com/js/default.asp
* W3 Schools CSS Tutorial http://www.w3schools.com/css/default.asp
* W3 Schools Bootstrap Tutorial http://www.w3schools.com/bootstrap/default.asp
* W3 Schools JQuery Tutorial http://www.w3schools.com/jquery/default.asp

While these tutorials may provide a good starting point for the fundamentals of web development, they are only meant to supplement actually coding applications and working toward a well-defined goal.

## Step 2: Learning AngularJS
AngularJS provides methods for extending the use of HTML and producing Single Page Applications (SPAs). The Quindar application will be an SPA in order to maintain a single "index.html" page that will have "views" of separate HTML elements placed over it when called. A good starting point would be to go through the W3 Schools AngularJS tutorial and then to code along with Dan Wahlin's AngularJS video tutorial.

* W3 Schools AngularJS http://www.w3schools.com/angular/default.asp
* Dan Wahlin AngularJS Tutorial Video - Excellent 60 minute AngularJS tutorial on how to use Angular to design an effective Single Page Application (SPA). http://weblogs.asp.net/dwahlin/video-tutorial-angularjs-fundamentals-in-60-ish-minutes
* AngularJS Routing Changes (Dan Wahlin) http://weblogs.asp.net/dwahlin/angularjs-routing-changes
* tutorialspoint AngularJS http://www.tutorialspoint.com/angularjs/index.htm
* Thinkster AngularJS https://thinkster.io/a-better-way-to-learn-angularjs
* Thinkster MEAN Stack Tutorial https://thinkster.io/mean-stack-tutorial

## Step 3: AngularJS Best Practices
Now that you understand the fundamentals of AngularJS, it is important to learn some of its best practices to save time and frustration later on. The first video provides tips on AngularJS from its author, and the second post nicely covers some things to keep in mind when developing an application with a large set of widgets - like Quindar!

* AngularJS Best Practices from it's Inventor https://www.youtube.com/watch?v=ZhfUv0spHCY
* How to develop an AngularJS App with a large dynamic set of widgets http://stackoverflow.com/questions/16806901/developing-an-angularjs-app-with-dynamic-set-of-modules
* Things I wish I were told about AngularJS http://ruoyusun.com/2013/05/25/things-i-wish-i-were-told-about-angular-js.html

## Step 4: Understanding AngularJS Widget Definition
In order to understand how to define widgets in AngularJS, it is useful to look at example applications. Listed below are examples given by the Malhar Dashboard, which has some excellent functionality that we are trying to reproduce with Quindar in a clean and simple format. You can check out the main dashboard below with its demo, a simplified dashboard with a demo, and the source code with a useful definition of widgets as directives calling template HTML.

### Main Dashboard
* Malhar Dashboard Webapp GitHub https://github.com/DataTorrent/malhar-dashboard-webapp
* demo http://datatorrent.github.io/malhar-dashboard-webapp/#/

### Simplified Dashbaord
* Malhar Angular Dashboard  https://github.com/DataTorrent/malhar-angular-dashboard 

### GitHub(simplified version of main dashboard using Angular)
* demo https://github.com/DataTorrent/malhar-angular-dashboard

### Sample Codes 
* Angular Dashboard Source Code (GitHub) https://github.com/DataTorrent/malhar-angular-dashboard/tree/master/src
* Angular Main Dashboard HTML https://github.com/DataTorrent/malhar-angular-dashboard/blob/master/src/components/directives/dashboard/dashboard.html

### Useful Widget Definition in AngularJS
* Angular Widget Directives https://github.com/DataTorrent/malhar-angular-dashboard/blob/master/src/app/directives.js
* Angular Widget Example HTML https://github.com/DataTorrent/malhar-angular-dashboard/blob/master/src/app/template/fluid.html

## Step 5: Understanding gridstack.js and gridstack-angular.js
We need a clean and simple method for displaying our widgets that is draggable, resizable, responsive, and allows us to dynamically add and remove widgets. Gridstack seems to be a great choice to fulfill these goals.

### Gridstack
From its website: gridstack.js is a jQuery plugin for widget layout. This is drag-and-drop multi-column grid. It allows you to build draggable responsive bootstrap v3 friendly layouts.

* Gridstack.js Demo Page http://troolee.github.io/gridstack.js/

* Gridstack API
The gridstack API is very useful for understanding how the plugin functions work, and there is a supplemental description of these functions.

  * gridstack.js API https://github.com/troolee/gridstack.js/tree/master/doc#addwidgetel-x-y-width-height-autoposition-minwidth-maxwidth-minheight-maxheight-id
  * gridstack.js functions https://github.com/DavidKDeutsch/DefinitelyTyped/blob/gridstack-0.2.5/gridstack/gridstack.d.ts

* Gridstack plugin
Gridstack is a JQuery plugin, so we need a method for using it with an AngularJS framework. This may simply involve effectively placing gridstack items in the application, or it may require using an Angular directive to enable dynamically adding widget containers.

* gridstack-angular https://github.com/kdietrich/gridstack-angular/blob/master/dist/gridstack-angular.js
* demo http://kdietrich.github.io/gridstack-angular/demo/

### gridster-angular 
* https://github.com/ManifestWebDesign/angular-gridster

### apache malhar 
* https://github.com/DataTorrent/malhar-dashboard-webapp   
* https://github.com/DataTorrent/malhar-angular-dashboard    
* https://github.com/DataTorrent/malhar-angular-widgets

## Step 6: Using the Yeoman Angular Generator
Yeoman provides a simple way for generating the structure of your codes. With Yeoman, it is possible to generate a "scaffold" of the code defining a basic AngularJS application with individual generators for specific components like directives, routes, controllers, and so on. While it is possible to generate a scaffold of the code for the entire MEAN stack, with both frontend and server side codes, we will stick with a simple AngularJS frontend generator to simplify development.

Yeoman has produced a great codelab tutorial to cover what Yeoman is and how to use it with the Angular generator:

* Yeoman Angular Tutorial http://yeoman.io/codelab/index.html

NOTE: if you find that your initial Yeoman build doesn't have have the correct style, then checkout this issue to add in missing Bower dependencies – https://github.com/yeoman/generator-angular/issues/1116

## Step 7: Building Apps Using AngularJS
### General AngularJS 
* AngularJS API https://docs.angularjs.org/api

### Routing
* AngularJS Routing using ngRoute https://docs.angularjs.org/api/ngRoute
* AngularJS Routing with ngView https://docs.angularjs.org/api/ngRoute/directive/ngView
* AngularJS Routing Tutorial https://docs.angularjs.org/tutorial/step_07
* angularjs ui.router https://angular-ui.github.io/ui-router/site/#/api/ui.router

### Reusing Directives
* Isolating the Scope to re-use a directive https://docs.angularjs.org/guide/directive

### Widgets and JQuery
* Create reusable widgets https://objectpartners.com/2013/08/13/angular-js-create-reusable-html-widgets-with-directives/
* Multiple Modules in AngularJS http://stackoverflow.com/questions/18512434/multiple-module-in-angularjs
* JQuery to AngularJS https://blog.thousandeyes.com/creating-extensible-widgets-part-1-jquery-to-angularjs/

## Step 8: AngularJS coding style
* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
* https://www.toptal.com/angular-js/top-18-most-common-angularjs-developer-mistakes
