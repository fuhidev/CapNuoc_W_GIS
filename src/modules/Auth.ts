import { UserResponse } from '../services/main/model';
import * as decode from 'jwt-decode';
const ITEM_NAME = 'user';
class Auth {
  static authenticateUser(user: UserResponse) {
    localStorage.setItem(ITEM_NAME, JSON.stringify(user));
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    var token = Auth.getToken();
    if (token && !this.isTokenExpired(token))
      return true;
    return false;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem(ITEM_NAME);
  }

  static getUser(): UserResponse | undefined {
    try {
      var item = localStorage.getItem(ITEM_NAME);
      if (item) {
        var user = JSON.parse(item) as UserResponse;
        return user;
      }
      return undefined;
    } catch (error) {
      return undefined;
    }

  }
  static getToken() {
    var user = this.getUser();
    return user ? user.token : undefined;
  }
  static isTokenExpired(token: string) {
    try {
      const decoded = decode(token) as any;
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

}

export default Auth;
