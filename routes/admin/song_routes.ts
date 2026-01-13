import { Router } from "express";
const router:Router=Router();

import * as controller from "../../controller/admin/song_controller";
router.get("/",controller.index);

export const songRoutes:Router = router;