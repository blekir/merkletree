import {Buffer} from 'buffer';
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

window.Buffer = window.Buffer || require("buffer").Buffer;

let whitelistAddresses = [
    "0xdec1918237964309786fc42a4cec786ab911d8f3",
    "0X5A641E5FB72A2FD9137312E7694D42996D689D99",
    "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
    "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
    "0X09BAAB19FC77C19898140DADD30C4685C597620B",
    "0XCC4C29997177253376528C05D3DF91CF2D69061A",
    "0xdD870fA1b7C4700F2BD7f44238821C26f7392148" // The address in remix
  ];

const createMerkleTree = (address) =>{

    const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
    const rootHash = merkleTree.getRoot();
    const claimingAddress = keccak256(address);
    const hexProof = merkleTree.getHexProof(claimingAddress);
    const wl = merkleTree.verify(hexProof, claimingAddress, rootHash);

    return {wl, hexProof}
}







export {createMerkleTree}