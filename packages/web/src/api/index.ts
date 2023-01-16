export { fetchUserInfo } from "./user";

export const {
  sendMsg,
  receiveMsg,
} = window.ipc;

declare global {
  interface Window {
    ipc: Ipc;
  }
}

interface Ipc {
  sendMsg(msg: string): Promise<string>;
  receiveMsg(): Promise<string>;
}
