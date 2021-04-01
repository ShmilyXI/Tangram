widgets 注入需要两端注入
formrender 部分还需要取一次 widgets

左侧组件定义 schema 里面需要附加 componentType 用来表示组件类型

```js
{
    text: 'footer',
    name: 'formFooter',
    widget: 'formFooter',
    icon: <InsertRowRightOutlined />,
    hiddenCommSettings: true, // 不使用公用设置
    schema: {
      type: 'string',
      'ui:widget': 'formFooter',
      componentType: 'formFooter',
      hiddenControls: true, // 不显示操作控件
    },
}
```

    hiddenCommSettings: true, // 不使用公用设置
      hiddenControls: true, // 不显示操作控件
