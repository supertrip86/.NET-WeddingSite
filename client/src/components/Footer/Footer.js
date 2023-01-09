import './Footer.css';
import Logo from '../../assets/images/Footer/logo.png'

const Footer = ({ couple, location, weddingDate }) => {
    const date = new Date(weddingDate);

    const day = date.toLocaleString('it-IT', { day: '2-digit' });
    const month = date.toLocaleString('it-IT', { month: 'long' });
    const monthCapitalized = `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
    const year = date.getFullYear();

    return (
        <div className='footer2'>
            <div className='wedding-narrow-content'>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <h2>
                            <a href='/'>
                                <img src={Logo} alt='' />
                                <span>
                                    {couple.bride} <small>&</small> {couple.groom}
                                </span>
                            </a>
                        </h2>
                        <p className='copyright'>{monthCapitalized} {day}, {year} – {location.city}, {location.area}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer