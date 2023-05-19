import React, { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";

import {contractABI, contractAddress} from '../utils/constants'

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log({provider,signer,transactionContract});

    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({address: '', amount: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))

    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) 
                return alert("Please install Metamask");

            const transactionContract = getEthereumContract();
            const allTransactions = await transactionContract.getTransactions();
            
            const structuredTransactions = allTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                amount: parseInt(transaction.amount) / (10 ** 18)
            }))

            console.log(structuredTransactions);

            setTransactions(structuredTransactions);

        } catch (error) {
            console.log(error)
        }
    }

    const checkWalletConnect = async () => {
        try {
            if(!ethereum) 
                return alert("Please install Metamask");
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }
            else {
                console.log("No accounts Found");
            }
        }
        catch(error) {
            console.log(error);

            throw new Error("No ethereum object");
        }

    }

    const checkTransaction = async () => {
        try {
            if(!ethereum)
                return alert("Please install Metamask");

            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        }catch(error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum)
                return alert("Please install Metamask");
            
                const accounts = await ethereum.request({method: 'eth_requestAccounts'});

                setCurrentAccount(accounts[0]);
        }catch(error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        console.log("Button pressed");
        try {
            if(!ethereum)
                return alert("Please install Metamask");
            
            const {address, amount, message} = formData;

            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: address,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await transactionContract.doTransaction(address, parsedAmount, message, 0);
            
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            setIsLoading(false);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransCount();
            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkWalletConnect();
    }, []); 

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}