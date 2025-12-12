import { Request,Response } from "express";
import FavoriteSong from "../../models/favorite-song_model";
import Song from "../../models/song_model";
import Singer from "../../models/singer_model";
//get /favorite-songs
export const index = async(req:Request,res:Response)=>{
    const favoriteSongs =await FavoriteSong.find({
        //userId:""
        deleted:false,
    })
    for (const item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id:item.songId
        })
        const infoSinger=await Singer.find({
            _id:infoSong.singerId,
            status:"active",
            deleted:false
        }).select("fullName")
        item["infoSong"]=infoSong;
        item["infoSinger"]=infoSinger;
    }
    res.render("client/pages/favorite-song/index",{
        pageTitle:"trang bài hát yêu thích",
        favoriteSongs:favoriteSongs 
    })
}   