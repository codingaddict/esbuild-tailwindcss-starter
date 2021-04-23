import React, { useCallback, useState } from 'react';
import * as d3 from 'd3';
import classes from './app.module.css';
const createTable = (selector = '') => {
    const rootElement = d3.select(selector);
    if (rootElement) {
        const table = rootElement.append('table');
        const tbody = table.append('tbody');
        tbody.append('tr').append('td').text('First');
        tbody.append('tr').append('td').text('Second');
        tbody.append('tr').append('td').text('Third');
        return table.node();
    }
    return null;
};
const stopPropagationPreventDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
};
const App = () => {
    const [isFileDraggedOver, setIsFileDraggedOver] = useState(false);
    const setDragActive = useCallback((e) => {
        stopPropagationPreventDefault(e);
        setIsFileDraggedOver(true);
    }, []);
    const setDragInActive = useCallback((e) => {
        stopPropagationPreventDefault(e);
        setIsFileDraggedOver(false);
    }, []);
    const onDrop = useCallback((e) => {
        setDragInActive(e);
        console.log(e.dataTransfer.files);
    }, []);
    return (
        <form
            className={classes.outerBox}
            method="post"
            action=""
            encType="multipart/form-data"
        >
            <input type="file" name="files[]" className={classes.fileInput} />
            <div
                /*id="inner-box"*/ className={`${classes.innerBox}${
                    isFileDraggedOver ? ` ${classes.innerBox_drag}` : ''
                }`}
                onDragEnter={setDragActive}
                onDragLeave={setDragInActive}
                onDragEnd={setDragInActive}
                onDragOver={setDragActive}
                onDrop={onDrop}
            />
        </form>
    );
};
export default App;
