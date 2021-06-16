import { React, Styled } from '../../react';

const StyledParagraph = Styled.p`
    margin-bottom: 0 !important;
    margin-top: 1em;
`;

const StyledInput = Styled.input`
    width: 100%;

    padding: 1em;
    margin-bottom: 1em;
    
    font: 400 1em Arial;
`;

const DateEditor = ({ value, title, onChange }) => {
    return (
        <div>
            <StyledParagraph>{title}: </StyledParagraph>
            <StyledInput
                type="date"
                value={value}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    onChange(target.value);
                }}
            />
        </div>
    );
};

export default DateEditor;
