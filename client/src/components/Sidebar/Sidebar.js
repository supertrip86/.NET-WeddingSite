import './Sidebar.css';
import { useState } from "react";
import { Link } from 'react-scroll';
import Logo from "../../assets/images/Sidebar/logo.png";

const Sidebar = ({ couple, location }) => {
    const [show, setShow] = useState(false);

    const date = new Date(location.weddingDate);

    const day = date.toLocaleString('it-IT', { day: '2-digit' });
    const monthShort = date.toLocaleString('it-IT', { month: '2-digit' });
    const monthLong = date.toLocaleString('it-IT', { month: 'long' });
    const year = date.getFullYear();

    const openMenu = (e) => {
        e.preventDefault();
        setShow(!show);
        document.body.classList.toggle("offcanvas");
    };

    const closeMenu = () => {
        setShow(false);
        document.body.classList.remove("offcanvas");
    };

    return (
        <>
            <a
                href="/"
                onClick={openMenu}
                className={`js-wedding-nav-toggle wedding-nav-toggle${show ? " active" : ""}`}
            >
            </a>
            <aside id="wedding-aside">
                <div className="wedding-logo">
                    <a href="/">
                        <img src={Logo} alt="" />
                        <span>{couple.bride} <small>&</small> {couple.groom}</span>
                        <h6>{day}.{monthShort}.{year}</h6>
                    </a>
                </div>
                <nav className="wedding-main-menu">
                    <ul>
                        <li>
                            <Link onClick={closeMenu} to="home" spy={true} smooth={true} duration={1000}>Home</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="couple" spy={true} smooth={true} duration={1000}>Annuncio</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="whenwhere" spy={true} smooth={true} duration={1000}>L'Evento</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="rsvp" spy={true} smooth={true} duration={1000}>R.S.V.P</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="story" spy={true} smooth={true} duration={1000}>La Nostra Storia</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="gallery" spy={true} smooth={true} duration={1000}>Galleria</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="gift" spy={true} smooth={true} duration={1000}>Regalo</Link>
                        </li>
                    </ul>
                </nav>
                <div className="footer1"> <span className="separator"></span>
                    <p>{couple.bride} & {couple.groom}<br />{day} {monthLong} {year}, {location.city}</p>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
