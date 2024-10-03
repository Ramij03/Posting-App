const mongoose=require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        Postedby:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
    },
    {timestamps:true}
);

module.exports= mongoose.model("Post",postSchema);
