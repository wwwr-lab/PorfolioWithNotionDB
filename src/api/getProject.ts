import notion from './notion';

export const getProjects = async () => {
	const databaseId = process.env.NEXT_PUBLIC_PROJECTS_DB_ID;
	if (databaseId !== undefined) {
		try {
			const response = await notion.databases.query({
				database_id: databaseId,
				filter: {
					property: 'upload',
					checkbox: {
						equals: true,
					},
				},
			});

			return response.results;
		} catch (error) {
			console.error(error);
		}
	}
};
