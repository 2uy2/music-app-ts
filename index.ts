import  express, {Express} from 'express';
import dotenv from "dotenv";
import * as database from "./config/database";
import bodyParser from "body-parser" // dùng để giúp đọc và hiểu dữ liệu mà client gửi lên server. ở dạng json khi req.body
import clientRoutes from './routes/client/index_route';
import adminRoutes from './routes/admin/index_route';
import { systemConfig } from './config/config';
import path from 'path';
import methodOverride  from 'method-override';

dotenv.config();
database.connect();

const app:Express = express()
const port:number|string = process.env.PORT;

// parse application/x-www-form-urlencoded (áp dụng cho dữ liệu lấy từ phần form)
app.use(bodyParser.urlencoded({extended:false}));
//hoặc dùng cách này
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'))

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
