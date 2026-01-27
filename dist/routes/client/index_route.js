"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic_route");
const song_route_1 = require("./song_route");
const favorite_song_route_1 = require("./favorite-song_route");
const search_route_1 = require("./search_route");
const clientRoutes = (app) => {
    app.use('/topics', topic_route_1.toppicRoutes);
    app.use('/songs', song_route_1.songRoutes);
    app.use('/favorite-songs', favorite_song_route_1.favoriteSongRoutes);
    app.use('/search', search_route_1.searchRoutes);
};
exports.default = clientRoutes;
