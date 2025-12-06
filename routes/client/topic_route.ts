import { Request,Response, Router } from "express";
const router :Router= Router();

import Topic from "../../models/topic_model";
router.get("/",async(req:Request,res:Response)=>{
    const topics = await Topic.find({
        deleted:false,
    })
    res.render("client/pages/topics/index");
})

export const toppicRoutes:Router=router;
