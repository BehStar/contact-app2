import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

export const UsersContext = createContext(null);
export const UsersDispatchContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [users, dispatch] = useReducer(usersReducers, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/db.json");
        if (!response.ok) {
          throw new Error("Failed to fetch users data.");
        }
        const data = await response.json();
        dispatch({ type: "SET_USERS", payload: data.users }); 
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
export const useUsersDipatch = () => {
  return useContext(UsersDispatchContext);
};

const usersReducers = (users, action) => {
  console.log("Action", action);
  console.log(users);
  switch (action.type) {
    case "SET_USERS":
      return action.payload;
    case "add-user": {
      return [
        ...users,
        {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          occupation: action.payload.occupation,
          phone: action.payload.number,
          icon: action.payload.icon,
        },
      ];
    }
    case "edit-user": {
      const updatedUserIndex = users.findIndex(
        (user) => user.id === action.payload.id
      );

      if (updatedUserIndex !== -1) {
        const updatedUsers = [...users]; 
        updatedUsers[updatedUserIndex] = action.payload;
        return updatedUsers;
      } else {
        return users;
      }
    }
    case "remove-user": {
      return users.filter((u) => u.id !== action.payload.id);
    }
    case "remove-multiple-users": {
      return users.filter((u) => !action.payload.ids.includes(u.id));
    }
    case "clear-users": {
      return [];
    }
    default:
      return users;
  }
};
