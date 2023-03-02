import axios from "axios";


const HOST = 'localhost'
const PORT = 5000


export async function getCadreList() {
  const url =  `http://${HOST}:${PORT}/api/cadres`;
  const resp = await axios({
    method: 'get',
    url: url,
  });
  return resp;
}

export async function addCadre(data) {
  const url =  `http://${HOST}:${PORT}/api/cadre`;
  const resp = await axios({
    method: 'post',
    url: url,
    params: data,
  });
  return resp;
}

export async function delCadre(uid: string) {
  const url =  `http://${HOST}:${PORT}/api/cadre?uid=${uid}`;
  const resp = await axios({
    method: 'delete',
    url: url,
  });
  return resp;
}
