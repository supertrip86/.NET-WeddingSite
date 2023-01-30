import './Gifts.css';
import Us from '../../assets/images/Gifts/us.jpg';
import { useState, useEffect } from 'react';
import { useBetween } from "use-between";
import { useShareableState } from '../../hooks/useShareableState';
import axiosPrivate from '../../api/axios';

const Gifts = () => {
    const [bankingDetails, setBankingDetails] = useState({});
    const { loggedIn } = useBetween(useShareableState);

    const getBankingDetails = async () => await axiosPrivate.get("/api/weddingsite/GetBankingDetails");

    useEffect(() => {
        if (loggedIn) {
            const details = async () => {
                const result = await getBankingDetails();

                if (result.data) {
                    setBankingDetails(result.data);
                }
            };

            details();
        }
    }, [loggedIn]);

    return (
        <div id="gift" className="gift-section gift">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <span className="wedding-title-meta">Regalo</span>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    {
                        bankingDetails.bankAccountHolder ? (
                            <>
                                <div className="col-md-12">
                                    <h4>
                                        Siete disposti a venire a Roma d'estate, nonostante il caldo e i turisti... 
                                        Questo per noi è già un grande regalo, nonché una grande dimostrazione
                                        d'affetto. Qualora tuttavia voleste proprio esagerare, perché non contribuire 
                                        regalandoci un "mattone" per la nostra futura casa?
                                    </h4>
                                </div>
                                <div className="col-md-12">
                                    <table className="table-borderless">
                                        <tbody>
                                            <tr>
                                                <td><h5>Conto intestato a:</h5></td>
                                                <td><h5>{bankingDetails.bankAccountHolder}</h5></td>
                                            </tr>
                                            <tr>
                                                <td><h5>IBAN:</h5></td>
                                                <td><h5>{bankingDetails.bankAccountNumber}</h5></td>
                                            </tr>
                                            <tr>
                                                <td><h5>Banca:</h5></td>
                                                <td><h5>{bankingDetails.bankAddress}</h5></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="col-md-12 mb-4">
                                <h4>Effettua il login nella sezione "RSVP" per accedere a questa informazione</h4>
                            </div>
                        )
                    }
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