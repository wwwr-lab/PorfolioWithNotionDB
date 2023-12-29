import Image from 'next/image';
import Section from '@/components/common/Section';
import { SIZE } from '@/constants';

interface Props {
	backgroundColor: string;
}

export default function SectionCover({ backgroundColor }: Props) {
	return (
		<Section backgroundColor={backgroundColor} marginTop={SIZE.HEADER} height="40rem" borderColor="transparent">
			<Image src="/ocean.png" alt="" fill style={{ objectFit: 'cover' }} priority />
		</Section>
	);
}
