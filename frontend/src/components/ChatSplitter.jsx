import React from 'react';
import {Splitter} from 'antd';

const ChatSplitter = ({ leftChild, rightChild }) => (
  <Splitter style={{ height: '98vh' }}>
    <Splitter.Panel defaultSize="50%" min="40%" max="60%">
      {leftChild}
    </Splitter.Panel>
    <Splitter.Panel>
      {rightChild}
    </Splitter.Panel>
  </Splitter>
);

export default ChatSplitter;
