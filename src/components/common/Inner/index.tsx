import { PropsWithChildren } from 'react';
import { SIZE } from '@/constants';
interface Props extends PropsWithChildren {}
export default function Inner({ children, ...props }: Props) {
	return (
		<div style={{ padding: `0 ${SIZE.INNER}`, width: '100%', position: 'relative', height: '100%' }} {...props}>
			{children}
		</div>
	);
}
