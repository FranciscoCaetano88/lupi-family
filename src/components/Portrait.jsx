import { Styled } from '../react/index';

const StyledPortrait = Styled.img`
    width: 200px;
    min-width: 62px;
    height: 200px;
    min-height: 62px;

    border-radius: 100%;
    border: 1px solid black;

    margin-bottom: ${(props) => props.marginBottom}px;

    user-select: none;
`;

export default StyledPortrait;
