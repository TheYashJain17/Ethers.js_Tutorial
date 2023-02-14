//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract Transfer{

address public owner;
event transactions(address indexed _to, uint indexed _amount);

constructor(){
    owner = msg.sender;
}

function callOwner() view external returns(address){
    return owner;
}

function Transfers(address payable to_) payable external{

    to_.transfer(msg.value);
    emit transactions(msg.sender, msg.value);

}


}