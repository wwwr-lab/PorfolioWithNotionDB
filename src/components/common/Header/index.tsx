'use client';
import { useState } from 'react';
import Inner from '@/components/common/Inner';
import Nav from '@/components/common/Nav';
import IconButton from '@/components/common/IconButton';
import { MenuIcon } from '@/assets/icons';
import { TITLE, SIZE, FONT_SIZE, FONT_WEIGHT } from '@/constants';
import { useMobileView } from '@/utils/useMobileView';

import styled from '@emotion/styled';

const HeaderContainer = styled.header<{ isMobile: boolean }>`
	position: fixed;
	top: 0;
	height: ${(props) => (props.isMobile ? 'auto' : SIZE.HEADER)};
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
const HeaderTitle = styled.h1<{ isMobile: boolean }>`
	display: block;
	text-align: ${(props) => (props.isMobile ? 'start' : 'center')};
	font-size: ${(props) => (props.isMobile ? FONT_SIZE.XL : FONT_SIZE.XXXL)};
	font-weight: ${FONT_WEIGHT.BOLD};

	&:hover {
		cursor: pointer;
	}
`;

interface Props {
	backgroundColor: string;
}
export default function Header({ backgroundColor }: Props) {
	const [isClicked, setIsClicked] = useState(false);
	const scrollToTopHandler = () => {
		window.scrollTo(0, 0);
	};
	const isMobile = useMobileView();
	return (
		<HeaderContainer style={{ backgroundColor: `${backgroundColor}` }} isMobile={isMobile}>
			<HeaderTitleContainer backgroundColor={backgroundColor}>
				<HeaderTitle onClick={scrollToTopHandler} isMobile={isMobile}>
					<Inner>{TITLE}</Inner>
				</HeaderTitle>
				{isMobile && <IconButton onClick={() => setIsClicked(!isClicked)}>{MenuIcon}</IconButton>}
			</HeaderTitleContainer>
			<Nav backgroundColor={backgroundColor} isShown={isMobile ? isClicked : true} setIsClicked={setIsClicked} />
		</HeaderContainer>
	);
}
