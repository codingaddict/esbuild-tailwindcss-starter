import classes from './index.module.css';
import { ReactSVG } from 'react-svg';
import searchSvg from 'svgs/search.svg';
import gridSvg from 'svgs/grid.svg';
import Accordion from './accordion';
import { useCallback, useEffect, useRef } from 'react';

const loadSvg = (canvas) => {
    const context = canvas.getContext('2d');
    const img = new Image();
    const drawImage = (ctx) =>
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const onSvgLoad = () => drawImage(context);
    img.onload = onSvgLoad;
    img.src = gridSvg;
    return drawImage;
};
const Panel = () => {
    const canvas = useRef();
    const drawImage = useRef();
    useEffect(() => {
        drawImage.current = loadSvg(canvas.current);
    }, []);
    const onMouseWheel = useCallback(({ deltaY }) => {
        const ctx = canvas.current.getContext('2d');
        const { width, height } = canvas.current;
        ctx.clearRect(0, 0, width, height);
        if (deltaY < 0) {
            ctx.scale(2, 2);
        } else {
            ctx.scale(0.5, 0.5);
        }
        drawImage.current(ctx);
    }, []);
    return (
        <div className={classes.root}>
            <div className={classes.search}>
                <input
                    className={classes.searchBox}
                    type="text"
                    placeholder=" Search Shapes"
                />
                <ReactSVG className={classes.searchIcon} src={searchSvg} />
            </div>
            <Accordion text="General">
                <div className={classes.svgs} onWheel={onMouseWheel}>
                    <canvas id="grid" ref={canvas} width="250" height="100" />
                </div>
            </Accordion>
        </div>
    );
};

export default Panel;
