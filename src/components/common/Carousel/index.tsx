'use client';
import Image from 'next/image';
import ProjectCard from '@/components/common/ProjectCard';
import { ProjectDetailData } from '@/types';

import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { isMobile } from 'react-device-detect';

const SwiperSlideItem = styled(SwiperSlide)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const ProfileImageContainer = styled.div`
	height: 40rem;
	width: ${isMobile ? '90vw' : '100%'};
	position: relative;
`;
interface Props {
	dataArr: string[] | ProjectDetailData[];
	spaceBetween?: number;
	slidesPerView?: number;
	type?: 'image' | 'project';
}

export default function Carousel({ dataArr, spaceBetween = 0, slidesPerView = 1, type }: Props) {
	SwiperCore.use([Navigation, Scrollbar, Autoplay]);
	switch (type) {
		case 'image':
			return (
				<Swiper
					loop={true} // 슬라이드 루프
					spaceBetween={spaceBetween} // 슬라이스 사이 간격
					slidesPerView={slidesPerView} // 보여질 슬라이스 수
					autoplay={{
						delay: 2500,
						disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
					}}
					style={{ width: '100%' }}
				>
					{dataArr &&
						dataArr.map((data: any, index) => (
							<SwiperSlideItem key={index}>
								<ProfileImageContainer>
									<Image src={data} alt="Carousel Image" fill style={{ objectFit: 'contain' }} />
								</ProfileImageContainer>
							</SwiperSlideItem>
						))}
				</Swiper>
			);
		case 'project':
			return (
				<Swiper
					loop={true} // 슬라이드 루프
					spaceBetween={spaceBetween} // 슬라이스 사이 간격
					slidesPerView={slidesPerView} // 보여질 슬라이스 수
					//navigation={true} // prev, next button
					autoplay={{
						delay: 2500,
						disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
					}}
					style={{ width: '100%' }}
				>
					{dataArr &&
						dataArr.map((data: any) => (
							<SwiperSlideItem key={data.title}>
								<ProjectCard data={data} />
							</SwiperSlideItem>
						))}
				</Swiper>
			);
	}
}
