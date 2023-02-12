import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const addUser = (name, email, password) => {
    setLoading(true);
    const newUser = { id: Date.now(), name, email, password };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <UserContext.Provider value={{ users, loading, addUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;