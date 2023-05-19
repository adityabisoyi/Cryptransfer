import React, {useContext} from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
    />
  );

const Transfer = () => {

    const {connectWallet, currentAccount, formData, sendTransaction, handleChange} = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const { address, amount, message } = formData;

        e.preventDefault();

        if (!address || !amount || !message) return console.log("if ke andhar");

        sendTransaction();
    }

    return (
        <>
            <div className="transfer">
                {!currentAccount && <button className="connect-btn" onClick={connectWallet}>Connect Metamask Account</button>}
                <div className="transfer-header">
                    <h1>Transfer Ether</h1>
                    <p>Connected to: {shortenAddress(currentAccount)}</p>
                </div>
                <div className="transfer-details">
                    <Input type="text" name="address" placeholder="To" handleChange={handleChange} />
                    <Input type="number" name="amount" placeholder="Amount (ETH)" handleChange={handleChange} />
                    <Input type="text" name="message" placeholder="Message" handleChange={handleChange}  />
                </div>
                <button type="button" onClick={handleSubmit}>Transfer</button>
            </div>
        </>
    )
}

export default Transfer;