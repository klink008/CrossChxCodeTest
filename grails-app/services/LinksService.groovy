import groovy.json.JsonSlurper

/**
 * Created by Kellen on 8/5/2015.
 */
class LinksService {

    public def retrieveLinks(){
        def parsedLinks = JsonParser.parseJsonFile('src/main/json/routeLinks.json')
        parsedLinks.links.collect { it ->
            [baseLocation: it.baseLocation,
             connectingLocation: it.connectingLocation,
             distance: it.distance]
        }
    }
}
