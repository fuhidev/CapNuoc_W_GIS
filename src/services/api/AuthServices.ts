import { API_URL, get } from '.';
import { UserResponse, Profile } from '../main/model';

const authService = {
  login, isAccess,profile
};

function login(username: string, password: string): Promise<UserResponse> {
  // Get a token from api server using the fetch api
  return fetch(`${API_URL}/login/withuser`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Username: username, Password: password
    })
  }).then(res => res.json().then(data => ({ status: res.status, data })))
    .then(res => {
      if (res.status === 200) {
        let user = res.data as UserResponse;
        return Promise.resolve(user);
      } else {
        return Promise.reject(res.data);
      }

    });
}

function isAccess(id: string): Promise<boolean> {
  // Get a token from api server using the fetch api
  return get(`${API_URL}/account/isaccess/w_${id}`)
    .then(r => r.data)
    .catch(e => Promise.reject(e.Message));
}

function profile(): Promise<Profile> {
  return get(`${API_URL}/account/profile`)
    .then(r => r.data)
    .catch(e => Promise.reject(e.Message));
}

export default authService;