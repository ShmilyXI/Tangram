import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { defaultSettings } from '../Settings';
import { useStore } from '../hooks';
import './index.css';
import Element from './Element';

const { TabPane } = Tabs;
const Left = ({ saveList, setSaveList, ...rest }) => {
  const { userProps = {} } = useStore();
  const { settings } = userProps;
  const _settings = Array.isArray(settings) ? settings : defaultSettings;
  const onTabsChange = () => {};
  console.log('_settings :>> ', _settings);
  return (
    <div className="left-layout">
      <Tabs
        defaultActiveKey={1}
        tabPosition="left"
        onChange={onTabsChange}
        style={{ height: '100%' }}
      >
        {Array.isArray(_settings) ? (
          _settings.map((item, idx) => {
            if (item && item.show === false) {
              return null;
            }
            return (
              <TabPane
                key={idx}
                tab={
                  <>
                    <div>{item?.icon}</div>
                    {item?.title}
                  </>
                }
              >
                <ul className="pl0">
                  {Array.isArray(item.widgets) ? (
                    item.widgets.map((widget, idx) => {
                      return (
                        <Element key={idx.toString()} {...widget} {...rest} />
                      );
                    })
                  ) : (
                    <div>此处配置有误</div>
                  )}
                </ul>
              </TabPane>
              // <div >
              //   <p className="f6 b component-title">{item.title}</p>

              // </div>
            );
          })
        ) : (
          <div>配置错误：Setting不是数组</div>
        )}
      </Tabs>
    </div>
  );
};

export default Left;
