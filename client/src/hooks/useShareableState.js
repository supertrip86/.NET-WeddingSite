import { useState } from 'react';

const useShareableState = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return {
        loggedIn,
        setLoggedIn
    };
};

export { useShareableState };