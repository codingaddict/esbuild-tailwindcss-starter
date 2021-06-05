import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import classes from './index.module.css';
const PropertiesBar = () => {
    const [makeSticky, setMakeSticky] = useState(false);
    const onScroll = useCallback((e) => {
        const { scrollTop } = e.currentTarget;
        if (scrollTop > 150) {
            setMakeSticky(true);
            return;
        }
        setMakeSticky(false);
    }, []);
    const tiles = useMemo(
        () =>
            Array(24)
                .fill(0)
                .map((_, index) => <div className={classes.tile} />),
        []
    );
    return (
        <div className={classes.root} onScroll={onScroll}>
            <div
                className={clsx(classes.menu, makeSticky && classes.stickyMenu)}
            >
                ☰
            </div>
            <div className={classes.logo} />
            <div
                className={clsx(
                    classes.searchbar,
                    makeSticky && classes.stickySearchbar
                )}
            >
                <input
                    className={classes.textbox}
                    type="search"
                    placeholder="Search or type URL"
                />
            </div>
            <div className={classes.tiles}>{tiles}</div>
        </div>
    );
};
export default PropertiesBar;
