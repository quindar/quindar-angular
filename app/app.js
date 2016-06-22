// Program: app.js
// Purpose: AngularJS controller, directives for Quindar mission operations app
// Author:  Ray Lai
// Updated: Apr 29, 2016
// License: MIT
//
var missionOpsApp = angular.module("missionOpsApp", ["ui.router"]);
 missionOpsApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
  .state("home", {
      url: "/",
      views: {
        "sidebar": {
      	   templateUrl: "app/views/sidebar.html"
      	 },
      	 "body" : {
      	   templateUrl: "app/views/body.html"
      	 },
      	 "footer": {
      	   templateUrl: "app/views/footer.html"
      	 }
      }
  })
	.state('about', {
			url:'/about',
      views: {
        "sidebar": {
           templateUrl: "app/views/sidebar.html"
         },
        "about": {
          templateUrl: 'app/views/about.html'
        }
      },
			controller: 'aboutController'
	})
	.state('login', {
			url:'/login',
			views: {
      	 "login" : {
      	   templateUrl: "app/views/login.html"
      	 }
      },
			controller: 'loginController'
	})
	.state('about.detail', {
			url: '/detail/:name',
			templateUrl: 'app/views/aboutdetails.html',
			controller: function($scope, $stateParams, $state) {
				$scope.info = {
					bio: 'This is the detail about ' + $stateParams.name,
				};

				$scope.goToAbout = function(){
					$state.go('^');	
				}
			}
	})  
}]);

missionOpsApp.controller('homeController', ['$scope','$rootScope', function($scope, $rootScope) {
 	
 	//Setting the page properties
 	$rootScope.page = {
 		heading: 'Home',
 		username: "audacyOps",
 		role: "user"
 	};

 }]);

missionOpsApp.controller('aboutController', ['$scope','$rootScope', function($scope, $rootScope) {
 	
 	//Setting the page properties
 	$rootScope.page = {
 		heading: 'About',
 		username: "audacyOps",
 		role: "user"
 	};

 }]);

missionOpsApp.controller('widgetController', ['$scope','$rootScope', function($scope, $rootScope) {
  $scope.userProfile = {
    "username": "guest",
    "location": "nearby",
    "role": "demoUser"
  };

  $scope.widgetSidebarMenu = {
    "navigationHeader": "Quindar",
    "menu1": "My Dashboard",
    "menu2": "My Widgets",
    "menu3": {
      "menu1Name": "Widgets",
      "item1": "Real-time",
      "item2": "Historical",
      "item3": "Custom"
    }
  };

 }]);

missionOpsApp.service('dataService', function() {
  $http.get("http://www.omdbapi.com/?t=abc&tomatoes=true&plot=full")
  .then(function(response){ $scope.heading = response.data; });
});

missionOpsApp.controller('loginController', ['$scope','$rootScope', function($scope, dataService) {


}]);
