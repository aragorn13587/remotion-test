import { useEffect, useState } from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import {config} from '../data/config'
import {getFonts} from '../helper'
import {v4 as uuidv4} from 'uuid';

const Container = styled.div`
	font-family: ${getFonts()};
	font-size: 120px;
	font-weight: 700;
	text-align: center;
`;

const Ul = styled.ul`
    list-style: 'none';
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const Li = styled.li`
	font-family: ${getFonts()};
    color: ${config.color[0]};
    width: 100%;
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`;

export const TextLists: React.FC = () => {
	const frame = useCurrentFrame();
    const [list, setList] = useState<string[]>();
    /**
     * make animate element show up from left side ->-600<-
     * we use elements index to handle lines one by one
     */
    const translateX = (i: number) => {
        return interpolate(frame, [0, (i + 1) * 5], [-600, 0], {
            extrapolateRight: "clamp",
        });
    }
    /**
     * fetch the all texts lists from config file to the page
     */
    const setAllList = () => {
        let parseAll: string[] = [];
        config.text.middle_text.forEach((t: Record<string, string>) => {
            if(t?.main?.length) parseAll.push(t.main);
            if(t?.secondary?.length) parseAll.push(t.secondary);
            if(t?.product_id?.length) parseAll.push(t.product_id);
            if(t?.quantity?.length) parseAll.push(t.quantity);
        });
        setList(parseAll);
    }
    useEffect(() => {
        setAllList();
    }, []);
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
			<Ul>
                {list?.map(((txt: string, i: number) => (
                    <Li style={{
                        transform: `translateX(${translateX(i)}px)`,
                    }} key={uuidv4()}>{txt}</Li>
                )))}
			</Ul>
		</Container>
	);
};