import * as React from 'react';
 
export type BaseProps = {
  className?: string
};

export default class BaseComponent<P={}, S = {}> extends React.Component<BaseProps & P, S>
{
  constructor(props: BaseProps & P) {
    super(props);
  }
}