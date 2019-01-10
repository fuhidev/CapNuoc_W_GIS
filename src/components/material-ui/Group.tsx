import * as React from 'react';

const component = (props: {
  className?: string,
  style?: React.CSSProperties,
  styleContainer?: React.CSSProperties,
  title: string
} & React.Props<any>) => (
    <fieldset
      style={{ ...props.style, borderColor: '#b2b2b2', borderStyle: 'solid' }}
      className={props.className}>
      <legend style={{ color: '#b2b2b2' }}>{props.title}</legend>
      <div style={props.styleContainer}>
        {props.children}
      </div>
    </fieldset>
  );

export default component;