import { ListBlockChildrenResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getSectionPage } from './getSection';
import { retrieveBlockChildren } from './notionApi';

export const getSectionToggleBlocks = async (sectionTitle: string) => {
	const sectionPageResponse = (await getSectionPage(sectionTitle)) as ListBlockChildrenResponse;
	const sectionToggleBlockArrResponse = await getChildrenBlockArr(sectionPageResponse);
	return sectionToggleBlockArrResponse;
};

export const getChildrenBlockArr = async (response: ListBlockChildrenResponse) => {
	const idArr = response.results.map((result: PartialBlockObjectResponse) => result.id) as string[];
	const blockArrResponse = await Promise.all(idArr.map(async (id: string) => await retrieveBlockChildren(id)));
	return blockArrResponse;
};
