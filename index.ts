import  express, {Express, Request, Response} from 'express';
import dotenv from "dotenv";
import * as database from "./config/database";

import Topic from './models/topic_model';

dotenv.config();
database.connect();

const app:Express = express()
const port:number|string = process.env.PORT;

app.set("views","./views");
app.set("view engine","pug");

app.get('/topics',async (req:Request, res:Response) => {
    const topics = await Topic.find({
        deleted:false
    })
    console.log(topics)
    res.render("client/pages/topics/index.pug");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
