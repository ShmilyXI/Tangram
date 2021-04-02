export default class Model {
  constructor(savestate = (values = {}) => {}) {
    this.dispatch = (values = {}) => {
      this.initialState = {
        // ### 辅助参数
        updater: new Date(), // 更新器
        loading: false, // 加载
        processing: false, // 处理
        /* ### ### ### ### */
        ...this.initialState,
        ...values,
      };
      this.state = {
        ...(this.state || {}),
        ...values,
      };
      savestate(values);
    };
  }
}
