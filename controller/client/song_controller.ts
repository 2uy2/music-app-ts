import { Request,Response } from "express";
import Topic from "../../models/topic_model";
import Song from "../../models/song_model";
import Singer from "../../models/singer_model";

//get song/:slugTopic
export const list = async(req:Request,res:Response)=>{
    const topic = await Topic.findOne({
        slug:req.params.slugTopic,
        status:"active",
        deleted:false
    });
    
    const songs = await Song.find({
        topicId:topic.id,
        status:"active",
        deleted:false
    }).select("avatar title slug singerId like");
    for (const song of songs) {
        const infoSinger = await Singer.find({
            _id:{$in :song.singerId},
            status:"active",
            deleted:false
        });
        song["infoSinger"]=infoSinger;
    }
    
    res.render("client/pages/songs/list",{
        pageTitle:topic.title,
        songs:songs
    });
}