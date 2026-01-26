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
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"audio",maxCount:1}
    ]),
    uploadCloud.uploadFields,
    controller.createPost);
router.get("/edit/:id",controller.edit);

router.patch(
    "/edit/:id",
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"audio",maxCount:1}
    ]),
    uploadCloud.uploadFields,
    controller.editPatch);//vì là fields nên dữ liệu mặc định là mảng, nên ta phải fix lại lấy file đầu tiên(thực chất chỉ có 1 file)
export const songRoutes:Router = router;