import { React, Styled, Router } from '../react/index';

import Navbar from './commons/Navbar.jsx';
import Footer from './commons/Footer.jsx';
import Text from './commons/Text.jsx';

import themes from './themes';

const { useHistory } = Router;

const StyledStories = Styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    overflow: hidden;

    * {
        font-family: "ABeeZee";
        color: rgba(0, 0, 0, 0.6);
    }
`;

const StyledContent = Styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
`;

const StyledNodesContainer = Styled.div`
    display: flex;
`;

const Stories = ({ stories }) => {
    return (
        <StyledStories>
            <Navbar />
            <StyledContent>
                <Text fontSize={themes.fonts.size.title}>A História</Text>
                <StyledNodesContainer>
                    {stories
                        .sort((s1, s2) => s1.year - s2.year)
                        .map((s, index) => (
                            <YearNode
                                key={index}
                                isStarting={index === 0}
                                isLast={index === stories.length - 1}
                                story={s}
                            />
                        ))}
                </StyledNodesContainer>
            </StyledContent>
            <Footer />
        </StyledStories>
    );
};

export default Stories;

const StyledYearNode = Styled.div`
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    
    width: 150px;
    height: 150px;

    ${(props) => {
        if (props.isLast) {
            return `border-right: 1px solid black;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
                border-top-right-radius: 14px;
                border-bottom-right-radius: 14px;`;
        }

        if (props.isStarting) {
            return `border-left: 1px solid black;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
                border-top-left-radius: 14px;
                border-bottom-left-radius: 14px;`;
        }

        return `border-top: 1px solid black;
            border-bottom: 1px solid black;`;
    }}

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const StyledDrawingContainer = Styled.div`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const StyledCircle = Styled.div`
    position: absolute;

    width: 42px;
    height: 42px;

    border-radius: 100%;

    background-color: black;
`;

const StyledLine = Styled.div`
    width: 100%;
    height: 10px;

    background-color: black;
`;

const YearNode = ({ story, isStarting, isLast }) => {
    const history = useHistory();
    const { id, year } = story;

    return (
        <StyledYearNode
            onClick={() => history.push(`story/${id}`)}
            isStarting={isStarting}
            isLast={isLast}
        >
            {year}
            <StyledDrawingContainer>
                <StyledCircle />
                <StyledLine />
            </StyledDrawingContainer>
        </StyledYearNode>
    );
};
