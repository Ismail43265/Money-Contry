const express=require("express");
const cors=require("cors");

const app=express();
const port=3000;

app.use(cors());
app.use(express.json());

let members = [];
let totalMoney = 0;

function recompute(){
    const share= members.length ? totalMoney/members.length :0;
    for (let i = 0; i < members.length; i++) {
    const remain = members[i].money - share;
    members[i].remain = Number.isInteger(remain) ? remain : parseFloat(remain.toFixed(2));
  }
}


app.post("/members",(req,res)=>{
    const{name}=req.body;
    if(!name || name.trim()===""){
        return res.status(400).json({error:"Name is required"});
    }
    const id=members.length;
    members.push({id,name,money:0,remain:0});
    recompute();

    res.json({success: true, members,totalMoney});
})

app.post("/members/:id/money",(req,res)=>{
    const {amount}=req.body;
    const id= parseInt(req.params.id);
    if(isNaN(amount) || !Number.isInteger(amount)){
        return res.status(400).json({error: "Amount is not integer"});
    }

    const member=members.find(m=>m.id===id);

    if(!member){
        return res.status(404).json({error: "Not Found!"})
    }
    member.money+=amount;
    totalMoney+=amount;
    recompute();

    res.json({success: true,members,totalMoney})

})

app.get("/members" ,(req,res)=>{
    res.json({members,totalMoney})
})

app.listen(3000);