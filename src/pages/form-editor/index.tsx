import React from 'react';
import { Layout } from 'antd';
import LeftSider from './components/leftSider';
import EditorContent from './components/editorContent';
import Generator from '@/components/fr-generator';
import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

const Main = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Generator extraButtons={[true]} />
    </div>
  );
};

export default Main;
