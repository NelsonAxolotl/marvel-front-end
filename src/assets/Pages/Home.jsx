import sound from '../IMG/sound.mp3';

const Home = () => {

    return (
        <div className="home">
            <audio
                controls hidden
                loop
                autoPlay
                src={sound} />
            <h1>WELCOME TO COMICS MARVEL</h1>
        </div>

    )
}

export default Home;