import { CSSProperties } from 'react';
import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import Carousel from '@/components/common/Carousel';
import Profile from '../common/Profile';
import DivisionLine from '@/components/common/DivisionLine';
import { SECTION } from '@/constants';
import { getSectionPage } from '@/api/getSection';
import { retrieveBlockChildren } from '@/api/notionApi';
import { isDesktop, isMobile } from 'react-device-detect';
import {
	ListBlockChildrenResponse,
	PartialBlockObjectResponse,
	ImageBlockObjectResponse,
	ParagraphBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
interface Props {
	backgroundColor: string;
}

const aboutContainerStyle: CSSProperties = {
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: `${isMobile ? 'column-reverse' : 'row'}`,
};
export default async function SectionAbout({ backgroundColor }: Props) {
	const aboutResult = (await getSectionPage(SECTION.ABOUT)) as ListBlockChildrenResponse;
	const aboutBlockIdArr = aboutResult?.results.map((result: PartialBlockObjectResponse) => result.id);
	const aboutBlockArr = (await Promise.all(
		aboutBlockIdArr?.map(async (id) => await retrieveBlockChildren(id))
	)) as ListBlockChildrenResponse[];

	const imagesArr = (aboutBlockArr[0].results as ImageBlockObjectResponse[]).map((data: any) => data.image.file.url);

	return (
		<Section backgroundColor={backgroundColor} id={SECTION.ABOUT}>
			<Inner>
				<div style={aboutContainerStyle}>
					<Profile dataArr={aboutBlockArr[1].results as ParagraphBlockObjectResponse[]} />
					<DivisionLine direction={isMobile ? 'row' : 'column'} />
					<Carousel dataArr={imagesArr} type="image" slidesPerView={1} />
				</div>
			</Inner>
		</Section>
	);
}
