import express from "express";
import { routes, build_routes } from "./routes/routes";

const app = express();
app.set("view engine", "jade");
app.use(build_routes(routes));

let server = app.listen(3000, () => {
	let host = server.address().address;
	let port = server.address().port;

	console.log(`App running at http://${host}:${port}`);
})