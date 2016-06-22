// Program: indexDirectives.js
// Purpose: AngularJS router for quindar dashboard
// Author:  Ray Lai
// Updated: May 18, 2016
// License: MIT license

// AngularJS module definition

app.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, ele, attr, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
          return null;
        }
        return parseInt(viewValue, 10);
      });
    }
  };
}); 

'use strict';
// directive: quindarpice
app.directive('quindarpie', function () {
  return {
    restrict : "AE",
    template: '<div class="quindarpie"></div>',
    //templateUrl: 'app/views/mal/template/widgets/quindarPie/quindarPie.html',
    scope: {
      chart: '='
    },
    //controller: 'FlotCtrl',
    replace: true,
    link: function postLink(scope, element) {
      var pieChart = new google.visualization.PieChart(element[0]);

      function draw(chart) {
      var data = chart.data;

      data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2014',  1000,      400],
        ['2015',  1170,      460],
        ['2016',  660,       1120],
        ['2017',  1030,      540]
      ]);

      var chartOptions = {
        title: 'Quindar Pie Chart',
        curveType: 'function',
        legend: { position: 'bottom' },
        width: 200,
        height: 190
      };

      pieChart.draw(data, chartOptions);
      } 

      scope.$watch('chart', function (chart) {
      if (!chart) {
        chart = {
          data: [] // removed unnecessary comma
        };
      }

      if (chart.data) {
        draw(chart);
      }
      });
    }
  };
});

// directive: quindarlinechart
app.directive('quindarlinechart', function () {
  return {
    restrict : "AE",
    template: '<div class="quindarlinechart"></div>',
    //templateUrl: 'app/views/mal/template/widgets/quindarPie/quindarPie.html',
    scope: {
      chart: '='
    },
    //controller: 'FlotCtrl',
    replace: true,
    link: function postLink(scope, element) {
      var lineChart = new google.visualization.LineChart(element[0]);

      function draw(chart) {
        var data = chart.data;

        var newData = [];
        newData.push(['Time', 'Sensor 1', 'Sensor 2']);
        var newDataLabel = "";
        for (var i = 0; i < 10; i++) {
          newDataLabel = (i*2).toString() + ':00';
          newData.push([newDataLabel, Math.floor((Math.random() * 100) + 1), 
          Math.floor((Math.random() * 100) + 1)]);
        }
        //console.log("newData=" + newData.toString());
        data = google.visualization.arrayToDataTable(newData);

        var chartOptions = {
          title: 'Satellite vehicle temperature - trend',
          curveType: 'function',
          legend: { position: 'bottom' },
          width: 530,
          height: 190
        };

        lineChart.draw(data, chartOptions);
      } // unnecessary comma

      scope.$watch('chart', function (chart) {
        if (!chart) {
          chart = {
            data: [] //removed comma
          };
        }

        if (chart.data) {
          draw(chart);
        }
      });

    }
  };
});

// directive: qindarwidget
app.directive('quindarwidget', ['$compile', function (compile) {
  return {
    restrict: 'AE',
    scope: {
      quindarwidget: '@'
    },
    replace: true,   
    template: '<div></div>',
    controller: ['$scope', function (scope) {
      scope.$watch('quindarwidget', function (value) {
        scope.buildView(value);
      });
    }],

    link: function (scope, elm, attrs) {
      scope.buildView = function (viewName) {
        var z = compile('<' + viewName + '></' + viewName + '>')(scope);
        elm.append(z);
      }
    }
  }
}]);

/**
// 5/20/2016 RL: currently debug wttime directive; not yet ready for use
app.directive('wttime', ['$compile', function (compile, $interval) {
    return {
      restrict: 'AE',
      scope: {
        wttime: '@'
      },
      replace: true,
      controller: ['$scope', function (scope) {
        scope.$watch('wttime', function (value) {
          scope.buildView(value);
        });
      }],
      templateUrl: 'app/views/time.html',
      link: function (scope, elm, attrs) {
        scope.buildView = function (viewName) {
          var z = compile('<' + viewName + '></' + viewName + '>')(scope);
          elm.append(z);
        }

        function update() {
          scope.time = new Date().toLocaleTimeString();
        }

        var promise = $interval(update, 500);

        scope.$on('$destroy', function () {
          $interval.cancel(promise);
        });  
      }
    };
}]);
**/
