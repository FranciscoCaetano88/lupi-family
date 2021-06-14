import uuid from 'uuid/v1';
import { React, Styled } from '../react';

import Page from './commons/Page.jsx';
import Button from './commons/Button.jsx';
import ModalOverlay from './commons/ModalOverlay.jsx';
import DropZone from './commons/DropZone.jsx';

import { downloadJson } from '../utils';
import stories from '../assets/stories';

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

const MemberEditor = ({ storyState = getDefaultStory() }) => {
    const [story, setStory] = React.useState(storyState);
    const [modal, setModal] = React.useState(false);
    const [operation, setOperation] = React.useState(null);
    const {
        handleFieldChange,
        handleOnAdd,
        handleOnRemove,
        onModalConfirm,
        onEditClick,
    } = useHandlers({
        story,
        setStory,
        operation,
        setOperation,
        modal,
        setModal,
    });

    return (
        <Page>
            {modal && (
                <ModalOverlay onClose={() => setModal(false)}>
                    <ImagesModalSelector onConfirm={onModalConfirm} />
                </ModalOverlay>
            )}
            <section>
                <EditStory onEditClick={onEditClick} />
            </section>
            <section>
                <TextAreaEditor
                    fieldId={'title'}
                    value={story.title}
                    onChange={handleFieldChange}
                />
                <DateEditor
                    fieldId={'year'}
                    value={story.year}
                    onChange={handleFieldChange}
                />
                <TextAreaEditor
                    fieldId={'description'}
                    value={story.description}
                    onChange={handleFieldChange}
                    big={true}
                />
                <DropdownEditor
                    fieldId={'images'}
                    options={story.images}
                    onAdd={handleOnAdd}
                    onRemove={handleOnRemove}
                />
            </section>
            <ButtonSection>
                <StyledDownUpLoadButton
                    onClick={() => {
                        downloadJson(
                            story,
                            story.title.toLowerCase().replace(/\s/g, '-')
                        );
                        location.reload();
                    }}
                >
                    DOWNLOAD .JSON
                </StyledDownUpLoadButton>
                <DropZone onClick={(json) => setStory(json)}>
                    <StyledDownUpLoadButton onClick={() => {}}>
                        IMPORTAR .JSON
                    </StyledDownUpLoadButton>
                </DropZone>
            </ButtonSection>
        </Page>
    );
};

export default MemberEditor;

const StyledEditStory = Styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledEditDropdown = Styled(StyledDropdown)`
    margin-bottom: 0;
`;

const EditStory = ({ onEditClick }) => {
    const [id, setId] = React.useState(stories[0].id);

    return (
        <StyledEditStory>
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
                {stories.map((m, index) => (
                    <option key={index} value={m.id}>
                        {m.title}
                    </option>
                ))}
            </StyledEditDropdown>
            <StyledButton
                onClick={() => onEditClick(stories.find((m) => m.id === id))}
            >
                Editar
            </StyledButton>
        </StyledEditStory>
    );
};

const StyledModalContainer = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const ImagesModalSelector = ({ onConfirm }) => {
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');

    return (
        <StyledModalContainer>
            Nome:
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
            Url:
            <StyledTextArea
                value={url}
                onChange={(e) => {
                    const { target } = e;
                    if (!target) {
                        return;
                    }

                    setUrl(target.value);
                }}
            />
            <StyledButton
                onClick={() => {
                    if (!name || !url) {
                        return;
                    }
                    onConfirm({ id: uuid(), name, url });
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
                    return (
                        <option key={index} value={opt.id}>
                            {opt.name}
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

function useHandlers({ story, setStory, operation, setOperation, setModal }) {
    const handleFieldChange = (fieldId, value) => {
        setStory({ ...story, [fieldId]: value });
    };
    const handleOnAdd = (fieldId) => {
        setOperation(fieldId);
        setModal(true);
    };
    const handleOnRemove = (fieldId, value) => {
        setStory({
            ...story,
            [fieldId]: story[fieldId].filter((p) => p.id !== value),
        });
    };
    const onModalConfirm = (selectedOption) => {
        setModal(false);
        const hasOption = story[operation].some(
            (m) => m.id === selectedOption.id
        );

        if (hasOption) {
            return;
        }

        setStory({
            ...story,
            [operation]: [...story[operation], selectedOption],
        });
    };

    const onEditClick = (member) => {
        setStory(member);
    };

    return {
        handleFieldChange,
        handleOnAdd,
        handleOnRemove,
        onModalConfirm,
        onEditClick,
    };
}

function getDefaultStory() {
    return {
        id: uuid(),
        title: '',
        year: '',
        description: '',
        images: [],
    };
}
