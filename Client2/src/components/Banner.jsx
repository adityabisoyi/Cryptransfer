const Banner = () => {
    return (
        <div>
            <div className="heading">
                <h1>Welcome to <span>Cryptransfer</span></h1>
                <p>The best ethereum transfer portal built using ReactJS, Vite, Ethers and Hardhat. Easily transfer ethereum along a nice message for the receiver. Also view all your transactions performed on our platform.</p>
            </div>
            <div className="help">
                <p className="instructions">
                    If you dont have metamask 
                    <a href="https://metamask.io/" target="_blank" rel="noreferrer">click here</a>
                </p>
                <p className="instructions">
                    If you dont have sepolia coins 
                    <a href="https://sepoliafaucet.com/" target="_blank" rel="noreferrer">click here</a>
                </p>
            </div>
        </div>
    )
}

export default Banner;