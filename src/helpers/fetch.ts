interface FetchResponse {
  status: number; data: any;
}

export default function _fetch(url: string, options?: RequestInit): Promise<FetchResponse> {
  // performs api calls sending the required authentication headers
  const headers = new Headers(options && options.headers);

  return fetch(url, {
    ...options,
    headers
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