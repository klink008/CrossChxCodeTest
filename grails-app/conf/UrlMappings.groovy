class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')

        "/retrieveRouteNodes"(controller:"nodes", action:[GET:"retrieveNodes"])
        "/retrieveRouteLinks"(controller:"links", action:[GET:"retrieveLinks"])
	}
}
