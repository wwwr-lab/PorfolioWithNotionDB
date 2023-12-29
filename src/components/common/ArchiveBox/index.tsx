'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMobileView } from '@/utils/useMobileView';
import { ArchiveData } from '@/types';
import { COLOR, FONT_WEIGHT, FONT_SIZE } from '@/constants';

import styled from '@emotion/styled';

interface Props {
	data: ArchiveData;
}

const Box = styled.div<{ isMobile: boolean }>`
	border: 0.1rem solid ${COLOR.BLACK};
	margin: 0 1rem 1rem 0;
	background-color: ${COLOR.WHITE};
	padding: 1.5rem;
	width: ${(props) => (props.isMobile ? '85vw' : '40rem')};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;
const LogoImageContainer = styled.div`
	position: relative;
	height: 5rem;
`;

const Anchor = styled(Link)`
	border-bottom: 0.1rem solid ${COLOR.BLACK};
	margin-bottom: 1rem;
	display: block;
	font-size: ${FONT_SIZE.M};
	font-weight: ${FONT_WEIGHT.BOLD};
`;
const ArchiveImageContainer = styled.div`
	min-height: 30rem;
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
const ArchiveDescription = styled.p`
	font-size: ${FONT_SIZE.S};
	padding: 1rem;
`;
export default function ArchiveBox({ data, ...props }: Props) {
	const { name, logos, images, link, description } = data;
	const isMobile = useMobileView();
	return (
		<Box {...props} isMobile={isMobile}>
			<LogoImageContainer>
				{logos?.map((logo: string) => (
					<Image src={logo} alt={`${name} Logo`} fill key={logo} style={{ objectFit: 'contain', width: '100%' }} />
				))}
			</LogoImageContainer>
			<Anchor href={link}>{link}</Anchor>
			{images?.map((image: string) => (
				<ArchiveImageContainer key={image}>
					<Image src={image} alt={`${name} Image`} fill style={{ objectFit: 'cover' }} />
				</ArchiveImageContainer>
			))}
			<ArchiveDescription>{description}</ArchiveDescription>
		</Box>
	);
}
