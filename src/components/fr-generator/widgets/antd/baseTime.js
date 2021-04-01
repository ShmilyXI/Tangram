/**
 * Updated by fateriddle on 2019-12-12.
 * 时间组件
 */

import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

export default (p) => {
  const onChange = (value, string) => p.onChange(string);
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  let defaultObj = {};
  if (p.value) {
    defaultObj.value = moment(p.value, 'HH:mm:ss');
  } else {
    defaultObj.value = '';
  }
  const placeholderObj = p.description ? { placeholder: p.description } : {};

  const dateParams = {
    ...placeholderObj,
    ...p.options,
    ...defaultObj,
    style: { width: '100%', ...style },
    disabled: p.disabled || p.readonly,
    onChange,
  };

  return <TimePicker {...dateParams} />;
};
