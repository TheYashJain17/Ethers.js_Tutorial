/*In this file we are seeing how can we activate functions of the smart contract(writing smart contract) 
through ethers.js.
For activating the functions of smart contract we need:
RPC URL , private key , public key ,  ABI of the desired smart contract , contract address , provider and
contract instance.*/


const {ethers} = require('ethers'); //Importing ethers library from ethers.

/*This is our RPC URL which we are getting from the infura , RPC URL provides us a
bridge between our application and blockchain so that we can work with the blockchain
as our system is not a node so we have to take RPC URL to make connection with blockchain
so that we can work with blockchain.*/

const RPC = "https://sepolia.infura.io/v3/363222f51fe54f6e99fa1c87ad5ba1a3";

//This is the private key of our metamask account , this will be used in sending ethers or doing transactions.

const private_key = '8f8bac9a573df32b64087be1d9d0d89293f5c2345e0259bd5dc7c89f91597ed5';

/*This is the public of our metamask account or can say address of our metamask account ,
this will be used in receiving ethers.*/

const account = '0x42d1D6298D22d04721b286BEA01f6436a30e5Ae3';

/* we have to make provider to make our transaction possible , so therefore we are making a one
we can make this provider with the help of ethers library , with the below statement we can make a provider
and we just have to provide RPC URL which we got from the infura , we have to proivde that URL inside this.*/

const provider = new ethers.providers.JsonRpcProvider(RPC);

/*Making A wallet with the help of ethers library , wallet will help us in sending the ethers to another account
and inside it we have to provide the private key of the account from which
we want to send ether to another account.
And our provider which we made with the help of RPC URL to make connection with blockchain.*/

const wallet2 = new ethers.Wallet(private_key, provider);

const transfer = require("./transfer.json");   //requiring the json file in which there are many artifacts , we are requiring this file because we want to access the abi of the contract we want to read.

const contractAddress = '0xbf45c8072c96baeb18d467bD3A997A1411CD98c2'; //this is the address of the contract which we have deployed it is needed when we want to read the contract.

//We are getting the abi from the json file we imported as we need abi to read our smart contract.

const ABI = transfer.abi;

//Making a function inside which we gonna perform all the actions.

async function write(){

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
       wallet2
    )

    /*We are consolling the account address(public key) and also getting the balance of the account
    with the help of provider and .getBalance() property.And obviously we will gonna get the balance
    in wei which is a bug number therefore we have to convert the balance into ether ,
    we are using ethers library to convert balance of wei into ether.
    And joining this in a single statement with the help of template literals.*/

    console.log(`${account}: ${ethers.utils.formatEther(await provider.getBalance(account))}`);

    /*We are consolling the address of our wallet as we have created the wallet with the private key 
    therefore we dont know its public key(account address) , therefore with the help of getAddress()
    on the wallet we created(wallet2) we can get the public address of the wallet and
    we are getting the balance of the wallet with the help of .getBalance() on the wallet we created(wallet2)
    and the balance will gonna be in form of wei which is a big number therefore we have to convert it 
    to the ether with the help of ethers library we can covert therefore doing the same
    And joining this in a single statement with the help of template literals.*/

    console.log(`${await wallet2.getAddress()} : ${ethers.utils.formatEther(await wallet2.getBalance())}`);


    /*With the below line we are accessing function of a smart contract which is transfer and we are storing
    this in a variable, we are using our contract instance we generated above and on that calling the function
    we made inside our smart contract , as we have provided a parameter inside our function of smart contract
    therefore we have to define the parameter here also and in that parameter we have to provide the address
    on which we want to send the amount/ether/money as we are performing transfering ether through the function
    we made in smart contract therefore here also as we are accessing that function , we are providing the
    parameter , here providing account as we have stored a public key inside that and now inside the function
    we are sending the ether to the address we have provided.*/ 

    const tx = await contract.Transfers(account,{

    /*Here we are directly providing the value which is the amount we want to send and then sending
    the amount in form of ether with the help of ehters library , we are sending amount in form of ethers
    for our comfort as if we will send in form of wei then we would have to put so many 0s and it would be
    difficult to calculate thats why sending in form of ethers.*/

        value: ethers.utils.parseEther('0.001')

    });

    await tx.wait(); //trans is the variable inside which we have defined our whole transaction and we have to use .wait() because we want system to wait for this transaction to get therefore it is important to use .wait().

                                        ///IMPORTANT NOTE

    /*We are again getting the balances of the receiver account and sender account , so that we can check whether
    the transation we performed is successful or not.*/

    /*We are consolling the account address(public key) and also getting the balance of the account
    with the help of provider and .getBalance() property.And obviously we will gonna get the balance
    in wei which is a bug number therefore we have to convert the balance into ether ,
    we are using ethers library to convert balance of wei into ether.
    And joining this in a single statement with the help of template literals.*/

    console.log(`${account} : ${ethers.utils.formatEther(await provider.getBalance(account))}`);
    
    /*We are consolling the address of our wallet as we have created the wallet with the private key 
    therefore we dont know its public key(account address) , therefore with the help of getAddress()
    on the wallet we created(wallet2) we can get the public address of the wallet and
    we are getting the balance of the wallet with the help of .getBalance() on the wallet we created(wallet2)
    and the balance will gonna be in form of wei which is a big number therefore we have to convert it 
    to the ether with the help of ethers library we can covert therefore doing the same
    And joining this in a single statement with the help of template literals.*/


    console.log(`${await wallet2.getAddress()} : ${ethers.utils.formatEther(await wallet2.getBalance())}`);

}

write(); //atlast calling the function inside which we have performed everything.


