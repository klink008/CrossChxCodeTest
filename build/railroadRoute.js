(function(module) {
try { module = angular.module("templates-main"); }
catch(err) { module = angular.module("templates-main", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/main/templates/railroadRoute.html",
    "<div class=\"vertical-container\">\n" +
    "    <div class=\"header\">Your Tropical Destination Resort Map</div>\n" +
    "    <div class=\"horizontal-container\">\n" +
    "        <town-selection nodes='railroadRouteCtrl.nodes' class=\"selection-pane\"></town-selection>\n" +
    "        <div class=\"force-layout\" id=\"force-layout\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates-main"); }
catch(err) { module = angular.module("templates-main", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/main/templates/townSelection.html",
    "<div class=\"vertical-container \">\n" +
    "    <div class=\"town-container\" ng-repeat=\"node in nodes track by $index\">\n" +
    "        <span>\n" +
    "            <input ng-disabled=\"!node.selected && townSelectionCtrl.isMoreThanTwoSelected()\"\n" +
    "                   type=\"checkbox\"\n" +
    "                   ng-model=\"node.selected\"\n" +
    "                   ng-click=\"townSelectionCtrl.highlightNode($index)\">\n" +
    "        </span>\n" +
    "        {{node.selected}}\n" +
    "        <div class=\"towns\">{{node.name}}</div><br>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

var railroadRoute = angular.module('railroadRoute', ['restangular','templates-main']);
function RailroadRouteController($scope, railroadRouteService){
    var _this = this;

//------------------------SCOPE VARIABLES---------------------------------


//------------------------LOCAL VARIABLES---------------------------------
var selectedNodes = [];

//------------------------SCOPE FUNCTIONS---------------------------------
    this.initialize = function(){
        retrieveRouteNodes().then(function(nodeResponse){
            retrieveRouteLinks().then(function(linkResponse){
                _this.nodes = [];
                _this.links = [];
                _.each(nodeResponse, function(node){
                    _this.nodes.push({name: node.name, group: node.group, selected: false})
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
//        var imageUrl = window.grailsSupport.islandUrl;
        var height = 250,
            width = 250;

        var svg = d3.select("#force-layout").append("svg:svg")
            .attr("viewBox", "0 0 " + width + " " + height )
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("height", "100%")
            .attr("width", "100%");

//        This code links and displays an island image that I wanted to use as a background image for the force layout
//        but ran out of time trying to get it to scale with the layout.
//
//        var defs = svg.append('svg:defs');
//
//        defs.append('svg:pattern')
//            .attr("id", "island")
//            .attr('patternUnits', 'userSpaceOnUse')
//            .attr('width', '595')
//            .attr('height', '638')
//            .append('svg:image')
//            .attr("xlink:href", imageUrl)
//            .attr('x', -100)
//            .attr('y', -120)
//            .attr('width', 595)
//            .attr('height', 638);
//
//        svg.append('svg:path')
//            .attr('d', "M0 0 v0 500 h500 500 V500 0 H0 0 z")
//            .attr('fill', "url(#island)");

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
            .style("fill", "rgb(128, 128, 128)")
            .on('click', singleClick);

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

    function singleClick(){
        var currentColor = d3.select(this).attr("style").slice(6,d3.select(this).attr("style").length-1);
        if(currentColor == "rgb(128, 128, 128)" && selectedNodes < 2){
            d3.select(this).attr('r', 7)
                .style("fill", "yellow");
            selectCheckbox(d3.select(this), true);
            selectedNodes++;
        } else if(currentColor == "rgb(255, 255, 0)" && currentColor != "rgb(128, 128, 128)"){
            d3.select(this).attr('r', 5)
                .style("fill", "rgb(128, 128, 128)");
            selectCheckbox(d3.select(this), false);
            selectedNodes--;
        }
    }

    function selectCheckbox(selectedNode, value){
        var nodeIndex = _.findIndex(_this.nodes, function(node,index){
            if(node.name == selectedNode.datum().name){
                return index
            }
        });
        _this.nodes[nodeIndex].selected = value;
        $scope.$apply();
    }
}
railroadRoute.controller('railroadRouteController', RailroadRouteController);
var RailroadRouteDirective = function($window){
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'src/main/templates/railroadRoute.html',
        controller: RailroadRouteController,
        controllerAs: 'railroadRouteCtrl',
        link: function(scope,elem,attrs){
            scope.railroadRouteCtrl.initialize();
        }
    }
};
railroadRoute.directive('railroadRoute', RailroadRouteDirective);
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
var TownSelectionController = function($scope){
    var _this = this;

    _this.townsSelected = 0;

    this.isMoreThanTwoSelected = function(){
        var numberOfTownsSelected = 0;
            _.each($scope.nodes, function(town){
            if(town.selected){
                numberOfTownsSelected++;
            }
        });

        return numberOfTownsSelected >= 2;
    };

    this.highlightNode = function(index){
        d3.select("#force-layout").selectAll(".node").each(function(d,i){
            if(d.name == $scope.nodes[index].name){
                var currentColor = d3.select(this).attr("style").slice(6,d3.select(this).attr("style").length-1);
                if(currentColor == "rgb(128, 128, 128)"){
                    d3.select(this).attr('r', 7)
                        .style("fill", "yellow");
                } else if(currentColor == "rgb(255, 255, 0)" && currentColor != "rgb(128, 128, 128)"){
                    d3.select(this).attr('r', 5)
                        .style("fill", "rgb(128, 128, 128)");
                }
            }
        });
    }
};
railroadRoute.controller('townSelectionController', TownSelectionController);
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