import groovy.json.JsonSlurper

class RoutesService {

    def retrieveRoutes(){
        def routeNodes = parseJsonFile()
        determineLinks(routeNodes)
    }

    private static def parseJsonFile(){
        def reader = new BufferedReader(
                new FileReader('src/main/json/trainRoutes.json')
        )
        def slurper = new JsonSlurper()
        def parsedRoutes = slurper.parse(reader)
        parsedRoutes.nodes.collect { it ->
            [base: it.baseLocation,
             destination: it.destinationLocation,
             distance: it.distance]
        }
    }

    private static def determineLinks(routeNodes){

    }
}
