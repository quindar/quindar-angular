// Program: quindarWidgetsControllers.js
// Purpose: AngularJS controller for quindar dashboard
// Author:  Ray Lai
// Updated: May 20, 2016
// License: MIT license

var app = angular.module("app", ['gridster', 'ui.bootstrap', 'ui.router','angular-groundtrack','d3','angular-lineplot']);

// ui.router definitions
 app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/dashboard");
  $stateProvider
  .state("home", {
      url: "/",
      views: {
        "sidebar": {
           templateUrl: "app/views/sidebar.html"
         },
         "body" : {
           templateUrl: "app/views/body.html"
         }
      }
  })
  .state("dashboardnoborder", {
      url: "/dashboardnoborder",
      views: {
         "dashboardnoborder" : {
           templateUrl: "app/views/quindarDashboardView.html"
         }
      },
      controller: 'dashboardController'
  })
  .state("dashboard", {
      url: "/dashboard",
      views: {
        "sidebar": {
           templateUrl: "app/views/sidebar.html"
         },
         "dashboard" : {
           templateUrl: "app/views/quindarDashboardView.html"
         }
      },
      controller: 'dashboardController'
  })
  
}]);

// controller for dashboard home page - placeholder
app.controller('homeController', ['$scope','$rootScope', function($scope, $rootScope) {

  // 5/20/2016 RL: Setting the page properties, set an example for $rootScope; unused yet
  $rootScope.page = {
    heading: 'Home',
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
app.controller('dashboardController', ['$scope', '$timeout','d3', 
  function($scope, $timeout, $d3) {

    $scope.gridsterOptions = {
      margins: [20, 20],
      columns: 4,
      draggable: {
        handle: 'h3'
      }
    };

    // 5/20/2016 default quindar dashboard settings. change this section to add new widgets
    // 7/12/2016 RayL: change data structure to array
    $scope.dashboards = [
      {
        id: 0,
        name: 'Basic',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 1 - Line Plot",
          directive: "lineplot"
        }]
      },
      {
        id: 1,
        name: 'Advanced',
        widgets: []
      },
      {
        id: 2,
        name: 'Mission Operations',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 3 - Battery",
          directive: "lineplot"
        }]
      },
      {
        id: 3,
        name: 'Ground Operations',
        widgets: [{
          col: 0,
          row: 0,
          sizeY: 3,
          sizeX: 4,
          name: "Page 4 - Ground Track",
          directive: "groundtrack"
        }]
      },
      {
        id: 4,
        name: 'Custom',
        widgets: []
      }
    ];

    $scope.defaultDashboards = JSON.parse(JSON.stringify($scope.dashboards));
    
    if (localStorage.getItem("audacyWidgetSettings")) {
        $scope.dashboards = JSON.parse(localStorage.getItem("audacyWidgetSettings"));
    }
 
    // 5/20/2016 - standard quindar widget definitions
    var widgetDefinitions = [
      {
        name: 'Line Plot',
        directive: 'lineplot',
        style: {
          width: '33%'
        }
      },
      {
        name: 'Ground Track',
        directive: 'groundtrack',
        dataAttrName: 'chart',
        style: {
          width: '100%'
        }
      }
    ];

    $scope.widgetDefinitions = widgetDefinitions;

    var defaultWidgets = [
      { name: 'Line Plot' },
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

    //$scope.selectedDashboardId = '1';
    $scope.selectedDashboardId = 0;
    $scope.dashboard = $scope.dashboards[0];

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
    };

    $scope.confirmResetYesNo = function(prompt) {
      if (confirm(prompt) == true) {
        $scope.restoreDefaultConfirmed = true;
      } else {
        $scope.restoreDefaultConfirmed = false;
      }
    };

    $scope.addWidget = function() {
      $scope.dashboard.widgets.push({
        name: "New Widget",
        sizeX: 4,
        sizeY: 3
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
      $scope.selectedDashboardId = 0;
      $scope.dashboard = $scope.dashboards[0];
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
          sizeY: 3,
          sizeX: 4,
          name: newWidget.name,
          directive: newWidget.directive
        };
        $scope.dashboard.widgets.push(widgetX);
        $scope.newWidgetItem = undefined; 
      }      
    };


    // 5/20/2016 RayL: when adding new page, it will add 2 default widgets
    $scope.addPage = function() {
      var nextPage = (Object.keys($scope.dashboards).length + 1);
      var newPage = {
        id: nextPage - 1,
        name: "Custom - Page " + nextPage,
        widgets: [{
          col: 0,
          row: 1,
          sizeY: 3,
          sizeX: 4,
          name: "Satellite - Telemetry",
          directive: "lineplot"
        }]
      };
      //$scope.dashboards[nextPage] = newPage;  
      $scope.dashboards.push(newPage); 
      // now to refresh. this is problematic since view-model does not refresh consistently
    
      $scope.dashboard = $scope.dashboards[nextPage - 1];
      $scope.selectedDashboardId = nextPage - 1;
      $scope.changeDashboard(nextPage - 1);      
          
    };

    $scope.$watch('selectedDashboardId', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.dashboard = $scope.dashboards[newVal];
      } else {
        $scope.dashboard = $scope.dashboards[0];
      }
    });
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
        templateUrl: 'app/views/gridsterWidgetSettings.html',
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
// 7/13/2016 RayL: object2Array() not used after I changed dashboards[] data structure
.filter('object2Array', function() {
  return function(input) {
    var out = [];
    for (i in input) {
      out.push(input[i]);
    }
    return out;
  }
});
