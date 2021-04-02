import React, { Component } from 'react';
import { Spin } from 'antd';
import styles from './index.less';

class Index extends Component {
  static defaultProps = {
    children: undefined,
    loading: false,
    className: '',
    style: {},
    onClick: () => {},
  };

  render() {
    const { children, loading, className, style, onClick } = this.props;

    return (
      <Spin spinning={loading}>
        <section
          className={`${styles.block} ${className}`}
          style={style}
          onClick={onClick}
        >
          {children}
        </section>
      </Spin>
    );
  }
}

export default Index;
