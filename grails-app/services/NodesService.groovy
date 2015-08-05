import groovy.json.JsonSlurper

class NodesService {

    public def retrieveNodes(){
        def parsedNodes = JsonParser.parseJsonFile('src/main/json/routeNodes.json')
        parsedNodes.nodes.collect { it ->
            [location: it.location]
        }
    }
}