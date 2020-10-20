import React from 'react';

import Card from '../components/Card';

export default props => {
  const [name, setName] = React.useState(props.value); // hook

  return (
    <div className={'layout'}>
      <div className={'layout-inner'}>
        <div className={'layout-main'}>
          <Card text={'hello world!'} />
        </div>
        <div className={'layout-side'}>
          <span>B</span>
        </div>
      </div>
    </div>
  );
};
