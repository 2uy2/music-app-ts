import { Router } from "express";
import multer from "multer"
const router:Router=Router();

import * as uploadCloud from "../../middleware/admin/uploadCloud_middleware"

import * as controller from "../../controller/admin/upload_controller";

const upload = multer();
router.post( //upload ảnh từ tiny MCE lên cloud dùng phương thức post
    "/",
    upload.single("file"),
    uploadCloud.uploadSingle,
    controller.index);

export const uploadRoutes:Router = router;