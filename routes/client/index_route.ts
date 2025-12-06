import { Express } from "express";
import { toppicRoutes } from "./topic_route";

const clientRoutes = (app:Express):void =>{
    app.use('/topics',toppicRoutes);
}
export default clientRoutes; 