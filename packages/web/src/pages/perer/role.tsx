import React from "react";
import {
  Table,
  Form,
  Input,
  Modal,
  Button,
  message,
  Space,
  Popconfirm,
  Avatar,
} from "antd";
import { getRoleList, delRole, addRole } from "@api/role";
import renderPureForm from "./_form";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface OriginalRoleType {
  uid: string;
  name: string;
  cadres: {
    uid: string;
    name: string;
  }[];
}

interface TableRoleType {
  uid: string;
  name: string;
  cadres: string[];
  cadresAvatar: React.ReactNode;
}

interface FormRoleType {
  uid: string;
  name: string;
}

const transformData = (raw: OriginalRoleType): TableRoleType => {
  return {
    uid: raw.uid,
    name: raw.name,
    cadres: raw.cadres.map((cadre) => cadre.name),
    cadresAvatar: raw.cadres.map((cadre) => (
      <Avatar shape="square" key={cadre.name} style={{margin: '2px'}}>
        {cadre.name}
      </Avatar>
    )),
  };
};

export default function Submit() {
  const [msgApi, ctxHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [select, setSelect] = React.useState<FormRoleType>();
  const [roles, setRoles] = React.useState<TableRoleType[]>([]);

  React.useEffect(() => {
    refreshRoleList();
  }, []);

  const refreshRoleList = () => {
    getRoleList()
      .then((res) => {
        if (res.data.code === 0) {
          setRoles(res.data.data.map((role) => transformData(role)));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (value: FormRoleType) => {
    const roleData = { name: value.name };

    if (update) {
      // to-do: update
      console.log(roleData);
    } else {
      addRole(roleData)
        .then((res) => {
          if (res.data.code === 0) {
            msgApi.success(res.data.msgCN);
            setModalOpen(false);
            refreshRoleList();
          }
        })
        .catch((err) => {
          msgApi.error(err);
          console.log(err);
        });
    }
  };

  const handleDelete = (value: TableRoleType) => {
    delRole(value.uid)
      .then((res) => {
        if (res.data.code === 0) {
          msgApi.success(res.data.msgCN);
          refreshRoleList();
        }
      })
      .catch((err) => {
        msgApi.error(err);
      });
  };

  const COLUMNS = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "包含人员",
      dataIndex: "cadresAvatar",
      key: "cadresAvatar",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operete",
      render: (_, value: TableRoleType) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              setUpdate(true);
              setModalOpen(true);
              const newData = {} as FormRoleType;
              newData["uid"] = value.uid;
              newData["name"] = value.name;
              newData["cadres"] = value.cadres;
              setSelect(newData);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="删除"
            description="确定要删除该项吗？"
            okText="是"
            cancelText="否"
            onConfirm={() => handleDelete(value)}
          >
            <Button size="small" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setUpdate(false);
          setModalOpen(true);
        }}
      >
        新增角色
      </Button>
      <Table
        columns={COLUMNS}
        dataSource={roles}
        loading={roles.length === 0}
        pagination={{ pageSize: 12 }}
        style={{ marginTop: 24 }}
      />
      {ctxHolder}
      <Modal
        title={"添加新角色"}
        open={modalOpen}
        closable={false}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <SubmitForm
          onFinish={handleSubmit}
          onCancel={() => {
            setSelect(null);
            setModalOpen(false);
          }}
          update={update}
          initialValues={select}
        />
      </Modal>
    </>
  );
}

function SubmitForm({ onCancel, onFinish, update, initialValues }) {
  const Items = () => {
    return (
      <>
        <Form.Item label="名称" name="name" key="name">
          <Input />
        </Form.Item>
      </>
    );
  };

  return renderPureForm<TableRoleType>({
    title: "新增提交",
    children: <Items />,
    onCancel: onCancel,
    onFinish: onFinish,
    update: update,
    initialValues: initialValues,
  });
}
