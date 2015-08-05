var RailroadRouteDirective = function(){
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'src/main/templates/railroadRoute.html',
        controller: RailroadRouteController,
        controllerAs: 'railroadRouteCtrl'
    }
};
railroadRoute.directive('railroadRoute', RailroadRouteDirective);