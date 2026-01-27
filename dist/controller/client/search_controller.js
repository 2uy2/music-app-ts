"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song_model"));
const singer_model_1 = __importDefault(require("../../models/singer_model"));
const convertToSlug_1 = require("../../helper/convertToSlug");
//get search/:type
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type.toString();
    const keyword = req.query.keyword.toString();
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        //tạo ra slug không giấu có thêm giấu trừ thay dấu cách
        const stringSlug = (0, convertToSlug_1.convertToSlug)(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = yield song_model_1.default.find({
            $or: [
                //tìm bằng hai điều kiện, 1 là title hai là slug
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]
        });
        for (const song of songs) {
            const infoSinger = yield singer_model_1.default.find({
                _id: song.singerId
            });
            // song["infoSinger"] = infoSinger; dùng fetch API không cho dùng cú pháp này
            newSongs.push({
                id: song.id,
                title: song.title,
                avatar: song.avatar,
                like: song.like,
                slug: song.slug,
                infoSinger: infoSinger.map(singer => singer.fullName)
            });
        }
        // newSongs = songs;
        switch (type) {
            case "result":
                res.render("client/pages/search/result", {
                    pageTitle: `kết quả ${keyword}`,
                    songs: newSongs
                });
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "thành công",
                    songs: newSongs
                });
                break;
            default: break;
        }
    }
});
exports.result = result;
