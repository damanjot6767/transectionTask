const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const transectionModel = require("./models/transection.model");
const WalletModel = require("./models/wallet.model");
const connect = async()=>{
   return new mongoose.connect("mongodb://localhost:27017/Transection")
}

const app = express();
app.use(express.json());
app.use(cors());

//route for get all enteries
app.get("/transection",async(req,res)=>{
    try{
        let data = await transectionModel.find()
        res.send(data)
    }
    catch(err){
        res.send(err.message)
    }
})

//route for debit and credit transections
app.post("/transection",async(req,res)=>{
    let{desc,credit,transectionType}=req.body;
    credit = Number(credit)
    let today1 = new Date();
    let day = String(today1.getDate()).padStart(2, '0');
    let month = String(today1.getMonth() + 1).padStart(2, '0');
    let year = today1.getFullYear();
    let date = month+"/"+day+"/"+year
    let user = await WalletModel.findOne({Name:"Damanjot Singh"});//asume their is only one bank account
    let accountBalance = user.amount;
    try{
      if(transectionType==="Credit"){
         accountBalance = credit+accountBalance;
          await WalletModel.findByIdAndUpdate({_id:user._id},{amount:accountBalance}) ;
         let data = new transectionModel({desc,amount:accountBalance,transectionType,debitandcredit:credit,date:date})
         await data.save()
         return res.send(data)
      }
      else if(transectionType==="Debit"){
        if(accountBalance<credit){
            return res.send("insufficent balance")
        }
         accountBalance = accountBalance-credit;
         await WalletModel.findByIdAndUpdate({_id:user._id},{amount:accountBalance}) ;
         let data = new transectionModel({desc,amount:accountBalance,transectionType,debitandcredit:credit,date:date})
         await data.save()
         return res.send(data)
      }
    }
    catch(err){
        res.send(err.message);
        return;
    }
})

app.listen(8080,()=>{
       connect().then(()=>console.log("connected")).catch(()=>console.log("not connected"))
    console.log(`working ${8080}`)
})
