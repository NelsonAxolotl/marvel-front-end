import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee, faSkull, faGhost, faStar, faBomb, faVideo, faKey, faSpider } from '@fortawesome/free-solid-svg-icons';
import video from '../Video/marvel2.mp4';

const Footer = () => {

    return (
        <>
            <footer >
                <div className='flex-h3'>
                    <video src={video}
                        autoPlay muted
                        loop
                        className="video" />
                    <h3>Les Liens Marvels</h3>
                </div>
                <div className="icons">
                    <span><a href="https://www.lereacteur.io/"><FontAwesomeIcon icon={faCoffee} ></FontAwesomeIcon></a></span>
                    <span><a href="https://www.marvel.com/comics?&options%5Boffset%5D=0&totalcount=12"><FontAwesomeIcon icon={faGhost} /></a></span>
                    <span><a href="https://github.com/NelsonAxolotl"><FontAwesomeIcon icon={faSkull} /></a></span>
                    <span><a href="https://www.emp-online.fr/merchandising-pop-culture/marvel/"><FontAwesomeIcon icon={faStar} /></a></span>
                    <span><a href="https://www.marvel.com/articles"><FontAwesomeIcon icon={faBomb} /></a></span>
                    <span><a href="https://www.youtube.com/results?search_query=marvel"><FontAwesomeIcon icon={faVideo} /></a></span>
                    <span><a href="https://www.linkedin.com/in/nelson-paraiso-98a6b12b5/"><FontAwesomeIcon icon={faKey} /></a></span>
                    <span><a href="https://marvelstory.fr/mcu/chronologie-mcu/"><FontAwesomeIcon icon={faSpider} /></a></span>
                </div>
                <nav>
                    <ul>
                        <li>Le Reacteur</li>
                        <li>Comics</li>
                        <li>Github</li>
                        <li>Shops</li>
                        <li>Forums</li>
                        <li>Videos</li>
                        <li>Contacts</li>
                        <li>Events</li>
                    </ul>
                </nav>
                <h4>by The Cool Axolotl</h4>
            </footer>

        </>

    )
}


export default Footer;