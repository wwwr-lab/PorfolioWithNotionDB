'use client';

import { useEffect, useState } from 'react';
import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import Carousel from '@/components/common/Carousel';
import { useInnerWidth } from '@/utils/useInnerWidth';

import styled from '@emotion/styled';
import { isDesktop, isMobile } from 'react-device-detect';
import { ProjectDetailData } from '@/types';
import { COLOR, FONT_SIZE, PROJECTS_DESCRIPTION, SECTION } from '@/constants';

const ProjectsContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const ProjectsSectionDescription = styled.p`
	padding: 0.5rem 1.25rem 0;
	font-size: ${FONT_SIZE.S};
	border-bottom: 0.1rem solid ${COLOR.BLACK};
`;

interface Props {
	title: string;
	backgroundColor: string;
	dataArr: ProjectDetailData[];
}

export default function SectionProjects({ title, backgroundColor, dataArr }: Props) {
	// const innerWidth = useInnerWidth();
	return (
		<Section backgroundColor={backgroundColor} id={SECTION.PROJECTS}>
			<Inner>
				<ProjectsContainer>
					<SectionHeader>{title}</SectionHeader>
					<ProjectsSectionDescription>{PROJECTS_DESCRIPTION}</ProjectsSectionDescription>
					<Carousel slidesPerView={isMobile ? 1 : 3} type="project" dataArr={dataArr} />
				</ProjectsContainer>
			</Inner>
		</Section>
	);
}
