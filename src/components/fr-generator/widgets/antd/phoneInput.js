import React from 'react';
import { Input } from 'antd';

export default function BaseInput(p) {
  const { options = {}, invalid, schema } = p;
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const { format = 'text' } = p.schema;
  const type = format === 'image' ? 'text' : format;
  const handleChange = (e) => p.onChange(e.target.value);
  return (
    <Input
      style={style}
      {...options}
      defaultValue={schema?.defaultValue || ''}
      value={p.value}
      type={type}
      disabled={p.disabled || p.readonly}
      addonAfter={options.addonAfter}
      onChange={handleChange}
    />
  );
}
