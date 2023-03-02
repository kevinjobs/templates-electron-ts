import React from 'react';
import { Input, Select, DatePicker } from "antd";
import { PererFormItem } from "./_types";
import { getCadreList, addCadre, delCadre } from '@api/cadre';
import { addDepartment, delDepartment, getDepartmentList } from '@api/department';
import { addRole, delRole, getRoleList } from '@api/role';
import { addProject, delProject, getProjectList } from '@api/project';
import { addSubmit, delSubmit, getSubmitList } from '@api/submit';

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
  {
    key: "4",
    label: "项目管理",
  },
  {
    key: "5",
    label: "报送管理",
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
      {
        title: '报送清单',
        dataIndex: 'submits',
        key: 'submits'
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
            <Select.Option value='2'>刑庭</Select.Option>
            <Select.Option value='3'>民一庭</Select.Option>
            <Select.Option value='4'>民二庭</Select.Option>
            <Select.Option value='5'>速裁庭</Select.Option>
            <Select.Option value='6'>金融庭</Select.Option>
            <Select.Option value='7'>少家庭</Select.Option>
            <Select.Option value='8'>执行局</Select.Option>
            <Select.Option value='9'>审管办</Select.Option>
            <Select.Option value='10'>办公室</Select.Option>
            <Select.Option value='11'>政治部</Select.Option>
            <Select.Option value='12'>司法行政科</Select.Option>
            <Select.Option value='13'>法警大队</Select.Option>
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
            <Select.Option value='2'>法官助理</Select.Option>
            <Select.Option value='3'>司法行政人员</Select.Option>
            <Select.Option value='4'>司法警察</Select.Option>
            <Select.Option value='5'>聘用制人员</Select.Option>
            <Select.Option value='6'>其他</Select.Option>
          </Select>
        ),
      },
    ] as PererFormItem[],
    get: getCadreList,
    add: addCadre,
    del: delCadre,
  },
  department: {
    title: "部门",
    columns: [
      {
        title: "编码",
        dataIndex: "uid",
        key: "uid",
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
      {
        title: "包含人员",
        dataIndex: "cadres",
        key: "cadres",
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
    del: delDepartment,
  },
  role: {
    title: "角色",
    columns: [
      {
        title: "编码",
        dataIndex: "uid",
        key: "uid",
      },
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "包含人员",
        dataIndex: "cadres",
        key: "cadres",
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
    del: delRole,
  },
  project: {
    title: "项目",
    columns: [
      {
        title: "编码",
        dataIndex: "uid",
        key: "uid",
      },
      {
        title: "项目名称",
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
        title: '报送篇目',
        dataIndex: 'submits',
        key: 'submits'
      }
    ],
    formItems: [
      {
        title: '项目名称',
        name: 'title',
        key: 'title',
        rules: [{required: true, message: '请输入项目名称'}],
        children: <Input />,
      },
      {
        title: '组织者',
        name: 'organiger',
        key: 'organiger',
        rules: [{required: true, message: '请输入组织者'}],
        children: <Input />,
      },
      {
        title: '截止日期',
        name: 'deadline',
        key: 'deadline',
        rules: [{required: true, message: '请输入截止日期'}],
        children: <Input />,
      },
      {
        title: '联系方式',
        name: 'contact',
        key: 'contact',
        rules: [{required: true, message: '请输入联系方式'}],
        children: <Input />,
      },
    ],
    get: getProjectList,
    add: addProject,
    del: delProject,
  },
  submit: {
    title: "报送",
    columns: [
      {
        title: "编码",
        dataIndex: "uid",
        key: "uid",
      },
      {
        title: "提交日期",
        dataIndex: "upload_at",
        key: "upload_at",
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "项目",
        dataIndex: "project",
        key: "project",
      },
      {
        title: "作者",
        dataIndex: "cadres",
        key: "cadres",
      },
    ],
    formItems: [
      {
        title: '报送项目',
        name: 'project_id',
        key: 'project_id',
        rules: [{required: true, message: '请选择报送项目'}],
        children: <Input />,
      },
      {
        title: '标题',
        name: 'title',
        key: 'title',
        rules: [{required: true, message: '请输入标题'}],
        children: <Input />,
      },
      {
        title: '作者',
        name: 'cadres',
        key: 'cadres',
        rules: [{required: true, message: '请选择作者'}],
        children: <Input />,
      },
    ],
    get: getSubmitList,
    add: addSubmit,
    del: delSubmit,
  },
};
