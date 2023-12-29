'use client';
import { PropsWithChildren } from 'react';
import { useMobileView } from '@/utils/useMobileView';

import styled from '@emotion/styled';

const ItemsWrapper = styled.div<{ isMobile: boolean; before: string; after: string }>`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? props.after : props.before)};
	height: 100%;
`;

interface Props extends PropsWithChildren {
	before: string;
	after: string;
}

export default function Wrapper({ children, before, after, ...props }: Props) {
	const isMobile = useMobileView();
	return (
		<ItemsWrapper {...props} isMobile={isMobile} before={before} after={after}>
			{children}
		</ItemsWrapper>
	);
}
