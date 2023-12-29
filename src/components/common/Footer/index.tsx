
import { PropsWithChildren } from 'react';
import { COLOR } from '@/constants';
interface Props extends PropsWithChildren {
	backgroundColor: string;
}

export default function Footer({ children, backgroundColor }: Props) {
	return <footer style={{ backgroundColor: backgroundColor, color: COLOR.WHITE }}>{children}</footer>;
}
