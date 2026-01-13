import { Router } from "express";
const router:Router=Router();

import * as controller from "../../controller/admin/topic_controller";
router.get("/",controller.index);

export const topicdRoutes:Router = router;