import React from 'react';
import { Modal } from 'antd';
import PererForm from './_form';
import { PERERS } from './_config';
import { PererFormProps } from './_types';

export type CadreAddProps<T> = {
  open: boolean;
  current: string;
} & PererFormProps<T>;

export default function AddOne<T extends object>(props: CadreAddProps<T>) {
  const { open, current, ...rest } = props;
  return (
    <Modal
      title={"添加新" + PERERS[current].title}
      open={open}
      closable={false}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      destroyOnClose
    >
      <PererForm {...rest} />
    </Modal>
  )
}