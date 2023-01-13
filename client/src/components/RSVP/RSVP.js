import './RSVP.css';
import { useState, useEffect } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axiosPrivate from '../../api/axios';

const RSVP = ({ menus }) => {
    const [invitation, setInvitation] = useState({});
    const [guests, setGuests] = useState([]);
    const [note, setNote] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const login = async (json) => await axiosPrivate.post("/api/auth/Login", json);
    const refreshLogin = async (json) => await axiosPrivate.post("/api/auth/RefreshLogin", json);
    const getInvitation = async (id) => await axiosPrivate.get(`/api/weddingsite/GetInvitationById/${id}`);
    const updateInvitation = async (json) => await axiosPrivate.put(`/api/weddingsite/UpdateInvitation`, json);

    const updateTokens = async (tokens) => {
        window.localStorage.setItem("refreshToken", tokens.data.refreshToken);
        window.localStorage.setItem("accessToken", tokens.data.accessToken);

        if (tokens.data.invitationId) {
            const result = await getInvitation(tokens.data.invitationId);

            if (result.data) {
                setInvitation(result.data);
                setGuests(result.data.guests);
                setNote(result.data.note);
            }
        }
    }

    const onLoginHandler = async (e) => {
        e.preventDefault();

        const email = e.target.querySelector("input").value;

        const loginResult = await login({
            email: email
        });

        await updateTokens(loginResult);
    }

    const onChangeHandler = async (e, index) => {
        e.preventDefault();

        const { name, value } = e.target;
        const edits = [...guests];

        edits[index][name] = value;

        setGuests(edits);
        setInvitation({ ...invitation, guests: edits })
    }

    const onChangeNoteHandler = (e) => {
        setNote(e.target.value)
        setInvitation({ ...invitation, note: note })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        await updateInvitation(invitation);

        setSubmitted(true);
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
                    (invitation.firstName) ? (
                        <>
                            <div className='row justify-content-center'>
                                <div className='col-md-6 text-center'>
                                    <h3>Hi {invitation.firstName}!</h3>
                                </div>
                            </div>
                            <div className='row justify-content-center'>
                                {
                                    submitted ? (
                                        <div className='text-center'>
                                            <h2 className='wedding-title my-5'>Thank you for letting us know!</h2>
                                            <h4 className='font-weight-light'>Feel free to come back to this page anytime you want to make a change with your reservation</h4>
                                        </div>
                                    ) : (
                                        <div className='col-md-12'>
                                            <div className="mb-5">
                                                <span className='wedding-title-meta text-center'>Will you attend?</span>
                                                <h2 className='wedding-title text-center'>R.S.V.P</h2>
                                            </div>
                                            <form onSubmit={onSubmitHandler}>
                                                {
                                                    guests.map((guest, index) => {
                                                        return (
                                                            <div key={index} className='d-md-flex mb-3'>
                                                                <div className="col m-auto">{guest.firstName} {guest.lastName}</div>
                                                                <div className="col m-auto">
                                                                    <select
                                                                        value={guest.chosenMenu}
                                                                        name="chosenMenu"
                                                                        onChange={e => onChangeHandler(e, index)}
                                                                        className="form-control my-2"
                                                                    >
                                                                        {
                                                                            menus.map((menu, i) => {
                                                                                return (
                                                                                    <option key={i} value={menu}>{menu}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="col m-auto">
                                                                    <input
                                                                        value={guest.allergies}
                                                                        name="allergies"
                                                                        onChange={e => onChangeHandler(e, index)}
                                                                        type='text'
                                                                        className='form-control my-2'
                                                                        placeholder='Allergies'
                                                                    />
                                                                </div>
                                                                <div className="col m-auto">
                                                                    <input
                                                                        value={guest.intolerances}
                                                                        name="intolerances"
                                                                        onChange={e => onChangeHandler(e, index)}
                                                                        type='text'
                                                                        className='form-control my-2'
                                                                        placeholder='Intolerances'
                                                                    />
                                                                </div>
                                                                <div className="col m-auto">
                                                                    <BootstrapSwitchButton
                                                                        checked={guest.attending}
                                                                        name="attending"
                                                                        onstyle="primary"
                                                                        offstyle="info"
                                                                        onlabel="Yes"
                                                                        offlabel="No"
                                                                        onChange={checked => guest.attending = checked}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div>
                                                    <textarea value={note} onChange={onChangeNoteHandler} placeholder="Notes"></textarea>
                                                </div>
                                                <div className="mt-4">
                                                    <input type='submit' className='btn buttono' value='SEND' />
                                                </div>
                                            </form>

                                        </div>
                                    )
                                }
                            </div>
                        </>
                    ) : (
                        <div className='row justify-content-center'>
                            <div className='col-md-6 p-40'>
                                <form onSubmit={onLoginHandler}>
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