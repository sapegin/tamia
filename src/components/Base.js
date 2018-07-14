import React from 'react';

const Base = ({ is: Component, ...props }) => <Component {...props} />;

export default Base;
