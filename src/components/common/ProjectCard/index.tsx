'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectDetailData } from '@/types';
import { COLOR, FONT_SIZE, FONT_WEIGHT } from '@/constants';

import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

const ProjectCardItem = styled.div`
	border: 0.1rem solid ${COLOR.BLACK};
	height: 50rem;
	width: ${isMobile ? '85vw' : '40rem'};
	background-color: ${COLOR.WHITE};
	display: grid;
	grid-template-rows: 1fr 5fr 3fr;
	flex-shrink: 0;
`;
const ProjectTitle = styled.h4`
	font-size: ${FONT_SIZE.L};
	font-weight: ${FONT_WEIGHT.SEMI_BOLD};
	display: flex;
	align-items: center;
	padding: 1rem 2rem;
`;
const ProjectImageContainer = styled.div`
	border-top: 0.1rem solid ${COLOR.BLACK};
	border-bottom: 0.1rem solid ${COLOR.BLACK};
	width: 100%;
	height: 30rem;
	position: relative;
`;
const DescriptionContainer = styled.div`
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;
const DescriptionParagraph = styled.p`
	font-size: ${FONT_SIZE.S};
`;
interface Props {
	data: ProjectDetailData;
}

export default function ProjectCard({ data }: Props) {
	return (
		<Link href={data.link}>
			<ProjectCardItem>
				<ProjectTitle>{data.title}</ProjectTitle>
				<ProjectImageContainer>
					<Image src={data.image} alt={`Project ${data.title} Card`} fill style={{ objectFit: 'cover' }} />
				</ProjectImageContainer>
				<DescriptionContainer>
					<DescriptionParagraph>{data.term}</DescriptionParagraph>
					<DescriptionParagraph>{data.people}</DescriptionParagraph>
					<DescriptionParagraph>{data.summary}</DescriptionParagraph>
				</DescriptionContainer>
			</ProjectCardItem>
		</Link>
	);
}
