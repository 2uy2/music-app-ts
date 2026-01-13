import { Request, Response } from "express"
import Song from "../../models/song_model";
import { off, title } from "process";
import Singer from "../../models/singer_model";
import { convertToSlug } from "../../helper/convertToSlug";
//get search/:type
export const result = async (req: Request, res: Response) => {
    const type: string = req.params.type.toString();
    const keyword: string = req.query.keyword.toString();
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        //tạo ra slug không giấu có thêm giấu trừ thay dấu cách
        const stringSlug = convertToSlug(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i")
        const songs = await Song.find({
            $or: [
                //tìm bằng hai điều kiện, 1 là title hai là slug
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]

        });
        for (const song of songs) {
            const infoSinger = await Singer.find({
                _id: song.singerId
            })
            // song["infoSinger"] = infoSinger; dùng fetch API không cho dùng cú pháp này
            newSongs.push({
                id:song.id,
                title:song.title,
                avatar:song.avatar,
                like:song.like,
                slug:song.slug,
                infoSinger:infoSinger.map(singer => singer.fullName)
            })
        }
        // newSongs = songs;
        switch (type) {
            case "result":

                res.render("client/pages/search/result", {
                    pageTitle: `kết quả ${keyword}`,
                    songs: newSongs
                })
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "thành công",
                    songs: newSongs
                })
                break;
            default: break;
        }
    }

}