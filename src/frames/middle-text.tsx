import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import {config} from './../data/config'
import {getFonts} from './../helper'

const Container = styled.div`
	font-family: ${getFonts()};
	font-size: 120px;
	font-weight: 700;
	text-align: center;
`;

const Span = styled.span`
	font-family: ${getFonts()};
    color: ${config.color[0]};
    font-size: 3rem;
    font-weight: bold;
    width: 100%;
    margin-bottom: 5px;
    display: block;
    transform: scaleX(0);
`;
const Small = styled.small`
	font-family: ${getFonts()};
    color: ${config.color[3]};
    font-size: 2rem;
    font-weight: bold;
    display: block;
    width: 100%;
    transform: scaleX(0);
    opacity: 0;
`;

export const MiddleText: React.FC = () => {
	const { durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();
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
			<div>
				<Span 
                    style={{
                        transform: `scale(${interpolate(frame, [0, 25, durationInFrames / 2, durationInFrames], [0, .2, .5, 1], {
					
							extrapolateRight: "clamp",
							extrapolateLeft: "clamp",
						})})`,
                    }}
                >{config.text.middle_text[0]?.main || ""}</Span>
				<Small style={{
                        transform: `scale(${interpolate(frame, [0, 25, durationInFrames / 2, durationInFrames], [0, .2, .5, 1], {
							
							extrapolateRight: "clamp",
							extrapolateLeft: "clamp",
						})})`,
                        opacity: interpolate(frame, [0, 25], [0, 1]),
                    }}
                >{config.text.middle_text[0]?.secondary || ""}</Small>
			</div>
		</Container>
	);
};