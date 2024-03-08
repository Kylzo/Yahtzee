import '../styles/home.css';


function Home() {

    return (
        <div className="home-page">Home
            <form className="profil-container"> Profil
            </form>

            <form className="chat-container">
                <textarea className="chat-input">
                </textarea>
            </form>

            <form className="userOnline-container">Online
            </form>
        </div>
    )
}

export default Home