import { React, Styled } from '../../react';
import Button from './Button.jsx';
import members from '../../assets/members';

const StyledParagraph = Styled.p`
    margin-bottom: 0 !important;
    margin-top: 1em;
`;

const StyledDropdown = Styled.select`
    padding: 1em;
    margin-bottom: 1em;

    font: 400 1em Arial;
`;

const StyledButton = Styled(Button)`
    height: fit-content;
    margin-left: 0.8em;

    color: white;
    background-color: rgba(60, 100, 120, 1);

    &:hover {
        background-color: rgba(60, 100, 120, 0.8);
    }

    &:active {
        background-color: rgba(60, 100, 120, 0.6);
    }
`;

const DropdownEditor = ({ options, title, onAdd, onRemove }) => {
    const [selected, setSelected] = React.useState('');
    React.useEffect(() => {
        const hasSelected = options.some((opt) => opt.id === selected);
        if (!hasSelected && options.length) {
            setSelected(options[0].id);
        }
    }, [setSelected, selected, options]);

    return (
        <div>
            <StyledParagraph>{title}: </StyledParagraph>
            <StyledDropdown
                value={selected}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setSelected(target.value);
                }}
            >
                {options.map((opt, index) => {
                    // TODO: rethink (maybe useAppState)
                    const member = members.find((memb) => memb.id === opt.id);
                    return (
                        <option key={index} value={opt.id}>
                            {!member ? opt.name : member.name}
                        </option>
                    );
                })}
            </StyledDropdown>
            <StyledButton onClick={onAdd}>Adicionar</StyledButton>
            <StyledButton
                onClick={() => {
                    const hasOption = options.some(
                        (opt) => opt.id === selected
                    );
                    if (!hasOption) {
                        return;
                    }

                    onRemove(selected);
                }}
            >
                Remover
            </StyledButton>
        </div>
    );
};

export default DropdownEditor;
