function RailroadRouteService(Restangular){
    var _this = this;

    this.retrieveRouteNodes = function(){
        return Restangular.all('retrieveRouteNodes').getList();
    };

    this.retrieveRouteLinks = function(){
        return Restangular.all('retrieveRouteLinks').getList();
    };
}
railroadRoute.service('railroadRouteService', RailroadRouteService);