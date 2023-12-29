import Image from 'next/image';
import { CSSProperties } from 'react';
import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import DivisionLine from '@/components/common/DivisionLine';
import { getSectionPage } from '@/api/getSection';
import { retrieveBlockChildren } from '@/api/notionApi';
import { FONT_SIZE, SIZE, SECTION } from '@/constants';

import { isMobile } from 'react-device-detect';
import {
	ListBlockChildrenResponse,
	ParagraphBlockObjectResponse,
	PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

const skillsContainerStyle: CSSProperties = {
	display: 'flex',
	flexDirection: isMobile ? 'column' : 'row',
};
const listStyle: CSSProperties = {
	width: '100%',
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-evenly',
};
const listItemStyle: CSSProperties = {
	marginTop: '1rem',
	height: '10rem',
	width: '11rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	position: 'relative',
};
const skillItemNameStyle: CSSProperties = {
	fontSize: FONT_SIZE.S,
};

interface Props {
	title: string;
	backgroundColor: string;
}

export default async function SectionSkills({ title, backgroundColor }: Props) {
	const skillsResult = (await getSectionPage(SECTION.SKILLS)) as ListBlockChildrenResponse;
	const skillsBlockIdArr = skillsResult?.results.map((result: PartialBlockObjectResponse) => result.id);
	const skillsBlockArr = (await Promise.all(
		skillsBlockIdArr?.map(async (id: string) => await retrieveBlockChildren(id))
	)) as ListBlockChildrenResponse[];
	const skillsDataArr = await Promise.all(
		skillsBlockArr?.map(async (block: ListBlockChildrenResponse) => {
			const idArr = block.results.map((result: PartialBlockObjectResponse) => result.id) as string[];
			const blockArr = (await Promise.all(
				idArr.map(async (id: string) => await retrieveBlockChildren(id))
			)) as ListBlockChildrenResponse[];
			const blockContentArr = blockArr?.map((item: ListBlockChildrenResponse) => item.results);
			const name = (blockContentArr[0][0] as ParagraphBlockObjectResponse).paragraph.rich_text[0].plain_text as string;
			const image = (blockContentArr[1][0] as any).image.file.url as string;
			return { name, image };
		})
	);
	return (
		<Section backgroundColor={backgroundColor} id={SECTION.SKILLS}>
			{
				<Inner>
					<div style={skillsContainerStyle}>
						<SectionHeader>{title}</SectionHeader>
						<DivisionLine direction="column" />
						<ul style={listStyle}>
							{skillsDataArr?.map((skillData: { name: string; image: string }) => (
								<li key={skillData.name} style={listItemStyle}>
									<Image
										src={skillData.image}
										height={SIZE.SKILL_IMG}
										width={SIZE.SKILL_IMG}
										style={{ objectFit: 'contain' }}
										alt={`${skillData.name} Logo`}
									/>
									<span style={skillItemNameStyle}>{skillData.name}</span>
								</li>
							))}
						</ul>
					</div>
				</Inner>
			}
		</Section>
	);
}
