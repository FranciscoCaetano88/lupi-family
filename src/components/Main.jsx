import { React, Styled, Router } from '../react';
import Page from './commons/Page.jsx';
import Link from './commons/Link.jsx';
import Card from './commons/Card.jsx';

import members from '../assets/members';

const { useHistory, withRouter } = Router;

const StyledTitle = Styled.h1`
    text-align: center;
`;

const StyledCardSection = Styled.section`
    display: flex;
    justify-content: center;

    padding: 0 0 3rem 0 !important;
`;

const StyledParagraph = Styled.p`
    margin: 0 !important;

    text-align: justify;
`;

const Main = () => {
    const history = useHistory();

    return (
        <Page>
            <section>
                <StyledTitle>Os Lupi de Portugal</StyledTitle>
                <StyledParagraph>
                    LUPI - Apelido Italiano que já existia em Portugal no século
                    XVIII, pertencente a uma nobre família de Itália, natural de
                    San Gimignano. A linhagem dos Lupi tem antigas origens
                    históricas, descendendo de Alberto, 1º Marquês da Ligúria
                    Oriental em 950.{' '}
                    <Link
                        onClick={() =>
                            history.push(
                                '/story/5404e060-cc39-11eb-b9f8-5172280506e3'
                            )
                        }
                    >
                        Ler história...
                    </Link>
                </StyledParagraph>
            </section>
            <StyledCardSection>
                <Card
                    info={members[0]}
                    marginRight={10}
                    onClick={() => history.push(`family/${members[0].id}`)}
                />
                <Card
                    info={members[1]}
                    marginLeft={10}
                    onClick={() => history.push(`family/${members[1].id}`)}
                />
            </StyledCardSection>
        </Page>
    );
};

export default withRouter(Main);
