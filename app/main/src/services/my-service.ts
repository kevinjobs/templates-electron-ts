import Eipc from "eipc";
import { createSettingWindow } from "./_window";
import { SETTING_PAGE, SETTING_PORT } from "src/constant";

@Eipc.Injectable("MyService")
export class MyService {
  constructor() {
    // do nothing
  }

  public getDelayTime(): number {
    return 2;
  }

  public openSettingWindow() {
    const isDev = process.env.NODE_ENV === 'development';
    const w = createSettingWindow();

    if (isDev) {
      w.loadURL(`http://localhost:${SETTING_PORT}/`)
        .then()
        .catch(console.error);
    } else {
      // 生产环境应使用相对地址
      // 打包后的根目录为 app/
      w.loadFile(SETTING_PAGE).then().catch(console.error);
    }
  }
}