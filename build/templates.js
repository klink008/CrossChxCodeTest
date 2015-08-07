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
    "            <input ng-disabled=\"townSelectionCtrl.isMoreThanTwoSelected($index)\"\n" +
    "                   type=\"checkbox\"\n" +
    "                   ng-model=\"townSelectionCtrl.townsSelected[$index]\"\n" +
    "                   ng-click=\"townSelectionCtrl.selectNode($index)\">\n" +
    "        </span>\n" +
    "        <div class=\"towns\">{{node.name}}</div><br>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();
