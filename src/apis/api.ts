// export const API_URL = '//localhost:1408/api';
// export const API_URL = '/cholon/api';
export const API_URL = '//gis.capnuoccholon.com.vn/cholon/api';
import Auth from '../modules/Auth';
import { ajax } from 'jquery';

export function post(url: string, body?: Object): Promise<any> {
  return new Promise((resolve, reject) => {
    ajax(url, {
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: body && JSON.stringify(body),
      headers: {
        'Authorization': Auth.getToken()
      }
    }).then(t => resolve(t))
      .catch((e: any) => reject(e.responseJSON ? e.responseJSON : e));
  });

}
export function get(url: string, body?: Object): Promise<any> {
  return new Promise((resolve, reject) => {
    ajax(url, {
      contentType: 'application/json',
      dataType: 'json',
      type: 'GET',
      headers: {
        'Authorization': Auth.getToken()
      }
    })
      .then(t => resolve(t))
      .catch((e: any) => reject(e.responseJSON ? e.responseJSON : e));
  });
}
export function put(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    ajax(url, {
      contentType: 'application/json',
      dataType: 'json',
      type: 'PUT',
      headers: {
        'Authorization': Auth.getToken()
      }
    }).then(t => resolve(t))
      .catch((e: any) => reject(e.responseJSON ? e.responseJSON : e));
  });
}
export function profile(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    ajax(url, {
      contentType: 'application/json',
      dataType: 'json',
      type: 'GET',
      headers: {
        'Authorization': Auth.getToken()
      },
      statusCode: {
        0: function () {
          Auth.deauthenticateUser();
          location.href = '/';
        }
      }
    }).then(t => resolve(t))
      .catch((e: any) => reject(e.responseJSON ? e.responseJSON : e));
  });
}
export function remove(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    ajax(url, {
      contentType: 'application/json',
      dataType: 'json',
      type: 'DELETE',
      headers: {
        'Authorization': Auth.getToken()
      }
    }).then(t => resolve(t))
      .catch((e: any) => reject(e.responseJSON ? e.responseJSON : e));
  });
}
export function login(username: string, password: string) {
  return ajax(API_URL + '/Login', {
    contentType: 'application/json',
    dataType: 'json',
    type: 'POST',
    data: JSON.stringify({
      Username: username, Password: password
    })
  });
}

export function thongKeTheoTuyenDuong() {
  var url = API_URL + '/DHKH/thongketheotuyenduong';
  return post(url);
}
export function thongKeTieuThuTheoTuyenDuong() {
  var url = API_URL + '/DHKH/thongketieuthutheotuyenduong';
  return post(url);
}
export function thongKeDuongOngTheoTuyenDuong() {
  var url = API_URL + '/DHKH/thongkeduongongtheotuyenduong';
  return post(url);
}
export function layTieuThuTheoKhachHangTrong12Thang(maDanhBo: string) {
  var url = API_URL + '/DHKH/laytieuthutheokhachhangtrong12thang';
  return post(url, maDanhBo);
}