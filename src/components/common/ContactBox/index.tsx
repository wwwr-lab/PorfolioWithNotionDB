'use client';
import { PropsWithChildren } from 'react';
import { COLOR, FONT_SIZE, FONT_WEIGHT } from '@/constants';
import { useMobileView } from '@/utils/useMobileView';

import styled from '@emotion/styled';

const ListItem = styled.li<{ isMobile: boolean }>`
	border: 0.2rem solid ${COLOR.BLACK};
	padding: 1.5rem;
	margin: 0 3rem 2rem 0;
	font-size: ${FONT_SIZE.M};
	font-weight: ${FONT_WEIGHT.BOLD};
	background-color: ${COLOR.WHITE};
	width: ${(props) => (props.isMobile ? '80vw' : '35rem')};
`;

interface Props extends PropsWithChildren {}

export default function ContactBox({ children, ...props }: Props) {
	const isMobile = useMobileView();
	return (
		<ListItem isMobile={isMobile} {...props}>
			{children}
		</ListItem>
	);
}
