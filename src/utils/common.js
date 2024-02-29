// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};
export const getRole = () => {
    const userStr = sessionStorage.getItem("role");
    if (userStr) return JSON.parse(userStr);
    return null;
};
// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
};

// set the token and user from the session storage
export const setUserSession = (token, userName, role) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userName));
    sessionStorage.setItem('role', JSON.stringify(role));
};