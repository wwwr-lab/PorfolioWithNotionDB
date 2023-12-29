import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SectionCover from '@/components/SectionCover';
import SectionAbout from '@/components/SectionAbout';
import SectionArchive from '@/components/SectionArchive';
import SectionSkills from '@/components/SectionSkills';
import SectionProjects from '@/components/SectionProjects';
import SectionContact from '@/components/SectionContact';

import { COLOR, FOOTER_TEXT, SECTION } from '@/constants';
import { retrieveBlockChildren } from '@/api/notionApi';
import { getProjects } from '@/api/getProject';
import { extractProjectData } from '@/utils/extractProjectData';

import { isMobile } from 'react-device-detect';
import {
	ListBlockChildrenResponse,
	PageObjectResponse,
	PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

export default async function Home() {
	const projectsDbData = (await getProjects()) as PageObjectResponse[];
	const projectPageIdArr = projectsDbData?.map((projectDBData: PageObjectResponse) => projectDBData.id);
	const projectPageArr = (await Promise.all(
		projectPageIdArr?.map(async (id: string) => await retrieveBlockChildren(id))
	)) as ListBlockChildrenResponse[];

	const projectPageToggleIdArrArr = projectPageArr.map((page: ListBlockChildrenResponse) =>
		page.results.filter((result: any) => result.type === 'toggle').map((item: PartialBlockObjectResponse) => item.id)
	);
	const projectsDataArr = [];
	for (let i = 0; i < projectPageToggleIdArrArr.length; i++) {
		projectsDataArr.push(
			extractProjectData(
				await Promise.all(projectPageToggleIdArrArr[i].map(async (id: string) => await retrieveBlockChildren(id)))
			)
		);
	}

	return (
		<div>
			<Header backgroundColor={COLOR.WHITE} />
			<main>
				{!isMobile && <SectionCover backgroundColor={COLOR.WHITE} />}
				<SectionAbout title={SECTION.ABOUT} backgroundColor={COLOR.WHITE} />
				<SectionArchive title={SECTION.ARCHIVE} backgroundColor={COLOR.ORANGE} />
				<SectionSkills title={SECTION.SKILLS} backgroundColor={COLOR.WHITE} />
				<SectionProjects title={SECTION.PROJECTS} backgroundColor={COLOR.BLUE} dataArr={projectsDataArr} />
				<SectionContact title={SECTION.CONTACT} backgroundColor={COLOR.MINT} />
			</main>
			<Footer backgroundColor={COLOR.BROWN}>{FOOTER_TEXT}</Footer>
		</div>
	);
}
