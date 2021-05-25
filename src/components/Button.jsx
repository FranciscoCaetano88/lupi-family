import { Styled } from '../react/index';

const StyledButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    min-width: 42px;
    height: fit-content;
    min-height: 42px;

    margin-right: 20px;
    padding: 5px 30px 5px 30px;

    border-radius: 32px;

    cursor: pointer;

    white-space: nowrap;
    color: black;
    user-select: none;

    &:hover {
        background-color: #fafafa;
        transition: 0.2s ease-in;
    }

    transition: all 0.2s ease-out;
`;

export default StyledButton;
