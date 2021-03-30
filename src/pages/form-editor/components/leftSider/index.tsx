import React from 'react';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

const LeftSider = () => {
  const onTabsChange = () => {};
  return (
    <Tabs defaultActiveKey="1" tabPosition="left" onChange={onTabsChange}>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default LeftSider;
