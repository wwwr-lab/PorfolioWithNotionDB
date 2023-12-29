// 'use client';
// import { useState, useEffect } from 'react';

// export const useInnerWidth = () => {
// 	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
// 	const handleScreenWidth = () => {
// 		setScreenWidth(window.innerWidth);
// 	};
// 	useEffect(() => {
// 		window.addEventListener('resize', handleScreenWidth);
// 		console.log('screenWidth', screenWidth);
// 		return () => {
// 			window.removeEventListener('resize', handleScreenWidth);
// 		};
// 	}, []);
// 	return screenWidth;
// };
