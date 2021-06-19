import { React } from '../../react';
import TextAreaEditor from './TextAreaEditor.jsx';

const DateEditor = ({ value, title, onChange }) => {
    return (
        <TextAreaEditor
            placeholder={'yyyy'}
            title={title}
            value={value}
            onChange={(targetValue) => {
                if (isNaN(Number(targetValue)) || targetValue.length > 4) {
                    return;
                }

                onChange(targetValue);
            }}
        />
    );
};

export default DateEditor;
