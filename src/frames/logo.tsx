import {interpolate, Img, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import logo from './../data/logo-without-txt.png';
import {getFonts} from './../helper'

const Outer = styled.div`
	display: flex;
	justify-content: center;
	flex: 1;
	align-items: center;
	background-color: white;
`;

const Title = styled.div`
	font-size: 150px;
	font-weight: 700;
`;

const Image = styled(Img)`
	width: 200px;
`;

const scaleStart = 45;

export const Logo: React.FC<{
	offset: number;
	textStartOffset: number;
}> = ({offset, textStartOffset}) => {
	const textStart = 85 + textStartOffset;
	const {fps, width, height} = useVideoConfig();
	const currentFrame = useCurrentFrame();
	const frame = currentFrame - offset;

	const scale = (index: number) => {
		const progress = spring({
			fps,
			frame: frame - index * 10 - scaleStart,
			config: {
				damping: 200,
				mass: 0.7,
			},
		});
		return interpolate(progress, [0, 1], [20, 1]);
	};

	const textAnimated = spring({
		fps,
		frame: frame - textStart,
		config: {
			damping: 100,
			mass: 2,
			stiffness: 200,
		},
	});

	return (
		<Outer style={{background: '#1f1f1f'}}>
			<div
				style={{
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center',
					flex: 1,
                    color: '#fff',
                    fontFamily: `${getFonts()}`,
					transform: `translateX(${interpolate(
						textAnimated,
						[0, 1],
						[100, 170]
					)}px)`,
					opacity: interpolate(textAnimated, [0.5, 1], [0, 1]),
				}}
			>
				<Title>Zebracat AI</Title>
			</div>
			<div
				style={{
					position: 'absolute',
					width,
					height,
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					transform: `translateX(${interpolate(
						textAnimated,
						[0, 1],
						[0, -450]
					)}px)`,
				}}
			>
				<Image
                    style={{
                        transform: `scale(${scale})`,
                    }}
                    src={logo}
                />
			</div>
		</Outer>
	);
};
