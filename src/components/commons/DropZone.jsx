import { React, Styled } from '../../react';
import { useDropzone } from 'react-dropzone';

const StyledWrapper = Styled.div`
    width: fit-content;
    height: fit-content;
`;

const DropZone = ({ onClick, children }) => {
    const onDrop = React.useCallback(
        (acceptedFiles) => {
            const reader = new FileReader();
            // eslint-disable-next-line no-console
            reader.onabort = () => console.log('file reading was aborted');
            // eslint-disable-next-line no-console
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const binaryStr = reader.result;
                const json = JSON.parse(binaryStr);

                onClick(Array.isArray(json) ? json[0] : json);
            };

            acceptedFiles.forEach((file) => reader.readAsText(file));
        },
        [onClick]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <StyledWrapper {...getRootProps()}>
            <input {...getInputProps()} />
            {children}
        </StyledWrapper>
    );
};

export default DropZone;
