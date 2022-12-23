const {Schema,model}=require("mongoose");

const transectionSchema = new Schema({
    desc:{type:String,required:true},
    amount:{type:Number,required:true},
    transectionType:{type:["Debit","Credit"],required:true},
    debit:{type:Number},
    debitandcredit:{type:Number},
    date:{type:String,required:true}
},
{timestamps:true}
)

const transectionModel = new model("details",transectionSchema);

module.exports = transectionModel;