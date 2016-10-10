angular.module('HomeApp', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/login', {
        controller: 'LoginController',
        templateUrl: 'partials/login'
    });
    $locationProvider.html5Mode(true);

});

//Routing with angular and express
//http://stackoverflow.com/questions/13860899/angular-and-express-routing