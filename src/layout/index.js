import classes from './index.module.css';
import Panel from 'panel';
const Layout = () => {
    return (
        <div className={classes.root}>
            <div className={classes.menuBar} />
            <div className={classes.quickutilsBar} />
            <div className={classes.workspace}>
                <div className={classes.mainarea}>
                    <div className={classes.sidebar}>
                        <Panel />
                    </div>
                    <div className={classes.drawBoard}>
                        <div className={classes.canvasContainer} />
                        <div className={classes.pagenavigationBar} />
                    </div>
                </div>
                <div className={classes.propertiesBar} />
            </div>
        </div>
    );
};

export default Layout;
