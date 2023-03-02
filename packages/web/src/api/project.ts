import axios from "axios";


const HOST = 'localhost'
const PORT = 5000


export async function getProjectList() {
  const url =  `http://${HOST}:${PORT}/api/projects`;
  const resp = await axios({
    method: 'get',
    url: url,
  });
  return resp;
}


export async function addProject(data) {
  const url =  `http://${HOST}:${PORT}/api/project`;
  const resp = await axios({
    method: 'post',
    url: url,
    params: data,
  });
  return resp;
}


export async function delProject(uid: string) {
  const url =  `http://${HOST}:${PORT}/api/project?uid=${uid}`;
  const resp = await axios({
    method: 'delete',
    url: url,
  });
  return resp;
}
