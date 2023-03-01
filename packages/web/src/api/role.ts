import axios from "axios";


const HOST = 'localhost'
const PORT = 5000


export async function getRoleList() {
  const url =  `http://${HOST}:${PORT}/api/roles`;
  const resp = await axios({
    method: 'get',
    url: url,
  });
  return resp;
}


export async function addRole(data) {
  const url =  `http://${HOST}:${PORT}/api/role`;
  const resp = await axios({
    method: 'post',
    url: url,
    params: data,
  });
  return resp;
}
