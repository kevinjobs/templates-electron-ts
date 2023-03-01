import React from 'react';

export interface PererFormItem {
  title: string;
  name: string;
  key: string;
  rules?: unknown[];
  children: React.ReactNode;
}

export interface PererFormProps<T> {
  initialValue?: T;
  formItems: Array<PererFormItem>;
  category: 'update' | 'add';
  onSubmit(value: T): void;
  onError?(err): void;
  onCancel(): void;
}