import { CSSProperties } from 'react';
import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import ArchiveBox from '@/components/common/ArchiveBox';
import DivisionLine from '@/components/common/DivisionLine';
import { SECTION } from '@/constants';
import { getSectionPage } from '@/api/getSection';
import { retrieveBlockChildren } from '@/api/notionApi';

import { isMobile } from 'react-device-detect';
import {
	ImageBlockObjectResponse,
	ListBlockChildrenResponse,
	ParagraphBlockObjectResponse,
	PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

interface Props {
	title: string;
	backgroundColor: string;
}

const archivesContainerStyle: CSSProperties = {
	display: 'flex',
	justifyContent: isMobile ? 'flex-start' : 'space-around',
	flexDirection: isMobile ? 'column' : 'row',
};

export default async function SectionArchive({ title, backgroundColor }: Props) {
	const archiveResult = (await getSectionPage(SECTION.ARCHIVE)) as ListBlockChildrenResponse;
	const archiveBlockIdArr = archiveResult?.results.map((result: PartialBlockObjectResponse) => result.id);
	const archiveBlockArr = (await Promise.all(
		archiveBlockIdArr?.map(async (id: string) => await retrieveBlockChildren(id))
	)) as ListBlockChildrenResponse[];
	const archiveDataArr = await Promise.all(
		archiveBlockArr.map(async (archiveBlock: ListBlockChildrenResponse) => {
			const idArr = archiveBlock.results.map((result: PartialBlockObjectResponse) => result.id) as string[];
			const blockArr = await Promise.all(idArr.map(async (id: string) => await retrieveBlockChildren(id)));
			const blockContentArr = blockArr.map((item) => item.results);
			const name = (blockContentArr[0][0] as ParagraphBlockObjectResponse).paragraph.rich_text[0].plain_text as string;
			const logos = (blockContentArr[1] as ImageBlockObjectResponse[]).map(
				(item: ImageBlockObjectResponse) => item.image.file.url
			) as string[];
			const images = (blockContentArr[2] as ImageBlockObjectResponse[]).map(
				(item: ImageBlockObjectResponse) => item.image.file.url
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
				<div style={archivesContainerStyle}>
					<SectionHeader>{title}</SectionHeader>
					<DivisionLine direction={isMobile ? 'row' : 'column'} />
					{archiveDataArr.map((archiveData: any) => (
						<ArchiveBox data={archiveData} key={archiveData.request_id} />
					))}
				</div>
			</Inner>
		</Section>
	);
}
