import { useEffect, useReducer, createContext } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// actual value for acces
export const UserContext = createContext({
currentUser: null,
setCurrentUser: () => null
});

const initial_State = {
    currentUser: null
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
} 


const userReducer = (state, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:

        return {
            ...state,
            currentUser: payload
        }

        default:
            throw new Error(`not ok ${type}`)
    }
}

export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(0);
    const [state, dispatch] = useReducer(userReducer, initial_State);

    const {currentUser} = state;

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}