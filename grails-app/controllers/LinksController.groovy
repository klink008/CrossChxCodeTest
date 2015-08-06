import grails.converters.JSON

class LinksController {
    def linksService

    def retrieveLinks(){
        try{
            def links = linksService.retrieveLinks()
            render links as JSON
        } catch (err){
            render (status: 500, text: err.toString())
        }
    }
}
