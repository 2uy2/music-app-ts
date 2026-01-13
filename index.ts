import  express, {Express} from 'express';
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from './routes/client/index_route';
import adminRoutes from './routes/admin/index_route';
import { systemConfig } from './config/config';
import path from 'path';

dotenv.config();
database.connect();

const app:Express = express()
const port:number|string = process.env.PORT;

app.use(express.static("public"));

app.set("views","./views");
app.set("view engine","pug");

//tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//end tinyMCE

//app locals variables, áp biến đó cho toàn cục, chỉ áp dụng cho file render, ở đây là file PUG
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//admin routes
adminRoutes(app);
//client routes
clientRoutes(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
