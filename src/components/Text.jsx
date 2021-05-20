import { Styled } from '../react/index';

const StyledTitle = Styled.text`
    text-align: center;
    font-size: ${(props) => props.fontSize}px;
    font-weight: 600;

    max-width: ${(props) => props.maxWidth}px;

    margin-bottom: 10px;
`;

export default StyledTitle;
