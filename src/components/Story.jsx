import { React, Styled, Router } from '../react/index';
import uuid from 'uuid/v1';

import Page from './commons/Page.jsx';
import Link from './commons/Link.jsx';
import Carousel from './commons/Carousel.jsx';

import { COMPONENT_TYPES } from '../enums';
import { parseText } from '../utils';

const { useHistory } = Router;

const StyledTitle = Styled.h1`
    text-align: center;
`;

const Story = ({ story }) => {
    const history = useHistory();
    const splitter = /({{.+?}})/;
    const { title, description, images } = story;

    return (
        <Page>
            <StyledTitle>
                {parseText(title, splitter, transform(history))}
            </StyledTitle>
            <p>{parseText(description, splitter, transform(history))}</p>
            <Carousel images={images} />
        </Page>
    );
};

export default Story;

function transform(history) {
    return (string) => {
        const [type, path, name] = string.replace(/{{|}}/g, '').split('|');

        if (type === COMPONENT_TYPES.link) {
            return (
                <Link
                    key={uuid()}
                    onClick={() => {
                        window.history.replaceState({}, document.title);
                        history.push(path);
                    }}
                >
                    {name}
                </Link>
            );
        }

        return string;
    };
}
