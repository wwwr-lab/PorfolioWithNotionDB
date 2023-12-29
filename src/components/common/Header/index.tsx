'use client';
import { useState } from 'react';
import Inner from '@/components/common/Inner';
import Nav from '@/components/common/Nav';
import IconButton from '@/components/common/IconButton';
import { MenuIcon } from '@/assets/icons';
import { TITLE, SIZE, FONT_SIZE, FONT_WEIGHT, COLOR } from '@/constants';

import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

interface Props {
	backgroundColor: string;
}
const HeaderContainer = styled.header`
	position: fixed;
	top: 0;
	height: ${SIZE.HEADER};
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 999;
`;
const HeaderTitleContainer = styled.div<{ backgroundColor: string }>`
	background-color: ${(props) => props.backgroundColor};
	width: 100vw;
	display: flex;
	justify-content: space-between;
`;
const HeaderTitle = styled.h1`
	display: block;
	text-align: ${isMobile ? 'start' : 'center'};
	font-size: ${isMobile ? FONT_SIZE.XL : FONT_SIZE.XXXL};
	font-weight: ${FONT_WEIGHT.BOLD};

	&:hover {
		cursor: pointer;
	}
`;

export default function Header({ backgroundColor }: Props) {
	const [isClicked, setIsClicked] = useState(false);
	const scrollTopHandler = () => {
		window.scrollTo(0, 0);
	};
	return (
		<HeaderContainer style={{ backgroundColor: `${backgroundColor}` }}>
			<HeaderTitleContainer backgroundColor={backgroundColor}>
				<HeaderTitle onClick={scrollTopHandler}>
					<Inner>{TITLE}</Inner>
				</HeaderTitle>
				{isMobile && <IconButton onClick={() => setIsClicked(!isClicked)}>{MenuIcon}</IconButton>}
			</HeaderTitleContainer>
			<Nav backgroundColor={backgroundColor} isShown={isMobile ? isClicked : true} setIsClicked={setIsClicked} />
		</HeaderContainer>
	);
}
