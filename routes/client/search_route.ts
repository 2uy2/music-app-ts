import {  Router } from "express";
const router :Router= Router();
import * as controller from "../../controller/client/search_controller";


router.get("/:result",controller.result);


export const searchRoutes:Router=router;
