import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { withStyles, StyleRulesCallback, WithStyles } from '@material-ui/core/styles'
import TimePicker from './TimePicker'
import { formatHours, twoDigits } from './util'
import { Mode } from './Model';

const styles: StyleRulesCallback = () => ({
  header: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  body: {
    paddingBottom: 20
  }
});

type Props = {
  /** If true, automatically accept and close the picker on set minutes. */
  autoOk?: boolean,
  /** Override the label of the cancel button. */
  cancelLabel?: string,
  /** This default value overrides initialTime and placeholder */
  defaultValue?: Date
  /** The default value for the time picker */
  initialTime?: Date,
  disabled?: boolean,
  /** The placeholder value for the time picker before a time has been selected */
  placeholder?: string,
  /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
  mode: Mode,
  /** Override the label of the ok button. */
  okLabel?: string,
  /** Callback that is called with the new date (as Date instance) when the value is changed. */
  onChange: (value?: Date) => void,
  /** The value of the time picker, for use in controlled mode. */
  value?: Date
} & WithStyles<typeof styles>;

type State = {
  open: boolean,
  value?: Date,
  hasChanged: boolean,
  newValue?: Date
};

class TimeInput extends React.Component<Props, State> {
  public static defaultProps = {
    autoOk: false,
    cancelLabel: 'Cancel',
    mode: Mode["12h"],
    okLabel: 'Ok'
  };
  public static contextTypes = {
    muiFormControl: Object
  };
  constructor(props: Props) {
    super(props)
    const defaultValue = new Date()
    defaultValue.setSeconds(0)
    defaultValue.setMilliseconds(0)

    this.state = {
      open: false,
      value: props.value || props.defaultValue || props.initialTime || defaultValue,
      hasChanged: false
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  showDialog = () => this.setState({ open: true, newValue: this.state.value })

  handleChange = (newValue: Date) => {
    this.setState({ newValue, hasChanged: true })
  }

  handleOk = () => {
    if (this.props.onChange != null) {
      this.props.onChange(this.state.newValue)
    }
    this.setState({ open: false, value: this.state.newValue, newValue: undefined })
  }

  handleCancel = () => this.setState({ open: false, newValue: undefined })

  getFormattedValue = () => {
    const { mode, placeholder } = this.props;
    const { value, hasChanged } = this.state;
    if (!value) return undefined;

    const is12h = mode === '12h'

    if (placeholder && !hasChanged) return placeholder

    // Allow a null/undefined value for controlled inputs
    if (this.props.hasOwnProperty('value') && this.props.value == null) {
      return ''
    }

    const { hours, isPm } = formatHours(value.getHours(), mode)
    const minutes = twoDigits(value.getMinutes())
    const displayHours = is12h ? hours : twoDigits(value.getHours())
    const ending = is12h ? (isPm ? ' pm' : ' am') : ''
    return `${displayHours}:${minutes}${ending}`
  }

  render() {
    const {
      autoOk,
      cancelLabel,
      classes,
      defaultValue, // eslint-disable-line
      disabled: disabledProp,
      initialTime, //eslint-disable-line
      placeholder, // eslint-disable-line
      mode,
      okLabel,
      onChange, // eslint-disable-line
      value: valueProp, // eslint-disable-line
      ...other
    } = this.props

    const { newValue } = this.state

    const { muiFormControl } = this.context;
    const disabled = disabledProp || (muiFormControl != null && muiFormControl.disabled)

    return [
      <Input
        {...other}
        disabled={disabled}
        onClick={!disabled ? this.showDialog : undefined}
        value={this.getFormattedValue()}
        readOnly
        key='TimeInput-input'
      />,
      <Dialog
        maxWidth='xs'
        open={this.state.open}
        key='TimeInput-dialog'
        onClose={this.handleCancel}
      >
        <TimePicker
          mode={mode}
          value={newValue}
          onChange={this.handleChange}
          onMinutesSelected={autoOk ? this.handleOk : undefined}
          classes={{ header: classes.header, body: classes.body }}
        />
        <DialogActions>
          <Button onClick={this.handleCancel} color='primary'>{cancelLabel}</Button>
          <Button onClick={this.handleOk} color='primary'>{okLabel}</Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

export default withStyles(styles)(TimeInput);
