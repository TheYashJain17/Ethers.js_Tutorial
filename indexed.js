/*In this file we are seeing how to access the data which we have indexed in our event.
For reading this data we need same things as we were needing for reading the smart contract
we nees RPC URL , ABI of the desired smart contract , contract address , provider , contract instance and 
event name.*/

const {ethers} = require('ethers');  //Importing ethers library from ethers.

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

async function indexed(){

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

    /*Suppose we want to know the transaction details of a particular address then we continue with
    below line*/ 

    /*On the contract instance we are using .filters method of javascript and then using event name of 
    our smart contract which is transactions and inside that we are providing the address
    whose transaction details we want to see or show.*/

    const trans = contract.filters.transactions('0x56bf2ba76b11c1350C50B559C5177C09Eec9cfC3');

    /*We are using  contract instance and on it we are using .queryFilter method and inside it , 
    we are providing the trans variable we made above , inside which we are defining the desired address
    So inside below line of code we are entering the trans variable , so that we can filter the details
    according to that address we have provided in trans variable.*/

    const transactions = await contract.queryFilter(trans);

    /*Now we are using the transactions variable we made above and on it we are using .map() funtion
    so that we can make a new array according to the way we want.

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

indexed(); //atlast calling this function to get the task done.

