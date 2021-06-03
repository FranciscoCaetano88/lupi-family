import { React, Styled, Router } from '../react/index';
import Page from './commons/Page.jsx';

const { useHistory } = Router;

const StyledContent = Styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
`;

const StyledNodesContainer = Styled.div`
    display: flex;

    max-width: 24em;

    border-radius: 1rem;
    border: 1px solid black;

    overflow-x: scroll;
`;

const Stories = ({ stories }) => {
    return (
        <Page>
            <StyledContent>
                <h1>A História</h1>
                <StyledNodesContainer>
                    {stories
                        .sort((s1, s2) => s1.year - s2.year)
                        .map((s, index) => (
                            <YearNode key={index} story={s} />
                        ))}
                </StyledNodesContainer>
            </StyledContent>
        </Page>
    );
};

export default Stories;

const StyledYearNode = Styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    flex-shrink: 0;

    width: 8em;
    height: 8em;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.05);
    }
    
    transition: all 0.2s ease-in;
`;

const StyledParagraph = Styled.p`
    margin: 0 !important;

    user-select: none;
`;

const StyledCircle = Styled.div`
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 2em;
    height: 2em;

    border-radius: 100%;

    background-color: black;
`;

const StyledLine = Styled.div`
    position: absolute;

    top: 50%;
    transform: translateY(-50%);

    width: 100%;
    height: 0.5em;

    background-color: black;
`;

const YearNode = ({ story }) => {
    const history = useHistory();
    const { id, year } = story;

    return (
        <StyledYearNode onClick={() => history.push(`story/${id}`)}>
            <StyledParagraph>{year}</StyledParagraph>
            <StyledCircle />
            <StyledLine />
        </StyledYearNode>
    );
};
