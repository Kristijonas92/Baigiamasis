import { createContext, useState } from 'react';

import data from '../components/data/data.json';

const UserContext = createContext({
  users: [],
});

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(data.users);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const value = { users, addUser };

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
