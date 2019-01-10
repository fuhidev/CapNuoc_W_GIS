import * as React from 'react';
import BaseComponent from '../../BaseComponent';
import {
	Stepper as MStepper, Step, StepLabel, StepContent,
} from '@material-ui/core';

export interface Item {
	label: string,
	content: React.ReactElement<any>
};

type Props = {
	index: number,
	steps: Item[]
};

export default class Stepper extends BaseComponent<Props, {}> {
	render() {
		const { index, steps } = this.props;
		return <MStepper activeStep={index} orientation="vertical">
			{
				steps.map((m, index) =>
					<Step key={index}>
						<StepLabel>{m.label}</StepLabel>
						<StepContent>
							{m.content}
						</StepContent>
					</Step>)
			}
		</MStepper>;
	}
}