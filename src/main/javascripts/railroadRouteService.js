function RailroadRouteService(Restangular){
    var _this = this;

    this.retrieveRoutes = function(){
        return Restangular.all('retrieveRoutes').getList();
    }
}
railroadRoute.service('railroadRouteService', RailroadRouteService);