import React, { useEffect } from 'react';
import { Checkbox } from 'antd';

export default function radio({
  value,
  onChange,
  disabled,
  readonly,
  schema: { defaultValue },
}) {
  useEffect(() => {
    handleChange({ target: { defaultValue } });
  }, [defaultValue]);

  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <Checkbox
      disabled={disabled || readonly}
      onChange={handleChange}
      checked={value}
    />
  );
}
