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
  Avatar,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getSubmitList, delSubmit, addSubmit } from "@api/submit";
import { getCadreList } from "@api/cadre";
import { getProjectList } from "@api/project";
import renderPureForm from "./_form";

interface OriginalSubmitType {
  uid: string;
  upload_at: string;
  title: string;
  project: {
    uid: string;
    title: string;
  };
  cadres: {
    uid: string;
    name: string;
  }[];
}

interface TableSubmitType {
  key: string;
  uid: string;
  upload_at: string;
  title: string;
  project_title: string;
  cadres: string[];
  cadresAvatar: React.ReactNode;
}

interface FormSubmitType {
  uid: string;
  upload_at: string;
  title: string;
  project_title: string;
  cadres: string[];
}

const transformData = (raw: OriginalSubmitType): TableSubmitType => {
  return {
    key: raw.uid,
    uid: raw.uid,
    upload_at: dayjs(raw.upload_at).format("YYYY-MM-DD"),
    title: raw.title,
    project_title: raw.project.title,
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
  const [select, setSelect] = React.useState<FormSubmitType>();
  const [submits, setSubmits] = React.useState<TableSubmitType[]>([]);

  React.useEffect(() => {
    refreshSubmitList();
  }, []);

  const refreshSubmitList = () => {
    getSubmitList()
      .then((res) => {
        if (res.data.code === 0) {
          setSubmits(res.data.data.map((submit) => transformData(submit)));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (value: FormSubmitType) => {
    const submitData = {
      project_title: value.project_title,
      title: value.title,
      cadres: value.cadres.join(","),
    };

    if (update) {
      // to-do: update
      console.log(submitData);
    } else {
      addSubmit(submitData)
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

  const handleDelete = (value: TableSubmitType) => {
    delSubmit(value.uid)
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
      title: "提交日期",
      dataIndex: "upload_at",
      key: "uploadAt",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "项目",
      dataIndex: "project_title",
      key: "project_title",
    },
    {
      title: "作者",
      dataIndex: "cadresAvatar",
      key: "cadresAvatar",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operete",
      render: (_, value: TableSubmitType) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              setUpdate(true);
              setModalOpen(true);
              const newData = {} as FormSubmitType;
              newData["uid"] = value.uid;
              newData["title"] = value.title;
              // newData['upload_at'] = value.upload_at;
              newData["project_title"] = value.project_title;
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
        <PlusOutlined />新增文章
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
        title={"添加新文章"}
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
  const [projects, setProject] = React.useState();
  const [cadres, setCadres] = React.useState([]);

  const Items = () => {
    return (
      <>
        {update && (
          <Form.Item label="UID" name="uid" key="uid">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item
          label="项目"
          name="project_title"
          key="project_title"
          rules={[{ required: true }]}
        >
          <Select showSearch options={projects} />
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          key="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="作者"
          name="cadres"
          key="cadres"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            options={cadres}
            mode="multiple"
            placeholder="可以选择多个作者"
          />
        </Form.Item>
      </>
    );
  };

  React.useEffect(() => {
    getProjectList()
      .then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          setProject(
            data.map((d) => ({ label: d["title"], value: d["title"] }))
          );
        }
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    getCadreList()
      .then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          setCadres(data.map((d) => ({ label: d["name"], value: d["name"] })));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return renderPureForm<TableSubmitType>({
    title: "新增提交",
    children: <Items />,
    onCancel: onCancel,
    onFinish: onFinish,
    update: update,
    initialValues: initialValues,
  });
}
