import axios from "axios";


const HOST = 'localhost'
const PORT = 5000


export async function getSubmitList() {
  const url =  `http://${HOST}:${PORT}/api/submits`;
  const resp = await axios({
    method: 'get',
    url: url,
  });
  return resp;
}


export async function addSubmit(data) {
  const url =  `http://${HOST}:${PORT}/api/submit`;
  const resp = await axios({
    method: 'post',
    url: url,
    params: data,
  });
  return resp;
}

export async function delSubmit(uid: string) {
  const url =  `http://${HOST}:${PORT}/api/submit?uid=${uid}`;
  const resp = await axios({
    method: 'delete',
    url: url,
  });
  return resp;
}
