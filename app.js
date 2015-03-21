var graphunin = angular.module('graphunin', [
    'ngRoute',
    'ngResource',
    'graphSearchCtrl',
    'graphNodeDetailCtrl'
]);

var graphSettings = {
  servers: {
    production: 'http://wtf.iovation.us/metrics/find/?format=treejson&query=servers.*',
    nonProduction: 'http://pdxnpgraph01.iovationnp.com/metrics/find/?format=treejson&query=servers.*'
  },
  graphWidth: "497",
  graphHeight: "294",
};
