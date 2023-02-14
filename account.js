/*In this file we are making a function through which we are performing a general transaction
of sending ethers from one account to another.*/


const {ethers, utils} = require('ethers'); //Importing ethers and utils library from ethers.

/*This is our RPC URL which we are getting from the infura , RPC URL provides us a
bridge between our application and blockchain so that we can work with the blockchain
as our system is not a node so we have to take RPC URL to make connection with blockchain
so that we can work with blockchain.*/

const RPC = 'https://goerli.infura.io/v3/01e9bf3ef4b448ec942b09df4303521d'; 

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

//This all will gonna help us in sending the ethers to another account.

const wallet1 = new ethers.Wallet(private_key, provider);

//Making a function , inside this we gonna perform our all operations.

async function call(){

    /*With the help of provider we made above and .getBalance() property we are getting the balance of the account
    whose public key we have provided*/

    //This will give us the balance of the account(of public key).

    const bal = await provider.getBalance(account); 

    /*Consolling the account address with the help of account as we have stored
    our account address inside account variable , and the balance we got is in the form wei(bigNumber)
    therefore we have to convert it to the ether , so with the help of ehters library we are converting 
    our account balance into ethers and then using string concatination , we are providing colon(:)
    between 2 items to make it look clean.*/

    console.log(await account, ":", ethers.utils.formatEther(bal));

    /*Consolling the address of the account through which we made our wallet and with the help of 
    .getAddress() we are getting the address(public key) of the account as we have only provied the 
    private key of that account(wallet account) and we are also getting the balance of the wallet account
    with the help of .getBalance() and we also have to convert the balance(wei) into ether and then
    using string concatination , we are providing colon(:) between 2 items to make it look clean.*/

    console.log(await wallet1.getAddress() , ":", ethers.utils.formatEther(await wallet1.getBalance()));

    //we are making new variable and inside it we are gonna perform our transaction

    //Here we are using sendTransaction method which we gets with the wallet.

    const trans = await wallet1.sendTransaction({

    //sendTransaction method needs 2 key value pair as we have to send as object inside this function.

    /*1st is the to which means to whom we want to send/transfer the ethers , we have to provide their
    public key or address(both are same).*/

        to:account,

    /*2nd is the value means how much ethers we want to transfer to the account we mentioned above.
    we are using ethers.utils.parseEther with this we can write value in form of ether otherwise 
    we would have to write the value in wei or gwei and that would be really uncomfortable as we would 
    have to write the bigNumber.*/

        value: ethers.utils.parseEther('0.02')
    });

    await trans.wait(); //trans is the variable inside which we have defined our whole transaction and we have to use .wait() because we want system to wait for this transaction to get therefore it is important to use .wait().

                                        ///IMPORTANT NOTE

/*We are again getting the balances of the receiver account and sender account , so that we can check whether
the transation we performed is successful or not.*/


    /*With the help of provider we made above and .getBalance() property we are getting the balance of the account
    whose public key we have provided*/

    //This will give us the balance of the account(of public key).

    const bal2 = await provider.getBalance(account);

     /*Consolling the account address with the help of acount as we have stored
    our account address inside account variable , and the balance we got is in the form wei(bigNumber)
    therefore we have to convert it to the ether , so with the help of ehters library we are converting 
    our account balance into ethers and then using string concatination , we are providing colon(:)
    between 2 items to make it look clean.*/

    console.log(await account, ":", ethers.utils.formatEther(bal2));

    /*Consolling the address of the account through which we made our wallet and with the help of 
    .getAddress() we are getting the address(public key) of the account as we have only provied the 
    private key of that account(wallet account) and we are also getting the balance of the wallet account
    with the help of .getBalance() and we also have to convert the balance(wei) into ether and then
    using string concatination , we are providing colon(:) between 2 items to make it look clean.*/

    console.log(await wallet1.getAddress() , ":", ethers.utils.formatEther(await wallet1.getBalance()));


}

call(); //atlast calling the function inside which we have performed everything.





















