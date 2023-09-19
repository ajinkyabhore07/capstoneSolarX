const express = require("express");
const {ethers} = require ("ethers");
require ("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
const wallet = new ethers.Wallet(privateKey,provider);
const contractABI = require('./abi.json');
const contract = new ethers.Contract(contractAddress,contractABI,wallet);

app.use(express.json());

console.log(contractAddress);
console.log(process.env.RPC_PROVIDER);

app.get("/getBalance/:address",async (req,res) =>{
    try {
        const {address} = req.params;
        const response = await contract.getBalance(address);

        res.json({
            address,
            balance:ethers.formatEther(response)
        })
     } catch (error){
            console.error(error);
            res.status(500).json.error({error:"Internal server error"});
        }

app.post("/transferCredits",async(req,res)=>{
    try{
        const{to,amount} = req.body;
        const transaction = await contract.transferCredits(to,amount);
        await transaction.wait();
        res.json({messsage:"credits transferred successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json.error({error:"Internal server error"});
    }
});
        
app.listen((port, ()=>{
    console.log("server is running on port ${port}");
}))
    }
);