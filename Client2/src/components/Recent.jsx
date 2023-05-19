import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData, {} from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ network, addressTo, addressFrom, timestamp, message, amount}) => {
    return (
        <div className="transaction-card">
            <a href={`https://${network}.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
                <p className="trans-data">From: {shortenAddress(addressFrom)}</p>
            </a>
            <a href={`https://${network}.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
                <p className="trans-data">To: {shortenAddress(addressTo)}</p>
            </a>
            <p className="trans-data">Amount: {amount} ETH</p>
            <p className="trans-data">Message: {message}</p>
            <div className="trans-data time" >
                <p className="timestamp">{timestamp}</p>
            </div>
        </div>
    )
}

const Recent = () => {
    const {currentAccount, transactions} = useContext(TransactionContext);

    return (
        <>
            <div className="recent">
                {currentAccount ? (
                    <h1>Latest Transactions</h1>
                ) : <h1>Connect your account to see latest transactions</h1>}
            </div>
            <div className="transactions">
                {transactions.reverse().map((transaction, i) => (
                    <TransactionsCard key = {i} {...transaction}></TransactionsCard>
                ))}
            </div>
        </>
    )
}

export default Recent;