import React from 'react';
import { Button, Form } from 'antd';

export interface PureFormProps<T> {
  initialValues?: any;
  onFinish?(value: T): void;
  onFinishFailed?(err: any): void;
  onCancel?(): void;
  title: string;
  children: React.ReactNode;
  update?: boolean;
}

export default function renderPureForm<T>(props: PureFormProps<T>) {
  const {
    initialValues,
    onFinish,
    onFinishFailed,
    onCancel,
    title,
    children,
    update=false,
  } = props;

  return (
    <Form
      name={title}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {children}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {update ? "更新" : "添加"}
        </Button>
        <Button
          type="default"
          onClick={onCancel}
          style={{ marginLeft: 12 }}
        >
          取消
        </Button>
      </Form.Item>
    </Form>
  );
}