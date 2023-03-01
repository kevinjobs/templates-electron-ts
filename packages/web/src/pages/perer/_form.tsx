import React from "react";
import { Button, Form } from "antd";
import "dayjs/locale/zh-cn";
import { PererFormProps } from './_types';

export default function PererForm<T>(props: PererFormProps<T>) {
  const FormItem = (item) => {
    return (
      <Form.Item
        label={item.title}
        name={item.name}
        key={item.key}
        rules={item.rules}
      >
        {item.children}
      </Form.Item>
    )
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={props.initialValue}
      onFinish={props.onSubmit}
      onFinishFailed={props.onError}
      autoComplete="off"
    >
      {props.formItems.map(FormItem)}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {props.category === "add" ? "添加" : "更新"}
        </Button>
        <Button
          type="default"
          onClick={props.onCancel}
          style={{ marginLeft: 12 }}
        >
          取消
        </Button>
      </Form.Item>
    </Form>
  );
}
