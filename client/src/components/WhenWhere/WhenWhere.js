import './WhenWhere.css';
import where1 from '../../assets/images/WhenWhere/drinks.jpg';
import where2 from '../../assets/images/WhenWhere/location.jpg';
import where3 from '../../assets/images/WhenWhere/hotel.jpg';
import { useState } from 'react';
import { Modal } from "react-bootstrap";
import Map from '../Map/Map';

const WhereWhere = ({ drinks, location, hotel }) => {
    const [showModal, setShow] = useState(false);
    const [position, setPosition] = useState({});

    const drinksDate = new Date(drinks.drinksDate);
    const weddingDate = new Date(location.weddingDate);

    const handleClose = () => setShow(false);

    const handleShow = (coordinates) => {
        setPosition(coordinates);
        setShow(true);
    };

    return (
        <>
            <div id='whenwhere' className='whenwhere section-padding bg-pink'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 mb-45'>
                            <span className='wedding-title-meta'>L'Evento</span>
                            <h2 className='wedding-title'>Dove e Quando</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 mb-30'>
                            <h5>Clicca (o tocca) l'immagine di una location per visualizzarne la posizione su Google Maps</h5>
                            <p>
                                <b>NOTA</b>: Fra giugno e luglio Roma è presa d'assalto dai turisti! Se pensate di riuscire a 
                                venire, prenotate un alloggio il più presto possibile. Contattateci al <b>+39 345 52 80 842</b> o 
                                scrivete a <b><a href="mailto:gio.giunta.86@gmail.com">gio.giunta.86@gmail.com</a></b> e vi 
                                aiuteremo a trovare una sistemazione!
                            </p>
                            <p>
                                <b>P.S.</b> mi dice Noelle di specificare che saremo in un giardino, per cui occhio al tipo di 
                                calzature che indosserete!
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='item col-12 col-md-4'>
                            <div className='whenwhere-img'>
                                <img src={where1} alt='' onClick={() => handleShow(drinks.position)} />
                            </div>
                            <div className='content'>
                                <h5>Drink di Benvenuto (La Sera Prima)</h5>
                                <p>
                                    <i className='ti-location-pin'></i> {drinks.name}
                                </p>
                                <p>
                                    <i className='ti-direction'></i> {drinks.address}, {drinks.city}
                                </p>
                                <p>
                                    <i className='ti-calendar'></i> <span>{drinksDate.getDate()} {drinksDate.toLocaleString('it-IT', { month: 'long' })} {drinksDate.getFullYear()}</span>
                                </p>
                                <p>
                                    <i className='ti-time'></i> <span>{drinks.startingTime} – {drinks.endingTime}</span>
                                </p>
                            </div>
                        </div>
                        <div className='item col-12 col-md-4'>
                            <div className='whenwhere-img'>
                                <img src={where2} alt='' onClick={() => handleShow(location.position)} />
                            </div>
                            <div className='content'>
                                <h5>Matrimonio e Festeggiamenti</h5>
                                <p>
                                    <i className='ti-location-pin'></i> {location.name}
                                </p>
                                <p>
                                    <i className='ti-direction'></i> {location.address}, {location.city}
                                </p>
                                <p>
                                    <i className='ti-calendar'></i> <span>{weddingDate.getDate()} {weddingDate.toLocaleString('it-IT', { month: 'long' })} {weddingDate.getFullYear()}</span>
                                </p>
                                <p>
                                    <i className='ti-time'></i> <span>{location.startingTime} – {location.endingTime}</span>
                                </p>
                            </div>
                        </div>
                        <div className='item col-12 col-md-4'>
                            <div className='whenwhere-img'>
                                <img src={where3} alt='' onClick={() => handleShow(hotel.position)} />
                            </div>
                            <div className='content'>
                                <h5>Alloggi (Se Necessari)</h5>
                                <p>
                                    <i className='ti-location-pin'></i> {hotel.name}
                                </p>
                                <p>
                                    <i className='ti-direction'></i> {hotel.address}, {hotel.city}
                                </p>
                                <p>
                                    <i className='ti-direction-alt'></i> {hotel.distance}
                                </p>
                                <p>
                                    <span><i className='ti-comments'></i> {hotel.notes}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className='whenwhere-modal' show={showModal} onHide={handleClose} centered>
                <Modal.Body>
                    <Map center={position} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WhereWhere