import './RSVP.css';
import { useState, useEffect } from 'react';
import { useBetween } from "use-between";
import { TailSpin } from 'react-loader-spinner';
import { useShareableState } from '../../hooks/useShareableState';
import axiosPrivate from '../../api/axios';

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

        edits[index][name] = value === "true" ? true : (value === "false" ? false : value);

        setGuests(edits);
        setInvitation({ ...invitation, guests: edits });
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
            chosenMenu: 'Vegetariano',
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
                                        <h3>Ciao {invitation.firstName}!</h3>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    {
                                        submitted ? (
                                            <div className='text-center'>
                                                <h2 className='wedding-title my-5'>Grazie per averci fatto sapere!</h2>
                                                <h4 className='font-weight-light'>Tornate su questa pagina se volete fare delle modifiche alla vostra prenotazione</h4>
                                            </div>
                                        ) : (
                                            <div className='col-md-12'>
                                                <div className="mb-4">
                                                    <span className='wedding-title-meta text-center'>Ci sarete?</span>
                                                    <h2 className='wedding-title text-center'>R.S.V.P</h2>
                                                </div>
                                                <div className='text-center mb-4'>{invitation.welcome}</div>
                                                <form onSubmit={onSubmitHandler}>
                                                    {
                                                        guests.map((guest, index) => {
                                                            return (
                                                                <div key={guest.guestId} className='d-md-flex'>
                                                                    {
                                                                        guest.isPlusOne ? (
                                                                            <div className="col d-flex p-1 m-auto">
                                                                                <div>
                                                                                    <label htmlFor={`guest-name-${index}`}></label>
                                                                                    <input
                                                                                        id={`guest-name-${index}`}
                                                                                        autoComplete="off"
                                                                                        value={guest.firstName}
                                                                                        name="firstName"
                                                                                        onChange={e => onChangeHandler(e, index)}
                                                                                        type="text"
                                                                                        className='form-control my-2'
                                                                                        placeholder='Nome'
                                                                                        onInvalid={e => e.target.setCustomValidity('Inserisci il Nome')}
                                                                                        onInput={e => e.target.setCustomValidity('')}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <label htmlFor={`guest-lastname-${index}`}></label>
                                                                                    <input
                                                                                        id={`guest-lastname-${index}`}
                                                                                        autoComplete="off"
                                                                                        value={guest.lastName}
                                                                                        name="lastName"
                                                                                        onChange={e => onChangeHandler(e, index)}
                                                                                        type="text"
                                                                                        className='form-control my-2'
                                                                                        placeholder='Cognome'
                                                                                        onInvalid={e => e.target.setCustomValidity('Inserisci il Cognome')}
                                                                                        onInput={e => e.target.setCustomValidity('')}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="col p-1 m-auto">
                                                                                <label htmlFor={`guest-name-${index}`}></label>
                                                                                <div id={`guest-name-${index}`}>
                                                                                    {guest.firstName} {guest.lastName}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    <div className="col-xs col-md-2 p-1 m-auto">
                                                                        <label htmlFor={`guest-menu-${index}`}></label>
                                                                        <select
                                                                            id={`guest-menu-${index}`}
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
                                                                        <label htmlFor={`guest-has-allergies-${index}`}></label>
                                                                        <input
                                                                            id={`guest-has-allergies-${index}`}
                                                                            autoComplete="off"
                                                                            value={guest.allergies}
                                                                            name="allergies"
                                                                            onChange={e => onChangeHandler(e, index)}
                                                                            type='text'
                                                                            className='form-control my-2'
                                                                            placeholder='Allergie'
                                                                        />
                                                                    </div>
                                                                    <div className="col p-1 m-auto">
                                                                        <label htmlFor={`guest-has-intolerances-${index}`}></label>
                                                                        <input
                                                                            id={`guest-has-intolerances-${index}`}
                                                                            autoComplete="off"
                                                                            value={guest.intolerances}
                                                                            name="intolerances"
                                                                            onChange={e => onChangeHandler(e, index)}
                                                                            type='text'
                                                                            className='form-control my-2'
                                                                            placeholder='Intolleranze'
                                                                        />
                                                                    </div>
                                                                    {
                                                                        guest.isPlusOne ? (
                                                                            <div className="col-1 p-1 m-auto">
                                                                                <label htmlFor={`guest-is-attending-${index}`}></label>
                                                                                <button
                                                                                    id={`guest-is-attending-${index}`}
                                                                                    type="button"
                                                                                    className='btn btn-primary btn-rsvp'
                                                                                    onClick={e => onClickRemoveGuest(e, guest.guestId)}
                                                                                >Rimuovi</button>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="col-xs col-md-2 text-center p-1 m-auto">
                                                                                <label htmlFor={`guest-is-attending-${index}`}><b>Parteciperà?</b></label>
                                                                                <select
                                                                                    id={`guest-is-attending-${index}`}
                                                                                    value={guest.attending}
                                                                                    name="attending"
                                                                                    onChange={e => onChangeHandler(e, index)}
                                                                                    className="form-control my-2"
                                                                                >
                                                                                    <option value={false}>No</option>
                                                                                    <option value={true}>Si</option>
                                                                                </select>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div className="text-right py-3">
                                                        <button type="button" className='btn btn-primary btn-rsvp' onClick={onClickAdd}>Clicca per aggiungere invitati</button>
                                                    </div>
                                                    <div className="mt-2">
                                                        <textarea value={note} onChange={onChangeNoteHandler} placeholder="Note"></textarea>
                                                    </div>
                                                    <div className="mt-4">
                                                        <input type='submit' className='btn buttono' value='INVIA' />
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
                                                <h4>Email non valida. Prova di nuovo</h4>
                                            ) : (
                                                <h4>Inserisci la tua email nel campo qui in basso, poi clicca sul pulsante "INVIA"</h4>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col-md-6 p-40'>
                                        <form className='login-form' onSubmit={onLoginHandler}>
                                            <input type="text" />
                                            <button type="submit">Invia</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className='row justify-content-center loading-wrapper'>
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