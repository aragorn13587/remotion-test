import React, {useEffect, useState, FC} from 'react';
import {Video, useVideoConfig} from 'remotion';
import {config} from './../data/config'
import footage1 from './../data/footage/1.mp4'
import footage2 from './../data/footage/2.mp4'
import footage3 from './../data/footage/3.mp4'
import footage4 from './../data/footage/4.mp4'
import footage5 from './../data/footage/5.mp4'
import footage6 from './../data/footage/6.mp4'
import footage7 from './../data/footage/7.mp4'
import footage8 from './../data/footage/8.mp4'
import footage9 from './../data/footage/9.mp4'
import footage10 from './../data/footage/10.mp4'
export const FootagesPlayer: FC<{name?: string}> = ({name}) => {
	/**
	 * use for set to video dimentions
	 */
	const { width, height } = useVideoConfig();
	/**
	 * video lists from config files
	 */
	const videosList = [
		footage1,
		footage2,
		footage3,
		footage4,
		footage5,
		footage6,
		footage7,
		footage8,
		footage9,
		footage10
	]
	const [videos, ] = useState<string[]>(config.footage);
	const [selectedVideo, setSelectedVideo] = useState<any>(null);
	/**
	 * generate random number between 0 and video length - 1 for render a custom video
	 */
	const generateRandom = (min: number, max: number) => {
		let difference = max - min;
		let rand = Math.random();
		rand = Math.floor( rand * difference);
		rand = rand + min;
		return rand;
	}
	useEffect(() => {
		/**
		 * if we passed video name like 1 or 1.mp or 1.mp4 it will get first result.
		 * if we pass 1 to name property it will choose 1.mp4 and will ignore 10.mp4(first match case).
		 */
		if(!name){
			/**
			 * generate random video if we don't pass any name
			 */
			setSelectedVideo(videosList[generateRandom(0, videosList.length - 1)]);
		}else{
			setSelectedVideo(videosList[videos.findIndex(v => v.includes(name)) || 0]);
		}
    }, [name]);// eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div
			style={{
				backgroundColor: 'white',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}
		>
			{/* we use the current video width & height here, this makes look good and video has not deform */}
			<Video src={selectedVideo || footage1} muted={true} style={{height: height - 10, width: width}} />
		</div>
	);
};
