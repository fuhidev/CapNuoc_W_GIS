import Auth from "../modules/Auth";

interface FetchResponse{
  status:number,data:any
}

export default function _fetch(url: string, options?: RequestInit):Promise<FetchResponse> {
  // performs api calls sending the required authentication headers
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (Auth.isUserAuthenticated()) {
    headers['Authorization'] = Auth.getToken();
  } else {
    Auth.deauthenticateUser();
    location.href = '/login';
  }

  return fetch(url, {
    headers,
    ...options
  })
    .then(res => res.json().then(data => ({ status: res.status, data } as FetchResponse)))
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    });
}