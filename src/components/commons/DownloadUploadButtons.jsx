import { React, Styled } from '../../react';
import DropZone from './DropZone.jsx';
import Button from './Button.jsx';
import { downloadJson } from '../../utils';

const ButtonSection = Styled.section`
    display: flex;
`;

const StyledButton = Styled(Button)`
    height: fit-content;
    margin-left: 0.8em;

    color: white;
    background-color: rgba(60, 100, 120, 1);

    &:hover {
        background-color: rgba(60, 100, 120, 0.8);
    }

    &:active {
        background-color: rgba(60, 100, 120, 0.6);
    }
`;

const StyledDownUpLoadButton = Styled(StyledButton)`
    margin-left: 0 !important;
`;

const DownloadUploadButtons = ({ onDrop, data }) => {
    const name = data.name || data.title;
    return (
        <ButtonSection>
            <StyledDownUpLoadButton
                onClick={() => {
                    downloadJson(data, name.toLowerCase().replace(/\s/g, '-'));
                    location.reload();
                }}
            >
                DOWNLOAD .JSON
            </StyledDownUpLoadButton>
            <DropZone onClick={(json) => onDrop(json)}>
                <StyledDownUpLoadButton onClick={() => {}}>
                    IMPORTAR .JSON
                </StyledDownUpLoadButton>
            </DropZone>
        </ButtonSection>
    );
};

export default DownloadUploadButtons;
