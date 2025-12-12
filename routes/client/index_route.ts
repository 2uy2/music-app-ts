import { Express } from "express";
import { toppicRoutes } from "./topic_route";
import { songRoutes } from "./song_route";
import { favoriteSongRoutes } from "./favorite-song_route";
import { searchRoutes } from "./search_route";


const clientRoutes = (app:Express):void =>{
    app.use('/topics',toppicRoutes);
    app.use('/songs',songRoutes);
    app.use('/favorite-songs',favoriteSongRoutes);
    app.use('/search',searchRoutes);
}
export default clientRoutes; 