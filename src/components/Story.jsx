import { React, Styled, Router } from '../react/index';
import uuid from 'uuid/v1';

import Page from './commons/Page.jsx';
import Link from './commons/Link.jsx';
import Carousel from './commons/Carousel.jsx';
import ModalOverlay from './commons/ModalOverlay.jsx';

import { COMPONENT_TYPES } from '../enums';
import { parseText } from '../utils';

const { useHistory } = Router;

const StyledTitle = Styled.h1`
    text-align: center;
`;

const StyledParagraph = Styled.p`
    white-space: pre-wrap;

    text-align: justify;
`;

const StyledCarouselContainer = Styled.div`
    display: flex;
    justify-content: center;
`;

const Story = ({ story }) => {
    const [fullScreen, setFullscreen] = React.useState(false);
    const history = useHistory();
    const splitter = /({{.+?}})/;
    const { title, description, images } = story;

    return (
        <Page>
            {fullScreen && (
                <ModalOverlay onClose={() => setFullscreen(false)}>
                    {<ImageCard image={fullScreen} />}
                </ModalOverlay>
            )}
            <section>
                <StyledTitle>
                    {parseText(title, splitter, transform(history))}
                </StyledTitle>
                <StyledParagraph>
                    {parseText(description, splitter, transform(history))}
                </StyledParagraph>
                <StyledCarouselContainer>
                    <Carousel>
                        {images.map((i, index) => (
                            <ImageCard
                                key={index}
                                image={i}
                                onClick={(image) => setFullscreen(image)}
                            />
                        ))}
                    </Carousel>
                </StyledCarouselContainer>
            </section>
        </Page>
    );
};

export default Story;

const StyledImageCard = Styled.div`
    display: flex;
    justify-content: center;
    flex-shrink: 0;

    width: 100%;
    height: 100%;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.05);
    }
    
    transition: all 0.2s ease-in;
`;

const ImageCard = ({ image, onClick }) => {
    const { name, url } = image;
    const [imageUrl, setImageUrl] = React.useState(null);
    React.useEffect(() => {
        import(`../assets/images/${url}`).then((data) => {
            setImageUrl(data.default);
        });
    }, []);

    return (
        <StyledImageCard onClick={() => onClick && onClick(image)}>
            <img src={imageUrl} alt={name} />
        </StyledImageCard>
    );
};

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
