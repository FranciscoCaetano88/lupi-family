import uuid from 'uuid/v1';
import { React, Styled } from '../react';

import Page from './commons/Page.jsx';
import Button from './commons/Button.jsx';
import ModalOverlay from './commons/ModalOverlay.jsx';
import DropZone from './commons/DropZone.jsx';

import members from '../assets/members';
import { downloadJson } from '../utils';
import { GENDER, MEMBER_TYPES } from '../enums';

const StyledButton = Styled(Button)`
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

const StyledDownUpLoadButton = Styled(StyledButton)`
    margin-left: 0 !important;
`;

const StyledInput = Styled.input`
    width: 100%;

    padding: 1em;
    margin-bottom: 1em;
    
    font: 400 1em Arial;
`;

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

const StyledDropdown = Styled.select`
    padding: 1em;
    margin-bottom: 1em;

    font: 400 1em Arial;
`;

const ButtonSection = Styled.section`
    display: flex;
`;

const MemberEditor = ({ memberState = getDefaultMember() }) => {
    const [member, setMember] = React.useState(memberState);
    const [modal, setModal] = React.useState(false);
    const [operation, setOperation] = React.useState(null);
    const { handleFieldChange, handleOnAdd, handleOnRemove, onModalConfirm } =
        useHandlers({
            member,
            setMember,
            operation,
            setOperation,
            modal,
            setModal,
        });

    return (
        <Page>
            {modal && (
                <ModalOverlay onClose={() => setModal(false)}>
                    {operation === 'events' ? (
                        <EventModalSelector onConfirm={onModalConfirm} />
                    ) : (
                        <MemberModalSelector onConfirm={onModalConfirm} />
                    )}
                </ModalOverlay>
            )}
            <section>
                <TextAreaEditor
                    fieldId={'name'}
                    value={member.name}
                    onChange={handleFieldChange}
                />
                <DateEditor
                    fieldId={'birth'}
                    value={member.birth}
                    onChange={handleFieldChange}
                />
                <DateEditor
                    fieldId={'death'}
                    value={member.death}
                    onChange={handleFieldChange}
                />
                <GenderEditor
                    value={member.gender}
                    onChange={handleFieldChange}
                />
                <DropdownEditor
                    fieldId={'parents'}
                    options={member.parents}
                    onAdd={handleOnAdd}
                    onRemove={handleOnRemove}
                />
                <DropdownEditor
                    fieldId={'spouses'}
                    options={member.spouses}
                    onAdd={handleOnAdd}
                    onRemove={handleOnRemove}
                />
                <DropdownEditor
                    fieldId={'children'}
                    options={member.children}
                    onAdd={handleOnAdd}
                    onRemove={handleOnRemove}
                />
                <DropdownEditor
                    fieldId={'siblings'}
                    options={member.siblings}
                    onAdd={handleOnAdd}
                    onRemove={handleOnRemove}
                />
                <TextAreaEditor
                    fieldId={'biography'}
                    value={member.biography}
                    onChange={handleFieldChange}
                    big={true}
                />
                <DropdownEditor
                    fieldId={'events'}
                    options={member.events}
                    onAdd={handleOnAdd}
                    onRemove={handleOnRemove}
                />
            </section>
            <ButtonSection>
                <StyledDownUpLoadButton
                    onClick={() =>
                        downloadJson(
                            member,
                            member.name.toLowerCase().replace(/\s/g, '-')
                        )
                    }
                >
                    DOWNLOAD .JSON
                </StyledDownUpLoadButton>
                <DropZone onClick={(json) => setMember(json)}>
                    <StyledDownUpLoadButton onClick={() => {}}>
                        IMPORTAR .JSON
                    </StyledDownUpLoadButton>
                </DropZone>
            </ButtonSection>
        </Page>
    );
};

export default MemberEditor;

const StyledModalContainer = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const MemberModalSelector = ({ onConfirm }) => {
    const [id, setId] = React.useState(members[0].id);
    const [type, setType] = React.useState(MEMBER_TYPES.blood);

    return (
        <StyledModalContainer>
            Membro:
            <StyledDropdown
                value={id}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setId(target.value);
                }}
            >
                {members.map((m, index) => (
                    <option key={index} value={m.id}>
                        {m.name}
                    </option>
                ))}
            </StyledDropdown>
            Tipo de relação:
            <StyledDropdown
                value={type}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setType(target.value);
                }}
            >
                {Object.keys(MEMBER_TYPES).map((key, index) => (
                    <option key={index} value={key}>
                        {MEMBER_TYPES[key]}
                    </option>
                ))}
            </StyledDropdown>
            <StyledButton
                onClick={() => {
                    onConfirm({ id, type });
                }}
            >
                Confirmar
            </StyledButton>
        </StyledModalContainer>
    );
};

const EventModalSelector = ({ onConfirm }) => {
    const [year, setYear] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');

    return (
        <StyledModalContainer>
            Título:
            <StyledTextArea
                value={name}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setName(target.value);
                }}
            />
            Ano:
            <StyledInput
                type="date"
                value={year}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setYear(target.value);
                }}
            />
            Descrição:
            <StyledTextArea
                value={description}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setDescription(target.value);
                }}
            />
            <StyledButton
                onClick={() => {
                    if (!name || !year || !description) {
                        return;
                    }

                    onConfirm({
                        id: uuid(),
                        name,
                        year,
                        description,
                    });
                }}
            >
                Confirmar
            </StyledButton>
        </StyledModalContainer>
    );
};

const TextAreaEditor = ({ fieldId, value, onChange, big }) => {
    return (
        <div>
            <StyledParagraph>{fieldId}: </StyledParagraph>
            <StyledTextArea
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

                    onChange(fieldId, target.value);
                }}
            />
        </div>
    );
};

const DateEditor = ({ fieldId, value, onChange }) => {
    return (
        <div>
            <StyledParagraph>{fieldId}: </StyledParagraph>
            <StyledInput
                type="date"
                value={value}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    onChange(fieldId, target.value);
                }}
            />
        </div>
    );
};

const DropdownEditor = ({ fieldId, options, onAdd, onRemove }) => {
    const [selected, setSelected] = React.useState('');
    React.useEffect(() => {
        const hasSelected = options.some((opt) => opt.id === selected);
        if (!hasSelected && options.length) {
            setSelected(options[0].id);
        }
    }, [setSelected, selected, options]);

    return (
        <div>
            <StyledParagraph>{fieldId}: </StyledParagraph>
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
                    const member = members.find((memb) => memb.id === opt.id);
                    return (
                        <option key={index} value={opt.id}>
                            {!member ? opt.name : member.name}
                        </option>
                    );
                })}
            </StyledDropdown>
            <StyledButton
                onClick={() => {
                    onAdd(fieldId);
                }}
            >
                Adicionar
            </StyledButton>
            <StyledButton
                onClick={() => {
                    const hasOption = options.some(
                        (opt) => opt.id === selected
                    );
                    if (!hasOption) {
                        return;
                    }

                    onRemove(fieldId, selected);
                }}
            >
                Remover
            </StyledButton>
        </div>
    );
};

const GenderEditor = ({ value, onChange }) => {
    const [selected, setSelected] = React.useState(value);

    return (
        <div>
            <StyledParagraph>Género: </StyledParagraph>
            <StyledDropdown
                value={selected}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setSelected(target.value);
                    onChange('gender', target.value);
                }}
            >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
            </StyledDropdown>
        </div>
    );
};

function useHandlers({ member, setMember, operation, setOperation, setModal }) {
    const handleFieldChange = (fieldId, value) => {
        setMember({ ...member, [fieldId]: value });
    };
    const handleOnAdd = (fieldId) => {
        setOperation(fieldId);
        setModal(true);
    };
    const handleOnRemove = (fieldId, value) => {
        setMember({
            ...member,
            [fieldId]: member[fieldId].filter((p) => p.id !== value),
        });
    };
    const onModalConfirm = (selectedOption) => {
        setModal(false);
        const hasOption = member[operation].some(
            (m) => m.id === selectedOption.id
        );

        if (hasOption) {
            return;
        }

        setMember({
            ...member,
            [operation]: [...member[operation], selectedOption],
        });
    };

    return { handleFieldChange, handleOnAdd, handleOnRemove, onModalConfirm };
}

function getDefaultMember() {
    return {
        id: uuid(),
        name: '',
        gender: GENDER.male,
        birth: '',
        death: '',
        parents: [],
        spouses: [],
        children: [],
        siblings: [],
        biography: '',
        events: [],
    };
}
