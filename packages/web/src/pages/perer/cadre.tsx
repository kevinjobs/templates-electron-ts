import React from "react";
import {
  Table,
  Form,
  Select,
  Input,
  Modal,
  Button,
  message,
  Space,
  Popconfirm,
  DatePicker
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getCadreList, delCadre, addCadre } from "@api/cadre";
import { getDepartmentList } from "@api/department";
import renderPureForm from "./_form";
import { getRoleList } from "@api/role";

interface OriginalCadreType {
  uid: string;
  name: string;
  birthday: string;
  department: {
    uid: string;
    name: string;
  };
  role: {
    uid: string;
    name: string;
  };
  submits: {
    uid: string;
    title: string;
  }[];
}

interface TableCadreType {
  key: string;
  uid: string;
  name: string;
  birthday: string;
  department_name: string;
  role_name: string;
  submits: string[];
  submitsList: React.ReactNode;
}

interface FormCadreType {
  uid: string;
  name: string;
  birthday: dayjs.Dayjs;
  department_name: string;
  role_name: string;
}

const SubmitList = ({items}: {items: OriginalCadreType['submits']}) => {
  // to-do: 点击可以跳转查看文章
  return (
    <div>
      {items.map(item => <div key={item.uid}><a>{item.title}</a></div>)}
    </div>
  );
};

const transformData = (raw: OriginalCadreType): TableCadreType => {
  const submits = raw.submits.map((submit) => submit.title);
  return {
    key: raw.uid,
    uid: raw.uid,
    name: raw.name,
    birthday: raw.birthday,
    department_name: raw.department.name,
    role_name: raw.role.name,
    submits: submits,
    submitsList: <SubmitList items={raw.submits} />,
  };
};

export default function Submit() {
  const [msgApi, ctxHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [select, setSelect] = React.useState<FormCadreType>();
  const [submits, setSubmits] = React.useState<TableCadreType[]>([]);

  React.useEffect(() => {
    refreshSubmitList();
  }, []);

  const refreshSubmitList = () => {
    getCadreList()
      .then((res) => {
        if (res.data.code === 0) {
          setSubmits(res.data.data.map((submit) => transformData(submit)));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (value: FormCadreType) => {
    const submitData = {
      name: value.name,
      birthday: value.birthday.format("YYYY-MM"),
      department_name: value.department_name,
      role_name: value.role_name,
    };

    if (update) {
      // to-do: update
      console.log(submitData);
    } else {
      addCadre(submitData)
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

  const handleDelete = (value: TableCadreType) => {
    delCadre(value.uid)
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
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "所在部门",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "角色",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "提交文章列表",
      dataIndex: "submitsList",
      key: "submitsList",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operete",
      render: (_, value: TableCadreType) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              setUpdate(true);
              setModalOpen(true);
              const newData = {} as FormCadreType;
              newData["uid"] = value.uid;
              newData["name"] = value.name;
              newData["birthday"] = dayjs(value.birthday);
              newData["department_name"] = value.department_name;
              newData["role_name"] = value.role_name;
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
        新增员工
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
        title={"添加新员工"}
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
  const [departs, setDeparts] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const Items = () => {
    return (
      <>
        {update && (
          <Form.Item label="UID" name="uid" key="uid">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item label="姓名" name="name" key="name">
          <Input />
        </Form.Item>
        <Form.Item label="生日" name="birthday" key="birthday">
          <DatePicker picker="month" locale={locale} />
        </Form.Item>
        <Form.Item
          label="所在部门"
          name="department_name"
          key="department_name"
        >
          <Select showSearch options={departs} />
        </Form.Item>
        <Form.Item label="所属角色" name="role_name" key="role_name">
          <Select showSearch options={roles} />
        </Form.Item>
      </>
    );
  };

  React.useEffect(() => {
    getDepartmentList()
      .then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          setDeparts(data.map((d) => ({ label: d["name"], value: d["name"] })));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    getRoleList()
      .then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          setRoles(data.map((d) => ({ label: d["name"], value: d["name"] })));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return renderPureForm<TableCadreType>({
    title: "新增提交",
    children: <Items />,
    onCancel: onCancel,
    onFinish: onFinish,
    update: update,
    initialValues: initialValues,
  });
}
