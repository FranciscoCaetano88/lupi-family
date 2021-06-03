import { React, Styled, Router } from '../../react';

import Page from './Page.jsx';
import Link from './Link.jsx';
import Portrait from './Portrait.jsx';

import { parseText } from '../../utils';
import { portraits } from '../../assets/images';
import { COMPONENT_TYPES } from '../../enums';

const { useHistory } = Router;

const StyledSection = Styled.section`
    display: flex;
    flex-direction: column;
`;

const Member = ({ member }) => {
    const history = useHistory();
    return (
        <Page>
            <StyledSection>
                <LeftSection history={history} member={member} />
                <RightSection history={history} member={member} />
            </StyledSection>
        </Page>
    );
};

export default Member;

const StyledLeftSection = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex-basis: 100%;

    margin-right: 1em;
`;

const StyledSeparator = Styled.hr`
    width: 80%;

    margin-block-start: 0;
    margin-block-end: 0;
    
    border: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledPortrait = Styled(Portrait)`
    margin-bottom: 1em;
`;

const StyledInfoSection = Styled.div`
    display: flex;
`;

const StyledInfo = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.alignItems};
    flex-basis: 100%;

    padding: 0.4em;

    & > p {
        font-weight: ${(props) => (props.bold ? 600 : '')};
        margin: 0 !important;
    }
`;

const LeftSection = ({ member, history }) => {
    const { id, name, birth, death, parents, spouses, children, siblings } =
        member;

    return (
        <StyledLeftSection>
            <StyledPortrait src={portraits[id]} />
            <h1>{name}</h1>
            <StyledSeparator />
            <StyledInfoSection>
                <StyledInfo alignItems={'flex-end'} bold={true}>
                    <p>Data Nascimento</p>
                    <p>Data Óbito</p>
                    <p>Pais</p>
                    <p>Esposos</p>
                    <p>Filhos</p>
                    <p>Irmãos</p>
                </StyledInfo>
                <StyledInfo>
                    <p>{birth}</p>
                    <p>{death}</p>
                    <p>{parents.map((p) => p.id).join(', ')}</p>
                    <p>{spouses.map((s) => s.id).join(', ')}</p>
                    <p>{children.map((c) => c.id).join(', ')}</p>
                    <p>{siblings.map((s) => s.id).join(', ')}</p>
                </StyledInfo>
            </StyledInfoSection>
        </StyledLeftSection>
    );
};

const StyledRightSection = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    flex-basis: 100%;
`;

const StyledColumn = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;

    font-size: 0.7em;
    float: left;
`;

const StyledRow = Styled.div`
    display: flex;
`;

const StyledTable = Styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1em;
`;

const StyledColumnParagraph = Styled.p`
    margin: 0 !important;
`;

const RightSection = ({ member, history }) => {
    const splitter = /({{.+?}})/;
    const { biography, events } = member;

    return (
        <StyledRightSection>
            <h1>Biografia</h1>
            <p>{parseText(biography, splitter, transform(history))}</p>
            <h1>Eventos Importantes</h1>
            <StyledTable>
                <StyledRow>
                    {Object.keys(events).map((key) => (
                        <StyledColumn key={`${key}-title`}>
                            <StyledColumnParagraph>{key}</StyledColumnParagraph>
                            <StyledColumnParagraph>
                                {parseText(
                                    events[key],
                                    splitter,
                                    transform(history)
                                )}
                            </StyledColumnParagraph>
                        </StyledColumn>
                    ))}
                </StyledRow>
            </StyledTable>
        </StyledRightSection>
    );
};

function transform(history) {
    return (string) => {
        const [type, path, name] = string.replace(/{{|}}/g, '').split('|');

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
