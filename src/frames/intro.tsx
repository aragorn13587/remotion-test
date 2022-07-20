import {interpolate, spring, useCurrentFrame, useVideoConfig, interpolateColors} from 'remotion';
import styled from 'styled-components';
import {config} from './../data/config'
import {getFonts} from './../helper'

const Container = styled.div`
	font-size: 120px;
	font-weight: 700;
	text-align: center;
`;

export const Intro: React.FC = () => {
	const {fps, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	/**
	 * animate transtion from bottom
	 */
	const translateY = interpolate(progress, [0, 1], [600, 0]);
	/**
	 * used for the color duration it will fetch automatically by colors one by one
	 */
	const getTheTrueDuration = (i: number) => {
		if(i === 0) return 0;
		if(i === config.color.length - 1) return durationInFrames;
		let v = (durationInFrames * (i + (i * 20)) / 100);
		return v;
	}
	/**
	 * used all color for text color
	 */
	const color = interpolateColors(frame, config.color.map((c: string, i: number) => { return getTheTrueDuration(i) }), config.color)
	return (
		<Container
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
				backgroundColor: 'white',
			}}
		>
			<div
				style={{
					transform: `translateY(${translateY}px)`,
					color: color,
					fontFamily: `${getFonts()}`
				}}
			>
				{config.text.start_text}
			</div>
		</Container>
	);
};