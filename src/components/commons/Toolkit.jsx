import { React, Styled } from '../../react/index';
import ScrollCenterIcon from '../../assets/images/scroll-center.svg';
import ZoomInIcon from '../../assets/images/zoom-in.svg';
import ZoomOutIcon from '../../assets/images/zoom-out.svg';

const StyledToolkit = Styled.div`
    position: absolute;

    right: 0.5em;
    bottom: 0.5em;
`;

const StyledButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2em;
    height: 2em;

    padding: 0.25em;
    margin-bottom: 0.8em;

    border-radius: 100%;

    font-weight: 700;

    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    background-color: white;

    cursor: pointer;
    user-select: none;

    &:hover {
        color: white;
        background-color: rgba(60, 100, 120, 1);
    }

    &:active {
        background-color: rgba(60, 100, 120, 0.6);
    }

    transition: all 0.2s ease-in;
`;

const Toolkit = ({ zoomIn, zoomOut, scrollToCenter }) => {
    return (
        <StyledToolkit>
            <StyledButton onClick={scrollToCenter}>
                <ScrollCenterIcon />
            </StyledButton>
            <StyledButton onClick={zoomIn}>
                <ZoomInIcon />
            </StyledButton>
            <StyledButton onClick={zoomOut}>
                <ZoomOutIcon />
            </StyledButton>
        </StyledToolkit>
    );
};

export default Toolkit;
