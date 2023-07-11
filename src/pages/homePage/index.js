import {useState, useEffect} from "react"
import {TextStyle} from 'pixi.js';
import {Stage, Text} from '@pixi/react';

const width = 500;
const height = 550;

const style = new TextStyle({
    align: "center",
    fontFamily: "sans-serif",
    fontSize: 60,
    fontWeight: "bold",
    fill: ["#26f7a3", "#01d27e"],
    stroke: "#eef1f5",
    strokeThickness: 1,
    letterSpacing: 5,
    wordWrap: true,
    wordWrapWidth: 350
});

const Message = ({poem, interval = 0, children}) => {
    const [state, setState] = useState({text: '', rest: []})

    useEffect(() => {
        const update = () => {
            setState(({text, rest}) => {
                if (rest.length === 0) {
                    return {text: '', rest: poem.split("").concat([...Array(10)].map(() => ''))}
                }
                const line = text + rest.shift();
                return {text: line, rest}
            })
        }

        const i = setInterval(update, interval);
        return () => {
            clearInterval(i)
        };
    }, [interval, poem]);

    return children(state.text);
};

export const HomePage = () => {
    return (
        <Stage width={width} height={height} options={{ autoDensity: true, backgroundColor: 0xeef1f5 }}>
            <Message poem="Call me lazy,but I try to save time" interval={1000 / 10}>
                {(text) => (
                    <Text
                        text={text}
                        x={width / 2}
                        y={height / 2}
                        anchor={0.5}
                        style={style}
                    />
                )}
            </Message>
        </Stage>
    );
}