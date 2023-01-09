import './WhenWhere.css';
import where1 from '../../assets/images/WhenWhere/where-1.jpg';
import where3 from '../../assets/images/WhenWhere/where-3.jpg';
import { useState } from 'react';
import { Modal } from "react-bootstrap";
import Map from '../Map/Map';

const WhereWhere = ({ location, hotel }) => {
    const [showModal, setShow] = useState(false);
    const [position, setPosition] = useState({});

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
                        <div className='item col-12 col-md-6'>
                            <div className='whenwhere-img'>
                                <img src={where1} alt='' onClick={() => handleShow(location.position)} />
                            </div>
                            <div className='content'>
                                <h5>Wedding Ceremony & Party</h5>
                                <p>
                                    <i className='ti-location-pin'></i> {location.name}, {location.address}, {location.city}
                                </p>
                                <p>
                                    <i className='ti-time'></i> <span>{location.startingTime} – {location.endingTime}</span>
                                </p>
                            </div>
                        </div>
                        <div className='item col-12 col-md-6'>
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