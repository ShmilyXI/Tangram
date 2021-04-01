import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { getKeyFromUniqueId, changeKeyFromUniqueId } from '../../utils';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function EditSelect(p) {
  const { enum: enums, enumNames } = p.schema || {};

  const [form] = Form.useForm();

  useEffect(() => {
    const list = p.value || enums || enumNames || [];
    if (list?.length) {
      form.setFieldsValue({ codes: list });
    }
  }, [enums, enumNames, p.value]);

  return (
    <Form
      name="codes_form_item"
      form={form}
      onValuesChange={(_, values) => {
        p.onChange(values?.codes || []);
      }}
      wrapperCol={{
        span: 24,
        offset: 0,
      }}
    >
      <Form.List
        name="codes"
        rules={[
          {
            validator: async (_, codes) => {
              if (!codes || codes.length < 1) {
                return Promise.reject(new Error('至少需要一个选项字段'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item required={true} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入选项字段',
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="请输入选项字段"
                    style={{ width: 'calc(100% - 28px)' }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    style={{
                      marginLeft: 8,
                      fontSize: 20,
                      cursor: 'pointer',
                    }}
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '100%' }}
                icon={<PlusOutlined style={{ fontSize: 18 }} />}
              ></Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}
