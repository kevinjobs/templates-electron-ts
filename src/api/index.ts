export default class Api {
  static async getInfo() {
    return new Promise((resolve, reject) => {
      resolve({code: 0, msg: "success"});
      reject({code: 4001, msg: "failed"});
    })
  }
}