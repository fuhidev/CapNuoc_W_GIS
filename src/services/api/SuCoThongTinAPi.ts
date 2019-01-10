import { API_URL, get, _delete, post, put } from './index';
import IService from './ISservice';
import SuCoThongTin from '../../models/SuCoThongTin';

const PATH = API_URL + '/odata/SuCoThongTins';

export default class SuCoThongTinAPI implements IService<SuCoThongTin, string>{
  async getById(id: string): Promise<SuCoThongTin | null> {
    const result = await get(PATH + `('${id}')`);
    if (result.status === 200) return result.data;
    else return null;
  }
  async getAll(): Promise<SuCoThongTin[]> {
    const result = await get(PATH);
    if (result.status === 200) return result.data;
    else return [];
  }
  async delete(id: string): Promise<boolean> {
    const result = await _delete(PATH + `('${id}')`);
    if (result.status === 204) return true;
    else return false;
  }
  async add(model: SuCoThongTin): Promise<SuCoThongTin | null> {
    const result = await post(PATH, JSON.stringify(model));
    if (result.status === 201) return result.data;
    else return null;
  }
  async update(id: string, model: SuCoThongTin): Promise<SuCoThongTin | null> {
    const result = await put(PATH + `('${id}')`, JSON.stringify(model));
    if (result.status === 200) return result.data;
    else return null;
  }
}