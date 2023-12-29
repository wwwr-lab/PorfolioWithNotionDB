export const extractProjectData = (dataArr: any) => {
	const title = dataArr[0].results[0].paragraph.rich_text[0].plain_text;
	const link = dataArr[1].results[0].paragraph.rich_text[0].plain_text;
	const image = dataArr[2].results[0].image.file.url;
	const term = dataArr[3].results[0].paragraph.rich_text[0].plain_text;
	const people = dataArr[4].results[0].paragraph.rich_text[0].plain_text;
	const summary = dataArr[5].results[0].paragraph.rich_text[0].plain_text;
	return { title, link, image, term, people, summary };
};
