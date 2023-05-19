import { Navbar, Footer, Transfer, Recent, Banner } from './components'

const App = () => {

    return (
        <>
            <div className="screen">
                <Navbar/>
                <Banner/>
                <Transfer/>
                <Recent/>
                <Footer/>
            </div>
        </>
    )
}

export default App
