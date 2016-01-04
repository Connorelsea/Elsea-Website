import express from "express";
const Router = express.Router();

export function build_routes(routes, parent_router) {

	if (parent_router === undefined) {
		parent_router = express.Router();
	}

	for (let i = 0; i < routes.length; i++) {

		// Create route with corresponding information
		parent_router.get(routes[i].path, (req, res) => {
			res.send("Testing: " + routes[i].name);
		});

		// Process children routes recursively if they exist
		if (routes[i].children.length > 0) {
			build_routes(routes[i].children, parent_router);
		}

	}

	return parent_router;
}

export function contains_route(router, route_path) {

	let contains = 0;
	let stack    = router.stack;

	for (let i = 0, len = stack.length; i < len; i++) {
		if (stack[i].route.path === route_path) contains += 1;
	}

	return contains > 0;
}

export const routes = [
	{
		name     : "Home",
		path     : "/",
		desc     : "Elsea Labs software, design, and innovation.",
		keywords : ["home", "main", "elsea", "overview"],
		children : []
	},
	{
		name     : "Services",
		path     : "/services",
		desc     : "",
		keywords : ["services", "overview"],
		children : [
			{
				name     : "Web Development",
				path     : "/services/web",
				desc     : "Elsea Labs local web development with global quality.",
				keywords : ["web", "development", "design", "website", "webpage",
							"internet"],
				children : []
			},
			{
				name     : "Graphic Design",
				path     : "/services/design",
				desc     : "Elsea Labs local graphic design with global quality.",
				keywords : ["print", "layout", "advertising", "graphic", "design"],
				children : []
			},
			{
				name     : "Branding",
				path     : "/services/branding",
				desc     : "Elsea Labs branding creation, company evolvement.",
				keywords : ["print", "logo", "branding", "graphic", "design"],
				children : []
			},
			{
				name     : "Software Development",
				path     : "/services/software",
				desc     : "Elsea Labs branding creation, company evolvement.",
				keywords : ["print", "logo", "branding", "graphic", "design"],
				children : []
			}
		]
	},
	{
		name     : "",
		path     : "/",
		desc     : "",
		keywords : [""],
		children : []
	},
	{
		name     : "",
		path     : "/",
		desc     : "",
		keywords : [""],
		children : []
	},
	{
		name     : "",
		path     : "/",
		desc     : "",
		keywords : [""],
		children : []
	},
]