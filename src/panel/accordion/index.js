import classes from './index.module.css';
import chevupSvg from 'svgs/chev-up.svg';
import chevdownSvg from 'svgs/chev-down.svg';
import { useCallback, useState } from 'react';
import { ReactSVG } from 'react-svg';

const Accordion = ({ children, text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const onExpandToggled = useCallback(() => {
        setIsExpanded((expanded) => !expanded);
    }, []);
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                {text}
                <ReactSVG
                    className={classes.chevron}
                    src={isExpanded ? chevupSvg : chevdownSvg}
                    onClick={onExpandToggled}
                />
            </div>
            <div
                className={
                    isExpanded ? classes.childrenShow : classes.childrenHidden
                }
            >
                {children}
            </div>
        </div>
    );
};
export default Accordion;
