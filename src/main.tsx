import { FC } from 'react';
import { Audio, Sequence } from 'remotion';
import { Transition } from './helper';
import Sunset30s from './data/Sunsets_30s.wav'

/**
 * Frames
*/
import {
  Intro,
  FootagesPlayer,
  MiddleText,
  Logo,
  TextLists,
  EndText
} from './frames';
export const Main: FC = () => {
  /**
   * we define all frames here
   */
  return (
    <div style={{flex: 1, backgroundColor: 'white'}}>
      <div>
        <Sequence from={0} durationInFrames={100}>
            <Transition type="out">
                <Intro  />
            </Transition>
        </Sequence>
        <Sequence from={100} durationInFrames={200}>
            <Transition type="in">
                <FootagesPlayer  />
            </Transition>
        </Sequence>
        <Sequence from={300} durationInFrames={150}>
            <Transition type="in">
                <Logo offset={0} textStartOffset={0} />
            </Transition>
        </Sequence>
        <Sequence from={450} durationInFrames={150}>
            <Transition type="out">
                <MiddleText  />
            </Transition>
        </Sequence>
        <Sequence from={600} durationInFrames={200}>
            <Transition type="out">
                <TextLists  />
            </Transition>
        </Sequence>
        <Sequence from={800} durationInFrames={100}>
            <Transition type="out">
                <EndText  />
            </Transition>
        </Sequence>
        {/* the sound playing during the video */}
        <Audio src={Sunset30s} />
      </div>
    </div>
  );
}
