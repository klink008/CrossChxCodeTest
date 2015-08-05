class RoutesController {
    def routesService

    def show(){
        routesService.retrieveRoutes()
    }
}
