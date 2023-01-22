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
                        <div className='col-md-12 mb-30'>
                            <span className='wedding-title-meta'>Questions</span>
                            <h2 className='wedding-title'>When & Where</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 mb-30'>
                            <p>Click or tap over an image for the exact location on Google Maps.</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='item col-12 col-md-4'>
                            <div className='whenwhere-img'>
                                <img src={where1} alt='' onClick={() => handleShow(drinks.position)} />
                            </div>
                            <div className='content'>
                                <h5>Welcome Drinks (Night Before)</h5>
                                <p>
                                    <i className='ti-location-pin'></i> {drinks.name}, {drinks.address}, {drinks.city}
                                </p>
                                <p>
                                    <i className='ti-calendar'></i> <span>{drinksDate.getDate()} {drinksDate.toLocaleString('en-US', { month: 'long' })} {drinksDate.getFullYear()}</span>
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
                                <h5>Wedding Ceremony & Party</h5>
                                <p>
                                    <i className='ti-location-pin'></i> {location.name}, {location.address}, {location.city}
                                </p>
                                <p>
                                    <i className='ti-calendar'></i> <span>{weddingDate.getDate()} {weddingDate.toLocaleString('en-US', { month: 'long' })} {weddingDate.getFullYear()}</span>
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
                                <h5>Accomodations (If Needed)</h5>
                                <p>
                                    <i className='ti-direction-alt'></i> {hotel.name}, {hotel.address}, {hotel.city}
                                </p>
                                <p>
                                    <i className='ti-direction'></i> {hotel.distance}
                                </p>
                                <p>
                                    <span><i className='ti-comments'></i> Special prices have been negotiated with this host</span>
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