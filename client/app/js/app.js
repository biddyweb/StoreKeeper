'use strict';

var storekeeperApp = angular.module('storekeeperApp', [
    'mgcrea.ngStrap',
    'ngSanitize',
    'ngRoute',
    //'ngAnimate',
    'restangular',
    'gettext',
    'smart-table',
    'appControllers',
    'appFactories',
    'appFilters',
    'appServices'
]);


storekeeperApp.config(function ($modalProvider) {
    angular.extend($modalProvider.defaults, {
        html: true
    });
});


storekeeperApp.config(function ($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        }).
        when('/main', {
            templateUrl: 'partials/main.html',
            controller: 'MainController'
        }).
        otherwise({
            redirectTo: '/main'
        });
});


storekeeperApp.run(function ($rootScope, $location, SessionFactory) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!next.$$route) {
            return
        }
        SessionFactory.getSession().then(function (session) {
            $rootScope.session = session;
        }, function () {
            if (next.$$route.originalPath != '/login') {
                event.preventDefault();
                $location.path('/login');
            }
        });
    })
});


storekeeperApp.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('api');
});


storekeeperApp.run(function (gettextCatalog, ConfigFactory, HelperFactory) {
    ConfigFactory.getConfig().then(function (config) {
        var language = config.forced_language;
        if (language == null) {
            language = window.navigator.userLanguage || window.navigator.language; // "en" or "en-US"
            language = language.split("-")[0];
        }
        gettextCatalog.baseLanguage = 'en';
        gettextCatalog.debug = config.debug;
        gettextCatalog.setCurrentLanguage(language);
    }, HelperFactory.showResponseError);
});


storekeeperApp.config(function($tooltipProvider) {
    angular.extend($tooltipProvider.defaults, {
        delay: { show: 600, hide: 100 }
    });
});
