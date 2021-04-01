import React from 'react';
import { Button } from 'antd';
import { Align } from '@/plugins';

function FormFooter(props) {
  console.log('props :>> ', props);
  const {
    submitText = '',
    resetText = '',
    hiddenSubmit = [false],
    hiddenReset = [false],
  } = props?.schema;
  return (
    <Align align="cm">
      {!hiddenReset[0] && <Button type="default">{resetText || '重置'}</Button>}
      {!hiddenSubmit[0] && (
        <Button type="primary">{submitText || '提交'}</Button>
      )}
    </Align>
  );
}
export default FormFooter;
