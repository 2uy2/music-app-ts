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
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic_model"));
const song_model_1 = __importDefault(require("../../models/song_model"));
const singer_model_1 = __importDefault(require("../../models/singer_model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song_model"));
//get song/:slugTopic
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like");
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.find({
            _id: { $in: song.singerId },
            status: "active",
            deleted: false
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
});
exports.list = list;
// get detail/slugSong
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        deleted: false,
        status: "active",
    });
    const singer = yield singer_model_1.default.find({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false,
    });
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        songId: song.id,
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail", {
        pageTitle: "chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.detail = detail;
//patch /songs/like/:typelike/:idSong
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        like: newLike,
    });
    res.json({
        code: 200,
        message: "thành công",
        like: newLike
    });
});
exports.like = like;
//patch /songs/favorite/:typeFavorite/:idSong
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                songId: idSong,
            });
            if (!existFavoriteSong) {
                const record = new favorite_song_model_1.default({
                    // userId:""
                    songId: idSong
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({
                songId: idSong
            });
            break;
    }
    res.json({
        code: 200,
        message: "thành công",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong.toString();
    const song = yield song_model_1.default.findOne({
        _id: idSong,
    });
    const listen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        listen: listen
    });
    const newSong = yield song_model_1.default.findOne({
        _id: idSong
    });
    res.json({
        code: 200,
        message: "thành công",
        listen: newSong.listen
    });
});
exports.listen = listen;
