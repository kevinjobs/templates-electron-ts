import axios from "axios";


const HOST = 'localhost'
const PORT = 5000


export async function getDepartmentList() {
  const url =  `http://${HOST}:${PORT}/api/departments`;
  const resp = await axios({
    method: 'get',
    url: url,
  });
  return resp;
}


export async function addDepartment(data) {
  const url =  `http://${HOST}:${PORT}/api/department`;
  const resp = await axios({
    method: 'post',
    url: url,
    params: data,
  });
  return resp;
}
