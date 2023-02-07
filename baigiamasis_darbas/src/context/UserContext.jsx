import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = (props) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch('data.json')
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <UserContext.Provider value={userData}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserProvider }
export default UserContext