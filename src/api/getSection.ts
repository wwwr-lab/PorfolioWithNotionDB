
import notion from './notion';
import { retrieveBlockChildren } from './notionApi';
import { SectionTitle } from '@/types';

export const getSectionPageId = async (title: SectionTitle) => {
	const databaseId = process.env.NEXT_PUBLIC_DB_ID;
	if (databaseId !== undefined) {
		try {
			const response = await notion.databases.query({
				database_id: databaseId,
				filter: {
					and: [
						{
							property: 'upload',
							checkbox: {
								equals: true,
							},
						},
						{
							property: 'title',
							rich_text: {
								contains: title,
							},
						},
					],
				},
			});
			return response.results[0].id;
		} catch (error) {
			console.error(error);
		}
	}
};

export const getSectionPage = async (title: SectionTitle) => {
	const id = await getSectionPageId(title);
	if (id !== undefined) {
		const res = await retrieveBlockChildren(id);
		return res;
	}
};
