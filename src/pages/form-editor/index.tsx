import React from 'react';
import { Layout } from 'antd';
import LeftSider from './components/leftSider';
import EditorContent from './components/editorContent';

import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

const FormEditor = () => {
  return (
    <div className={styles['form-editor-wrap']}>
      <Layout>
        <Header className={styles['layout-header']}>Header</Header>
        <Layout>
          <Sider theme="light" width={350} className={styles['layout-sider']}>
            <LeftSider />
          </Sider>
          <Content className={styles['layout-content']}>
            <EditorContent />
          </Content>
          <Sider theme="light" width={350} className={styles['layout-sider']}>
            Sider
          </Sider>
        </Layout>
        <Footer className={styles['layout-footer']}>Footer</Footer>
      </Layout>
    </div>
  );
};

export default FormEditor;
