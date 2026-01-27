import { Request, Response } from "express";

//get //admin/upload
export const index = async (req: Request, res: Response) => {
    console.log(req.body);
    res.json({
        location: req.body.file//trong tiny trả về thuộc tính có location là hợp lý
    })
}