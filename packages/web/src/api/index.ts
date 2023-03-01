import { AxiosResponse } from 'axios';
export { fetchUserInfo } from "./user";

export type ApiResponse<T = unknown> = AxiosResponse<{
  code: number;
  msg: string;
  msgCN?: string;
  data: T;
}>