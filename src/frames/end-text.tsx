import { useEffect, useState } from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import {config} from './../data/config'
import {getFonts} from './../helper'

const Container = styled.div`
	font-family: ${getFonts()};
	font-size: 120px;
	font-weight: 700;
	text-align: center;
    background: white;
    display: flex;
    justify-content: center;
	align-items: center;
    height: 90%;
`;

const H1 = styled.h1`
	font-family: ${getFonts()};
    color: ${config.color[0]};
    font-size: 3rem;
    font-weight: bold;
    width: 100%;
    margin-bottom: 5px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
	align-items: center;
`;

export const EndText: React.FC = () => {
	const frame = useCurrentFrame();
    /**
     * for divide the single text to tow part
     */
    const [textDivides, setTextDivided] = useState<string[]>(["", ""]);
    /**
     * animate left part
     */
    const translateXPart1 = interpolate(frame, [0, 10], [-600, 0], {
        extrapolateRight: "clamp",
    });
    /**
     * animate right part
     */
    const translateXPart2 = interpolate(frame, [0, 10], [600, 0], {
        extrapolateRight: "clamp",
    });
    /**
     * action for divide the text.
     */
    const dividEndTextToTwoPart = () => {
        let text = config.text.end_text[0]!;
        let txtLength = text.length;
        let divideBy2 = Math.floor(txtLength/2);
        let part1 = text.substring(0, divideBy2);
        let part2 = text.substring(divideBy2, text.length);
        setTextDivided([part1, part2]);
    }
    useEffect(() => {
        dividEndTextToTwoPart();
    }, []);
	return (
		<Container>
            <H1 style={{justifyContent: 'flex-end', transform: `translateX(${translateXPart1}px)` }} >{textDivides[0] || ""}</H1>
            <H1 style={{justifyContent: 'flex-start', transform: `translateX(${translateXPart2}px)` }}>{textDivides[1] || ""}</H1>
		</Container>
	);
};