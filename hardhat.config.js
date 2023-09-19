require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
task("accounts","prints the list of accounts",async(taskArgs,hre)=>{
  const accounts = await hre.ethers.getSigners();
  for(const account of accounts){
    console.log(account.address);
  }
}
)

//Declared .env variables
const {PRIVATE_KEY, ETHERSCAN_API_KEY,RPC_PROVIDER } =process.env



module.exports = {
  networks:{
      hardhat : {},
      localhost:{
        url:"http://localhost:8545",
      },
      matic:{
       url:RPC_PROVIDER,
       accounts:[`0x${PRIVATE_KEY}`], 
      },
      mumbai:{
        url:RPC_PROVIDER,
        accounts:[`0x${PRIVATE_KEY}`], 
       },
      },
      solidity: "0.8.19",
    //   solidity:{
    //     compilers:[{
    //       version:"0.8.0",
    //       settings:{
    //         optimizer:{
    //           enabled:true,
    //           runs:200,
    //         }
    //       }
    //     }
    //   ]
    // },
    paths:{sources:"./contracts",
      tests:"./test",
      cache:"./cache",
      artifacts:"./artifacts",
    },
    mocha:{
      timeout:40000
    },
    etherscan:{
      apiKey:ETHERSCAN_API_KEY
    },
  }