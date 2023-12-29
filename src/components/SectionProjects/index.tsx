'use client';


import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import Carousel from '@/components/common/Carousel';


import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { ProjectDetailData } from '@/types';
import {  FONT_SIZE, PROJECTS_DESCRIPTION, SECTION } from '@/constants';
import DivisionLine from '../common/DivisionLine';

const ProjectsContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const ProjectsSectionDescription = styled.p`
	padding: 0.5rem 1.25rem 0 0;
	font-size: ${FONT_SIZE.S};
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
					<DivisionLine direction="row" />
					<Carousel slidesPerView={isMobile ? 1 : 3} type="project" dataArr={dataArr} />
				</ProjectsContainer>
			</Inner>
		</Section>
	);
}
