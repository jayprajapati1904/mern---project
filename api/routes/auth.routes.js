import express from "express";
import { signup ,signin ,google } from "../controllers/auth.controller.js";

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/signin", signin);
routes.post("/google", google);

export default routes;
