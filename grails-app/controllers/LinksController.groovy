import grails.converters.JSON

/**
 * Created by Kellen on 8/5/2015.
 */
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
