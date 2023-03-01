import React from "react";
import { Layout, Menu } from "antd";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import MyPerer from "./_perer";
import "./style.less";
import { MENU_ITEMS } from './_config';


const { Header, Content, Sider } = Layout;

const Gerer: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = React.useState('cadre');

  const handleClickMenuItem = (menuInfo) => {
    switch (menuInfo.key) {
    case "1":
      nav("/cadre");
      break;
    case "2":
      nav("/department");
      break;
    case "3":
      nav("/role");
      break;
    default:
      nav("/cadre");
    }
  };

  React.useEffect(() => {
    const { pathname } = location;
    const parts = pathname.split('/');
    const c = parts.pop();
    setCurrent(c);
  }, [location]);

  return (
    <Layout className="page-perer">
      <Layout>
        <Header className="page-perer-header">
          <p>hello</p>
        </Header>
        <Layout>
          <Sider className="page-perer-left">
            <Menu
              onClick={handleClickMenuItem}
              defaultSelectedKeys={["2"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={MENU_ITEMS}
            />
          </Sider>
          <Content className="page-perer-right">
            <Routes>
              <Route
                path={current}
                element={<MyPerer current={current} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Gerer;
