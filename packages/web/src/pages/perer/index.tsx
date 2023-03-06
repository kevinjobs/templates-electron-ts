import React from "react";
import { Layout, Menu } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./style.less";
import { MENU_ITEMS } from './_config';
import Submit from "./submit";
import Role from './role';
import Project from './project';
import Department from './department';


const { Header, Content, Sider } = Layout;

const Gerer: React.FC = () => {
  const nav = useNavigate();

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
    case '4':
      nav("/project");
      break;
    case '5':
      nav('/submit');
      break;
    default:
      nav("/cadre");
    }
  };

  return (
    <Layout className="page-perer">
      <Header className="page-perer-header">
        <p>hello</p>
      </Header>
      <Layout className="page-perer-container">
        <Sider className="page-perer-left">
          <Menu
            onClick={handleClickMenuItem}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={MENU_ITEMS}
          />
        </Sider>
        <Content className="page-perer-right">
          <Routes>
            <Route path='submit' element={<Submit />} />
            <Route path='role' element={<Role />} />
            <Route path='project' element={<Project />} />
            <Route path='department' element={<Department />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Gerer;
