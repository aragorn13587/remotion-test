import { Composition } from 'remotion';
import { Main } from './main'
export const RemotionVideo: React.FC = () => {
	/**
	 * all videos shows to left side
	 */
	return (
		<>
			<Composition
				id="Main"
				component={Main}
				durationInFrames={901}
				fps={30}
				width={1200}
				height={500}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
		</>
	);
};
