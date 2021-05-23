import { React, Styled } from '../react/index';
import Logo from './Logo.jsx';
import Button from './Button.jsx';
import Text from './Text.jsx';
import Link from './Link.jsx';
import Card from './Card.jsx';
import members from '../assets/members';
import themes from './themes';

const StyledMainContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;

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
    return (
        <StyledMainContainer>
            <StyledTopBar>
                <Logo onClick={() => console.log('LOGO')} />
                <Button onClick={() => console.log('BUTTON 1')}>
                    Página Inicial
                </Button>
                <Button onClick={() => console.log('BUTTON 2')}>
                    A Família
                </Button>
                <Button onClick={() => console.log('BUTTON 3')}>
                    A História
                </Button>
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
                    Oriental em 950. <Link href={''}>Ler história...</Link>
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

export default Main;
