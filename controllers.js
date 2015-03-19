var graphSearchCtrl = angular.module('graphSearchCtrl', []);

graphSearchCtrl.controller('searchCtrl', function ($scope, $http) {
    /*
    for testing with local .json file

    $http.get('data/json/test_nodes.json')
    .success(function (data) {
        $scope.test_nodes = data.nodes;
    }).error(function (response) {
        console.log("there was an error in contacting graphite");
    });
    */

    //non-prod graphite HTTP endpoint returns non-prod machines
    $http.get('http://pdxnpgraph01.iovationnp.com/metrics/find/?format=treejson&query=servers.*')
    .success(
      function (data) {
        var end = data.length,
            i;

        $scope.test_nodes = [];

        for (i = 0; i < end; i++) {
          $scope.test_nodes.push(data[i].text)
        }
        console.log($scope.test_nodes);
      }
    ).error(
      function (response) {
        console.log('there was an error contacting graphite. ERROR: ' + response);
      }
    );
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
