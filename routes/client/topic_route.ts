import {  Router } from "express";
const router :Router= Router();
import * as controller from "../../controller/client/topic_controller";


router.get("/",controller.topics);

export const toppicRoutes:Router=router;
