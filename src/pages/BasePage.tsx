import * as React from 'react';
import BaseComponent, { BaseProps } from '../components/BaseComponent';



export type PageProps = {
  id: string,
} & BaseProps;

type State = {
};

export default class BasePage<P={}, S = {}> extends BaseComponent<PageProps & P, S & State>
{
  constructor(props: PageProps & P) {
    super(props);
  }
}