import { React, Styled } from '../../react';

const StyledTextArea = Styled.textarea`
    width: 100%;

    padding: 1em;
    margin-bottom: 1em;

    font: 400 1em Arial;
    ${(props) =>
        props.big
            ? `height: 40ch;
white-space: pre-wrap;`
            : `white-space: nowrap;`}

    resize: none;
`;

const StyledParagraph = Styled.p`
    margin-bottom: 0 !important;
    margin-top: 1em;
`;

const TextAreaEditor = ({ value, onChange, big, title, ...props }) => {
    return (
        <div>
            <StyledParagraph>{title}</StyledParagraph>
            <StyledTextArea
                {...props}
                big={big}
                value={value}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    if (!big && e.nativeEvent.inputType === 'insertLineBreak') {
                        return;
                    }

                    onChange(target.value);
                }}
            />
        </div>
    );
};

export default TextAreaEditor;
