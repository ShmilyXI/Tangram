import React, { Component } from 'react';
import styles from './index.less';

class Index extends Component {
  static defaultProps = {
    level: 4, // 分别对应 => h1、h2、h3、h4、h5、h6
    strong: false, // 是否加粗
    icon: true, // false(隐藏) | true(展示方块) | Element(展示元素)
    // border: true, // 未实现
    background: '#f0f2f5', // 默认，空值时不显示背影
    title: '标题',
    subTitle: false, // 子标题
    children: undefined,
    className: '',
    style: {},
    onClick: () => {},
  };
  // {icon}
  render() {
    const {
      level,
      icon,
      strong,
      background,
      title,
      subTitle,
      children,
      className,
      style,
      onClick,
    } = this.props;
    const iconType = Object.prototype.toString.call(icon);

    return (
      <section
        className={`${styles.title} ${className}`}
        style={{
          background,
          ...(background ? {} : { paddingLeft: 0, paddingRight: 0 }),
          ...style,
        }}
        onClick={onClick}
      >
        <div className={`${styles.cotent} ${styles[`h${level}`]}`}>
          {(() => {
            if (icon) {
              if (iconType === '[object Boolean]') {
                return <div className={styles.iconBlock} />;
              } else if (iconType === '[object Object]') {
                return <div className={styles.icon}>{icon}</div>;
              }
            }
          })()}
          <div
            className={styles.main}
            style={{
              ...(() => {
                if (icon) {
                  if (iconType === '[object Boolean]') {
                    return { marginLeft: 12 };
                  } else if (iconType === '[object Object]') {
                    return { marginLeft: 8 };
                  }
                } else {
                  return { marginLeft: 0 };
                }
              })(),
              fontWeight: strong ? 700 : 400,
            }}
          >
            {title}
          </div>
          {subTitle && <div className={styles.sub}>{subTitle}</div>}
        </div>
        <div className={styles.extra}>{children}</div>
      </section>
    );
  }
}

export default Index;
