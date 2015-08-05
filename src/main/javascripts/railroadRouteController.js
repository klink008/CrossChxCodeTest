function RailroadRouteController($scope, railroadRouteService){
    var railroadRouteCtrl = $scope;
    var _this = this;

    this.initializeRouteLinks = function(){
        railroadRouteService.retrieveRoutes().then(function(){

        })
    };

    this.width = 960;
    this.height = 500;

    this.color = d3.scale.category20();

    this.force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([_this.width, _this.height]);

    this.svg = d3.select("body").append("svg")
        .attr("width", _this.width)
        .attr("height", _this.height);


}
railroadRoute.controller('railroadRouteController', RailroadRouteController);