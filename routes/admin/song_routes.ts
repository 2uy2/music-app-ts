import { Router } from "express";
import  multer from "multer"
const router:Router=Router();

import * as controller from "../../controller/admin/song_controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud_middleware"

const upload = multer();

router.get("/",controller.index);
router.get("/create",controller.create);
router.post(
    "/create",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.createPost);

export const songRoutes:Router = router;