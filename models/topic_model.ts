import { timeStamp } from "console";
import mongoose  from "mongoose";
import { title } from "process";
const topicSchemal = new mongoose.Schema(
    {
        title:String,
        avatar:String,
        description:String,
        status:String,
        slug:String,
        deleted:{
            type:Boolean,
            default:false
        },
        deletedAt:Date,

    },
    {
        timestamps:true
    }
);
const Topic = mongoose.model("Topic",topicSchemal,"topics");
export default Topic;