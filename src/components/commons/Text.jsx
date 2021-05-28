import { Styled } from '../../react';

const StyledText = Styled.div`
    text-align: ${(props) => props.align || 'center'};
    font-size: ${(props) => props.fontSize}px;
    font-weight: 500;
    ${(props) =>
        props.lineHeight ? `line-height: ${props.lineHeight}px;` : ''}

    ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth}px;` : '')}
    ${(props) => (props.border ? `border: ${props.border};` : '')}
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')}

    margin-bottom: 10px;
`;

export default StyledText;
