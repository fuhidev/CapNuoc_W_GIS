import { API_URL, profile as apiProfile } from './api';
import { Profile } from '../models/User';
export function profile(): Promise<Profile> {
  var url = API_URL + '/account/profile';
  return apiProfile(url) as any;
}