import React, { useState, useEffect, useRef } from 'react';
import Guides from '@scena/react-guides';
import Gesto from 'gesto';
import { givenRangeArrayNumber } from '@/utils/index';
import './index.less';

interface EditorContentProps {
  theme: 'dark' | 'light';
  needRulerDrag: boolean; // 是否需要拖拽标尺
}

interface Themes {
  [type: string]: {
    backgroundColor: string;
    textColor: string;
  };
}

const themes: Themes = {
  dark: {
    backgroundColor: '#333333',
    textColor: '#ffffff',
  },
  light: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
  },
};

// 内容区
const EditorContent = (props: EditorContentProps) => {
  const { theme, needRulerDrag } = props;
  const guidesRef1: any = useRef(null);
  const guidesRef2: any = useRef(null);
  let scrollX = 0;
  let scrollY = 0;

  useEffect(() => {
    const documentEle = document.getElementsByClassName('editorContent')[0];
    if (needRulerDrag) {
      new Gesto(documentEle).on('drag', (e) => {
        scrollX -= e.deltaX;
        scrollY -= e.deltaY;

        guidesRef1.current.scrollGuides(scrollY);
        guidesRef1.current.scroll(scrollX);

        guidesRef2.current.scrollGuides(scrollX);
        guidesRef2.current.scroll(scrollY);
      });
    }
    documentEle.addEventListener('resize', () => {
      guidesRef1.current.resize();
      guidesRef2.current.resize();
    });
  }, []);

  const restore = () => {
    console.log(`123`, 123);
    scrollX = 0;
    scrollY = 0;
    guidesRef1.current.scroll(0);
    guidesRef1.current.scrollGuides(0);
    guidesRef2.current.scroll(0);
    guidesRef2.current.scrollGuides(0);
  };
  return (
    <div className="editorContent">
      <span
        className="box"
        style={{ backgroundColor: themes[theme]?.backgroundColor }}
        onClick={restore}
      ></span>
      <div className="ruler horizontal" style={{}}>
        <Guides
          ref={guidesRef1}
          type="horizontal"
          backgroundColor={themes[theme]?.backgroundColor}
          textColor={themes[theme]?.textColor}
          dragGuideStyle={{ color: '#0199e0', fontWeight: 300 }}
          direction="start"
          mainLineSize="80%" // 主行高度 百分比
          snapThreshold={50} // 需要自动吸附的单元间隔
          longLineSize={10} // 长行高度
          shortLineSize={5} // 短行高度
          // snaps={givenRangeArrayNumber(1,20,50)}
          rulerStyle={{
            left: '30px',
            width: 'calc(100% - 30px)',
            height: '100%',
          }}
          displayDragPos={true}
          onChangeGuides={({ guides }) => {
            console.log('horizontal', guides);
          }}
        />
      </div>
      <div className="ruler vertical">
        <Guides
          ref={guidesRef2}
          type="vertical"
          direction="start"
          textAlign="right"
          backgroundColor={themes[theme]?.backgroundColor}
          textColor={themes[theme]?.textColor}
          dragGuideStyle={{ color: '#0199e0', fontWeight: 300 }}
          mainLineSize="80%" // 主行高度 百分比
          snapThreshold={50} // 需要自动吸附的单元间隔
          longLineSize={10} // 长行高度
          shortLineSize={5} // 短行高度
          rulerStyle={{
            top: '30px',
            height: 'calc(100% - 30px)',
            width: '100%',
          }}
          displayDragPos={true}
          onChangeGuides={({ guides }) => {
            console.log('vertical', guides);
          }}
        />
      </div>
      <div className="container">11232131231232323</div>
    </div>
  );
};

EditorContent.defaultProps = {
  theme: 'light',
  needRulerDrag: false,
};

export default EditorContent;
