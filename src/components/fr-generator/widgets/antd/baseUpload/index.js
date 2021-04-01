import React, { Component } from 'react';
import { Button, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Viewer from 'react-viewer';
// import Services from "@/services";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [
        ...(props?.defaultValue && Array.isArray(props.defaultValue)
          ? props.defaultValue
          : []),
      ],
      previewImage: undefined, // 预览图
      previewVisible: false, // 预览窗
      update: new Date(),
    };
  }

  static defaultProps = {
    options: {
      action: '/jczd/api/v1/file/upLoad',
      avatar: false, // 头像模式
      readonly: false, // 视图查看状态
      tokened: true, // string || boolean
      multiple: false, // 是否支持多选上传
      disabled: false, // 是否禁用
      maxCount: undefined, // 最大上传数量
      headers: {}, // 请示头
      params: {}, // 请求参数 => object|(file) => object
      accept: undefined, // 接受上传的文件类型
      listType: 'text', // 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
      showUploadList: true, // 是否展示文件列表, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon 和 showDownloadIco
      onDownload: undefined, // 点击下载文件时的回调，如果没有指定，则自行调用能用下载接口。 => undefined || (files) => { }
      onPreview: undefined, // 点击文件链接或预览图标时的回调，如果没有指定，则自行调用能用下载接口。(只有图片类型才支持预览) => undefined || (files) => { }
    },
    readonly: false, // 视图查看状态
    onChange: (files) => {},
    defaultValue: [], // [{ uid, name, status, response, url, thumbUrl, ... }, ...]
    children: undefined,
    value: [], // [{ uid, name, status, response, url, thumbUrl, ... }, ...]
  };

  componentDidMount() {}

  // 注入请求头
  injectHeaders = () => {
    const { tokened, headers } = this.props?.options;
    const type = Object.prototype.toString.call(tokened);
    const token = {};
    if (type === '[object String]') {
      token['token'] = tokened;
    } else if (type === '[object Boolean]') {
      const accountJSON = window.sessionStorage.getItem('accountInfo');
      try {
        const accountInfo = JSON.parse(accountJSON || '{}');
        accountInfo?.token && (token['token'] = accountInfo?.token);
      } catch (error) {
        console.error(error);
      }
    }

    return {
      ...token,
      ...headers,
    };
  };

  // 预览
  handlePreview = (file = {}) => {
    const { onPreview } = this.props?.options;
    const type = Object.prototype.toString.call(onPreview);
    if (type === '[object Function]') {
      onPreview(file);
    } else {
      const reg = /(^image\/(png|jpg|gif|jpeg|webp|bmp)$)|(\.(png|jpg|gif|jpeg|webp)$)/;
      if (reg.test(file?.docUrl || file?.originFileObj?.type)) {
        if (file?.docUrl || file?.response?.data?.docUrl) {
          this.setState({
            previewImage: file?.docUrl || file?.response?.data?.docUrl, // 预览图
            previewVisible: true, // 预览窗
          });
        }
      }
    }
  };

  // 下载
  handleDownload = (file = {}) => {
    const { onDownload } = this.props?.options;
    const type = Object.prototype.toString.call(onDownload);
    if (type === '[object Function]') {
      onDownload(file);
    } else {
      // Services.jczdFileStoreFileDownLoad({ fileName: file?.response?.data?.docName || file?.name });
    }
  };

  render() {
    const {
      options = {},
      action,
      onChange,
      value,
      readonly,
      children,
      disabled,
    } = this.props;
    const {
      avatar,
      params,
      multiple,
      accept,
      listType,
      showUploadList,
      onRemove,
      maxCount,
    } = options;

    const { fileList, previewVisible, previewImage } = this.state;
    return (
      <>
        <Upload
          disabled={disabled || readonly}
          multiple={multiple}
          action={action}
          withCredentials
          headers={this.injectHeaders()}
          fileList={value && Array.isArray(value) ? value : fileList}
          data={params}
          {...(accept
            ? { accept: Array.isArray(accept) ? accept.join(',') : accept }
            : {})}
          listType={listType}
          showUploadList={showUploadList}
          onDownload={this.handleDownload}
          onPreview={this.handlePreview}
          maxCount={maxCount}
          onChange={(files, status) => {
            this.setState({ fileList: files.fileList });
            onChange(files);
          }}
          onRemove={onRemove}
        >
          {(() => {
            if (readonly || avatar) {
              return null;
            } else if (children) {
              return children;
            } else if (listType === 'text' || listType === 'picture') {
              return <Button icon={<PlusOutlined />}>上传</Button>;
            } else if (listType === 'picture-card') {
              return (
                <section>
                  <PlusOutlined style={{ fontSize: 32, color: '#999' }} />
                  <span
                    style={{ display: 'block', marginTop: 8, color: '#666' }}
                  >
                    上传
                  </span>
                </section>
              );
            }
          })()}
        </Upload>
        <Viewer
          visible={previewVisible}
          customToolbar={(configs) =>
            configs.filter((item) => !['prev', 'next'].includes(item.key))
          }
          noNavbar
          onClose={() => {
            this.setState({ previewVisible: false });
          }}
          images={[{ src: previewImage }]}
        />
      </>
    );
  }
}
export default Index;
