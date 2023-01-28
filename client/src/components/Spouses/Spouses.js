import './Spouses.css';
import Bride from "../../assets/images/Spouses/bride.jpg";
import Groom from "../../assets/images/Spouses/groom.jpg";
import { useCountdown } from '../../hooks/useCountdown';
import Counter from '../Counter/Counter';

const Spouses = ({ couple, location }) => {
    const [days, hours, minutes, seconds] = useCountdown(location.weddingDate);

    const date = new Date(location.weddingDate);

    const day = date.toLocaleString('it-IT', { day: '2-digit' });
    const month = date.toLocaleString('it-IT', { month: 'long' });
    const monthCapitalized = `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
    const year = date.getFullYear();

    return (
        <>
            <div id="couple" className="bridegroom clear section-padding bg-pink">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="item toright">
                                <div className="img"> <img src={Bride} alt="" /> </div>
                                <div className="info valign">
                                    <div className="full-width">
                                        <h6>{couple.bride} {couple.brideSurname} </h6> <span>La Sposa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="item">
                                <div className="img"> <img src={Groom} alt="" /> </div>
                                <div className="info valign">
                                    <div className="full-width">
                                        <h6>{couple.groom} {couple.groomSurname} </h6> <span>Lo Sposo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-3 pb-3 text-center">
                        <h3 className="wedding-couple-title">Si Sposano!</h3>
                        <h4 className="font-weight-light">{monthCapitalized} {day}, {year} – {location.city}, {location.area}</h4>
                    </div>
                    <Counter
                        days={days}
                        hours={hours}
                        minutes={minutes}
                        seconds={seconds}
                    />
                </div>
            </div>
        </>
    );
}

export default Spouses;
