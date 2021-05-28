import { React, Styled, Router } from '../react/index';
import Text from './commons/Text.jsx';
import Link from './commons/Link.jsx';
import BackArrow from './commons/BackArrow.jsx';
import themes from './themes';
import images from '../assets/images';
import { COMPONENT_TYPES } from '../enums';
import { parseText } from '../utils';

const { useHistory } = Router;

const StyledMainContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    width: 100%;
    height: 100%;

    * {
        font-family: "ABeeZee";
        color: rgba(0, 0, 0, 0.6);
    }
`;

const StyledTop = Styled.div`
    display: flex;

    width: 100%;
    height: 125px;

    background-color: #fafafa;
`;

const StyledMidContainer = Styled.div`
    display: flex;

    width: 100%;
    height: 100%;
`;

const TextContainer = Styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    padding: 20px;
`;

const Story = ({ story }) => {
    const history = useHistory();
    const splitter = /({{.+?}})/;
    const { title, description } = story;

    return (
        <StyledMainContainer>
            <StyledTop>
                <BackArrow margin={20} onClick={() => history.goBack()} />
            </StyledTop>
            <StyledMidContainer>
                <TextContainer>
                    <Text fontSize={themes.fonts.size.title}>
                        {parseText(title, splitter, transform(history))}
                    </Text>
                    <Text fontSize={themes.fonts.size.normal}>
                        {parseText(description, splitter, transform(history))}
                    </Text>
                </TextContainer>
            </StyledMidContainer>
        </StyledMainContainer>
    );
};

export default Story;

function transform(history) {
    return (string) => {
        const [type, path, name] = string.replace(/{{|}}/g, '').split('|');
        if (type === COMPONENT_TYPES.image) {
            return <img key={name} src={images[path]} alt={name} />;
        }

        if (type === COMPONENT_TYPES.link) {
            return (
                <Link key={name} onClick={() => history.push(path)}>
                    {name}
                </Link>
            );
        }

        return string;
    };
}
