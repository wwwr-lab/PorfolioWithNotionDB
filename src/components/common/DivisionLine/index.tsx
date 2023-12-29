'use client';
import { useMobileView } from '@/utils/useMobileView';
import { COLOR } from '@/constants';

import styled from '@emotion/styled';

const RowLine = styled.div`
	height: 0.1rem;
	width: 100%;
	background-color: ${COLOR.BLACK};
	margin: 2rem 0;
`;

const ColumnLine = styled.div`
	width: 0.1rem;
	height: 100%;
	background-color: ${COLOR.BLACK};
	margin: 0 2rem;
`;
interface Props {
	direction?: 'row' | 'column';
	responsive?: boolean;
}

export default function DivisionLine({ direction, responsive }: Props) {
	const isMobile = useMobileView();
	if (responsive) {
		isMobile ? (direction = 'row') : (direction = 'column');
	}
	switch (direction) {
		case 'row':
			return (
				<RowLine>
					<p>
						<span style={{ display: 'none' }}>line</span>
					</p>
				</RowLine>
			);
		case 'column':
			return (
				<ColumnLine>
					<p>
						<span style={{ display: 'none' }}>line</span>
					</p>
				</ColumnLine>
			);
	}
}
