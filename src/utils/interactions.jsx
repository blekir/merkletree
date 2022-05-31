
import { ethers } from "ethers"
import {merkletest_abi} from './ABI' 

const merkletest = "0x777465Cb77692A5e86BcFC987B724F3C1eC7979b"

const initContracts = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(merkletest, merkletest_abi, signer);

    return {contract}
}


const mint = async (hexproof) =>{
    if(!window.ethereum){
        return false
    } 
    const {contract} = initContracts();
    console.log(hexproof)
    // const gasLimit = await contract.estimateGas.mint(ash, {value: price.toString()});
    // let gas = gasLimit.add(gasLimit.div(4))
    const tx = await contract.allowlistPurchase(1, hexproof, {value: ethers.utils.parseEther("0.08")});
    return tx;

}



export {mint}
