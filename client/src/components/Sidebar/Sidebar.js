import './Sidebar.css';
import { useState } from "react";
import { Link } from 'react-scroll';
import Logo from "../../assets/images/Sidebar/logo.png";

const Sidebar = ({ couple, location }) => {
    const [show, setShow] = useState(false);

    const date = new Date(location.weddingDate);

    const day = date.toLocaleString('en-US', { day: '2-digit' });
    const monthShort = date.toLocaleString('en-US', { month: '2-digit' });
    const monthLong = date.toLocaleString('en-US', { month: 'long' });
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
                            <Link onClick={closeMenu} to="couple" spy={true} smooth={true} duration={1000}>Announcement</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="whenwhere" spy={true} smooth={true} duration={1000}>When & Where</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="rsvp" spy={true} smooth={true} duration={1000}>R.S.V.P</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="questions" spy={true} smooth={true} duration={1000}>Q+A</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="story" spy={true} smooth={true} duration={1000}>Our Story</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="gallery" spy={true} smooth={true} duration={1000}>Gallery</Link>
                        </li>
                        <li>
                            <Link onClick={closeMenu} to="gift" spy={true} smooth={true} duration={1000}>Gift</Link>
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
