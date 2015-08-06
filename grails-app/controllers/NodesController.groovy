import grails.converters.JSON

class NodesController {
    def nodesService

    def retrieveNodes(){
        try{
            def nodes = nodesService.retrieveNodes()
            render nodes as JSON
        } catch (err){
            render (status: 500, text: err.toString())
        }
    }
}
