import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default function ta(p) {
  const { options, invalid } = p;
  const [updater, setUpdater] = useState(new Date());
  useEffect(() => {
    setUpdater(new Date());
  }, [options?.autoSize, options?.rows]);
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const defaultUi = { rows: 3 };
  const ui = { ...defaultUi, ...options };
  const onChange = (e) => p.onChange(e.target.value);
  return (
    <TextArea
      key={updater}
      style={style}
      disabled={p.disabled || p.readonly}
      value={p.value}
      {...ui}
      onChange={onChange}
    />
  );
}
