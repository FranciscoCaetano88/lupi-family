import { React, Styled } from '../../react';

const StyledOverlay = Styled.div`
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.6);

    overflow: hidden;

    z-index: 20;
`;

const StyledModal = Styled.div`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    max-width: 26em;
    max-height: 24em;

    padding: 1em;
    border-radius: 2em;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    background-color: white;
`;

const StyledButton = Styled.div`
    font-size: 1.8rem;

    position: absolute;

    right: 2em;
    top: 2em;

    padding: 0.1rem 1.1rem;
    border-radius: 100%;

    color: white;
    background-color: black;

    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.6);
    }
`;

const ModalOverlay = ({ children, onClose }) => {
    return (
        <StyledOverlay>
            <StyledButton onClick={onClose}>x</StyledButton>
            <StyledModal>{children}</StyledModal>
        </StyledOverlay>
    );
};

export default ModalOverlay;
