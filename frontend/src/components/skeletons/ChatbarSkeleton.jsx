import React from 'react';
import { Skeleton } from 'antd';


export default () => (
  <>
    {[...Array(3)].map((_, i) => (
      <Skeleton avatar paragraph={{ rows: 0 }} style={{padding:"1.5em"}} />
    ))}
  </>
);


