import React from 'react';
import styles from './index.less';

const Fragment = ({
  children,
  align,
  gutter,
  flex,
  className,
  style,
  onClick,
}) => {
  const pd = Number.parseInt(gutter) / 2;

  // 判断类型 && 计算总长度
  let reducer = false;
  if (flex.length) {
    if (typeof flex[0] === 'number') {
      reducer = flex.reduce((acc, cur) => acc + cur); // 计算总长度
      if (children.length > flex.length) {
        reducer = children.length - flex.length + reducer;
      }
    }
    if (typeof flex[0] === 'string') {
      reducer = 'string';
    }
  }

  return (
    <div
      className={`${styles.align} ${styles[align]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {!!children.length ? (
        children.map((item, index) => {
          let style = { paddingLeft: pd, paddingRight: pd };
          if (index === 0) {
            style = { paddingRight: pd };
          }
          if (index === children.length - 1) {
            style = { paddingLeft: pd };
          }
          if (reducer && typeof reducer === 'number' && flex[index]) {
            style = { ...style, width: `${(100 / reducer) * flex[index]}%` };
          }
          if (reducer && typeof reducer === 'string' && flex[index]) {
            style = { ...style, width: flex[index] };
          }
          return (
            <div key={index} className={styles.item} style={style}>
              {item}
            </div>
          );
        })
      ) : (
        <div className={styles.item}>{children}</div>
      )}
    </div>
  );
};

Fragment.defaultProps = {
  children: undefined,
  gutter: 8, // 间距 => Int || Str 【默认：8】
  align: 'lm', // 排列方式  => Str  【默认：'lm'】
  // 水平方向 => l(左)  c(中)  r(右)  s(均分)  j(两端)
  // 垂直方向 => t(上)  m(中)  b(下)
  flex: [], // 栅格 => Array [1, 1, 1] 【顺序栅格，取值 或 补一】|| Array ['30%', '60%', '10%'] || Array ['300px', '600px']
  className: '',
  style: {},
  onClick: () => {},
};

export default Fragment;
