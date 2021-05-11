import { useCallback, useRef } from 'react';
import classes from './index.module.css';

const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
};

const Psuedo = () => {
    const divRef = useRef();
    const currentPos = useRef();
    const onDrag = useCallback((e) => {
        preventDefault(e);
        const { clientX, clientY } = e;
        if (clientX > 0 && clientY > 0) {
            currentPos.current = { x: clientX, y: clientY };
        }
    }, []);
    const onDragEnd = useCallback((e) => {
        const { target } = e;
        const { current } = currentPos;
        if (target) {
            target.style.left = `${current.x}px`;
            target.style.top = `${current.y}px`;
        }
    }, []);

    const onMouseDown = useCallback((e) => {
        const { current: element } = divRef;
        if (element && !element.ondrag) {
            element.ondrag = onDrag;
            element.ondragend = onDragEnd;
            element.ondragover = preventDefault;
        }
    }, []);
    return (
        <div className={classes.root} ref={divRef} draggable>
            <div className={classes.header} onMouseDown={onMouseDown} />
        </div>
    );
};
export default Psuedo;
