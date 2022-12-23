const {Schema,model}=require("mongoose");

//asume their is only one bank account
const WalletSchema = new Schema({
    Name:{type:String,required:true},
    amount:{type:Number,required:true},
    account:{type:Number,required:true}
})

const WalletModel = new model("wallet",WalletSchema);

module.exports = WalletModel;