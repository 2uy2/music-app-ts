import { Express } from "express";
import { dashboardRoutes } from "./dashboard_route";
import{systemConfig} from "../../config/config";
import { topicdRoutes } from "./topic_route";
import { songRoutes } from "./song_routes";
import { uploadRoutes } from "./upload_route";


const adminRoutes = (app:Express)=>{
    const PATH_ADMIN= `/${systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`,dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`,topicdRoutes);
    app.use(`${PATH_ADMIN}/songs`,songRoutes);
    app.use(`${PATH_ADMIN}/upload`,uploadRoutes);
}

export default adminRoutes;
