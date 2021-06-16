import uuid from 'uuid/v1';
import { React, Styled } from '../react';

import Page from './commons/Page.jsx';
import Button from './commons/Button.jsx';
import ModalOverlay from './commons/ModalOverlay.jsx';
import TextAreaEditor from './commons/TextAreaEditor.jsx';
import DateEditor from './commons/DateEditor.jsx';
import DropdownEditor from './commons/DropdownEditor.jsx';
import EditSelector from './commons/EditSelector.jsx';
import DownloadUploadButtons from './commons/DownloadUploadButtons.jsx';
import { useLocale } from './hooks/useLocale';
import { getDefaultStory } from '../state';

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

const MemberEditor = ({ storyState = getDefaultStory() }) => {
    const locale = useLocale();
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
                <EditSelector data={[...stories]} onEditClick={onEditClick} />
            </section>
            <section>
                <TextAreaEditor
                    title={locale.id}
                    value={story.id}
                    disabled={true}
                    onChange={() => {}}
                />
                <TextAreaEditor
                    title={locale.story.title}
                    value={story.title}
                    onChange={handleFieldChange('title')}
                />
                <DateEditor
                    title={locale.story.year}
                    value={story.year}
                    onChange={handleFieldChange('year')}
                />
                <TextAreaEditor
                    title={locale.story.description}
                    value={story.description}
                    onChange={handleFieldChange('description')}
                    big={true}
                />
                <DropdownEditor
                    title={locale.story.images}
                    options={story.images}
                    onAdd={handleOnAdd('images')}
                    onRemove={handleOnRemove('images')}
                />
            </section>
            <DownloadUploadButtons
                data={story}
                onDrop={(json) => setStory(json)}
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

function useHandlers({ story, setStory, operation, setOperation, setModal }) {
    const handleFieldChange = (fieldId) => (value) => {
        setStory({ ...story, [fieldId]: value });
    };
    const handleOnAdd = (fieldId) => () => {
        setOperation(fieldId);
        setModal(true);
    };
    const handleOnRemove = (fieldId) => (value) => {
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
