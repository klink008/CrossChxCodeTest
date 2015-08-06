class LinksService {

    public def retrieveLinks(){
        def parsedLinks = JsonParser.parseJsonFile('src/main/json/routeLinks.json')
        parsedLinks.links.collect { it ->
            [source: it.source,
             target: it.target,
             value: it.value]
        }
    }
}
