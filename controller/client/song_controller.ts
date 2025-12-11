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

// get detail/slugSong
export const detail = async(req:Request,res:Response)=>{
    const slugSong = req.params.slugSong;
    const song = await Song.findOne({
        slug:slugSong,
        deleted:false,
        status:"active",
    })

    const singer=await Singer.find({
        _id:song.singerId,
        status:"active",
        deleted:false
    }).select("fullName")

    const topic = await Topic.findOne({
        _id:song.topicId,
        deleted:false,
    })
    
    res.render("client/pages/songs/detail",{
        pageTitle:"chi tiết bài hát",
        song:song,
        singer:singer,
        topic:topic
    })
}
//patch /songs/like/:typelike/:idSong
export const like = async(req:Request,res:Response)=>{
    const idSong:string =req.params.idSong;
    const typeLike:string = req.params.typeLike;

    const song = await Song.findOne({
        _id:idSong,
        deleted:false,
        status:"active"
    })
    const newLike:number = typeLike =="like"? song.like+1 :song.like-1;
    
    await Song.updateOne({
        _id:idSong
    },{
        like:newLike,
    })
    res.json({
        code:200,
        message:"thành công",
        like:newLike
    })
}