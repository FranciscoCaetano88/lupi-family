import { React, Styled } from '../../react';
import { useLocale } from '../hooks/useLocale';

const StyledParagraph = Styled.p`
    margin-bottom: 0 !important;
    margin-top: 1em;
`;

const StyledDropdown = Styled.select`
    padding: 1em;
    margin-bottom: 1em;

    font: 400 1em Arial;
`;

const GenderEditor = ({ value, title, onChange }) => {
    const locale = useLocale();
    const [selected, setSelected] = React.useState(value);

    return (
        <div>
            <StyledParagraph>{title}</StyledParagraph>
            <StyledDropdown
                value={selected}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setSelected(target.value);
                    onChange(target.value);
                }}
            >
                <option value="male">{locale.genders.male}</option>
                <option value="female">{locale.genders.female}</option>
            </StyledDropdown>
        </div>
    );
};

export default GenderEditor;
