import { React, Styled, Router } from '../../react';
import Button from './Button.jsx';

const { useHistory } = Router;

const StyledNavbar = Styled.div`
    position: sticky;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: fit-content;
`;

const StyledButton = Styled(Button)`
    margin: 10px;
`;

const Navbar = () => {
    const history = useHistory();
    const goToPath = (path) => {
        return () => history.push(path);
    };

    return (
        <StyledNavbar>
            <StyledButton onClick={goToPath('/')}>Página Inicial</StyledButton>
            <StyledButton onClick={goToPath('/family')}>A Família</StyledButton>
            <StyledButton onClick={goToPath('/stories')}>
                A História
            </StyledButton>
        </StyledNavbar>
    );
};

export default Navbar;
