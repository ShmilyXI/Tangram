/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶widget组件
 * TODO: 包裹widget组件 重写onChange方法,因为formRender接受的自定义组件需要是onChange(name,value)格式
 */

import React from 'react';

export default (Component, p) => (
  <Component {...p} onChange={(value) => p.onChange(p.name, value)} />
);
