import React from 'react';
import { Input, Select, DatePicker } from "antd";
import { PererFormItem } from "./_types";
import { getCadreList, addCadre } from '@api/cadre';
import { addDepartment, getDepartmentList } from '@api/department';
import { addRole, getRoleList } from '@api/role';

export const MENU_ITEMS = [
  {
    key: "1",
    label: "员工管理",
  },
  {
    key: "2",
    label: "部门管理",
  },
  {
    key: "3",
    label: "角色管理",
  },
];

export const PERERS = {
  cadre: {
    title: "员工",
    columns: [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "生日",
        dataIndex: "birthday",
        key: "birthday",
      },
      {
        title: "部门",
        dataIndex: "department",
        key: "department",
      },
      {
        title: "角色",
        dataIndex: "role",
        key: "role",
      },
    ],
    formItems: [
      {
        title: '姓名',
        name: 'name',
        key: 'name',
        rules: [{required: true, message: '请输入姓名'}],
        children: <Input />,
      },
      {
        title: '出生年月',
        name: 'birthday',
        key: 'birthday',
        rules: [{required: true, message: '请选择出生年月'}],
        children: (
          <DatePicker picker="month" />
        ),
      },
      {
        title: '部门',
        name: 'department_id',
        key: 'department_id',
        rules: [{required: true, message: '请选择部门'}],
        children: (
          <Select>
            <Select.Option value='1'>立案庭</Select.Option>
          </Select>
        ),
      },
      {
        title: '角色',
        name: 'role_id',
        key: 'role_id',
        rules: [{required: true, message: '请选择角色'}],
        children: (
          <Select>
            <Select.Option value='1'>员额法官</Select.Option>
          </Select>
        ),
      },
    ] as PererFormItem[],
    get: getCadreList,
    add: addCadre,
  },
  department: {
    title: "部门",
    columns: [
      {
        title: "序号",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "部门名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "部门全称",
        dataIndex: "fullname",
        key: "fullname",
      },
    ],
    formItems: [
      {
        title: '部门名称',
        name: 'name',
        key: 'name',
        rules: [{required: true, message: '请输入部门名称'}],
        children: <Input />,
      },
      {
        title: '部门全称',
        name: 'fullname',
        key: 'fullname',
        rules: [{required: true, message: '请输入部门全称'}],
        children: <Input />,
      },
    ],
    get: getDepartmentList,
    add: addDepartment,
  },
  role: {
    title: "角色",
    columns: [
      {
        title: "序号",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
    ],
    formItems: [
      {
        title: '角色名称',
        name: 'name',
        key: 'name',
        rules: [{required: true, message: '请输入角色名称'}],
        children: <Input />,
      },
    ],
    get: getRoleList,
    add: addRole,
  },
};
