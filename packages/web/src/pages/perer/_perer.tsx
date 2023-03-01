import React from "react";
import { Button, Space, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddOne from "./_add";
import { PERERS } from "./_config";
import dayjs from "dayjs";

export interface MyPererProps {
  current: string;
}

export default function MyPerer<T extends object>(props: MyPererProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const [selected, setSelected] = React.useState<{
    isOpen: boolean;
    type: "update" | "add";
    value?: T;
  }>({ isOpen: false, type: "update", value: null });

  const [list, setList] = React.useState<T[]>([]);

  const handleEdit = (record: T) => {
    console.log(record);
  };

  const handleAdd = (value: T) => {
    for (const v in value) {
      if (value[v] instanceof dayjs) {
        const dateobj = value[v] as dayjs.Dayjs;
        (value[v] as string) = dateobj.format("YYYY-MM");
      }
    }
    PERERS[props.current]
      .add(value)
      .then((resp) => {
        if (resp.data.code == 0) {
          messageApi.success(`添加${props.current}成功`);
          setSelected({ ...selected, isOpen: false });
          refresh();
        } else {
          messageApi.error(resp.data.msgCN);
        }
      })
      .catch((err) => {
        messageApi.error(`添加${props.current}失败，错误码: ${err}`);
      });
  };

  const refresh = () => {
    PERERS[props.current]
      .get()
      .then((resp) => {
        if (resp.data.code === 0) {
          setList(resp.data.data as T[]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addColumn = (columns) => {
    const cols = [...columns];
    cols.push({
      title: "操作",
      dataIndex: "operate",
      key: "operete",
      render: (_, record: T) => (
        <Space size="middle">
          <Button
            size="small"
            onClick={() => {
              const data = {...record};
              for (const v in record) {
                if (v === 'birthday') {
                  (data[v] as dayjs.Dayjs) = dayjs(record[v] as string);
                } else {
                  data[v] = record[v];
                }
              }

              console.log(data);

              setSelected({
                ...selected,
                isOpen: true,
                value: data,
                type: "update",
              });
            }}
          >
            <EditOutlined />
          </Button>
          <Button size="small" danger>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    });
    return cols;
  };

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="operators">
        <Button
          type="primary"
          onClick={() => setSelected({ isOpen: true, type: "add" })}
        >
          添加{PERERS[props.current].title}
        </Button>
      </div>
      <Table
        columns={addColumn(PERERS[props.current].columns)}
        dataSource={list}
        loading={list.length === 0}
        pagination={{ pageSize: 12 }}
      />
      {selected.isOpen && (
        <AddOne
          open={selected.isOpen}
          formItems={PERERS[props.current].formItems}
          current={props.current}
          category={selected.type}
          initialValue={selected.type === "update" ? selected.value : null}
          onSubmit={selected.type === "update" ? handleEdit : handleAdd}
          onCancel={() => setSelected({ ...selected, isOpen: false })}
          onError={(err) => console.log(err)}
        />
      )}
    </>
  );
}
