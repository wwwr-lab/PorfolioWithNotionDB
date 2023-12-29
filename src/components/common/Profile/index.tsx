import { CSSProperties } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { retrieveBlockChildren } from '@/api/notionApi';
import { PROFILE, SECTION, FONT_SIZE, FONT_WEIGHT } from '@/constants';
import { ListBlockChildrenResponse, ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const listStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
};
const listItemKeyStyle: CSSProperties = {
	fontSize: FONT_SIZE.S,
	fontWeight: FONT_WEIGHT.SEMI_BOLD,
};
const listItemValueStyle: CSSProperties = {
	fontSize: FONT_SIZE.M,
	fontWeight: FONT_WEIGHT.SEMI_BOLD,
};

interface Props {
	dataArr: ParagraphBlockObjectResponse[];
}

export default async function Profile({ dataArr }: Props) {
	const profileItemBlockArr = await Promise.all(dataArr.map(async (data) => await retrieveBlockChildren(data.id)));
	const profileItemValueBlockArr = profileItemBlockArr.map((block: ListBlockChildrenResponse) => block.results[0]);
	console.log('profile', profileItemValueBlockArr);
	const profileItemValueArr = profileItemValueBlockArr.map(
		(block: any) => block.paragraph.rich_text[0].plain_text
	) as string[];

	return (
		<ul style={listStyle}>
			<li>
				<SectionHeader>{SECTION.ABOUT}</SectionHeader>
			</li>
			<li>
				<p style={listItemKeyStyle}>{PROFILE.NAME}</p>
				<p style={listItemValueStyle}>{profileItemValueArr[0]}</p>
			</li>
			<li>
				<p style={listItemKeyStyle}>{PROFILE.AGE}</p>
				<p style={listItemValueStyle}>{profileItemValueArr[1]}</p>
			</li>
			<li>
				<p style={listItemKeyStyle}>{PROFILE.ADDRESS}</p>
				<p style={listItemValueStyle}>{profileItemValueArr[2]}</p>
			</li>
			<li>
				<p style={listItemKeyStyle}>{PROFILE.PHONE_NUMBER}</p>
				<p style={listItemValueStyle}>{profileItemValueArr[3]}</p>
			</li>
			<li>
				<p style={listItemKeyStyle}>{PROFILE.EMAIL}</p>
				<p style={listItemValueStyle}>{profileItemValueArr[4]}</p>
			</li>
		</ul>
	);
}
