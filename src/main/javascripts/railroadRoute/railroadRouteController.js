function RailroadRouteController($scope, railroadRouteService, $q){
    var _this = this;

//------------------------SCOPE VARIABLES---------------------------------


//------------------------LOCAL VARIABLES---------------------------------

//------------------------SCOPE FUNCTIONS---------------------------------
    this.initialize = function(){
        retrieveRouteNodes().then(function(nodeResponse){
            retrieveRouteLinks().then(function(linkResponse){
                _this.nodes = [];
                _this.links = [];
                _.each(nodeResponse, function(node){
                    _this.nodes.push({name: node.name, group: node.group})
                });
                _.each(linkResponse, function(link){
                    _this.links.push({source: link.source, target: link.target, value: link.value})
                });
                createForceGraph(_this.nodes,_this.links)
            })
        });
    };

//------------------------LOCAL FUNCTIONS---------------------------------
    function retrieveRouteNodes(){
        return railroadRouteService.retrieveRouteNodes()
    }

    function retrieveRouteLinks(){
        return railroadRouteService.retrieveRouteLinks()
    }

    function createForceGraph(nodes, links){
        var imageUrl = window.grailsSupport.islandUrl;
        var height = 250,
            width = 250;

        var color = d3.scale.category20b();

        var svg = d3.select("#force-layout").append("svg:svg")
            .attr("viewBox", "0 0 " + width + " " + height )
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", "100%")
            .attr("width", "100%");
//            .attr("path", "d='M5,50 l0,100 l100,0 l0,-100 l-100,0 M215,100 a50,50 0 1 1 -100,0 50,50 0 1 1 100,0 M265,50 l50,100 l-100,0 l50,-100z'")
//            .attr("fill", "'url(#img1)'");

        var img = new Image();
        img.src = imageUrl;

        svg.append('image')
        .attr("xlink:href", imageUrl);

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        force
            .nodes(nodes)
            .links(links)
            .start();

        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function (d) {
                return color(d.group);
            });
//            .call(force.drag);

        node.append("title")
            .text(function (d) {
                return d.name;
            });

        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });
        });

    }
}
railroadRoute.controller('railroadRouteController', RailroadRouteController);