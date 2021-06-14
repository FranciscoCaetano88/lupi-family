import { React, Styled, Router } from '../react';
import uuid from 'uuid/v1';

import Page from './commons/Page.jsx';
import Link from './commons/Link.jsx';
import Portrait from './commons/Portrait.jsx';

import { parseText } from '../utils';
import { portraits } from '../assets/images';
import members from '../assets/members';
import { COMPONENT_TYPES } from '../enums';

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

const StyledLeftTd = Styled.td`
    width: 50%;

    padding-right: 0.25em;

    font-size: 1em;
    font-weight: bold;
    vertical-align: text-top;
    text-align: end;
    color: rgba(0,0,0,0.7);
`;

const StyledRightTd = Styled.td`
    width: 50%;

    padding-left: 0.25em;

    font-size: 1em;
    color: rgba(0,0,0,0.7);
`;

const LeftSection = ({ member, history }) => {
    const {
        id,
        name,
        birth,
        death,
        parents,
        spouses,
        children,
        siblings,
        profession,
    } = member;

    return (
        <StyledLeftSection>
            <StyledPortrait src={portraits[id]} />
            <h1>{name}</h1>
            <StyledSeparator />
            <table>
                <tbody>
                    <tr>
                        <StyledLeftTd>Data Nascimento</StyledLeftTd>
                        <StyledRightTd>{birth}</StyledRightTd>
                    </tr>
                    <tr>
                        <StyledLeftTd>Data Óbito</StyledLeftTd>
                        <StyledRightTd>{death}</StyledRightTd>
                    </tr>
                    <tr>
                        <StyledLeftTd>Pais</StyledLeftTd>
                        <StyledRightTd>
                            {toSeparatedLinks(parents, history)}
                        </StyledRightTd>
                    </tr>
                    <tr>
                        <StyledLeftTd>Casamentos</StyledLeftTd>
                        <StyledRightTd>
                            {toSeparatedLinks(spouses, history)}
                        </StyledRightTd>
                    </tr>
                    <tr>
                        <StyledLeftTd>Filhos</StyledLeftTd>
                        <StyledRightTd>
                            {toSeparatedLinks(children, history)}
                        </StyledRightTd>
                    </tr>
                    <tr>
                        <StyledLeftTd>Irmãos</StyledLeftTd>
                        <StyledRightTd>
                            {toSeparatedLinks(siblings, history)}
                        </StyledRightTd>
                    </tr>
                    <tr>
                        <StyledLeftTd>Profissão</StyledLeftTd>
                        <StyledRightTd>{profession}</StyledRightTd>
                    </tr>
                </tbody>
            </table>
        </StyledLeftSection>
    );
};

function toSeparatedLinks(members, history) {
    return members
        .map((p) => (
            <LinkMember
                key={`${p.id}${uuid()}`}
                memberId={p.id}
                history={history}
            />
        ))
        .reduce((accu, elem) => {
            return accu === null ? [elem] : [...accu, ', ', elem];
        }, null);
}

const LinkMember = ({ memberId, history }) => {
    const member = members.find((m) => m.id === memberId);
    const { id, name } = member;

    return <Link onClick={() => history.push(`/family/${id}`)}>{name}</Link>;
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

const StyledParagraph = Styled.p`
    text-align: justify;
`;

const RightSection = ({ member, history }) => {
    const splitter = /({{.+?}})/;
    const { biography, events } = member;

    return (
        <StyledRightSection>
            <h1>Biografia</h1>
            <StyledParagraph>
                {parseText(biography, splitter, transform(history))}
            </StyledParagraph>
            <h1>Eventos Importantes</h1>
            <StyledTable>
                <StyledRow>
                    {events.map((e, index) => (
                        <StyledColumn key={index}>
                            <StyledColumnParagraph>
                                {e.year}
                            </StyledColumnParagraph>
                            <StyledColumnParagraph>
                                {parseText(
                                    e.description,
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
