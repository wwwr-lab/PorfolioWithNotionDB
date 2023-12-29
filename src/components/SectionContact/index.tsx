import { CSSProperties } from 'react';
import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import ContactBox from '@/components/common/ContactBox';
import Wrapper from '@/components/common/Wrapper';
import DivisionLine from '@/components/common/DivisionLine';

import { getSectionToggleBlocks } from '@/api/getSectionToggleBlock';
import { FONT_SIZE, FONT_WEIGHT, SECTION } from '@/constants';

import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const contactListItemKeyStyle: CSSProperties = {
	marginBottom: '2rem',
	fontSize: FONT_SIZE.M,
	fontWeight: FONT_WEIGHT.SEMI_BOLD,
};

interface Props {
	title: string;
	backgroundColor: string;
}

export default async function SectionContact({ title, backgroundColor }: Props) {
	const contactsBlockArr = await getSectionToggleBlocks(title);
	const emailBlock = contactsBlockArr[0].results as ParagraphBlockObjectResponse[];
	const numberBlock = contactsBlockArr[1].results as ParagraphBlockObjectResponse[];

	return (
		<Section backgroundColor={backgroundColor} id={SECTION.CONTACT}>
			<Inner>
				<SectionHeader>{title}</SectionHeader>
				<DivisionLine direction="row" />
				<ul>
					<Wrapper before="row" after="column">
						<li>
							<p style={contactListItemKeyStyle}>이메일</p>
							<ul>
								{emailBlock.map((item) => (
									<ContactBox key={item.paragraph.rich_text[0].plain_text}>
										{item.paragraph.rich_text[0].plain_text}
									</ContactBox>
								))}
							</ul>
						</li>
						<li>
							<p style={contactListItemKeyStyle}>전화번호</p>
							<ul>
								{numberBlock.map((item) => (
									<ContactBox key={item.paragraph.rich_text[0].plain_text}>
										{item.paragraph.rich_text[0].plain_text}
									</ContactBox>
								))}
							</ul>
						</li>
					</Wrapper>
				</ul>
			</Inner>
		</Section>
	);
}
