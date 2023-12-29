import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import Carousel from '@/components/common/Carousel';
import Profile from '@/components/common/Profile';
import Wrapper from '@/components/common/Wrapper';
import DivisionLine from '@/components/common/DivisionLine';
import { SECTION } from '@/constants';

import { getSectionToggleBlocks } from '@/api/getSectionToggleBlock';

import {
	ImageBlockObjectResponse,
	ParagraphBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';


interface Props {
	title: string;
	backgroundColor: string;
}

export default async function SectionAbout({ title, backgroundColor }: Props) {
	const aboutSectionToggleBlockArr = await getSectionToggleBlocks(title);
	const imagesArr = (aboutSectionToggleBlockArr[0].results as ImageBlockObjectResponse[]).map(
		(data: any) => data.image.file.url
	);

	return (
		<Section backgroundColor={backgroundColor} id={SECTION.ABOUT}>
			<Inner>
				<Wrapper before="row" after="column-reverse">
					<Profile dataArr={aboutSectionToggleBlockArr[1].results as ParagraphBlockObjectResponse[]} />
					<DivisionLine responsive />
					<Carousel dataArr={imagesArr} type="image" slidesPerView={1} />
				</Wrapper>
			</Inner>
		</Section>
	);
}
