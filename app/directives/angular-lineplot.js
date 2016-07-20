// Program: angular-lineplot.js
// Purpose: AngularJS line plot
// Author: Masaki Kakoi
// Updated: June 23, 2016
// License: MIT license

angular.module('angular-lineplot',['app'])
  .directive('lineplot',[ function(){
	return{
	  restrict: 'EA',
	  template: '<div class="col-sm-2"> \
				   <form> \
					 <select class = "listlabel" ng-model="data.sc"> \
					   <option value="Audacy1">AUDACY1</option> \
					   <option value="Audacy2">AUDACY2</option> \
					   <option value="Audacy3">AUDACY3</option> \
					 </select> \
				   </form> \
				 </div> \
			     <div class="col-sm-2"> \
				   <form> \
					 <select class = "listlabel" ng-model="data.dataType"> \
					   <option value="x">X</option> \
					   <option value="y">Y</option> \
					   <option value="z">Z</option> \
					 </select> \
				   </form> \
				 </div> \
	             <div class="col-md-8"> \
				   <ul> \
				     <li style="list-style-type:none"> \
					   <button class = "lineplotbutton" ng-click="loadData()">LOAD</button>\
					   <button class = "lineplotbutton" ng-click="plot()">PLOT</button>\
					   <button class = "lineplotbutton" ng-click="stream()">STREAM</button> \
					   <button class = "lineplotbutton" ng-click="stop()">{{pauseResume}}</button> \
					   <button class = "lineplotbutton" ng-click="home()">HOME</button> \
					   <button class = "lineplotbutton" ng-class="{buttonOn: btns.state}" ng-click="pan()">PAN</button> \
					 </li> \
				   </ul> \
				 </div>\
				 <div id = "flot" class="col-md-12" style="height:600px";"width:900px"> </div> \
				 <p hidden id="dataPlot"></p> ',
	  scope: {
	  },
	  controller: 'lineplotCtr',
	  link: function(scope,element,attributes){
		  
		var setPlatform='ws://'+platform+':'+port;		
	    var socket = io(setPlatform);
      
	    socket.on('connected', function(data) {
	      alert("hi")
	    });	  
        socket.on('error', console.error.bind(console));
        socket.on('message', console.log.bind(console));
		
        socket.on('position', function(telemetryData) {
	      //alert(JSON.parse(telemetryData).subtype)
		  var dType=scope.data.dataType;
		  var sc = scope.data.sc;
		  data_x = JSON.parse(telemetryData).data.timestamp;
		  if (sc == JSON.parse(telemetryData).subtype) {
			
		    switch(dType){
		      case "x":
			    data_y = JSON.parse(telemetryData).data.x;
				break
			  case "y":
			    data_y = JSON.parse(telemetryData).data.y;
                break				
			  case "z":
			    data_y = JSON.parse(telemetryData).data.z;
				break
		    };
		    data_temp=[data_x,data_y];
		    
	        scope.data.dataStream = data_temp;
		  };
	    });
		
	    var plot = null;
        var width = attributes.width || '100%';
        var height = 480;
		
        var data_plot2 = [];	
		var ptNum = 100;
		var delay = 1000;
		var timer;
		
		scope.numdata = 100;
		
		var plotArea = $(element.children()[3]);

        plotArea.css({
          width: width,
          height: height
        });
		
        var plot = $.plot(plotArea, [], {
		  series: {
		  shadowSize: 0	// Drawing is faster without shadows
		  },
		  colors: ['#07D1EA'],
          points: {show: true,
		           radius: 2,
                   lineWidth: 1,
                   fill: true,
          },
          lines: {show: true,
		          lineWidth: 2,
		  },		  
		  axisLabels: {show: true},
		  xaxes: [{
		    axisLabel: "Time",
		  }],
		  yaxes: [{
		  }],
		  yaxis: {
		    show: true,
		    font:{family:"Open Sans", color:"#0AACCF"},
		    tickColor: "#F1F1F5",	
            axisLabelPadding:35,
		  },
		  xaxis: {
		    show: true,
			mode: "time",
			//axisLabelUseCanvas: true,
			axisLabelPadding: 15,			
		    font:{family:"Open Sans", color:"#0AACCF"},
		    tickColor: "#F1F1F5",
		  },
		  grid: {
		    show: true,
            backgroundColor: "#464954",
		    labelMargin: 10,
		    margin: 10,
			color: "#F1F1F5",
		  },
		  legend: {
		    backgroundColor: "#020613",
		  },		
		  zoom: {
		    interactive: true,
		  },
		  pan: {
		    interactive: true,
		    cursor: "move",     // CSS mouse cursor value used when dragging, e.g. "pointer"
		    frameRate: 20,
		  },
		  selection: {
	        mode: "xy",
		  },		
	    });		

		// Disable panning //
		plot.getOptions().pan.interactive =false;
		
		plotArea.bind("plotselected", function (event, ranges) {
  	      // clamp the zooming to prevent eternal zoom

		  if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
		    ranges.xaxis.to = ranges.xaxis.from + 0.00001;
		  }

		  if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
		    ranges.yaxis.to = ranges.yaxis.from + 0.00001;
		  }

  		  // do the zooming
		  updateAxes(ranges.xaxis.from,ranges.xaxis.to,
		    ranges.yaxis.from,ranges.yaxis.to);
		
		  // Don't forget to redraw the plot
		  plot.setupGrid();
		  plot.draw();
		  plot.clearSelection();
	    });		
		
		scope.loadData = function() {
          	  
		  scope.getPosition();			  
		}
		
        scope.plot = function() {	
		  
		  var output = $('#dataPlot').text();
		  data_plot = [];
		  i_add=1;
		  totPts = scope.numdata;
		  for(i=i_add*2;i<totPts*2-1;i=i+2){
		    data_x=parseFloat(output.split(",")[i]);
		    data_y=parseFloat(output.split(",")[i+1]);
		    data_plot.push([data_x*1000, data_y]);
		  };
		  		  
		  plot.setData([{
		    data: data_plot,
		  }]);
		  plot.getAxes().yaxis.options.axisLabel = scope.data.dataType;	
          plot.draw();	         	  
	    }

        scope.stream = function() {
			
		  socket.emit('telemetry', {"type": 'position'});
		  
		  // x is name of the selected data		
	      var x = scope.data.dataType;
		  // type of spacecraft
		  var sc = scope.sc;

		  updateAxes();
          //change axis label		
		  plot.setupGrid();
		  plot.getAxes().yaxis.options.axisLabel = x;
		  
		  scope.pauseResume = "PAUSE";
		  data_plot2.splice(0,ptNum)
		  clearTimeout(timer);
		  updateStream();		
		}		

		scope.stop = function() {
			
		  btnLabel = scope.pauseResume;
		
		  switch(btnLabel){
		    case "PAUSE":
		      scope.pauseResume = "RESUME";
			  clearTimeout(timer);
			  break;
		    case "RESUME":
		      scope.pauseResume = "PAUSE";
			  data_plot2.splice(0,ptNum);
			  updateStream();
			  break;
		  };	
		}
		
		scope.home = function() {
			
		  updateAxes();

		  // Don't forget to redraw the plot
		  plot.setupGrid();
		  plot.draw();
		}
		
		// pan button: 
	    scope.pan = function(){
		  if (scope.btns.state){
		    plot.getOptions().selection.mode = "xy";	
            plot.getOptions().pan.interactive = false;
		  }
		  else{
		    plot.getOptions().selection.mode = null;	
            plot.getOptions().pan.interactive = true;	
		  }
		  this.btns.state =!this.btns.state;			
		}
		
	    function updateStream() {
          socket.emit('telemetry', {"type": 'position'});

		  var data = scope.data.dataStream;  

		  if (data[0] == null){
			  alert("No Data Available!")
			  clearTimeout(timer);
		  }else{
            data_x = data[0];
		    data_y = data[1];
		    data_plot2.push([data_x*1000, data_y]);			
		  
		    if (data_plot2.length > ptNum) {
		      data_plot2.splice(0,1);
		    };
		  
		    plot.setData([{
		      data:data_plot2,	
  		    }]);
		
		    // Since the axes don't change, we don't need to call plot.setupGrid()
		    plot.draw();
		    plot.getAxes().yaxis.options.axisLabel = scope.data.dataType;
		  
		    timer = setTimeout(updateStream, delay);
		  
		    return this;
		  };
		};
		
	    function updateAxes(xLowLim,xUpLim,yLowLim,yUpLim){
	    
		  var axes = plot.getAxes();
		  xaxis = axes.xaxis.options;
		  yaxis = axes.yaxis.options;
		  xaxis.min = xLowLim;
		  xaxis.max = xUpLim;
		  yaxis.min = yLowLim;
		  yaxis.max = yUpLim;	  
	      return this;
		};
	  }
	  
	};  
  }]);