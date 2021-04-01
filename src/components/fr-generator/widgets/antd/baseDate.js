/**
 * Updated by fateriddle on 2019-12-12.
 * 日期组件
 */

import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import { getPicker } from '../../utils';

export default (p) => {
  const onChange = (value, string) => p.onChange(string);
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  const { format = 'YYYY-MM-DD HH:mm:ss' } = p.schema;
  const picker = getPicker(format);
  let defaultObj = {};
  if (p.value) {
    defaultObj.value = moment(p.value, format);
  } else {
    defaultObj.value = '';
  }
  const placeholderObj = p.description ? { placeholder: p.description } : {};
  console.log('p :>> ', p);
  const dateParams = {
    ...placeholderObj,
    ...p.options,
    ...defaultObj,
    style: { width: '100%', ...style },
    disabled: p.disabled || p.readonly,
    picker,
    onChange,
  };

  if (format === 'YYYY-MM-DD HH:mm:ss') {
    dateParams.showTime = true;
  }

  return <DatePicker {...dateParams} />;
};
