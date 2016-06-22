angular.module('angular-groundtrack',['d3'])
  .directive('groundtrack',['$timeout','d3',function($timeout, d3) {
	  return {
		  restrict: 'EA',
		  template: '<div class="quindarworldmap" width=100% - 100px -100px > \
	                   <ul style="list-style-type:none"> \
			            <li> \
                         <button class="groundbutton" ng-click="goHome()"> HOME </button> \
						 <button class="groundbutton" ng-click="connect()"> CONNECT </button>\
						 <button class="groundbutton" ng-click="stream()"> STREAM </button> \
						 <button class="groundbutton" ng-click="stop()"> STOP </button> \
						 <button class="groundbutton" ng-click="clear()"> CLEAR </button> \
	                    </li> \
				       </ul> \
			         </div>',
		  scope: {
			audacy1: '&',
            audacy2: '&',
            audacy3: '&'
		          		
		  },
		  link: function(scope,element,attributes) {
		  
		    var data_plot1=[[0,0]];
            var data_plot2=[[0,0]];
            var data_plot3=[[0,0]];  
            data_plot1.pop();
            data_plot2.pop();
            data_plot3.pop();
      
	        var delay = 1000;	// Time interval for plotting trajectory
            var timer;
			var L_pts = 36000;	// Number of points on trajectory
	        
			var width = 950;
			var height = 600;
 
			// ground station locations
			var dataset =[[-122.4194,37.7749],[-3.7038,40.4168],[103.8198,1.3521]];;
			
	        var projection = d3.geo.equirectangular()
	                           .center([0,0])
	                           .scale((width + 1) / 2 / Math.PI)
						       .translate([width/2,height/2])
                               .precision(.1);						   
						   
            var graticule = d3.geo.graticule();

            var path = d3.geo.path()
                         .projection(projection);

            var graticule = d3.geo.graticule();

            var svg = d3.select(element[0]).append("svg")
                        .attr("width", width)
                        .attr("height", height);

	        var g = svg.append("g");
	        var route = g.append("g");
            var plane = g.append("g");
      
            // Plot world map
            d3.json("../../images/world-110m.json", function(error, world) {
              if (error) throw error;

              g.insert("path", ".graticule")
               .datum(topojson.feature(world, world.objects.land))
               .attr("class", "land")
               .attr("d", path);

              g.insert("path", ".graticule")
               .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
               .attr("class", "boundary")
               .attr("d", path);
		
              g.append("path")
               .datum(graticule)
               .attr("d", path)
               .style("fill","none")
	           .style("stroke","#666")
	           .style("stroke-width", ".5px")
	           .style("stroke-opacity", ".5");	 
		 
		      g.selectAll("track")
	           .data(dataset)
	           .enter()
               .append("svg:image")
	           .attr("xlink:href","../../images/Segment_Icons_Black-05.png")//icon_51440.svg best-satellite-dish.png
	           .attr("x",function(d){return projection(d)[0]-5;})
	           .attr("y",function(d){return projection(d)[1]-5;})					
	           .attr("width","10")
	           .attr("height","10");	
            });	

			zoom = d3.behavior.zoom()
	               .scale(1)
	               .scaleExtent([1,8])
	               .on("zoom",function(){
	       	         g.attr("transform","translate("+
		             d3.event.translate.join(",")+")scale("+
		             d3.event.scale+")");
                   });
			
            g.call(zoom)
             .on("mousedown.zoom",null);
	   

            scope.goHome = function() {
              zoom.translate([0,0])
	              .scale(1); 
	          g.transition()
	           .attr("transform","translate(0,0)");   	
	        };  
			
			var socket = io('ws://platform.audacy.space:7904');
      
	        socket.on('connected', function(data) {
	        alert("hi")
	        });	  
            socket.on('error', console.error.bind(console));
            socket.on('message', console.log.bind(console));	  
	
	        scope.connect = function () {
		      alert("connect");
		      socket.emit('telemetry', {"type": 'position', "room": 'Audacy1'});	//Audacy1
	          socket.emit('telemetry', {"type": 'position', "room": 'Audacy2'});    //Audacy2
	          socket.emit('telemetry', {"type": 'position', "room": 'Audacy3'});    //Audacy3  
	        };
			
			scope.stream = function() {
				
				updateStream();
			};
			
			scope.stop = function() {
				
				clearTimeout(timer);
				
			};
			
			scope.clear = function() {
				
				g.selectAll("path.route").remove();
                g.selectAll("path.plane").remove();
	
	            L = data_plot1.length;
	            data_plot1.splice(0,L);
                clearTimeout(timer);
			};
			
			function updateStream() {
			  	
		      socket.emit('telemetry', {"type": 'position', "room": 'Audacy1'});	//Audacy1
	          socket.emit('telemetry', {"type": 'position', "room": 'Audacy2'});    //Audacy2
	          socket.emit('telemetry', {"type": 'position', "room": 'Audacy3'});    //Audacy3  
			  
		      var data1=scope.audacy1;
	          var data2=scope.audacy2;
              var data3=scope.audacy3;
	
              data_x1 = data1[0];
	          data_y1 = data1[1];
	          data_z1 = data1[2];

              data_x2 = data2[0];
	          data_y2 = data2[1];
	          data_z2 = data2[2];

              data_x3 = data3[0];
	          data_y3 = data3[1];
	          data_z3 = data3[2]; 

 			  /** Audacy1 **/
	          // Calculate longitude and latitude from the satellite position x, y, z.
	          // The values (x,y,z) must be Earth fixed.
	          r = Math.sqrt(Math.pow(data_x1,2)+Math.pow(data_y1,2)+Math.pow(data_z1,2));
	          longitude = Math.atan2(data_y1,data_x1)/Math.PI*180;
	          latitude = Math.asin(data_z1/r)/Math.PI*180;
			
		      data_plot1.push([longitude, latitude]);	
              var L = data_plot1.length;	// length of data_plot1

	          var sat_coord = projGround([data_plot1[L-1][0],data_plot1[L-1][1]]);
              var sat_x = sat_coord[0];
	          var sat_y = sat_coord[1];

	          g.selectAll("path.route").remove();
              g.selectAll("path.plane").remove();
	
	          route1 = g.append("path")
                        .datum({type: "LineString", coordinates: data_plot1})	
                        .attr("class", "route")
                        .attr("d", path)
			            .style("stroke","red")
			            .style("fill", "none");
              plane1 = g.append("path")
                        .attr("class", "plane")
			            .attr("transform","translate(" + sat_x + "," + sat_y + ") scale("+.2+")")
			            .attr("d","M32.2,29.7h-1.6v-3c0-0.1-0.1-0.3-0.3-0.3H10.7c-0.1,0-0.3,0.1-0.3,0.3v7.5c0,0.1,0.1,0.3,0.3,0.3h19.6c0.1,0,0.3-0.1,0.3-0.3v-2.9h1.6V29.7z M39.8,29.7h1.6v-3c0-0.1,0.1-0.3,0.3-0.3h19.6c0.1,0,0.3,0.1,0.3,0.3v7.5c0,0.1-0.1,0.3-0.3,0.3H41.7c-0.1,0-0.3-0.1-0.3-0.3v-2.9h-1.6V29.7z M37,34.4h-2c-1.5,0-2.8-1.2-2.8-2.8V24c0-1.5,1.2-2.8,2.8-2.8h2c1.5,0,2.8,1.2,2.8,2.8v7.6C39.8,33.1,38.5,34.4,37,34.4z M36,43.2c-3.1,0-5.7-2.6-5.7-5.7h0.6c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1h0.6C41.7,40.7,39.1,43.2,36,43.2z M36,46.9c-5.2,0-9.4-4.2-9.4-9.4h0.6c0,4.9,3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8h0.6C45.3,42.7,41.1,46.9,36,46.9z M36,50.7c-7.3,0-13.2-5.9-13.2-13.2h0.6c0,7,5.7,12.6,12.6,12.6s12.6-5.7,12.6-12.6h0.6C49.2,44.8,43.3,50.7,36,50.7z")
			            //.attr("d","M180,209.7c-9.4,0-18.3,1.3-24.1,13.1l-4.4,8.9h57l-4.4-8.9C198.3,210.9,189.4,209.7,180,209.7z M151.3,177.2h4.9v-9.7h-4.9c-2.1,0-4,1.4-4.6,3.3H135v0.9H92.2v1.4H135v0.9h11.6C147.3,175.9,149.1,177.2,151.3,177.2z M225,173.9v-0.9h42.9v-1.4H225v-0.9h-11.6c-0.6-1.9-2.5-3.3-4.6-3.3h-4.9v9.7h4.9c2.1,0,4-1.4,4.6-3.3H225z M149.5,237.1h22.7l5.1,13.4v4.9c0,1.5,1.2,2.7,2.7,2.7s2.7-1.2,2.7-2.7v-4.9l5.1-13.4h22.7v-3.2h-61.1V237.1z M180.8,249.3h-1.5l-4.7-12.2h11L180.8,249.3z")
					    .style("stroke","black")
					    .style("fill","cyan");
			
			  /** Audacy2 **/
	          // Calculate longitude and latitude from the satellite position x, y, z.
	          // The values (x,y,z) must be Earth fixed.
	          r = Math.sqrt(Math.pow(data_x2,2)+Math.pow(data_y2,2)+Math.pow(data_z2,2));
	          longitude = Math.atan2(data_y2,data_x2)/Math.PI*180;
	          latitude = Math.asin(data_z2/r)/Math.PI*180;
	
	          data_plot2.push([longitude, latitude]);	
              L = data_plot2.length;	// length of data_plot2

	          var sat_coord = projGround([data_plot2[L-1][0],data_plot2[L-1][1]]);
              var sat_x = sat_coord[0];
	          var sat_y = sat_coord[1];

              route2 = g.append("path")
                        .datum({type: "LineString", coordinates: data_plot2})	
                        .attr("class", "route")
                        .attr("d", path)
			            .style("stroke","red")
			            .style("fill", "none");
              plane2 = g.append("path")
                        .attr("class", "plane")
			            .attr("transform","translate(" + sat_x + "," + sat_y + ") scale("+.2+")")
			            .attr("d","M32.2,29.7h-1.6v-3c0-0.1-0.1-0.3-0.3-0.3H10.7c-0.1,0-0.3,0.1-0.3,0.3v7.5c0,0.1,0.1,0.3,0.3,0.3h19.6c0.1,0,0.3-0.1,0.3-0.3v-2.9h1.6V29.7z M39.8,29.7h1.6v-3c0-0.1,0.1-0.3,0.3-0.3h19.6c0.1,0,0.3,0.1,0.3,0.3v7.5c0,0.1-0.1,0.3-0.3,0.3H41.7c-0.1,0-0.3-0.1-0.3-0.3v-2.9h-1.6V29.7z M37,34.4h-2c-1.5,0-2.8-1.2-2.8-2.8V24c0-1.5,1.2-2.8,2.8-2.8h2c1.5,0,2.8,1.2,2.8,2.8v7.6C39.8,33.1,38.5,34.4,37,34.4z M36,43.2c-3.1,0-5.7-2.6-5.7-5.7h0.6c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1h0.6C41.7,40.7,39.1,43.2,36,43.2z M36,46.9c-5.2,0-9.4-4.2-9.4-9.4h0.6c0,4.9,3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8h0.6C45.3,42.7,41.1,46.9,36,46.9z M36,50.7c-7.3,0-13.2-5.9-13.2-13.2h0.6c0,7,5.7,12.6,12.6,12.6s12.6-5.7,12.6-12.6h0.6C49.2,44.8,43.3,50.7,36,50.7z")
			            .style("stroke","black")
						.style("fill","cyan");
			
			  /** Audacy3 **/
	          // Calculate longitude and latitude from the satellite position x, y, z.
	          // The values (x,y,z) must be Earth fixed.
	          r = Math.sqrt(Math.pow(data_x3,2)+Math.pow(data_y3,2)+Math.pow(data_z3,2));
	          longitude = Math.atan2(data_y3,data_x3)/Math.PI*180;
	          latitude = Math.asin(data_z3/r)/Math.PI*180;
	
	          data_plot3.push([longitude, latitude]);	
              L = data_plot3.length;	// length of data_plot3

	          var sat_coord = projGround([data_plot3[L-1][0],data_plot3[L-1][1]]);
              var sat_x = sat_coord[0];
	          var sat_y = sat_coord[1];
	
	          route3 = g.append("path")
                        .datum({type: "LineString", coordinates: data_plot3})	
                        .attr("class", "route")
                        .attr("d", path)
			            .style("stroke","red")
			            .style("fill", "none");
              plane3 = g.append("path")
                        .attr("class", "plane")
			            .attr("transform","translate(" + sat_x + "," + sat_y + ") scale("+.2+")")
			            .attr("d","M32.2,29.7h-1.6v-3c0-0.1-0.1-0.3-0.3-0.3H10.7c-0.1,0-0.3,0.1-0.3,0.3v7.5c0,0.1,0.1,0.3,0.3,0.3h19.6c0.1,0,0.3-0.1,0.3-0.3v-2.9h1.6V29.7z M39.8,29.7h1.6v-3c0-0.1,0.1-0.3,0.3-0.3h19.6c0.1,0,0.3,0.1,0.3,0.3v7.5c0,0.1-0.1,0.3-0.3,0.3H41.7c-0.1,0-0.3-0.1-0.3-0.3v-2.9h-1.6V29.7z M37,34.4h-2c-1.5,0-2.8-1.2-2.8-2.8V24c0-1.5,1.2-2.8,2.8-2.8h2c1.5,0,2.8,1.2,2.8,2.8v7.6C39.8,33.1,38.5,34.4,37,34.4z M36,43.2c-3.1,0-5.7-2.6-5.7-5.7h0.6c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1h0.6C41.7,40.7,39.1,43.2,36,43.2z M36,46.9c-5.2,0-9.4-4.2-9.4-9.4h0.6c0,4.9,3.9,8.8,8.8,8.8s8.8-3.9,8.8-8.8h0.6C45.3,42.7,41.1,46.9,36,46.9z M36,50.7c-7.3,0-13.2-5.9-13.2-13.2h0.6c0,7,5.7,12.6,12.6,12.6s12.6-5.7,12.6-12.6h0.6C49.2,44.8,43.3,50.7,36,50.7z")
			            .style("stroke","black")
						.style("fill","cyan");
					  
			  if (L > L_pts) {
    	        data_plot1.splice(L_pts-1,1); // Erase data 
				data_plot2.splice(L_pts-1,1); // Erase data 
				data_plot3.splice(L_pts-1,1); // Erase data 
			  }
			  
			  timer = setTimeout(updateStream, delay);
		    }

            /** position **/
            socket.on('position', function(telemetryData) {
	          // obtain satellite state
	          //alert(JSON.parse(telemetryData).data.x)
	          if (JSON.parse(telemetryData).subtype == 'Audacy1') {
		        data_x1 = JSON.parse(telemetryData).data.x;
		        data_y1 = JSON.parse(telemetryData).data.y;			
		        data_z1 = JSON.parse(telemetryData).data.z;
		        data_vx1 = JSON.parse(telemetryData).data.vx;
		        data_vy1 = JSON.parse(telemetryData).data.vy;			
		        data_vz1 = JSON.parse(telemetryData).data.vz;
			  
			    data_temp=[data_x1, data_y1, data_z1, data_vx1, data_vy1, data_vz1];
		        scope.audacy1=data_temp;
	        
			  } else if (JSON.parse(telemetryData).subtype == 'Audacy2') {
		        data_x2 = JSON.parse(telemetryData).data.x;
		        data_y2 = JSON.parse(telemetryData).data.y;			
		        data_z2 = JSON.parse(telemetryData).data.z;
		        data_vx2 = JSON.parse(telemetryData).data.vx;
		        data_vy2 = JSON.parse(telemetryData).data.vy;			
		        data_vz2 = JSON.parse(telemetryData).data.vz;
			
			    data_temp=[data_x2, data_y2, data_z2, data_vx2, data_vy2, data_vz2];
		        scope.audacy2=data_temp;
			
			  } else if (JSON.parse(telemetryData).subtype == 'Audacy3') {
		        data_x3 = JSON.parse(telemetryData).data.x;
		        data_y3 = JSON.parse(telemetryData).data.y;			
		        data_z3 = JSON.parse(telemetryData).data.z;
		        data_vx3 = JSON.parse(telemetryData).data.vx;
		        data_vy3 = JSON.parse(telemetryData).data.vy;			
		        data_vz3 = JSON.parse(telemetryData).data.vz;
			  
			    data_temp=[data_x3, data_y3, data_z3, data_vx3, data_vy3, data_vz3];
		        scope.audacy3=data_temp;
			  }
			
			});
	
	 
        function transition(plane, route) {
          var l = route.node().getTotalLength();
          plane.transition()
               .duration(10000)
               .attrTween("transform", delta(route.node()))
		       .remove();
        }
  
        function delta(path) {
          var l = path.getTotalLength();

          return function(i) {
            return function(t) {

              var p = path.getPointAtLength(t * l);
			  var t2 = Math.min(t+0.05,1);
		      var p2 = path.getPointAtLength(t2*l);
		  
		      var x = p2.x-p.x;
		      var y = p2.y-p.y;
		      var r = 90-Math.atan2(-y,x)*180/Math.PI;
		  
              return "translate(" + p.x + "," + p.y + ") scale("+.5+") rotate("+r+")";
            }
          }
        }

        function projGround(d){
			return projection(d);
        }
  
	  }
	  
  };
}]);
