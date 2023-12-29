'use client';
import Link from 'next/link';
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

interface Props extends PropsWithChildren {
	type: 'email' | 'phone';
}

export default function ContactBox({ children, type, ...props }: Props) {
	const isMobile = useMobileView();
	const defineLinkAddress = (children: any) => {
		switch (type) {
			case 'email':
				return `mailto:${children}`;
			case 'phone':
				return `tel:${children}`;
		}
	};
	return (
		<ListItem isMobile={isMobile} {...props}>
			<Link href={defineLinkAddress(children)}>
				<p>{children}</p>
			</Link>
		</ListItem>
	);
}
