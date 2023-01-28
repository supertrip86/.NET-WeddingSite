import './Counter.css';

const Counter = ({ days, hours, minutes, seconds }) => {
    if (days + hours + minutes + seconds > 0) {
        return (
            <div
                id='countdown'
                className='bg-img bg-fixed'
            >
                <div className='container'>
                    <div className='row'>
                        <div className='section-head col-md-12'>
                            <h4>Mancano solo:</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <ul>
                                <li>
                                    <span id='days'>{days}</span>Giorni
                                </li>
                                <li>
                                    <span id='hours'>{hours}</span>Ore
                                </li>
                                <li>
                                    <span id='minutes'>{minutes}</span>Minuti
                                </li>
                                <li>
                                    <span id='seconds'>{seconds}</span>Secondi
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Counter