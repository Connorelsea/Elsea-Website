import chai, { expect, should }  from "chai";
import { build_routes, contains_route, routes } from "../server/routes/routes.js";

describe("Routes", () => {

	describe("#build_routes", () => {

		describe("One-Dimensional Route Array of Length n", () => {

			// Build mock one-dimensional route array

			let one_dimension_routes = [
				{
					name     : "Home",
					path     : "/",
					desc     : "Home test description",
					keywords : ["home", "test"],
					children : []
				},
				{
					name     : "Test",
					path     : "/test",
					desc     : "Test description 2",
					keywords : ["test", "keyword"],
					children : []
				}
			];

			let router = build_routes(one_dimension_routes);

			it("should contain n router layers", () => {
				expect(router.stack.length).to.equal(2);
			});

		});

		describe("Two-Dimensional Route Array of Length n", () => {

			// Build mock two-dimensional route array

			let two_dimension_routes = [
				{
					name     : "Home",
					path     : "/",
					desc     : "Home test description",
					keywords : ["home", "test"],
					children : [
						{
							name     : "Test sub route",
							path     : "/sub",
							desc     : "Test sub route description",
							keywords : ["sub", "test"],
							children : []
						}
					]
				},
				{
					name     : "Test",
					path     : "/test",
					desc     : "Test description 2",
					keywords : ["test", "keyword"],
					children : []
				}
			]

			let router = build_routes(two_dimension_routes);

			it("should contain n router layers", () => {
				expect(router.stack.length).to.equal(3);
			});

		});

		describe("Elsea Labs Specific Routes", () => {

			let router = build_routes(routes);

			// Dynamically generate tests based on the routes stored in
			// the routes array.  Test if the generated router contains
			// the routes specified.

			const processNodes = (parent) => {
				for (let i = 0, len = parent.length; i < len; i++) {

					let route = parent[i];

					// Test if the router contains a route mounted
					// at the path specified in the route array.

					it(`should contain "${route.name}" route at "${route.path}"`, () => {
						expect(contains_route(router, route.path)).to.be.true;
					});

					// If the route in the  route array  has children
					// routes, generate tests for the children routes
					// as well.

					if (route.children.length > 0) processNodes(route.children);
				}
			}

			processNodes(routes);

		})

	});

});