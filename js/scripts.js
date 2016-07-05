// script.js

    // create the module and name it felarablog
        // also include ngRoute for all our routing needs
    var felarablog = angular.module('felarablog', ['ngRoute', 'ngSanitize']);

    // configure our routes
    felarablog.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the post page
            .when('/post', {
                templateUrl : 'pages/post.html',
                controller  : 'postController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
            
            // pretty urls
            $locationProvider.html5Mode(true);

    });

    // create the controller and inject Angular's $scope
    felarablog.controller('mainController', function($scope, $http) {
        // create a message to display in our view
        $scope.message = 'Larablog!';
    });

    felarablog.controller('postController', function($scope, $http) {
        $scope.message = 'Look! I am an post page.';
        var req = {
            method: 'GET',
            crossDomain: true,
            url: 'http://larablog.dev/api/article/7',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {}
        }

        $http(req).then(function(response){
            var dateData, dateObject, dateReadable;
            data = response.data;
            dateData = data.published_at.substring(0,11);
            dateObject = new Date(Date.parse(dateData));
            dateReadable = dateObject.toDateString();

            data.published_at = dateReadable;
            $scope.author = data.user;
            $scope.article = data;

            $scope.body = data.body;
        }, function(response){
            $scope.error = response.status;
        });

    });

    felarablog.controller('contactController', function($scope, $http) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });

    felarablog.controller('aboutController', function($scope, $http) {
        $scope.message = 'This is an about page!';
    });
