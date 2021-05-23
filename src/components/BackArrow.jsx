import { Styled } from '../react/index';
import ArrowLeft from '../assets/images/arrow-left.svg';

const StyledBackArrow = Styled(ArrowLeft)`
    margin: ${(props) => props.margin}px;

    cursor: pointer;
`;

export default StyledBackArrow;
