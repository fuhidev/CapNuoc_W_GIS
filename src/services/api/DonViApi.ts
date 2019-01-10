import { get, post, API_URL } from '.';
var PATH_ODATA = API_URL + '/odata/DonVis';

const Url = {
};

export async function getAll() {
  const result = await get(PATH_ODATA);
  if (result.status === 200) return result.data.value;
  else return [];
}
export async function getById(id:string) {
  const result = await get(PATH_ODATA+`('${id}')`);
  if (result.status === 200) return result.data.value;
  else return null;
}