import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
  useRef,
} from 'react';
import FormRender from 'form-render/lib/antd';
import { Button } from 'antd';
import { Align } from '@/plugins';
import { widgets } from '@/components/fr-generator/widgets/antd';
import _ from 'lodash';
import styles from './index.less';

const Index = (props, ref) => {
  const { schema = {}, isPreview = false, isDrawer } = props;
  const [schemaJSON, setSchemaJSON] = useState({});
  const [data, setData] = useState({}); // 表单数据
  const [valid, setValid] = useState([]); // 检验错误列表
  const formRef = useRef();

  useEffect(() => {
    // 实时监听传入的json变化
    setSchemaJSON(schema?.schema || {});
  }, [schema?.schema]);

  useImperativeHandle(
    ref,
    () => ({
      onReset,
      onSubmit,
      getData: () => ({ valid, data }),
    }),
    [onReset, onSubmit, data],
  );

  // 重置
  const onReset = () => {
    formRef.current.resetData({});
  };
  // 提交
  const onSubmit = () => {
    if (!isPreview) return;
    if (!valid?.length) {
      console.log('提交');
    }
  };

  return (
    <div className={styles['form-render']}>
      {!isDrawer && (
        <div className={styles['form-header']}>
          <p className={styles['formName']}>{schema?.formName || '表单名称'}</p>
          <p className={styles['formDescription']}>
            {schema?.formDescription}12312313
          </p>
        </div>
      )}
      <FormRender
        ref={formRef}
        schema={schemaJSON}
        formData={data}
        onChange={setData}
        onValidate={(valid) => setValid(valid)}
        widgets={{
          baseInput: widgets?.FrBaseInput,
          baseDate: widgets?.FrBaseDate,
          baseTime: widgets?.FrBaseTime,
          phoneInput: widgets?.FrPhoneInput,
          baseUpload: widgets?.FrBaseUpload,
        }}
      />
      {!isDrawer && (
        <div className={styles['form-footer']}>
          <Align align="cm">
            <Button type="default" onClick={onReset}>
              重置
            </Button>
            <Button type="primary" onClick={onSubmit}>
              提交
            </Button>
          </Align>
        </div>
      )}
    </div>
  );
};
Index.defaultProps = {
  schema: {}, // 表单schemaJSON
  isPreview: false, // 是否是预览状态 (提交按钮点击不提交)
  isDrawer: false, // 是否是弹窗状态 (不显示标题,提交按钮)
};
export default forwardRef(Index);
