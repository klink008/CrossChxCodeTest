function RailroadRouteController($scope, railroadRouteService, $q){
    var _this = this;

//------------------------SCOPE VARIABLES---------------------------------


//------------------------LOCAL VARIABLES---------------------------------

//------------------------SCOPE FUNCTIONS---------------------------------
    this.initialize = function(){
        retrieveRouteNodes().then(function(nodeResponse){
            retrieveRouteLinks().then(function(linkResponse){
                var nodes = [];
                var links = [];
                _.each(nodeResponse, function(node){
                    nodes.push({name: node.name, group: node.group})
                });
                _.each(linkResponse, function(link){
                    links.push({source: link.source, target: link.target, value: link.value})
                });
                createForceGraph(nodes,links)
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
        var width = 960,
            height = 500;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

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
            })
            .call(force.drag);

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