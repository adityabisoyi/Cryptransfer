const Footer = () => {
    return (
        <>
            <footer>
                <h1>Cryptransfer</h1>
                <div className="services">
                    <p>Home</p>
                    <p>Transfer</p>
                    <p>Transactions</p>
                    <p>Contact us</p>
                </div>
                <div className="social-media">
                    <a href="https://www.instagram.com/its_me_adi.___/" target="_blank" rel="noreferrer">
                        <img src="../../Images/insta.svg" alt="instagram" />
                    </a>
                    <a href="https://twitter.com/AdityaBisoyi15">
                        <img src="../../Images/twitter.svg" alt="twitter" target="_blank" rel="noreferrer"/>
                    </a>
                    <a href="https://github.com/adityabisoyi">
                        <img src="../../Images/github.svg" alt="github" target="_blank" rel="noreferrer"/>
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer;