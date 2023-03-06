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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  getDepartmentList,
  delDepartment,
  addDepartment,
} from "@api/department";
import renderPureForm from "./_form";

interface OriginalDepartmentType {
  uid: string;
  name: string;
  fullname: string;
  cadres: {
    uid: string;
    name: string;
  }[];
}

interface TableDepartmentType {
  key: string;
  uid: string;
  name: string;
  fullname: string;
  cadres: string[];
  cadresAvatar: React.ReactNode;
}

interface FormDepartmentType {
  uid: string;
  name: string;
  fullname: string;
  cadres: string[];
}

const transformData = (raw: OriginalDepartmentType): TableDepartmentType => {
  return {
    key: raw.uid,
    uid: raw.uid,
    name: raw.name,
    fullname: raw.fullname,
    cadres: raw.cadres.map((cadre) => cadre.name),
    cadresAvatar: raw.cadres.map((cadre) => (
      <Avatar shape="square" key={cadre.name} style={{ margin: "0 2px" }}>
        {cadre.name}
      </Avatar>
    )),
  };
};

export default function Submit() {
  const [msgApi, ctxHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [select, setSelect] = React.useState<FormDepartmentType>();
  const [submits, setSubmits] = React.useState<TableDepartmentType[]>([]);

  React.useEffect(() => {
    refreshSubmitList();
  }, []);

  const refreshSubmitList = () => {
    getDepartmentList()
      .then((res) => {
        if (res.data.code === 0) {
          setSubmits(res.data.data.map((submit) => transformData(submit)));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (value: FormDepartmentType) => {
    const submitData = {
      uid: value.uid,
      name: value.name,
      fullname: value.fullname,
    };

    if (update) {
      // to-do: update
      console.log(submitData);
    } else {
      addDepartment(submitData)
        .then((res) => {
          if (res.data.code === 0) {
            msgApi.success(res.data.msgCN);
            setModalOpen(false);
            refreshSubmitList();
          }
        })
        .catch((err) => {
          msgApi.error(err);
          console.log(err);
        });
    }
  };

  const handleDelete = (value: TableDepartmentType) => {
    delDepartment(value.uid)
      .then((res) => {
        if (res.data.code === 0) {
          msgApi.success(res.data.msgCN);
          refreshSubmitList();
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
      title: "完整名称",
      dataIndex: "fullname",
      key: "fullname",
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
      render: (_, value: TableDepartmentType) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              setUpdate(true);
              setModalOpen(true);
              const newData = {} as FormDepartmentType;
              newData["uid"] = value.uid;
              newData["name"] = value.name;
              newData["fullname"] = value.fullname;
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
        新增部门
      </Button>
      <Table
        columns={COLUMNS}
        dataSource={submits}
        loading={submits.length === 0}
        pagination={{ pageSize: 10 }}
        style={{ marginTop: 24 }}
      />
      {ctxHolder}
      <Modal
        title={"添加新部门"}
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
        {update && (
          <Form.Item label="UID" name="uid" key="uid">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item label="名称" name="name" key="name">
          <Input />
        </Form.Item>
        <Form.Item label="完整名称" name="fullname" key="fullname">
          <Input />
        </Form.Item>
      </>
    );
  };

  return renderPureForm<TableDepartmentType>({
    title: "新增提交",
    children: <Items />,
    onCancel: onCancel,
    onFinish: onFinish,
    update: update,
    initialValues: initialValues,
  });
}
