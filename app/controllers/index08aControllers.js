// Program: index08aController.js
// Purpose: AngularJS controller for quindar dashboard
// Author:  Ray Lai
// Updated: May 20, 2016
// License: MIT license

// for google charts only; can be removed for quindar 
google.load('visualization', '1', {'packages':['corechart']});

var app = angular.module("app", ['gridster', 'ui.bootstrap', 'ui.router']);

// ui.router definitions
 app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/dashboard");
  $stateProvider
  .state("home", {
      url: "/",
      views: {
        "sidebar": {
           templateUrl: "app/views/sidebar03.html"
         },
         "body" : {
           templateUrl: "app/views/body06.html"
         },
         "footer": {
           templateUrl: "app/views/footer03.html"
         }
      }
  })
  .state("dashboardnoborder", {
      url: "/dashboardnoborder",
      views: {
         "dashboardnoborder" : {
           templateUrl: "app/views/quindarDashboardView8a.html"
         }
      },
      controller: 'dashboardController'
  })
  .state("dashboard", {
      url: "/dashboard",
      views: {
        "sidebar": {
           templateUrl: "app/views/sidebar03.html"
         },
         "dashboard" : {
           templateUrl: "app/views/quindarDashboardView8a.html"
         }
      },
      controller: 'dashboardController'
  })
  .state("about", {
      url: "/about",
      views: {
        "sidebar": {
           templateUrl: "app/views/sidebar03.html"
         },
         "body" : {
           templateUrl: "app/views/about03.html"
         }
      },
      controller: 'aboutController'
  })
  .state('login', {
      url:'/login',
      views: {
         "login" : {
           templateUrl: "app/views/login03.html"
         }
      },
      controller: 'loginController'
  })
  
  .state("settings", {
      url: "/settings",
      views: {
         "settings" : {
           templateUrl: "app/views/quindarWidgetSettings.html"
         }
      },
      controller: 'dashboardController'
  })
  
}])

// controller for dashboard home page - placeholder
app.controller('homeController', ['$scope','$rootScope', function($scope, $rootScope) {

  // 5/20/2016 RL: Setting the page properties, set an example for $rootScope; unused yet
  $rootScope.page = {
    heading: 'Home',
    username: "Ray",
    role: "user"
  };

 }]);

// controller for dashboard about page - placeholder
app.controller('aboutController', ['$scope','$rootScope', function($scope, $rootScope) {
  
  // 5/20/2016 RL: Setting the page properties, set an example for $rootScope; unused yet
  $rootScope.page = {
    heading: 'About',
    username: "Ray",
    role: "user"
  };

}]);

// controller for dashboard widget controller - unused
app.controller('widgetController', ['$scope','$rootScope', function($scope, $rootScope) {
  // 5/20/2016 RL: Setting the page properties, set an example for $rootScope; unused yet
  $scope.userProfile = {
    "username": "guest",
    "location": "nearby",
    "role": "demoUser"
  };

  // change the side bar menu here. you can use internationalization to add local languages in future
  $scope.widgetSidebarMenu = {
    "navigationHeader": "Quindar",
    "menu1": "My Dashboard",
    "menu2": "Settings",
    "menu3": {
      "menu1Name": "Widgets",
      "item1": "Ground Track",
      "item2": "Line Plot",
      "item3": "Custom"
    }
  };

}]);

// controller: dashboardControllerfor dashboard widgets
app.controller('dashboardController', ['$scope', '$timeout', 
  function($scope, $timeout) {

    $scope.gridsterOptions = {
      margins: [20, 20],
      columns: 4,
      draggable: {
        handle: 'h3'
      }
    };

    // 5/20/2016 default quindar dashboard settings. change this section to add new widgets
    $scope.dashboards = {
      '1': {
        id: '1',
        name: 'Basic',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 1,
          sizeX: 2,
          name: "Page 1 - Line Plot",
          directive: "quindarlinechart"
        }, {
          col: 2,
          row: 0,
          sizeY: 1,
          sizeX: 1,
          name: "Page 1- Countdown Clock",
          directive: "wttime"
        }]
      },
      '2': {
        id: '2',
        name: 'Advanced',
        widgets: [{
          col: 0,
          row: 1,
          sizeY: 1,
          sizeX: 3,
          name: "Page 2 - Countdown Clock",
          directive: "wttime"
        }, {
          col: 3,
          row: 1,
          sizeY: 1,
          sizeX: 1,
          name: "Page 2 - Thruster",
          directive: "wttime"
        }]
      },
      '3': {
        id: '3',
        name: 'Mission Operations',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 1,
          sizeX: 1,
          name: "Page 3 - Quindar Widget 1",
          directive: "quindarpie"
        }, {
          col: 2,
          row: 0,
          sizeY: 1,
          sizeX: 2,
          name: "Page 3 - Quindar Widget 2",
          directive: "quindarlinechart"
        }]
      },
      '4': {
        id: '4',
        name: 'Ground Operations',
        widgets: [{
          col: 1,
          row: 1,
          sizeY: 1,
          sizeX: 3,
          name: "Page 4 - Quindar Widget 3",
          directive: "quindarpie"
        }, {
          col: 1,
          row: 2,
          sizeY: 1,
          sizeX: 3,
          name: "Page 4 - Ground Track",
          directive: "quindarlinechart"
        }]
      },
      '5': {
        id: '5',
        name: 'Custom',
        widgets: [{
          col: 0,
          row: 1,
          sizeY: 2,
          sizeX: 4,
          name: "Page 5 - Custom Widget 1",
          directive: "wt-random"
        }, {
          col: 0,
          row: 2,
          sizeY: 2,
          sizeX: 4,
          name: "Page 5 - Telemetry: fuel breakdown",
          directive: "quindarpie"
        }]
      },
    };

    $scope.defaultDashboards = JSON.parse(JSON.stringify($scope.dashboards));
    
    if (localStorage.getItem("audacyWidgetSettings")) {
        $scope.dashboards = JSON.parse(localStorage.getItem("audacyWidgetSettings"));
    }
 
    // 5/20/2016 - standard quindar widget definitions
    var widgetDefinitions = [
      {
        name: 'Line Plot',
        directive: 'quindarlinechart',
        style: {
          width: '33%'
        }
      },
      {
        name: 'Countdown Clock',
        directive: 'wttime',
        style: {
          width: '33%'
        }
      },
      {
        name: 'Quindar Pie',
        directive: 'quindarpie',
        dataAttrName: 'chart',
        style: {
          width: '50%'
        }
      },
      {
        name: 'Ground Track',
        directive: 'wt-random',
        dataAttrName: 'chart',
        style: {
          width: '50%'
        }
      },
    ];

    $scope.widgetDefinitions = widgetDefinitions;

    var defaultWidgets = [
      { name: 'Line Plot' },
      { name: 'Countdown Clock' },
      { name: 'Quindar Pie' },
      { name: 'Ground Track' }
    ];

    $scope.clearOptions = [
      { name: "Clear Page"},
      { name: "Clear Settings"},
      { name: "Restore Settings"}
    ];

    $scope.dashboardOptions = {
      widgetButtons: true,
      widgetDefinitions: widgetDefinitions,
      defaultWidgets: defaultWidgets
    };

    $scope.selectedDashboardId = '1';
    $scope.dashboard = $scope.dashboards[1];

    $scope.clearConfirmed = false;
    $scope.restoreDefaultConfirmed = false;


    // widget settings
    $scope.widgetSettings = {
      id: "audacyGuestUser",
      widgetLocalStorage: true
    };

    $scope.confirmClearYesNo = function(prompt) {
      if (confirm(prompt) == true) {
        $scope.clearConfirmed = true;
      } else {
        $scope.clearConfirmed = false;
      }
    }

    $scope.confirmResetYesNo = function(prompt) {
      if (confirm(prompt) == true) {
        $scope.restoreDefaultConfirmed = true;
      } else {
        $scope.restoreDefaultConfirmed = false;
      }
    }

    $scope.addWidget = function() {
      $scope.dashboard.widgets.push({
        name: "New Widget",
        sizeX: 1,
        sizeY: 1
      });
    };

    // 5/16/2016   22:14 RL regressiont testing
    $scope.clearHow = function(x) {
      switch (x) {
        case 'Clear Page':
          $scope.clearPage();
          break;
        case 'Clear Settings':
          $scope.confirmClearYesNo("Are you sure to clear your widget settings?");
          if ($scope.clearConfirmed) {
            $scope.clearLocalStorage();
          };
          break;
        case 'Restore Settings':
          //console.log("before i ask, restoreWidgetDefault() before restore= " + JSON.stringify($scope.defaultDashboards));
          $scope.confirmResetYesNo("Are you sure to restore your default widget settings?");
          if ($scope.restoreDefaultConfirmed) {
            $scope.restoreWidgetDefault();
          };
          break;    
        default:
          //do nothing;
      } 
    };

    $scope.clearPage = function() {
      $scope.dashboard.widgets = [];
      //console.log("clearPage() defaultDashboards=" + JSON.stringify($scope.defaultDashboards));
    };

    $scope.clearLocalStorage = function() {
      $scope.dashboard.widgets = [];
      localStorage.clear();
    };

    $scope.restoreWidgetDefault = function() {
      //console.log("restoreWidgetDefault() before restore= " + JSON.stringify($scope.defaultDashboards));
      $scope.dashboards = JSON.parse(JSON.stringify($scope.defaultDashboards));
      $scope.selectedDashboardId = '1';
      $scope.dashboard = $scope.dashboards[1];
      //console.log("restoreWidgetDefault() after restore= " + JSON.stringify($scope.dashboards));
    };

    $scope.loadWidgets = function() {
      var secretStuff = localStorage.getItem("audacyWidgetSettings");
      $scope.dashboards = JSON.parse(secretStuff);
      //$scope.selectedDashboardId = '1';
      //$scope.dashboard = $scope.dashboards[1];
    };

    // 5/20/2016 RL: not used today; am testing it now
    $scope.saveWidgetsCloud = function() {
      // noop
    };

    $scope.saveWidgets = function() {
      localStorage.setItem("audacyWidgetSettings", JSON.stringify($scope.dashboards));
    };

    $scope.clearWidgets = function() {
      $scope.dashboard.widgets = [];
      localStorage.clear();
    }; 

    $scope.changeDashboard = function(xId) {
      $scope.selectedDashboardId = xId;
      $scope.dashboard = $scope.dashboards[xId];
    };

    // 5/11/2016 RL: boolean flag (ng-model) used in Add Widgets and Clear widgetes
    $scope.addWidgetDropdownMenu = false;
    $scope.clearDropdownMenu = false;

    // 5/20/2016 RL: unused today, but am testing it
    if (localStorage.getItem('quindarDashboardSettings')) {
      //console.log('(read)localStorage=' + localStorage.getItem('quindarDashboardSettings'));
    };

    $scope.newWidgetItem = undefined; // $scope.widgetDefinitions[0]; // set default to first widget directive

    // 5/20/2016 RL: when adding new widget...
    $scope.addWidget = function(newWidget) {
      if (newWidget === undefined) {
      } else if (newWidget !== "xxx") {  // xxx is used for error control. xxx is never defined in widgets
        //console.log('name=' + newWidget.name + '   directive=' + newWidget.directive);
        var widgetX = {
          col: 3,
          row: 1,
          sizeY: 1,
          sizeX: 2,
          name: newWidget.name,
          directive: newWidget.directive
        };
        $scope.dashboard.widgets.push(widgetX);
        $scope.newWidgetItem = undefined; 
      }      
    };

    // 5/20/2016 RL: when adding new page, it will add 2 default widgets
    $scope.addPage = function() {
      var nextPage = (Object.keys($scope.dashboards).length + 1).toString();
      var newPage = {
        id: nextPage,
        name: "Custom - Page " + nextPage,
        widgets: [{
          col: 0,
          row: 1,
          sizeY: 1,
          sizeX: 2,
          name: "Satellite - Temperature",
          directive: "quindarlinechart"
        }, {
          col: 0,
          row: 2,
          sizeY: 1,
          sizeX: 2,
          name: "Satellite - Fuel",
          directive: "quindarpie"
        }]
      };
      $scope.dashboards[nextPage] = newPage;   
      // now to refresh. this is problematic since view-model does not refresh consistently
  
      $scope.changeDashboard(nextPage);
      $scope.selectedDashboardId = nextPage;
      $scope.dashboard = $scope.dashboards[nextPage];
    };
  }
])

// controller: CustomWidgetCtrl - for widget settings (modal, popup)
.controller('CustomWidgetCtrl', ['$scope', '$modal',
  function($scope, $modal) {
    $scope.remove = function(widget) {
      $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
    };

    $scope.openSettings = function(widget) {
      $modal.open({
        scope: $scope,
        templateUrl: 'app/views/gridsterWidget_settings.html',
        controller: 'WidgetSettingsCtrl',
        resolve: {
          widget: function() {
            return widget;
          }
        }
      });
    };
  }
])

// controller: WidgetSettingsCtrl - for widget settings (modal, popup)
.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
  function($scope, $timeout, $rootScope, $modalInstance, widget) {
    $scope.widget = widget;

    $scope.form = {
      name: widget.name,
      sizeX: widget.sizeX,
      sizeY: widget.sizeY,
      col: widget.col,
      row: widget.row
    };

    $scope.sizeOptions = [{
      id: '1',
      name: '1'
    }, {
      id: '2',
      name: '2'
    }, {
      id: '3',
      name: '3'
    }, {
      id: '4',
      name: '4'
    }];

    $scope.dismiss = function() {
      $modalInstance.dismiss();
    };

    $scope.remove = function() {
      $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
      $modalInstance.close();
    };

    $scope.submit = function() {
      angular.extend(widget, $scope.form);

      $modalInstance.close(widget);
    };

  }
])
.filter('object2Array', function() {
  return function(input) {
    var out = [];
    for (i in input) {
      out.push(input[i]);
    }
    return out;
  }
});
