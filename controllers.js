var graphSearchCtrl = angular.module('graphSearchCtrl', []);

graphSearchCtrl.controller('searchCtrl', function ($scope, $http) {
    // default to non-prod graphite
    $scope.selectedServer = graphSettings.servers.nonProduction;
    $scope.nodes = [];
    /*
    for testing with local .json file

    $http.get('data/json/test_nodes.json')
    .success(function (data) {
        $scope.test_nodes = data.nodes;
    }).error(function (response) {
        console.log("there was an error in contacting graphite");
    });
    */

    $scope.getNodes = function (env) {
      //get non-prod on load
      if ($scope.nodes.length === 0) {
        $http.get(graphSettings.servers.nonProduction)
          .success(
            function (data) {
              var end = data.length,
                  i;

              for (i = 0; i < end; i++) {
                $scope.nodes.push(data[i].text);
              }
            }
          )
          .error(
            function (response) {
              console.log('there was an error contacting graphite ' + reponse);
            }
          )
        }
        //if they are trying to get the same node list as what already loaded
        if (graphSettings.servers[env] === $scope.selectedServer) {
          return false;
        }
        else {
          $scope.selectedServer = graphSettings.servers[env];
          $http.get($scope.selectedServer)
            .success(
              function (data) {
                var end = data.length,
                    i;

                $scope.nodes = [];

                for (i = 0; i < end; i++) {
                  $scope.nodes.push(data[i].text);
                }
              }
            )
            .error(
              function (response) {
                console.log('there was an error contacting graphite ' + response);
              }
            )
        }
    }

    //by deafult get the non-prod list
    $scope.getNodes('nonProduction');

    /*
    return data:
    [
      0: {
        text: "bb1dvanl01",
        expandable: 1,
        leaf: 0,
        id: "servers.bb1dvanl01",
        allowCHildren: 1
      },
      1: ...
    ]
    */
});

var graphNodeDetailCtrl = angular.module('graphNodeDetailCtrl', []);

graphNodeDetailCtrl.controller('graphNodeDetailCtrl', function ($scope, $http) {
    console.log("graphNodeDetailCtrl has loaded");

    console.log($scope.$parent.selectedServer);

    $scope.selectedServer = $scope.$parent.selectedServer;
});
