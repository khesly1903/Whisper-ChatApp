import React from 'react';
import { Skeleton } from 'antd';

export default function ChatbarSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Skeleton 
          key={index}
          avatar 
          paragraph={{ rows: 0 }} 
          style={{padding:"1.5em"}}
          active
        />
      ))}
    </>
  );
}
