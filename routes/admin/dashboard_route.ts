import { Router } from "express";
const router:Router=Router();

import * as controller from "../../controller/admin/dashboard_controller";
router.get("/",controller.index);

export const dashboardRoutes:Router = router;