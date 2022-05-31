import {Buffer} from 'buffer';
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

window.Buffer = window.Buffer || require("buffer").Buffer;

let whitelistAddresses = [
    "0x699a1928EA12D21dd2138F36A3690059bf1253A0",
    "0x8985aDc6725D81bD3bcf74D07A5deB894a4d4fa3",
    "0xfD39BE03BB3De69490674452A2baC197643c7d31",
    "0xdec1918237964309786Fc42a4CEC786Ab911d8F3",
    "0x9B359c119Afb82d9DC4231eeE293529ba5BfdE3f"
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