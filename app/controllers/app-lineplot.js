// Program: angular-lineplot.js
// Purpose: AngularJS line plot
// Author: Masaki Kakoi
// Updated: June 23, 2016
// License: MIT license

var app = angular.module('app');

app.controller('lineplotCtr',['$scope', function($scope) {
  
  $scope.getPosition = function (){
	   
	var output=[]; 
	var d_type = document.getElementById('data').value;//$scope.datatype;
    var num_data = $scope.numdata;
    var sc = document.getElementById('sc').value;//$scope.sc;  
    var x = 'http://platform.audacy.space:7902/services/v1/position/'+sc+'/'+num_data;
    	
	$.ajax({
        url: x
    }).then(function(data) {
	   switch(d_type){
		 case "x":
		   for(i=0; i < num_data; i++){
		     output.push([data.data[i].timestamp, data.data[i].x]);				 
		   };
		   break;
		 case "y": 
		   for(i=0; i < num_data; i++){
		     output.push([data.data[i].timestamp, data.data[i].y]);			 
		   };
		   break;
		 case "z": 
		   for(i=0; i < num_data; i++){
		     output.push([data.data[i].timestamp, data.data[i].z]);			 
		   };
	       break;	   
	   };
       
       $("#dataPlot").text(output);
	   //alert(output)
    });
	

  };
	
	
}]);
