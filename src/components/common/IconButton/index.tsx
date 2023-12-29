import Image from 'next/image';
import { SIZE } from '@/constants';
import { MouseEventHandler } from 'react';
interface Props {
	children: any;
	size?: number;
	onClick: MouseEventHandler;
}
export default function IconButton({ children, size = SIZE.HEADER_BTN, onClick }: Props) {
	return (
		<button style={{ position: 'relative' }} onClick={onClick}>
			<Image src={children} alt="button" height={size} style={{ objectFit: 'contain' }} />
		</button>
	);
}
