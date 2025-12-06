import { Express } from "express";
import { toppicRoutes } from "./topic_route";
import { songRoutes } from "./song_route";

const clientRoutes = (app:Express):void =>{
    app.use('/topics',toppicRoutes);
    app.use('/songs',songRoutes);
}
export default clientRoutes; 