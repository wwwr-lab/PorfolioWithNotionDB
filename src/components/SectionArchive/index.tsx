import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import ArchiveBox from '@/components/common/ArchiveBox';
import Wrapper from '@/components/common/Wrapper';
import DivisionLine from '@/components/common/DivisionLine';

import { SECTION } from '@/constants';
import { ArchiveData } from '@/types';
import { getSectionToggleBlocks, getChildrenBlockArr } from '@/api/getSectionToggleBlock';

import {
	ImageBlockObjectResponse,
	ListBlockChildrenResponse,
	ParagraphBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

interface Props {
	title: string;
	backgroundColor: string;
}

export default async function SectionArchive({ title, backgroundColor }: Props) {
	const archiveSectionToggleBlockArr = await getSectionToggleBlocks(title);

	const archiveDataArr = await Promise.all(
		archiveSectionToggleBlockArr.map(async (archiveToggleBlock: ListBlockChildrenResponse) => {
			const blockArr = await getChildrenBlockArr(archiveToggleBlock);
			const blockContentArr = blockArr.map((item) => item.results);

			const name = (blockContentArr[0][0] as ParagraphBlockObjectResponse).paragraph.rich_text[0].plain_text as string;
			const logos = (blockContentArr[1] as ImageBlockObjectResponse[]).map(
				(item: any) => item.image.file.url
			) as string[];
			const images = (blockContentArr[2] as ImageBlockObjectResponse[]).map(
				(item: any) => item.image.file.url
			) as string[];
			const link = (blockContentArr[3][0] as ParagraphBlockObjectResponse).paragraph.rich_text[0].plain_text as string;
			const description = (blockContentArr[4][0] as ParagraphBlockObjectResponse).paragraph.rich_text[0]
				.plain_text as string;
			return {
				name,
				logos,
				images,
				link,
				description,
			};
		})
	);
	return (
		<Section backgroundColor={backgroundColor} id={SECTION.ARCHIVE}>
			<Inner>
				<Wrapper before="row" after="column">
					<SectionHeader>{title}</SectionHeader>
					<DivisionLine responsive />
					<Wrapper before="row" after="column" >
						{archiveDataArr.map((archiveData: ArchiveData) => (
							<ArchiveBox data={archiveData} key={archiveData.name} />
						))}
					</Wrapper>
				</Wrapper>
			</Inner>
		</Section>
	);
}
