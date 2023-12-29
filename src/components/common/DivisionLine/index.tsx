import { CSSProperties } from 'react';
import { COLOR } from '@/constants';

const rowLine: CSSProperties = {
	height: '0.1rem',
	width: '100%',
	backgroundColor: `${COLOR.BLACK}`,
	margin: '2rem 0',
};
const columnLine: CSSProperties = {
	width: '0.1rem',
	height: '100%',
	backgroundColor: `${COLOR.BLACK}`,
	margin: '0 2rem',
};

interface Props {
	direction: 'row' | 'column';
}

export default function DivisionLine({ direction }: Props) {
	switch (direction) {
		case 'row':
			return (
				<div style={rowLine}>
					<p style={{ display: 'none' }}>line</p>
				</div>
			);
		case 'column':
			return (
				<div style={columnLine}>
					<p style={{ display: 'none' }}>line</p>
				</div>
			);
	}
}
