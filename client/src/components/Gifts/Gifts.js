import './Gifts.css';
import Us from '../../assets/images/Gifts/us.jpg';

const Gifts = () => {
    return (
        <div id="gift" className="gift-section gift">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <span className="wedding-title-meta">Gift</span>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    <div className="col-md-12">
                        <h4>We can't wait to celebrate our big day with you! Your presence is more than enough, but if you feel like it, donate a "brick" to our future home!</h4>
                    </div>
                    <div className="col-md-12 mb-4">
                        <h4>IBAN: 1234 4567 7890 1234</h4>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-12">
                        <img className='gifts-img' src={Us} alt="To infinity and beyond" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gifts;