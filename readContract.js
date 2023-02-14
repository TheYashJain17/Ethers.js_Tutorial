/*In this file we are reading our smart contract , we need some things to read our smart contract
RPC URL , ABI , Contract Address , provider , and contract instance.*/


const {ethers} = require('ethers'); //Importing ethers library from ethers.

/*This is our RPC URL which we are getting from the infura , RPC URL provides us a
bridge between our application and blockchain so that we can work with the blockchain
as our system is not a node so we have to take RPC URL to make connection with blockchain
so that we can work with blockchain.*/

const RPC = "https://sepolia.infura.io/v3/363222f51fe54f6e99fa1c87ad5ba1a3";

const transfer = require("./transfer.json"); //requiring the json file in which there are many artifacts , we are requiring this file because we want to access the abi of the contract we want to read.

const contractAddress = '0xbf45c8072c96baeb18d467bD3A997A1411CD98c2'; //this is the address of the contract which we have deployed it is needed when we want to read the contract.

/* we have to make provider to make our reading the smart Contract possible , so therefore we are making a one
we can make this provider with the help of ethers library , with the below statement we can make a provider
and we just have to provide RPC URL which we got from the infura , we have to proivde that URL inside this.*/

const provider = new ethers.providers.JsonRpcProvider(RPC);

//We are getting the abi from the json file we imported as we need abi to read our smart contract.

const ABI = transfer.abi;

//Making a function inside which we gonna perform all the actions.

async function read(){

/*We have to generate the instance of the contract and we can generate the instance of the contract
with the help of ehters library and its method .contract().

Inside that we have to provide 3 things to generate contract instance

1st is the contract address means the address of the contract we deployed.
2nd is the ABI of the contract we deployed as ABI contains our all information regarding the contract.
3rd is the provider which we made with the help of RPC URL above.

With all these things we can make the instance of the contract which gonna help in reading the contract.*/

    let contract = new ethers.Contract(
        contractAddress,
        ABI,
        provider
    )

/*We have a function callOwner inside our contract it contains the address of the owner and now we will use it
to read the address of the owner , we are consolling this , we are using template literal to make it look clean.*/

//We have to use the instance of the contract we generated and on that we have to call our function.

    console.log(`The address of the owner: ${await contract.callOwner()}`);


}

read(); //calling our function so that all things can be done.

///This is how we can read a smart Contract.

