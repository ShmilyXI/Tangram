import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import Confirm from './confirm';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    props.showHide(() => this.setState({ visible: false }));
  }

  componentWillMount() {
    if (this.props.defaultVisible) {
      this.setState({ visible: true });
      this.props.onOpen();
    }
  }

  static defaultProps = {
    showHide: () => {}, // 暴露 hide 方法
    /* ### 按钮属性 ### */
    openText: '打开',
    openButtonProps: {},
    onOpen: () => {},
    renderOpenButton: undefined, // 渲染元素 => undefined || function -> (open = () => {}) => { return Elemet }
    /* ### 弹窗属性 ### */
    defaultVisible: false, // 初始弹窗显示状态
    className: '',
    style: {},
    title: '弹窗标题',
    width: 'medium', // 标准弹窗宽度 => small:480 | 【默认】medium:680 | large:880 | integer
    okText: '确定', // 确定按钮文案 => 值为 false 时，不显示
    okButtonProps: {},
    onOk: (hide = () => {}) => {}, // 用 return 拦截 visible
    cancelText: '取消', // 取消按钮文案 => 值为 false 时，不显示
    cancelButtonProps: {},
    onCancel: () => {}, // 用 return 拦截 visible
    afterClose: () => {}, // 弹窗完全关闭后的回调
    children: undefined,
  };

  // 打开弹窗
  handleOpen = () => {
    this.props.onOpen();
    this.setState({ visible: true });
  };

  // 处理打开按钮
  procedureOpenButton = () => {
    const { renderOpenButton, openButtonProps, openText } = this.props;

    const type = Object.prototype.toString.call(renderOpenButton);
    if (type === '[object Function]') {
      return renderOpenButton(this.handleOpen);
    } else {
      return (
        <Button {...openButtonProps} onClick={this.handleOpen}>
          {openText}
        </Button>
      );
    }
  };

  // 处理框架宽度
  procedureWidth = () => {
    const { width } = this.props;

    switch (width) {
      case 'small':
        return 480;
      case 'medium':
        return 680;
      case 'large':
        return 880;
      default:
        return width;
    }
  };

  render() {
    const {
      className,
      style,
      title,
      okText,
      okButtonProps,
      onOk,
      cancelText,
      cancelButtonProps,
      onCancel,
      afterClose,
      children,
    } = this.props;
    const { visible } = this.state;

    return (
      <>
        {this.procedureOpenButton()}
        {/* 弹窗 */}
        <Modal
          className={className}
          style={style}
          title={title}
          width={this.procedureWidth()}
          visible={visible}
          okText={okText}
          okButtonProps={{
            ...okButtonProps,
            style: {
              display: okText ? 'inline-block' : 'none',
              ...(okButtonProps?.style || {}),
            },
          }}
          onOk={() => {
            const blocker = onOk(() => this.setState({ visible: false })); // 拦截器
            !blocker && this.setState({ visible: false });
          }}
          cancelText={cancelText}
          cancelButtonProps={{
            ...cancelButtonProps,
            style: {
              display: cancelText ? 'inline-block' : 'none',
              ...(cancelButtonProps?.style || {}),
            },
          }}
          onCancel={() => {
            this.setState({ visible: false });
            onCancel();
          }}
          afterClose={afterClose}
        >
          {children}
        </Modal>
      </>
    );
  }
}

Index.Confirm = Confirm;

export default Index;
