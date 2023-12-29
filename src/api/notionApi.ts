import notion from './notion';
export const retrievePage = async (id: string) => {
	const pageId = id;
	const response = await notion.pages.retrieve({ page_id: pageId });
	return response;
};
export const retrieveBlockChildren = async (id: string) => {
	const response = await notion.blocks.children.list({
		block_id: id,
		page_size: 50,
	});
	return response;
};
