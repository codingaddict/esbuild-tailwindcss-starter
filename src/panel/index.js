import classes from './index.module.css';
import { ReactSVG } from 'react-svg';
import searchSvg from 'svgs/search.svg';
import Accordion from './accordion';
const Panel = () => {
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
                <div className={classes.svgs}></div>
            </Accordion>
        </div>
    );
};

export default Panel;
