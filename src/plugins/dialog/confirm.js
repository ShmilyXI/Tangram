import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';

const { confirm } = Modal;
const widths = { small: 480, medium: 680, large: 880 }; // 预设弹窗宽度

const Fragment = ({
  className = '',
  style = {},
  bodyStyle = {},
  icon = null,
  title = '弹窗标题',
  width = 'medium', // 标准弹窗宽度 => small:480 | 【默认】medium:680 | large:880 | integer
  okText = '确定', // 确定按钮文案 => 值为 false 时，不显示
  okButtonProps = {},
  onOk = (hide = () => {}) => {}, // 用 return 拦截 visible
  cancelText = '取消', // 取消按钮文案 => 值为 false 时，不显示
  cancelButtonProps = {},
  onCancel = () => {}, // 用 return 拦截 visible
  afterClose = () => {}, // 弹窗完全关闭后的回调
  content = '弹窗内容',
} = {}) => {
  confirm({
    closable: true,
    maskClosable: true,
    className: `${styles.confirm} ${className}`,
    style,
    bodyStyle,
    icon,
    title,
    width: widths?.[width] || width,
    content: content,
    okText,
    okButtonProps,
    cancelText,
    cancelButtonProps,
    onOk: () => {
      onOk();
    },
    onCancel() {
      onCancel();
    },
    afterClose: () => {
      afterClose();
    },
  });
};

export default Fragment;
