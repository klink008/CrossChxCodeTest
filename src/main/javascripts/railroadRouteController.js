function RailroadRouteController($scope, railroadRouteService){
    var _this = this;

//------------------------SCOPE VARIABLES---------------------------------
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

//------------------------LOCAL VARIABLES---------------------------------

//------------------------SCOPE FUNCTIONS---------------------------------
    this.initialize = function(){
        retrieveRouteNodes();
        retrieveRouteLinks();
    };

//------------------------LOCAL FUNCTIONS---------------------------------
    function retrieveRouteNodes(){
        railroadRouteService.retrieveRouteNodes().then(function(data){
            _this.nodes = data;
        })
    }

    function retrieveRouteLinks(){
        railroadRouteService.retrieveRouteLinks().then(function(data){
            _this.links = data;
        })
    }

}
railroadRoute.controller('railroadRouteController', RailroadRouteController);