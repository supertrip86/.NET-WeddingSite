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
                        <span className="wedding-title-meta">Gift</span>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    {
                        bankingDetails.bankAccountHolder ? (
                            <>
                                <div className="col-md-12">
                                    <h4>
                                        We can't wait to celebrate our big day with you!
                                        Your presence is more than enough, but if you feel
                                        like it, contribute a "brick" to our future home
                                    </h4>
                                </div>
                                <div className="col-md-12">
                                    <table className="table-borderless">
                                        <tbody>
                                            <tr>
                                                <td><h5>Bank Account Holder:</h5></td>
                                                <td><h5>{bankingDetails.bankAccountHolder}</h5></td>
                                            </tr>
                                            <tr>
                                                <td><h5>Account Number:</h5></td>
                                                <td><h5>{bankingDetails.bankAccountNumber}</h5></td>
                                            </tr>
                                            <tr>
                                                <td><h5>Routing Number:</h5></td>
                                                <td><h5>{bankingDetails.bankRoutingNumber}</h5></td>
                                            </tr>
                                            <tr>
                                                <td colSpan='2'></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2"><h5>{bankingDetails.bankAddress}</h5></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="col-md-12 mb-4">
                                <h4>Please, log in to the RSVP section to access this information</h4>
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