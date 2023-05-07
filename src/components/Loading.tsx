import React from 'react';

const Loading =React.forwardRef((props:{text:string}, ref) => (<div ref={ref}>{props.text}</div>))

export default Loading;
