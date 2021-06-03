import { Styled } from '../../react';

const StyledButton = Styled.div`
    display: inline-block;

    padding: 0.25em 1em;
    margin-right: 1rem;

    border-radius: 0.2em;

    font-weight: 500;
    color: rgba(39, 67, 81, 1);
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

export default StyledButton;
