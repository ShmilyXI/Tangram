import { InsertRowRightOutlined } from '@ant-design/icons';

// 右侧公用属性 commonSettings 用于设定通用配置，默认配置见 defaultCommonSettings有些基本配置，例如 title，key，组件宽度，组件 label 宽度等，你希望每个 setting 都包含，在commonSettings 里配。
const defaultCommonSettings = {
  $id: {
    title: 'ID',
    // description: '数据存储的名称(随机生成)',
    type: 'string',
    'ui:widget': 'idInput',
    'ui:readonly': true,
  },
  title: {
    title: '标题',
    type: 'string',
    visible: true,
    required: ['title'],
  },
  description: {
    title: '描述说明',
    type: 'string',
  },
  default: {
    title: '默认值',
    type: 'string',
  },
  'ui:readonly': {
    title: '是否只读',
    type: 'boolean',
  },
  required: {
    title: '',
    type: 'array',
    'ui:widget': 'checkboxes',
    items: {
      type: 'string',
    },
    enum: [true],
    enumNames: [' 是否必填'],
  },
  'ui:width': {
    title: '元素宽度',
    type: 'string',
    'ui:widget': 'percentSlider',
  },
  // 'ui:labelWidth': {
  //   title: '标签宽度',
  //   description: '默认值120',
  //   type: 'number',
  //   'ui:widget': 'slider',
  //   max: 400,
  //   'ui:options': {
  //     hideNumber: true,
  //   },
  // },

  outerOptions: {
    title: '其他设置',
    type: 'object',
    'ui:labelWidth': 80,
    properties: {
      nonRepeatable: {
        type: 'array',
        'ui:widget': 'checkboxes',
        items: {
          type: 'string',
        },
        enum: [true],
        enumNames: [' 不可重复'],
      },
      sortAble: {
        type: 'array',
        'ui:widget': 'checkboxes',
        items: {
          type: 'string',
        },
        enum: [true],
        enumNames: [' 查询'],
        description: '数据列表作为搜索条件',
      },
      visual: {
        type: 'array',
        'ui:widget': 'checkboxes',
        items: {
          type: 'string',
        },
        enum: [true],
        enumNames: [' 是否显示'],
        description: '是否展示在数据列表中',
      },
    },
  },
};

// widget 用于schema中每个元素对应的右侧配置知道用哪个setting

// 基础组件
/*
 {
    title: '基础组件', // 最外层的分组名称
    widgets: [
      { // 每个组件的配置，在左侧栏是一个按钮
        name: 'input', // 按钮生成的schema的key值
        text: "输入框", // 在左侧栏按钮展示文案
        widget: "input", // 如果是基本组件，这个字段注明它对应的widgets
        schema: {title: "输入框", type: "string"}, // 组件对应的schema片段
        setting: { ... } // 组件的配置信息，也使用form-render的schema来描述
      },
      {
        ...
      }
    ]
  }
*/
const elements = [
  {
    text: '单行文本',
    name: 'input',
    widget: 'input',
    icon: <span className="iconfont icon-danhangshurukuang"></span>,
    schema: {
      title: '单行文本',
      type: 'string',
      controlType: '1',
      message: {
        // pattern: '输入格式不正确',
        // required: '内容不能为空',
      },
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          allowClear: {
            title: '清除按钮',
            description: '填写内容后会出现清除按钮',
            type: 'boolean',
          },
          // addonBefore: {
          //   title: '前置标签',
          //   type: 'string',
          // },
          // addonAfter: {
          //   title: '后置标签',
          //   type: 'string',
          // },
        },
      },
      minLength: {
        title: '最短字数',
        type: 'number',
        min: 0,
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
        min: 0,
      },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        'ui:options': {
          placeholder: '填写正则表达式',
        },
      },
    },
  },
  {
    text: '多行文本',
    name: 'textarea',
    widget: 'textarea',
    icon: <span className="iconfont icon-duohangshurukuang"></span>,
    schema: {
      title: '多行文本',
      type: 'string',
      format: 'textarea',
      controlType: '2',
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          allowClear: {
            title: '清除按钮',
            description: '填写内容后会出现清除按钮',
            type: 'boolean',
          },
          autoSize: {
            title: '高度自动',
            type: 'boolean',
          },
          rows: {
            title: '指定高度',
            type: 'number',
            min: 1,
            max: 10,
          },
        },
      },
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        'ui:options': {
          placeholder: '填写正则表达式',
        },
      },
    },
  },
  {
    text: '数字输入框',
    name: 'number',
    widget: 'number',
    icon: <span className="iconfont icon-shuzishurukuang"></span>,
    schema: {
      title: '数字输入框',
      type: 'number',
      controlType: '3',
    },
    setting: {
      'ui:options': {
        type: 'object',
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          precision: {
            title: '数值精度',
            type: 'number',
            min: 0,
            max: 5,
            'ui:options': {
              placeholder: '小数位数,0为整数',
            },
          },
        },
      },
      minimum: {
        title: '最小值',
        type: 'number',
        min: 0,
        'ui:options': {
          placeholder: '可输入的最小值',
        },
      },
      maximum: {
        title: '最大值',
        type: 'number',
        min: 0,
        'ui:options': {
          placeholder: '可输入的最大值',
        },
      },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        'ui:options': {
          placeholder: '填写正则表达式',
        },
      },
    },
  },
  {
    text: '日期选择',
    name: 'date',
    widget: 'baseDate',
    icon: <span className="iconfont icon-riqi"></span>,
    schema: {
      title: '日期选择',
      type: 'string',
      'ui:widget': 'baseDate',
      controlType: '7',
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          allowClear: {
            title: '清除按钮',
            description: '填写内容后会出现清除按钮',
            type: 'boolean',
          },
        },
      },
      format: {
        title: '输入格式',
        type: 'string',
        enum: ['YYYY', 'YYYY-MM', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'],
        enumNames: ['年份', '年-月', '年-月-日', '年-月-日 时:分:秒'],
      },
    },
  },
  // {
  //   text: '时间选择',
  //   name: 'time',
  //   widget: 'baseTime',
  //   icon: ( <svg className="icon" ariaHidden="true">
  //   <use xlinkHref="#icon-duohangshurukuang"></use>
  // </svg>),
  //   schema: {
  //     title: '时间选择',
  //     type: 'string',
  //     'ui:widget': 'baseTime',
  //     controlType: '7',
  //   },
  //   setting: {
  //     'ui:options': {
  //       type: 'object',
  //       'ui:labelWidth': 80,
  //       properties: {
  //         placeholder: {
  //           title: '输入提示',
  //           type: 'string',
  //         },
  //         allowClear: {
  //           title: '清除按钮',
  //           description: '填写内容后会出现清除按钮',
  //           type: 'boolean',
  //         },
  //       },
  //     },
  //   },
  // },
  {
    text: '下拉单选',
    name: 'select',
    widget: 'select',
    icon: <span className="iconfont icon-xialadanxuan"></span>,
    schema: {
      title: '下拉单选',
      type: 'string',
      enum: ['A', 'B', 'C', 'D'],
      //   enumNames: ['早', '中', '晚'],
      controlType: '6',
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          allowClear: {
            title: '清除按钮',
            description: '填写内容后会出现清除按钮',
            type: 'boolean',
          },
        },
      },
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        'ui:widget': 'editSelect',
      },
    },
  },
  {
    text: '下拉多选',
    name: 'multiSelect',
    widget: 'multiSelect',
    icon: <span className="iconfont icon-xialadanxuan"></span>,
    schema: {
      title: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      //   enumNames: ['杭州', '武汉', '湖州', '贵阳'],
      'ui:widget': 'multiSelect',
      controlType: '12',
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          allowClear: {
            title: '清除按钮',
            description: '填写内容后会出现清除按钮',
            type: 'boolean',
          },
        },
      },
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        'ui:widget': 'editSelect',
      },
    },
  },
  {
    text: '点击多选',
    name: 'checkboxes',
    widget: 'checkboxes',
    icon: <span className="iconfont icon-duoxuan"></span>,
    schema: {
      title: '点击多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      //   enumNames: ['杭州', '武汉', '湖州', '贵阳'],
      controlType: '5',
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          allowClear: {
            title: '清除按钮',
            description: '填写内容后会出现清除按钮',
            type: 'boolean',
          },
        },
      },
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        'ui:widget': 'editSelect',
      },
    },
  },
  {
    text: '点击单选',
    name: 'radio',
    widget: 'radio',
    icon: <span className="iconfont icon-danxuan"></span>,
    schema: {
      title: '点击单选',
      type: 'string',
      enum: ['A', 'B', 'C', 'D'],
      //   enumNames: ['早', '中', '晚'],
      'ui:widget': 'radio',
      controlType: '4',
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          placeholder: {
            title: '输入提示',
            type: 'string',
          },
          allowClear: {
            title: '清除按钮',
            description: '填写内容后会出现清除按钮',
            type: 'boolean',
          },
        },
      },
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        'ui:widget': 'editSelect',
      },
    },
  },

  {
    text: '上传文件',
    name: 'baseUpload',
    widget: 'baseUpload',
    icon: <span className="iconfont icon-shangchuan"></span>,
    schema: {
      title: '上传文件',
      type: 'string',
      'ui:widget': 'baseUpload',
      'ui:options': {
        listType: 'text',
      },
      controlType: '8',
    },
    setting: {
      'ui:options': {
        type: 'object',
        'ui:labelWidth': 80,
        properties: {
          actions: {
            title: '上传地址',
            type: 'string',
            required: [true],
          },
          listType: {
            title: '控件类型',
            type: 'string',
            enum: ['text', 'picture', 'picture-card'],
            enumNames: ['文字列表', '图片列表', '照片墙'],
          },
          multiple: {
            title: '',
            type: 'array',
            'ui:widget': 'checkboxes',
            items: {
              type: 'string',
            },
            enum: [true],
            enumNames: [' 是否支持多选上传'],
          },
          maxCount: {
            title: '上传数量',
            type: 'number',
            min: 0,
          },
          accept: {
            title: '支持类型',
            type: 'array',
            'ui:widget': 'checkboxes',
            description: '不选默认支持所有文件',
            enum: ['image/*', '.pdf', '.word,.wps,.doc', '.excel,.xslx,.xls'],
            enumNames: ['图片', 'PDF', '文档', '表格'],
          },
        },
      },
    },
  },
];

// 其他组件
const outerElements = [
  {
    text: '手机号码',
    name: 'phoneNumber',
    widget: 'phoneInput',
    icon: <span className="iconfont icon-fuhao-dianhua"></span>,
    schema: {
      title: '手机号码',
      type: 'string',
      'ui:widget': 'phoneInput',
      pattern: '(^[0][1-9]{2,3}-[0-9]{5,10}$)|(^0?(1[3-9])[0-9]{9}$)',
      controlType: '9',
    },
    setting: {
      pattern: {
        title: '号码格式',
        type: 'string',
        'ui:widget': 'select',
        enum: [
          '(^[0][1-9]{2,3}-[0-9]{5,10}$)|(^0?(1[3-9])[0-9]{9}$)',
          '^(0d{2,3}-)?(d{7,8})$',
        ],
        enumNames: ['手机', '座机'],
      },
    },
  },
  {
    text: '邮箱',
    name: 'email',
    widget: 'baseInput',
    icon: <span className="iconfont icon-youxiang"></span>,
    schema: {
      title: '邮箱',
      type: 'string',
      pattern: '^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$',
      controlType: '10',
      'ui:widget': 'baseInput',
    },
  },
  {
    text: '身份证号码',
    name: 'idCard',
    widget: 'baseInput',
    icon: <span className="iconfont icon-zhanghaoguanli"></span>,
    schema: {
      title: '身份证号码',
      type: 'string',
      pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
      controlType: '11',
      'ui:widget': 'baseInput',
    },
  },
];

// 业务组件
const bizElements = [
  {
    text: '日期范围',
    name: 'dateRange',
    widget: 'dateRange',
    schema: {
      title: '日期范围',
      type: 'range',
      format: 'dateTime',
      'ui:options': {
        placeholder: ['开始时间', '结束时间'],
      },
    },
    setting: {
      format: {
        title: '类型',
        type: 'string',
        enum: ['dateTime', 'date'],
        enumNames: ['日期时间', '日期'],
      },
    },
  },
];

// 模板
const templates = [];

// 左侧组件列表
const defaultSettings = [
  {
    title: '基础',
    widgets: elements,
    show: true,
    useCommon: true, // TODO: 是否将common
    icon: <span className="iconfont icon-youxiang"></span>,
  },
  {
    title: '其他',
    widgets: outerElements,
    icon: <span className="iconfont icon-youxiang"></span>,
  },
  // {
  //   title: '业务组件',
  //   widgets: bizElements,
  // },
  // {
  //   title: '模板',
  //   widgets: templates,
  // },
];

// 右侧表单属性配置
const defaultGlobalSettings = {
  type: 'object',
  properties: {
    formName: {
      title: '表单名称',
      type: 'string',
      required: [true],
      default: '表单名称',
      'ui:options': {
        placeholder: '请输入表单名称',
      },
    },
    formDescription: {
      title: '表单描述',
      type: 'string',
      format: 'textarea',
      controlType: 'textarea',
      maxLength: 200,
      'ui:options': {
        maxLength: 200,
        showCount: true,
        placeholder: '请输入表单描述',
        rows: 3,
      },
    },
    column: {
      title: '整体布局',
      type: 'string',
      enum: [1, 2, 3],
      enumNames: ['一行一列', '一行二列', '一行三列'],
      'ui:options': {
        placeholder: '默认一行一列',
      },
    },
    labelWidth: {
      title: '标签宽度',
      type: 'number',
      'ui:widget': 'slider',
      max: 300,
      'ui:options': {
        hideNumber: true,
      },
    },
    displayType: {
      title: '标签展示模式',
      type: 'string',
      enum: ['row', 'column'],
      enumNames: ['同行', '单独一行'],
      'ui:widget': 'radio',
    },
  },
};

export {
  defaultCommonSettings,
  elements,
  bizElements,
  templates,
  defaultSettings,
  defaultGlobalSettings,
};
