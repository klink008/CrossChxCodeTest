var RailroadRouteDirective = function($window){
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'src/main/templates/railroadRoute.html',
        controller: RailroadRouteController,
        controllerAs: 'railroadRouteCtrl',
        link: function(scope,elem,attrs){
            scope.railroadRouteCtrl.initialize();
        }
    }
};
railroadRoute.directive('railroadRoute', RailroadRouteDirective);