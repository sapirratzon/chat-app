const initialState = {
    currentUser: sessionStorage.getItem('currentUser'),
    userColor: sessionStorage.getItem('userColor')
};

export const reducer = (state = initialState, action) => {
    if (action.type === 'LOGIN') {
        sessionStorage.setItem('currentUser', action.payload["username"]);
        return {
            currentUser: action.payload["username"],
            userColor: action.payload["userColor"]
        }
    }
    return state;
};

export default reducer;
