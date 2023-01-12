import './RSVP.css';
import { useState, useEffect } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axiosPrivate from '../../api/axios';

const RSVP = ({ menus }) => {
    const [attending, setAttending] = useState(false);
    const [name, setName] = useState(null);
    const [guests, setGuests] = useState([]);

    const login = async (json) => await axiosPrivate.post("/api/auth/Login", json);
    const refreshLogin = async (json) => await axiosPrivate.post("/api/auth/RefreshLogin", json);
    const getInvitation = async (id) => await axiosPrivate.get(`/api/weddingsite/GetInvitationById/${id}`);

    const updateTokens = async (tokens) => {
        window.localStorage.setItem("refreshToken", tokens.data.refreshToken);
        window.localStorage.setItem("accessToken", tokens.data.accessToken);

        if (tokens.data.invitationId) {
            const invitation = await getInvitation(tokens.data.invitationId);

            if (invitation.data) {
                setName(invitation.data.firstName);
                setGuests(invitation.data.guests);
            }
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const email = e.target.querySelector("input").value;

        const loginResult = await login({
            email: email
        });

        await updateTokens(loginResult);
    }

    useEffect(() => {
        const refreshToken = window.localStorage.getItem("refreshToken");
        const accessToken = window.localStorage.getItem("accessToken");

        if (refreshToken && accessToken) {
            const refresh = async () => {
                const refreshTokens = await refreshLogin({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });

                await updateTokens(refreshTokens);
            };

            refresh();
        }
    }, []);

    return (
        <div id='rsvp' className='section-padding bg-img bg-fixed'>
            <div className='container'>
                {
                    (name && guests) ? (
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className='col-md-6 text-center'>
                                    <h3>Hi {name}!</h3>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                <div className='col-md-12'>
                                    <span className='wedding-title-meta text-center'>Will you attend?</span>
                                    <h2 className='wedding-title text-center'>R.S.V.P</h2>
                                    <div className="mt-5 mb-5 text-center">
                                        <BootstrapSwitchButton
                                            checked={attending}
                                            onstyle="primary"
                                            offstyle="info"
                                            onlabel="Yes"
                                            offlabel="No"
                                            onChange={checked => setAttending(checked)}
                                        />
                                    </div>
                                    {
                                        attending ? (
                                            <form method='post'>
                                                {
                                                    guests.map((guest, index) => {
                                                        return (
                                                            <div key={index} className='d-md-flex mb-3'>
                                                                <div className="col m-auto">{guest.firstName} {guest.lastName}</div>
                                                                <div className="col m-auto">
                                                                    <select className="form-control">
                                                                        {
                                                                            menus.map((menu, index) => {
                                                                                return (
                                                                                    <option key={index} value={menu}>{menu}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="col m-auto">
                                                                    <input type='text' className='form-control m-auto' placeholder='Allergies / Intolerances' />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div>
                                                    <textarea placeholder="Notes"></textarea>
                                                </div>
                                                <div className="mt-4">
                                                    <input type='submit' className='btn buttono' value='SEND' />
                                                </div>
                                            </form>
                                        ) : (
                                            <></>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='row justify-content-center'>
                            <div className='col-md-6 p-40'>
                                <form onSubmit={onSubmitHandler}>
                                    <input type="text" />
                                    <button type="submit">Enter your email</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RSVP