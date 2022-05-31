import {useEffect, useReducer} from 'react';
import { ethers } from "ethers";


function loginReducer(state, action) {
    switch (action.type) {
      case 'login': {
        return {
          ...state,
          account: action.account,
          isLoading: false,
          isAuthenticated: true,
          isError: false,

        };
      }
      case 'logout': {
        return {
          ...state,
          account: '',
          isAuthenticated: false,
          isError: false,
        };
      }
      case 'reset': {
        return action.payload;
      }
      case 'error': {
        return {
          ...state,
          isError: action.isError,
          
        };
      }
      case 'loading': {
        return {
          ...state,
          isLoading: true,
          
        };
      }
      default: {
        return state;
      }
    }
  }
  
const initialState = {
    account: '',
    isLoading: false,
    isAuthenticated: false,
    isError: false,
}

export default function Account() {
  
    const [state, dispatch] = useReducer(loginReducer, initialState)

    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.on('chainChanged', () => {
            logout();
            })
            window.ethereum.on('accountsChanged', () => {
            logout();
            })
        return()=>{
            window.ethereum.on('chainChanged', () => {})
            window.ethereum.on('accountsChanged', () => {})
        }
    }})
    
  
    const authenticate = async () => {
        dispatch({type: 'loading'});
        console.log("authenticating");
        if(window.ethereum){
            const networkId = await window.ethereum.request({ method: 'eth_chainId' });
            dispatch({type: 'error', isError: false });

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts", []);
            console.log(accounts[0])
            dispatch({type: 'login', 
                      account: accounts[0],
                    });
        }
    }

    const logout = () => {
      console.log("logout")
      dispatch({type: 'logout', });
    }
    
  

    return {state, authenticate, logout};
}