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
                            <h4>Join us in:</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <ul>
                                <li>
                                    <span id='days'>{days}</span>Days
                                </li>
                                <li>
                                    <span id='hours'>{hours}</span>Hours
                                </li>
                                <li>
                                    <span id='minutes'>{minutes}</span>Minutes
                                </li>
                                <li>
                                    <span id='seconds'>{seconds}</span>Seconds
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