import { COLOR } from '@/constants';
import { PropsWithChildren, CSSProperties } from 'react';

interface Props extends PropsWithChildren {
	backgroundColor?: string;
	marginTop?: string;
	height?: string;
	borderColor?: string;
	id?: string
}
export default function Section({
	children,
	backgroundColor = 'transparent',
	marginTop = '0',
	height = '100%',
	borderColor = `${COLOR.BLACK}`,
	id,
}: Props) {
	const sectionStyle: CSSProperties = {
		marginTop: marginTop,
		padding: '8rem 0',
		width: '100vw',
		height: `${height}`,
		backgroundColor: `${backgroundColor}`,
		position: 'relative',
		borderBottom: '0.1rem solid',
		borderColor: borderColor,
	};
	return (
		<section style={sectionStyle} id={id}>
			{children}
		</section>
	);
}
