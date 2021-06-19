import uuid from 'uuid/v1';
import { React, Styled } from '../react';

import Page from './commons/Page.jsx';
import Button from './commons/Button.jsx';
import ModalOverlay from './commons/ModalOverlay.jsx';
import TextAreaEditor from './commons/TextAreaEditor.jsx';
import DateEditor from './commons/DateEditor.jsx';
import DropdownEditor from './commons/DropdownEditor.jsx';
import GenderEditor from './commons/GenderEditor.jsx';
import EditSelector from './commons/EditSelector.jsx';
import DownloadUploadButtons from './commons/DownloadUploadButtons.jsx';
import { useLocale } from './hooks/useLocale';
import { getDefaultMember } from '../state';
import { sortAlphabetically } from '../utils';

import members from '../assets/members';
import { MEMBER_TYPES } from '../enums';

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

const StyledDropdown = Styled.select`
    padding: 1em;
    margin-bottom: 1em;

    font: 400 1em Arial;
`;

const MemberEditor = ({ memberState = getDefaultMember() }) => {
    const locale = useLocale();
    const [member, setMember] = React.useState(memberState);
    const [modal, setModal] = React.useState(false);
    const [operation, setOperation] = React.useState(null);
    const {
        handleFieldChange,
        handleOnAdd,
        handleOnRemove,
        onModalConfirm,
        onEditClick,
    } = useHandlers({
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
                <EditSelector data={[...members]} onEditClick={onEditClick} />
            </section>
            <section>
                <TextAreaEditor
                    title={locale.id}
                    value={member.id}
                    disabled={true}
                    onChange={() => {}}
                />
                <TextAreaEditor
                    title={locale.member.name}
                    value={member.name}
                    onChange={handleFieldChange('name')}
                />
                <DateEditor
                    title={locale.member.birth}
                    value={member.birth}
                    onChange={handleFieldChange('birth')}
                />
                <DateEditor
                    title={locale.member.death}
                    value={member.death}
                    onChange={handleFieldChange('death')}
                />
                <GenderEditor
                    title={locale.member.gender}
                    value={member.gender}
                    onChange={handleFieldChange('gender')}
                />
                <DropdownEditor
                    title={locale.member.parents}
                    options={member.parents}
                    onAdd={handleOnAdd('parents')}
                    onRemove={handleOnRemove('parents')}
                />
                <DropdownEditor
                    title={locale.member.spouses}
                    options={member.spouses}
                    onAdd={handleOnAdd('spouses')}
                    onRemove={handleOnRemove('spouses')}
                />
                <DropdownEditor
                    title={locale.member.children}
                    options={member.children}
                    onAdd={handleOnAdd('children')}
                    onRemove={handleOnRemove('children')}
                />
                <DropdownEditor
                    title={locale.member.siblings}
                    options={member.siblings}
                    onAdd={handleOnAdd('siblings')}
                    onRemove={handleOnRemove('siblings')}
                />
                <TextAreaEditor
                    title={locale.member.profession}
                    value={member.profession}
                    onChange={handleFieldChange('profession')}
                />
                <TextAreaEditor
                    title={locale.member.biography}
                    value={member.biography}
                    onChange={handleFieldChange('biography')}
                    big={true}
                />
                <DropdownEditor
                    title={locale.member.events}
                    options={member.events}
                    onAdd={handleOnAdd('events')}
                    onRemove={handleOnRemove('events')}
                />
            </section>
            <DownloadUploadButtons
                data={member}
                onDrop={(json) => setMember(json)}
            />
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
    const locale = useLocale();
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
                {members.sort(sortAlphabetically).map((m, index) => (
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
                        {locale.member.types[MEMBER_TYPES[key]]}
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

function useHandlers({ member, setMember, operation, setOperation, setModal }) {
    const handleFieldChange = (fieldId) => (value) => {
        setMember({ ...member, [fieldId]: value });
    };
    const handleOnAdd = (fieldId) => () => {
        setOperation(fieldId);
        setModal(true);
    };
    const handleOnRemove = (fieldId) => (value) => {
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

    const onEditClick = (member) => {
        setMember(member);
    };

    return {
        handleFieldChange,
        handleOnAdd,
        handleOnRemove,
        onModalConfirm,
        onEditClick,
    };
}
