import React from 'react';

export default ({ text = '' }) => {
  return (
    <div
      style={{
        width: '100%',
        border: '1px solid #eee',
        borderRadius: 10,
        backgroundColor: '#fff',
      }}>
      <span>{text}</span>
    </div>
  );
};
