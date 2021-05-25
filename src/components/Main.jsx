import { React, Styled, Router } from '../react';
import Button from './Button.jsx';
import Text from './Text.jsx';
import Link from './Link.jsx';
import Card from './Card.jsx';
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
`;

const StyledTopBar = Styled.div`
    position: sticky;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: fit-content;

    padding: 10px;
`;

const StyledMidContainer = Styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
`;

const StyledFooter = Styled.div`
    display: flex;

    width: 100%;
    height: 100%;

    background-color: #fafafa;
`;

const CardContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;
`;

const Main = () => {
    const history = useHistory();

    const goToPath = function (path) {
        return () => history.push(path);
    };

    return (
        <StyledMainContainer>
            <StyledTopBar>
                <Button onClick={goToPath('/')}>Página Inicial</Button>
                <Button onClick={goToPath('/family')}>A Família</Button>
                <Button onClick={goToPath('/stories')}>A História</Button>
            </StyledTopBar>
            <StyledMidContainer>
                <Text fontSize={themes.fonts.size.title}>
                    Os Lupi de Portugal
                </Text>
                <Text fontSize={themes.fonts.size.title_three} maxWidth={600}>
                    LUPI - Apelido Italiano que já existia em Portugal no século
                    XVIII, pertencente a uma nobre família de Itália, natural de
                    San Gimigliano. A linhagem dos Lupi tem antigas origens
                    históricas, descendendo de Alberto, 1º Marquês da Ligúria
                    Oriental em 950.{' '}
                    <Link onClick={goToPath('/story/story-1')}>
                        Ler história...
                    </Link>
                </Text>
                <CardContainer>
                    {members.map((m, index) => (
                        <Card key={index} member={m} marginRight={20} />
                    ))}
                </CardContainer>
            </StyledMidContainer>
            <StyledFooter></StyledFooter>
        </StyledMainContainer>
    );
};

export default withRouter(Main);
