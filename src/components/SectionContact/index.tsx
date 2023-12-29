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
	display: 'flex',
	flexDirection: isMobile ? 'column' : 'row',
};
const contactBoxStyle: CSSProperties = {
	border: `0.2rem solid ${COLOR.BLACK}`,
	padding: '1.5rem',
	marginBottom: '2rem',
	fontSize: `${FONT_SIZE.M}`,
	fontWeight: `${FONT_WEIGHT.BOLD}`,
	backgroundColor: `${COLOR.WHITE}`,
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
	const emailBlock = contactsBlockArr[0].results as ParagraphBlockObjectResponse[]
	const numberBlock = contactsBlockArr[1].results as ParagraphBlockObjectResponse[]

	return (
		<Section backgroundColor={backgroundColor} id={SECTION.CONTACT}>
			<Inner>
				<SectionHeader>{title}</SectionHeader>
				<DivisionLine direction="row" />
				<ul style={contactsContainerStyle}>
					<li>
						<p>이메일</p>
						<ul>
							{emailBlock.map((item) => (
								<li style={contactBoxStyle}>{item.paragraph.rich_text[0].plain_text}</li>
							))}
						</ul>
					</li>
					<li>
						<p>전화번호</p>
						<ul>
							{numberBlock.map((item) => (
								<li style={contactBoxStyle}>{item.paragraph.rich_text[0].plain_text}</li>
							))}
						</ul>
					</li>
				</ul>
			</Inner>
		</Section>
	);
}
