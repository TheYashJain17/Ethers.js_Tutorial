/*In this file we are accesing the data which we are providing inside events in our smart contract.
For reading this data we need same things as we were needing for reading the smart contract
we nees RPC URL , ABI of the desired smart contract , contract address , provider , contract instance and 
event name*/

const {ethers} = require('ethers'); //Importing ethers library from ethers.

/*This is our RPC URL which we are getting from the infura , RPC URL provides us a
bridge between our application and blockchain so that we can work with the blockchain
as our system is not a node so we have to take RPC URL to make connection with blockchain
so that we can work with blockchain.*/

const RPC = "https://sepolia.infura.io/v3/363222f51fe54f6e99fa1c87ad5ba1a3";

const transfer = require("./transfer.json");  //requiring the json file in which there are many artifacts , we are requiring this file because we want to access the abi of the contract we want to read.

const contractAddress = '0xbf45c8072c96baeb18d467bD3A997A1411CD98c2'; //this is the address of the contract which we have deployed it is needed when we want to read the contract.

/* we have to make provider to make our writing the smart Contract possible , so therefore we are making a one
we can make this provider with the help of ethers library , with the below statement we can make a provider
and we just have to provide RPC URL which we got from the infura , we have to proivde that URL inside this.*/

const provider = new ethers.providers.JsonRpcProvider(RPC);

//We are getting the abi from the json file we imported as we need abi to read our smart contract.

const ABI = transfer.abi;

//Making a function inside which we gonna perform all the actions.

async function Event(){

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

/* we are making a new variable inside which we gonna perform our code
we are using our contract instance and on that we are using .queryFilter function and inside it 
we are providing our event name which is transactions , therefore we have written transactions in it
so that we can target our event(transactions).*/

    const transactions = await contract.queryFilter('transactions');

/*Now we are using the event we got and on it we are using .map() funtion so that we can make a new array 
according to the way we want.

And inside we are taking items as a parameter and then we are consolling the required array.

we have to use args when we want to get access the parameters of the event(in this case).

In our smart contract we have _to of address type and _amount of uint type.

In this way we are seeing that to which address we have send how much of ether.

So we are consolling this by targetting all the address by items.args._to and all the amount
sent to those addressed by items.args._amount

This will give us all the details of the transactions we performed through our smart contract 
as we are  targetting events and we are putting every transaction in events
thats why we are able to access this.*/

    transactions.map((items)=>{

        console.log(`${items.args._to} : ${ethers.utils.formatEther(items.args._amount)}`);

    })

}

Event(); //atlast calling this function to get things done.

