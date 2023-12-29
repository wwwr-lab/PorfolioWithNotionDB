import Image from 'next/image';
import { CSSProperties } from 'react';
import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import DivisionLine from '@/components/common/DivisionLine';

import { FONT_SIZE, SIZE, SECTION } from '@/constants';
import { getSectionToggleBlocks, getChildrenBlockArr } from '@/api/getSectionToggleBlock';

import {
	ListBlockChildrenResponse,
	ParagraphBlockObjectResponse,

} from '@notionhq/client/build/src/api-endpoints';

const skillsContainerStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
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
	const skillsSectionToggleBlockArr = await getSectionToggleBlocks(title);

	const skillsDataArr = await Promise.all(
		skillsSectionToggleBlockArr.map(async (toggleBlock) => {
			const blockArr = await getChildrenBlockArr(toggleBlock);
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
						<DivisionLine direction="row" />
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
