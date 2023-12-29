'use client';
import Link from 'next/link';
import { SECTION, FONT_SIZE, FONT_WEIGHT, COLOR } from '@/constants';

import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { Dispatch, SetStateAction } from 'react';

const NavContainer = styled.nav<{ backgroundColor: string; isShown: boolean }>`
	background-color: ${(props) => props.backgroundColor};
	display: ${(props) => (props.isShown ? 'block' : 'none')};
`;
const NavList = styled.ul`
	width: 100vw;
	height: ${isMobile ? 'auto' : '5rem'};
	display: flex;
	flex-direction: ${isMobile ? 'column' : 'row'};
	justify-content: ${isMobile ? 'flex-start' : 'space-evenly'};
`;

const NavListItem = styled.li`
	padding: 0.5rem 1.25rem;
	font-size: ${FONT_SIZE.L};
	font-weight: ${FONT_WEIGHT.BOLD};
	text-align: center;
`;
interface Props {
	backgroundColor: string;
	isShown: boolean;

	setIsClicked: Dispatch<SetStateAction<boolean>>;
}

export default function Nav({ backgroundColor, isShown,  setIsClicked }: Props) {
	const navList = [SECTION.ABOUT, SECTION.ARCHIVE, SECTION.SKILLS, SECTION.PROJECTS, SECTION.CONTACT];

	return (
		<>
			<NavContainer backgroundColor={backgroundColor} isShown={isShown}>
				<NavList>
					{navList.map((navItem) => (
						<Link href={`#${navItem}`} key={navItem}>
							<NavListItem onClick={() => setIsClicked(false)}>{navItem}</NavListItem>
						</Link>
					))}
				</NavList>
			</NavContainer>
		</>
	);
}
