import React, { useEffect } from 'react';
import { useStore, useSet } from '../hooks';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import './index.css';
import ItemSettings from './ItemSettings';
import GlobalSettings from './GlobalSettings';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default function Right() {
  const [state, setState] = useSet({
    showItemSettings: false,
  });
  const { selected } = useStore();
  const { showItemSettings } = state;

  // 如果没有选中任何item，或者是选中了根节点，object、list的内部，显示placeholder
  useEffect(() => {
    if ((selected && selected[0] === '0') || selected === '#' || !selected) {
      setState({ showItemSettings: false });
    } else {
      setState({ showItemSettings: true });
    }
  }, [selected]);

  return (
    <div className="right-layout relative pl3">
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        {showItemSettings && (
          <TabPane tab="组件配置" key="1">
            <ItemSettings />
          </TabPane>
        )}
        <TabPane tab="表单配置" key={showItemSettings ? '2' : '1'}>
          <GlobalSettings />
        </TabPane>
      </Tabs>
    </div>
  );
}
