var RailroadRouteDirective = function(){
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'src/main/templates/railroadRoute.html',
        controller: RailroadRouteController,
        controllerAs: 'railroadRouteCtrl',
        link: function(scope,elem,attrs){
            scope.railroadRouteCtrl.initializeRouteLinks();
//            d3.json("trainRoutes.json", function(error, graph) {
//                if (error) throw error;
//
//                force
//                    .nodes(graph.nodes)
//                    .links(graph.links)
//                    .start();
//
//                var link = svg.selectAll(".link")
//                    .data(graph.links)
//                    .enter().append("line")
//                    .attr("class", "link")
//                    .style("stroke-width", function(d) { return Math.sqrt(d.value); });
//
//                var node = svg.selectAll(".node")
//                    .data(graph.nodes)
//                    .enter().append("circle")
//                    .attr("class", "node")
//                    .attr("r", 5)
//                    .style("fill", function(d) { return color(d.group); })
//                    .call(force.drag);
//
//                node.append("title")
//                    .text(function(d) { return d.name; });
//
//                force.on("tick", function() {
//                    link.attr("x1", function(d) { return d.source.x; })
//                        .attr("y1", function(d) { return d.source.y; })
//                        .attr("x2", function(d) { return d.target.x; })
//                        .attr("y2", function(d) { return d.target.y; });
//
//                    node.attr("cx", function(d) { return d.x; })
//                        .attr("cy", function(d) { return d.y; });
//                });
//            });
        }
    }
};
railroadRoute.directive('railroadRoute', RailroadRouteDirective);