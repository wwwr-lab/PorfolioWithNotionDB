'use client';
import Image from 'next/image';
import Section from '@/components/common/Section';
import { useMobileView } from '@/utils/useMobileView';
import { SIZE } from '@/constants';

interface Props {
	backgroundColor: string;
}

export default function SectionCover({ backgroundColor }: Props) {
	const isMobile = useMobileView();
	return (
		<>
			{!isMobile && (
				<Section backgroundColor={backgroundColor} marginTop={SIZE.HEADER} height="40rem" borderColor="transparent">
					{!isMobile && <Image src="/ocean.png" alt="" fill style={{ objectFit: 'cover' }} priority />}
				</Section>
			)}
		</>
	);
}
