import { React, Styled } from '../../react';
import Button from './Button.jsx';
import { sortAlphabetically } from '../../utils';

const StyledDropdown = Styled.select`
    padding: 1em;
    margin-bottom: 1em;

    font: 400 1em Arial;
`;

const StyledEditMember = Styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledEditDropdown = Styled(StyledDropdown)`
    margin-bottom: 0;
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

const EditSelector = ({ data, onEditClick }) => {
    const sortedData = data.sort(sortAlphabetically);
    const [id, setId] = React.useState(sortedData[0].id);

    return (
        <StyledEditMember>
            <StyledEditDropdown
                value={id}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setId(target.value);
                }}
            >
                {sortedData.map((d, index) => (
                    <option key={index} value={d.id}>
                        {d.name || d.title}
                    </option>
                ))}
            </StyledEditDropdown>
            <StyledButton
                onClick={() => onEditClick(data.find((m) => m.id === id))}
            >
                Editar
            </StyledButton>
        </StyledEditMember>
    );
};

export default EditSelector;
