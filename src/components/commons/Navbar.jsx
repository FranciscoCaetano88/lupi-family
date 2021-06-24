import { React, Styled, Router } from '../../react';
import Button from './Button.jsx';

const { useHistory } = Router;

const StyledNavbar = Styled.div`
    display: flex;
    justify-content: center;

    padding: 1em 1em;

    background-color: #FAFAFA;
`;

const StyledButton = Styled(Button)``;

const Navbar = () => {
    const history = useHistory();
    const goToPath = (path) => {
        return () => {
            if (history.location.pathname === path) {
                window.location.reload();
                return;
            }

            history.push(path);
        };
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
