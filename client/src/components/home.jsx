import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react';

const Home = () => {
  const[details,setDetails]=useState([]);
  const[amount,setAmount]=useState({desc:"",credit:"",transectionType:""})
  const fetchData = async()=>{
     try{
        const data = await axios.get("http://localhost:8080/transection");
        setDetails(data.data)
     }
     catch(err){
        alert(err.message)
     }
  }

  useEffect(()=>{
    fetchData()
  },[])

const Submit=async()=>{
    amount.credit = Number(amount.credit)
    try{
        const post = await axios.post("http://localhost:8080/transection",{
            desc:amount.desc,
            transectionType:amount.transectionType,
            credit:amount.credit
        });
        if(post.data==="insufficent balance"){
            return alert(post.data)
        }
        fetchData()
     }
     catch(err){
        alert(err.message)
     }
}

  return (
    <div style={{width:"80%",margin:"auto",border:"1px solid",textAlign:"center"}}>
        <h1>Please select your service</h1>
       <div style={{marginTop:"20px"}}>
          <input type="number" placeholder='enter your amount' onChange={(e)=>setAmount({...amount,credit:e.target.value})}/><br/>
          <input type="desc" placeholder='description' onChange={(e)=>setAmount({...amount,desc:e.target.value})}/><br/>
          <select type="text" placeholder='select your service' onChange={(e)=>setAmount({...amount,transectionType:e.target.value})}><br/>
          <option value="">Select Your Service</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select><br/>
          <button onClick={Submit}>Save</button>

       </div>

      <h1>See your transection details</h1>
       
       <div style={{width:"80%",margin:"auto"}}>
          <table border="1">
            <thead>
             <tr >
                <th>Date</th>
                <th>Description</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Running Balance</th>
             </tr>
            </thead>
            <tbody>
                {details.length>0 && details.map((ele)=>ele.transectionType[0]==="Credit"?
                <tr>
                <th>{ele.date}</th>
                <th>{ele.desc}</th>
                <th>{ele.debitandcredit}</th>
                <th>-</th>
                <th>{ele.amount}</th>
                </tr>
                :<tr>
                <th>{ele.date}</th>
                <th>{ele.desc}</th>
                <th>-</th>
                <th>{ele.debitandcredit}</th>
                <th>{ele.amount}</th>
                </tr>)}
            </tbody>
          </table>
       </div>

    </div>
  )
}

export default Home
