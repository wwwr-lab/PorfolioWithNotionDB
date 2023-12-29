// 'use client';
// import { useState, useEffect } from 'react';
// export const useScrollDirection = () => {
// 	let scrollDirection;
// 	const handleScroll = (e: any) => {
// 		if (e.deltaY < 0) {
// 			scrollDirection = 'down';
// 		}
// 		if (e.deltaY > 0) {
// 			scrollDirection = 'up';
// 		}
// 	};
// 	useEffect(() => {
// 		window.addEventListener('mousewheel', (e) => {
// 			handleScroll(e);
// 		});
// 		return () => {
// 			window.removeEventListener('mousewheel', (e) => {
// 				handleScroll(e);
// 			});
// 		};
// 	}, []);
// 	return scrollDirection;
// };
