import { CSSProperties } from 'react';
import Inner from '@/components/common/Inner';
import Section from '@/components/common/Section';
import SectionHeader from '@/components/common/SectionHeader';
import DivisionLine from '@/components/common/DivisionLine';
import { getSectionPage } from '@/api/getSection';
import { retrieveBlockChildren } from '@/api/notionApi';
import { COLOR, FONT_SIZE, FONT_WEIGHT, SECTION } from '@/constants';

import { isMobile } from 'react-device-detect';
import {
	ParagraphBlockObjectResponse,
	ListBlockChildrenResponse,
	PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

const contactsContainerStyle: CSSProperties = {
	display: isMobile ? 'flex' : 'grid',
	gridTemplateColumns: '1fr 1fr',
	flexDirection: isMobile ? 'column' : 'row',
};
const contactListItemKeyStyle: CSSProperties = {
	marginBottom: '2rem',
	fontSize: FONT_SIZE.M,
	fontWeight: FONT_WEIGHT.SEMI_BOLD,
};
const contactBoxStyle: CSSProperties = {
	border: `0.2rem solid ${COLOR.BLACK}`,
	padding: '1.5rem',
	marginBottom: '2rem',
	fontSize: FONT_SIZE.M,
	fontWeight: FONT_WEIGHT.BOLD,
	backgroundColor: COLOR.WHITE,
	minWidth: '35rem',
	width: isMobile ? 'auto' : '35rem',
};

interface Props {
	title: string;
	backgroundColor: string;
}

export default async function SectionContact({ title, backgroundColor }: Props) {
	const contactsResult = (await getSectionPage(SECTION.CONTACT)) as ListBlockChildrenResponse;
	const contactsBlockIdArr = contactsResult?.results.map((result: PartialBlockObjectResponse) => result.id);
	const contactsBlockArr = await Promise.all(
		contactsBlockIdArr?.map(async (id: string) => await retrieveBlockChildren(id))
	);
	const emailBlock = contactsBlockArr[0].results as ParagraphBlockObjectResponse[];
	const numberBlock = contactsBlockArr[1].results as ParagraphBlockObjectResponse[];

	return (
		<Section backgroundColor={backgroundColor} id={SECTION.CONTACT}>
			<Inner>
				<SectionHeader>{title}</SectionHeader>
				<DivisionLine direction="row" />
				<ul style={contactsContainerStyle}>
					<li>
						<p style={contactListItemKeyStyle}>이메일</p>
						<ul>
							{emailBlock.map((item) => (
								<li style={contactBoxStyle} key={item.paragraph.rich_text[0].plain_text}>
									{item.paragraph.rich_text[0].plain_text}
								</li>
							))}
						</ul>
					</li>
					<li>
						<p style={contactListItemKeyStyle}>전화번호</p>
						<ul>
							{numberBlock.map((item) => (
								<li style={contactBoxStyle} key={item.paragraph.rich_text[0].plain_text}>
									{item.paragraph.rich_text[0].plain_text}
								</li>
							))}
						</ul>
					</li>
				</ul>
			</Inner>
		</Section>
	);
}
