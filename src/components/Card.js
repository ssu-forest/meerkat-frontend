import React from 'react';

export default ({ text = '' }) => {
  return (
    <div
      style={{
        width: '100%',
      }}>
      <span>{text}</span>
    </div>
  );
};
