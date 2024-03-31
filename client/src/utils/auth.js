import decode from 'jwt-decode';

class AuthService {
    // gets the token and decodes it.
    getProfile() {
        return decodeURIComponent(this.getToken())
    }

    // checks if the user is logged in and if it is still valid.
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // verifys token is valid (divide by 1000 because jwts are different time format).
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    // retrieves the token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // sets the new token in the local storage on log in.
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/')
    }

    // removes the jwt from local storage on log out. 
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}


export default new AuthService();