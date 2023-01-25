import './RSVP.css';
import { useState, useEffect } from 'react';
import { useBetween } from "use-between";
import { TailSpin } from 'react-loader-spinner';
import { useShareableState } from '../../hooks/useShareableState';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import axiosPrivate from '../../api/axios';
import Yes from '../../assets/images/RSVP/yes.png';
import No from '../../assets/images/RSVP/no.png';

const RSVP = ({ menus }) => {
    const [loaded, setLoaded] = useState(false);
    const [invitation, setInvitation] = useState({});
    const [guests, setGuests] = useState([]);
    const [note, setNote] = useState("");
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { loggedIn, setLoggedIn } = useBetween(useShareableState);

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
                setLoggedIn(true);
            }
        }
        setError(false);
        setLoaded(true);
    }

    const onLoginHandler = async (e) => {
        e.preventDefault();

        try {
            const email = e.target.querySelector("input").value;

            setLoaded(false);

            const loginResult = await login({
                email: email
            });

            await updateTokens(loginResult);

        } catch (error) {
            setError(true);
            setLoaded(true);
        }
    }

    const onChangeHandler = async (e, index) => {
        e.preventDefault();

        const { name, value } = e.target;
        const edits = [...guests];

        edits[index][name] = value;

        setGuests(edits);
        setInvitation({ ...invitation, guests: edits })
    }

    const onChangeNoteHandler = async (e) => {
        setNote(e.target.value)
        setInvitation({ ...invitation, note: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoaded(false);

        await updateInvitation(invitation);

        setSubmitted(true);
        setLoaded(true);
    }

    const onClickRemoveGuest = async (e, guestId) => {
        const edits = [...guests].filter(guest => guest.guestId !== guestId);

        setGuests(edits);
        setInvitation({ ...invitation, guests: edits })
    }

    const onClickAdd = () => {
        const id = invitation.invitationId;

        const edits = [...guests, {
            invitationRefId: id,
            lastName: '',
            firstName: '',
            invitation: null,
            attending: true,
            isPlusOne: true,
            chosenMenu: 'Vegetarian',
            allergies: '',
            intolerances: '',
            note: '',
            guestId: parseInt(Date.now().toString().slice(-6))
        }];

        setGuests(edits);
        setInvitation({ ...invitation, guests: edits });
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
        else {
            setLoaded(true);
        }
    }, []);

    return (
        <div id='rsvp' className='section-padding bg-img bg-fixed'>
            <div className='container'>
                {
                    loaded ? (
                        loggedIn ? (
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
                                                <div className="mb-4">
                                                    <span className='wedding-title-meta text-center'>Will you attend?</span>
                                                    <h2 className='wedding-title text-center'>R.S.V.P</h2>
                                                </div>
                                                <div className='text-center mb-4'>{invitation.welcome}</div>
                                                <div className='text-center mb-5'>Please, click on the <img className='example-image' src={No} /> button and switch it to <img className='example-image' src={Yes} /> for each attending guest.</div>
                                                <form onSubmit={onSubmitHandler}>
                                                    {
                                                        guests.map((guest, index) => {
                                                            return (
                                                                <div key={guest.guestId} className='d-md-flex'>
                                                                    {
                                                                        guest.isPlusOne ? (
                                                                            <div className="col d-flex p-1 m-auto">
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    value={guest.firstName}
                                                                                    name="firstName"
                                                                                    onChange={e => onChangeHandler(e, index)}
                                                                                    type="text"
                                                                                    className='form-control my-2'
                                                                                    placeholder='First Name'
                                                                                    onInvalid={e => e.target.setCustomValidity('Enter First Name')}
                                                                                    onInput={e => e.target.setCustomValidity('')}
                                                                                    required
                                                                                />
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    value={guest.lastName}
                                                                                    name="lastName"
                                                                                    onChange={e => onChangeHandler(e, index)}
                                                                                    type="text"
                                                                                    className='form-control my-2'
                                                                                    placeholder='Last Name'
                                                                                    onInvalid={e => e.target.setCustomValidity('Enter Last Name')}
                                                                                    onInput={e => e.target.setCustomValidity('')}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="col p-1 m-auto">{guest.firstName} {guest.lastName}</div>
                                                                        )
                                                                    }
                                                                    <div className="col-xs col-md-2 p-1 m-auto">
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
                                                                    <div className="col p-1 m-auto">
                                                                        <input
                                                                            autoComplete="off"
                                                                            value={guest.allergies}
                                                                            name="allergies"
                                                                            onChange={e => onChangeHandler(e, index)}
                                                                            type='text'
                                                                            className='form-control my-2'
                                                                            placeholder='Allergies'
                                                                        />
                                                                    </div>
                                                                    <div className="col p-1 m-auto">
                                                                        <input
                                                                            autoComplete="off"
                                                                            value={guest.intolerances}
                                                                            name="intolerances"
                                                                            onChange={e => onChangeHandler(e, index)}
                                                                            type='text'
                                                                            className='form-control my-2'
                                                                            placeholder='Intolerances'
                                                                        />
                                                                    </div>
                                                                    {
                                                                        guest.isPlusOne ? (
                                                                            <div className="col-1 p-1 m-auto">
                                                                                <button
                                                                                    type="button"
                                                                                    className='btn btn-primary btn-rsvp'
                                                                                    onClick={e => onClickRemoveGuest(e, guest.guestId)}
                                                                                >Remove</button>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="col-1 text-center p-1 m-auto">
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
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div className="text-right py-3">
                                                        <button type="button" className='btn btn-primary btn-rsvp' onClick={onClickAdd}>Click to add more guests</button>
                                                    </div>
                                                    <div className="mt-2">
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
                            <div className='login-container'>
                                <div className='row justify-content-center'>
                                    <div className='col-md-12 mb-30'>
                                        <h2 className='wedding-title-meta'>R.S.V.P</h2>
                                    </div>
                                </div>
                                <div className='row justify-content-center text-center'>
                                    <div className='col-md-12 p-40'>
                                        {
                                            error ? (
                                                <h4>Invalid email. Please try again</h4>
                                            ) : (
                                                <h4>Insert your email in the input field below, and click on the "ENTER YOUR EMAIL" button</h4>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col-md-6 p-40'>
                                        <form className='login-form' onSubmit={onLoginHandler}>
                                            <input type="text" />
                                            <button type="submit">Enter your email</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className='row justify-content-center'>
                            <div className='col-md-6 text-center'>
                                <TailSpin
                                    height="80"
                                    width="80"
                                    color="var(--main)"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    wrapperStyle={{}}
                                    wrapperClass="justify-content-center"
                                    visible={true}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RSVP