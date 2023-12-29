import { PropsWithChildren } from 'react';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants';

interface Props extends PropsWithChildren {}

export default function SectionHeader({ children }: Props) {
	return (
		<h2 style={{ fontSize: FONT_SIZE.L, fontWeight: FONT_WEIGHT.BOLD, paddingBottom: '1rem', minWidth: '21rem' }}>
			{children}
		</h2>
	);
}
