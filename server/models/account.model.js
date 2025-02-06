import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const Account = mongoose.model("Account", accountSchema)

export default Account