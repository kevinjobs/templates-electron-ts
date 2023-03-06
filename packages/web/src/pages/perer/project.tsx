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
  DatePicker
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getProjectList, delProject, addProject } from "@api/project";
import renderPureForm from "./_form";

interface OriginalProjectType {
  uid: string;
  create_at: number | string;
  title: string;
  organiger: string;
  deadline: string | number;
  contact: string;
}

type TableProjectType = OriginalProjectType;

interface FormProjectType {
  uid: string;
  title: string;
  organiger: string;
  deadline: dayjs.Dayjs;
  contact: string;
}

const transformData = (raw: OriginalProjectType): TableProjectType => {
  const data = {...raw};
  data['key'] = data['uid'];
  data['create_at'] = dayjs(data['create_at']).format('YYYY-MM-DD');
  return data;
};

export default function Submit() {
  const [msgApi, ctxHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [select, setSelect] = React.useState<FormProjectType>();
  const [submits, setSubmits] = React.useState<TableProjectType[]>([]);

  React.useEffect(() => {
    refreshProjectList();
  }, []);

  const refreshProjectList = () => {
    getProjectList()
      .then((res) => {
        if (res.data.code === 0) {
          setSubmits(res.data.data.map((submit) => transformData(submit)));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (value: FormProjectType) => {
    const submitData = {
      uid: value.uid,
      title: value.title,
      organiger: value.organiger,
      deadline: value.deadline.format('YYYY-MM-DD'),
      contact: value.contact,
    };

    if (update) {
      // to-do: update
      console.log(submitData);
    } else {
      addProject(submitData)
        .then((res) => {
          if (res.data.code === 0) {
            msgApi.success(res.data.msgCN);
            setModalOpen(false);
            refreshProjectList();
          }
        })
        .catch((err) => {
          msgApi.error(err);
          console.log(err);
        });
    }
  };

  const handleDelete = (value: TableProjectType) => {
    delProject(value.uid)
      .then((res) => {
        if (res.data.code === 0) {
          msgApi.success(res.data.msgCN);
          refreshProjectList();
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
      title: "添加日期",
      dataIndex: "create_at",
      key: "create_at",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "组织者",
      dataIndex: "organiger",
      key: "organiger",
    },
    {
      title: "截止日期",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "联系方式",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operete",
      render: (_, value: TableProjectType) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              setUpdate(true);
              setModalOpen(true);
              const data: FormProjectType = {
                uid: value.uid,
                title: value.title,
                organiger: value.organiger,
                deadline: dayjs(value.deadline),
                contact: value.contact,
              };
              setSelect(data);
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
        <PlusOutlined />新增项目
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
        title={"添加新项目"}
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
        <Form.Item label="项目标题" name="title" key="title" rules={[{required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item label="组织者" name="organiger" key="organiger" rules={[{required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item label="截止日期" name="deadline" key="deadline" rules={[{required: true}]}>
          <DatePicker locale={locale} />
        </Form.Item>
        <Form.Item label="联系方式" name="contact" key="contact" rules={[{required: true}]}>
          <Input />
        </Form.Item>
      </>
    );
  };

  return renderPureForm<TableProjectType>({
    title: "新增提交",
    children: <Items />,
    onCancel: onCancel,
    onFinish: onFinish,
    update: update,
    initialValues: initialValues,
  });
}
