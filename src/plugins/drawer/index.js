import React, { useState } from 'react';
import { Drawer, Button, Modal } from 'antd';
import { Align } from '@/plugins';
import styles from './index.less';

const Fragment = ({
  openText,
  openProps,
  title,
  width,
  closable,
  maskClosable,
  children,
  mask,
  maskStyle,
  style,
  drawerStyle,
  headerStyle,
  bodyStyle,
  height,
  className,
  zIndex,
  placement,
  onOpen,
  onClose,
  afterVisibleChange,
  afterClose,
  beforeOpen,
  keyboard,
  onOk,
  cancelText,
  cancelProps,
  okText,
  okProps,
  footerRender,
  destroyOnClose,
  needIntercept, // 是否开启拦截
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        {...openProps}
        onClick={() => {
          setVisible(true);
          onOpen();
        }}
      >
        {openText}
      </Button>
      <Drawer
        visible={visible}
        title={title}
        destroyOnClose={destroyOnClose}
        closable={closable}
        maskClosable={maskClosable}
        mask={mask}
        maskStyle={maskStyle}
        style={style}
        drawerStyle={drawerStyle}
        headerStyle={headerStyle}
        bodyStyle={bodyStyle}
        height={height}
        className={className}
        zIndex={zIndex}
        placement={placement}
        afterVisibleChange={(visible) => {
          afterVisibleChange(visible);
          if (visible) {
            beforeOpen();
          } else {
            afterClose();
          }
        }}
        keyboard={keyboard}
        width={(() => {
          switch (width) {
            case 'default':
              return 680;
            case 'small':
              return 480;
            case 'large':
              return 880;
            default:
              return width;
          }
        })()}
        onClose={() => {
          if (needIntercept) {
            Modal.confirm({
              title: '关闭弹窗',
              content: '数据未保存,确认关闭弹窗吗?',
              centered: true,
              onOk() {
                setVisible(false);
                onClose();
              },
            });
          } else {
            setVisible(false);
            onClose();
          }
        }}
      >
        {children}
        {(cancelText || okText || footerRender) && (
          <Align className={styles.footer} align="rm">
            {footerRender &&
              footerRender(() => {
                setVisible(false);
              })}
            {!footerRender && cancelText && (
              <Button
                {...cancelProps}
                onClick={() => {
                  if (needIntercept) {
                    Modal.confirm({
                      title: '关闭弹窗',
                      content: '数据未保存,确认关闭弹窗吗?',
                      centered: true,
                      onOk() {
                        setVisible(false);
                        onClose();
                      },
                    });
                  } else {
                    setVisible(false);
                    onClose();
                  }
                }}
              >
                {cancelText}
              </Button>
            )}
            {!footerRender && okText && (
              <Button
                {...okProps}
                onClick={() => {
                  const result = onOk(() => {
                    setVisible(false);
                  });
                  !result && setVisible(false);
                }}
              >
                {okText}
              </Button>
            )}
          </Align>
        )}
      </Drawer>
    </>
  );
};

Fragment.defaultProps = {
  openText: '打开',
  openProps: {},
  title: '标题',
  width: 'default', // default(680) | small(480) | large(880) | Number([0-9]*)
  closable: true,
  maskClosable: true,
  mask: true,
  maskStyle: {},
  style: {},
  drawerStyle: {},
  headerStyle: {},
  bodyStyle: {},
  height: 256,
  className: '',
  zIndex: 1000,
  placement: 'right',
  onOpen: () => {},
  cancelText: '取消', // null(不显示)
  cancelProps: {},
  onClose: () => {},
  okText: '确定', // null(不显示)
  okProps: { type: 'primary' },
  onOk: (close) => {},
  afterVisibleChange: (visible) => {},
  afterClose: () => {}, // 关闭之后
  beforeOpen: () => {}, // 打开之前
  keyboard: true,
  footerRender: null, // (close) => Element, // null
  needIntercept: true, // 是否开启拦截
};

export default Fragment;
