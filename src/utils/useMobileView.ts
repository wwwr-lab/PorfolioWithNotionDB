import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export const useMobileView = () => {
	const [isMobileView, setIsMobileView] = useState(isMobile);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setIsMobileView(isMobile);
		});
		// return () => {
		// 	window.removeEventListener('resize', () => {
		// 		setIsDeviceMobile(isMobile);
		// 	});
		// };
	}, []);
	return isMobileView;
};
