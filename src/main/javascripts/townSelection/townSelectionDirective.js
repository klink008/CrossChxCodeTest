var TownSelectionDirective = function(){
    return {
        restrict: 'E',
        scope: {
            nodes:'='
        },
        templateUrl: 'src/main/templates/townSelection.html',
        controller: TownSelectionController,
        controllerAs: 'townSelectionCtrl'
    }
};
railroadRoute.directive('townSelection', TownSelectionDirective);