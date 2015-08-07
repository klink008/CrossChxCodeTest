function RailroadRouteService(Restangular){
    var _this = this;

    this.retrieveRouteNodes = function(){
        return Restangular.all('CrossChxCodeTest/retrieveRouteNodes').getList();
    };

    this.retrieveRouteLinks = function(){
        return Restangular.all('CrossChxCodeTest/retrieveRouteLinks').getList();
    };
}
railroadRoute.service('railroadRouteService', RailroadRouteService);