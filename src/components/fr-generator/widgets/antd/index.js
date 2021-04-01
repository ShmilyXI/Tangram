import widgetHoc from '../../components/widgetHoc.jsx';
import checkbox from './checkbox';
import checkboxes from './checkboxes';
import color from './color';
import date from './date';
import dateRange from './dateRange';
import list from './list.jsx';
import listEditor from './listEditor';
import map from './map';
import multiSelect from './multiSelect';
import number from './number';
import radio from './radio';
import select from './select';
import slider from './slider';
import switch1 from './switch';
import textarea from './textarea';
import upload from './upload';
import input from './input';
import editSelect from './editSelect';
import baseInput from './baseInput';
import baseDate from './baseDate';
import baseTime from './baseTime';
import phoneInput from './phoneInput';
import baseUpload from './baseUpload';
import formFooter from './formFooter';
import gangedBox from './gangedBox';

// TODO: 包裹widget组件 重写onChange方法,因为formRender接受的自定义组件需要是onChange(name,value)格式
const FrBaseInput = (p) => widgetHoc(baseInput, p);
const FrBaseDate = (p) => widgetHoc(baseDate, p);
const FrBaseTime = (p) => widgetHoc(baseTime, p);
const FrPhoneInput = (p) => widgetHoc(phoneInput, p);
const FrBaseUpload = (p) => widgetHoc(baseUpload, p);

export const widgets = {
  checkbox,
  checkboxes, // checkbox多选
  color,
  date,
  dateRange,
  input,
  list,
  listEditor,
  map,
  multiSelect, // 下拉多选
  number,
  radio,
  select,
  slider, // 带滚条的number
  switch: switch1,
  textarea,
  upload,
  editSelect,
  baseInput,
  baseDate,
  baseTime,
  phoneInput,
  baseUpload,
  formFooter,
  gangedBox,
  FrBaseInput,
  FrBaseDate,
  FrBaseTime,
  FrPhoneInput,
  FrBaseUpload,
};
