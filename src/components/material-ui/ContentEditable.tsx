import * as React from 'react';

type Props = {
  html: string;
  onChange: (value: string) => void
};

export default class ContentEditable extends React.Component<Props, {}> {
  render() {
    return <div
      style={{ backgroundColor: "#fafafa" }}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: any) => {
        this.props.onChange(e.target.innerHTML);
      }}
      dangerouslySetInnerHTML={{
        __html: this.props.html
      }}
    />;
  }
}