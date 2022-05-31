import {useState, useEffect, useContext} from 'react'
import {createMerkleTree, verify} from '../utils/merkle_tree';

import { Button } from 'primereact/button';

import DappContext from '../context';

import { mint } from '../utils/interactions';


const Mint = () => {
    const {account, isLoading, isAuthenticated, authenticate, logout} = useContext(DappContext);
    const [iswl, setiswl] = useState(false)
    const [hexproof, sethexproof] = useState("")

    useEffect(() => {
        if(isAuthenticated){
            const {wl, hexProof} =  createMerkleTree(account)
            setiswl(wl)
            sethexproof(hexProof)
        }
        

    }, [isAuthenticated])
    
    const mintx = () =>{
        console.log("mint")
        mint(hexproof).then( async(tx) =>{
            const receipt = await tx.wait();
            console.log(receipt)
        }).catch((e)=>{
            console.log(e)
        })

    }
    return (
        <div className="wallet flex column centered">
            {isAuthenticated
                ?<>
                    {iswl 
                    ?<>
                        <div className='address'>Your address is on the allow list</div>
                        <Button label={"Mint"} style ={{color:'#070707', background: "#3333ff00",  border:"1px solid #808080", width: "157px"}} className=" p-button-info p-button-text" onClick={() =>{mintx()}} iconPos="right"  />
                    </>
                    :<div className='address'>Your address is not on the allow list</div>
                    }
                    <div className='address'>Connected to: {account.substring(0, 5) + "...." + account.substring(account.length - 4)}</div>
                </>
                :<Button label={isLoading? "loading": "Connect Wallet"} style ={{color:'#070707', background: "#3333ff00",  border:"1px solid #808080", width: "157px"}} className=" p-button-info p-button-text" onClick={() =>{authenticate()}} iconPos="right" loading={isLoading} />
            }
        </div>
    )
}

export default Mint