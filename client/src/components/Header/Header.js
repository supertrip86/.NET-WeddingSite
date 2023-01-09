import './Header.css';
import { motion } from 'framer-motion';

const Header = ({ couple, location, weddingDate }) => {
    const date = new Date(weddingDate);

    const day = date.getDate();
    const month = date.toLocaleString('it-IT', { month: 'long' });
    const year = date.getFullYear();

    return (
        <header id="home" className="header bg-img parallaxie">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center caption">
                        <motion.div
                            animate={{ y: 0, opacity: 1 }}
                            initial={{ y: 30, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1>{couple.bride} & {couple.groom}</h1>
                        </motion.div>
                        <motion.div
                            animate={{ y: 0, opacity: 1 }}
                            initial={{ y: 30, opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h5>{day} {month} {year}, {location.city}</h5>
                        </motion.div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;