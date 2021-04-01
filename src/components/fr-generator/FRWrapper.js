import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSet, useStorageState } from './hooks';
import copyTOClipboard from 'copy-text-to-clipboard';
import Left from './Left';
import Right from './Right';
import {
  flattenSchema,
  idToSchema,
  combineSchema,
  dataToFlatten,
  flattenToData,
  getSaveNumber,
  looseJsonParse,
  isObject,
  oldSchemaToNew,
  newSchemaToOld,
} from './utils';
import { Ctx, StoreCtx } from './context';
// import SCHEMA from './json/basic.json';
import FR from './FR';
import FormRender from '@/components/FormRender';
import { Modal, Input, message, Button } from 'antd';
import _ from 'lodash';

const { TextArea } = Input;

function Wrapper(
  {
    schema,
    formData,
    onChange,
    onSchemaChange,
    setGlobal,
    userProps = {},
    frProps = {},
    ...rootState
  },
  ref,
) {
  const [local, setState] = useSet({
    showModal: false,
    showModal2: false,
    showModal3: false,
    schemaForImport: '',
  });

  const { simple = true, preview, widgets } = rootState;

  const {
    templates,
    submit,
    transformFrom,
    transformTo,
    isNewVersion,
    extraButtons = [],
  } = userProps;

  const [saveList, setSaveList] = useState(templates || []);

  const saveNameRef = useRef();

  let _schema = {};
  if (schema) {
    _schema = combineSchema(schema.schema, schema.uiSchema); // TODO: 要不要判断是否都是object
  }
  const flatten = flattenSchema(_schema);
  const flattenWithData = dataToFlatten(flatten, formData);
  const onFlattenChange = (newFlatten) => {
    const newSchema = idToSchema(newFlatten);
    const newData = flattenToData(newFlatten);
    // 判断只有schema变化时才调用，一般需求的用户不需要
    if (onSchemaChange) {
      onSchemaChange(newSchema);
      console.log('newSchema :>> ', newSchema);
    }
    onChange(newData);
  };

  const onItemChange = (key, value) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData);
  };

  const toggleModal = () => setState({ showModal: !local.showModal });
  const toggleModal2 = () => setState({ showModal2: !local.showModal2 });
  const toggleModal3 = () => setState({ showModal3: !local.showModal3 });

  // 清空
  const clearSchema = () => {
    setGlobal({
      schema: {
        schema: {
          type: 'object',
        },
      },
      formData: {},
      selected: undefined,
    });
  };

  const onTextareaChange = (e) => {
    setState({ schemaForImport: e.target.value });
  };

  // 收口点 propsSchema 到 schema 的转换（一共就3个入口：defaultValue，importSchema，setValue）
  // TODO: 3个入口可能还是太多了，是不是考虑在外面裹一层
  // TODO2: 导入这边看看会不会传一个乱写的schema就crash
  const importSchema = () => {
    try {
      const info = transformFrom(looseJsonParse(local.schemaForImport));
      let _isNewVersion = true;
      if (info && info.propsSchema) {
        _isNewVersion = false;
      }
      const _info = oldSchemaToNew(info);
      const { schema, ...rest } = _info;
      setGlobal((state) => ({
        schema: {
          schema,
        },
        formData: {},
        selected: undefined,
        isNewVersion: _isNewVersion,
        frProps: { ...state.frProps, ...rest },
      }));
    } catch (error) {
      message.info('导入JSON格式不正确，请重新尝试'); // 可以加个格式哪里不对的提示
    }
    toggleModal2();
  };

  let displaySchema = {};
  let displaySchemaString = '';
  try {
    const _schema = idToSchema(flattenWithData, '#', true);
    // const required = [...(_schema?.schema?.required || [])];

    // if (itemSelected?.schema?.required) {
    //   required.push(itemSelected?.schema?.['$id']?.split('#/')?.[1]);
    // }
    if (frProps && frProps.column) {
      _schema['ui:column'] = frProps.column;
    }
    if (frProps && frProps.displayType) {
      _schema['ui:displayType'] = frProps.displayType;
    }
    if (frProps && frProps.showDescIcon) {
      _schema['ui:showDescIcon'] = frProps.showDescIcon;
    }
    displaySchema = transformTo({ schema: _schema, ...frProps });
    if (!isNewVersion) {
      displaySchema = newSchemaToOld(displaySchema);
    }
    displaySchemaString = JSON.stringify(displaySchema, null, 2);
  } catch (error) {}

  // 复制schemaJson
  const copySchema = () => {
    copyTOClipboard(displaySchemaString);
    message.info('复制成功');
    // toggleModal();
  };

  // const handleSubmit = () => {
  //   submit(displaySchema);
  // };

  const getValue = () => {
    return displaySchema;
  };

  // 收口点 propsSchema 到 schema
  // setValue 外部用于修改大schema，叫setSchema比较合适
  // TODO: 这次顶层的props传递改动和整理后，确保这个api还是正确的
  const setValue = (value) => {
    try {
      // TODO: 这里默认使用setValue的同学不使用ui:Schema
      const { schema, propsSchema, uiSchema, ...rest } = value;
      let _schema = { schema: schema || propsSchema };
      let _isNewVersion = true;
      if (!schema && propsSchema) {
        _isNewVersion = false;
      }
      setGlobal((state) => ({
        ...state,
        schema: _schema,
        formData: {},
        selected: undefined,
        isNewVersion: _isNewVersion,
        frProps: { ...state.frProps, ...rest },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const copyValue = () => {
    copyTOClipboard(displaySchemaString);
  };

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    copyValue,
  }));

  const saveSchema = () => {
    try {
      const text = saveNameRef.current.state.value;
      const name = 'save' + getSaveNumber();
      const schema = idToSchema(flattenWithData, '#', true);
      setSaveList([...saveList, { text, name, schema }]);
      toggleModal3();
    } catch (error) {
      message.error('保存失败');
    }
  };

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData, // schema + formData = flattenWithData
    onFlattenChange, // onChange + onSchemaChange = onFlattenChange
    onItemChange, // onFlattenChange 里只改一个item的flatten，使用这个方法
    userProps,
    frProps,
    ...rootState,
  };

  const _extraButtons = Array.isArray(extraButtons) ? extraButtons : [];
  const _showDefaultBtns = _extraButtons.filter(
    (item) => item === true || item === false,
  );
  const _extraBtns = _extraButtons.filter(
    (item) => isObject(item) && item.text,
  );

  if (simple) {
    return (
      <Ctx.Provider value={setGlobal}>
        <StoreCtx.Provider value={store}>
          <FR preview={true} />
        </StoreCtx.Provider>
      </Ctx.Provider>
    );
  }

  return (
    <Ctx.Provider value={setGlobal}>
      <StoreCtx.Provider value={store}>
        <div className="fr-wrapper">
          <Left saveList={saveList} setSaveList={setSaveList} />
          <div className="mid-layout pr2">
            {_extraBtns?.length ||
              (_.compact(_showDefaultBtns)?.length ? (
                <div className="mv2 mh1">
                  {_showDefaultBtns[0] !== false && (
                    <Button
                      className="mr2 mb1"
                      onClick={() => {
                        setGlobal({ preview: !preview, selected: '#' });
                      }}
                    >
                      {preview ? '编辑' : '预览'}
                    </Button>
                  )}
                  {_showDefaultBtns[1] !== false && (
                    <Button className="mr2" onClick={clearSchema}>
                      清空
                    </Button>
                  )}
                  {/* <Button className="mr2" onClick={toggleModal3}>
                  保存
                </Button> */}
                  {_showDefaultBtns[2] !== false && (
                    <Button className="mr2" onClick={toggleModal2}>
                      导入
                    </Button>
                  )}
                  {_showDefaultBtns[3] !== false && (
                    <Button
                      type="primary"
                      className="mr2"
                      onClick={toggleModal}
                    >
                      导出schema
                    </Button>
                  )}
                  {_extraBtns.map((item, idx) => {
                    return (
                      <Button key={idx.toString()} className="mr2" {...item}>
                        {item.text || item.children}
                      </Button>
                    );
                  })}
                  {/* <Button type="primary" className="mr2" onClick={handleSubmit}>
                  保存
                </Button> */}
                </div>
              ) : null)}
            <div className="dnd-container">
              {preview ? (
                <FormRender schema={displaySchema} />
              ) : (
                <>
                  <div className="form-header">
                    <p className="formName">
                      {displaySchema?.formName || '表单名称'}
                    </p>
                    <p className="formDescription">
                      {displaySchema?.formDescription}
                    </p>
                  </div>
                  <div style={{ height: preview ? 33 : 0 }}></div>
                  <FR preview={preview} />
                </>
              )}
              {/* <div className="form-footer">
                <Align align="cm">
                  <Button type="default">{'重置'}</Button>
                  <Button type="primary">{'提交'}</Button>
                </Align>
              </div> */}
            </div>
          </div>
          <Right globalProps={frProps} />
          <Modal
            visible={local.showModal}
            onOk={copySchema}
            onCancel={toggleModal}
            okText="复制"
            cancelText="取消"
            centered
          >
            <div className="mt3">
              <TextArea
                style={{ fontSize: 14, marginTop: 20 }}
                value={displaySchemaString}
                autoSize={{ minRows: 10, maxRows: 30 }}
              />
            </div>
          </Modal>
          <Modal
            visible={local.showModal2}
            okText="导入"
            cancelText="取消"
            centered
            onOk={importSchema}
            onCancel={toggleModal2}
          >
            <div className="mt3">
              <TextArea
                style={{ fontSize: 14, marginTop: 20 }}
                value={local.schemaForImport}
                placeholder="贴入需要导入的schema，模样可点击导出schema参考"
                onChange={onTextareaChange}
                autoSize={{ minRows: 10, maxRows: 30 }}
              />
            </div>
          </Modal>
          <Modal
            visible={local.showModal3}
            okText="确定"
            cancelText="取消"
            onOk={saveSchema}
            onCancel={toggleModal3}
          >
            <div className="mt4 flex items-center">
              <div style={{ width: 100 }}>保存名称：</div>
              <div style={{ width: 280 }}>
                <Input
                  defaultValue={'存档' + getSaveNumber()}
                  ref={saveNameRef}
                />
              </div>
            </div>
          </Modal>
        </div>
      </StoreCtx.Provider>
    </Ctx.Provider>
  );
}

const FRWrapper = forwardRef(Wrapper);

FRWrapper.defaultProps = {
  labelWidth: 120,
};

export default FRWrapper;
