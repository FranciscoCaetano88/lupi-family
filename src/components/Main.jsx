import { React, Styled, Router } from '../react';
import Navbar from './commons/Navbar.jsx';
import Footer from './commons/Footer.jsx';
import Text from './commons/Text.jsx';
import Link from './commons/Link.jsx';
import Card from './commons/Card.jsx';
import members from '../assets/members';
import themes from './themes';

const { useHistory, withRouter } = Router;

const StyledMainContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;

    background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);

    * {
        font-family: "ABeeZee";
        color: rgba(0, 0, 0, 0.6);
    }

    overflow: hidden;
`;

const StyledMidContainer = Styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
`;

const CardContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;
`;

const Main = () => {
    const history = useHistory();

    return (
        <StyledMainContainer>
            <Navbar />
            <StyledMidContainer>
                <Text fontSize={themes.fonts.size.title}>
                    Os Lupi de Portugal
                </Text>
                <Text fontSize={themes.fonts.size.title_three} maxWidth={700}>
                    LUPI - Apelido Italiano que já existia em Portugal no século
                    XVIII, pertencente a uma nobre família de Itália, natural de
                    San Gimigliano. A linhagem dos Lupi tem antigas origens
                    históricas, descendendo de Alberto, 1º Marquês da Ligúria
                    Oriental em 950.{' '}
                    <Link onClick={() => history.push('/story/story-1')}>
                        Ler história...
                    </Link>
                </Text>
                <CardContainer>
                    {[members[0], members[1]].map((m, index) => (
                        <Card
                            key={index}
                            info={m}
                            marginRight={20}
                            onClick={() => history.push(`family/${m.id}`)}
                        />
                    ))}
                </CardContainer>
            </StyledMidContainer>
            <Footer />
        </StyledMainContainer>
    );
};

export default withRouter(Main);
