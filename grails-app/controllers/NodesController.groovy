import grails.converters.JSON

class NodesController {
    def nodesService

    def retrieveNodes(){
        try{
            def routes = nodesService.retrieveNodes()
            render routes as JSON
        } catch (err){
            render (status: 500, text: err.toString())
        }
    }
}
