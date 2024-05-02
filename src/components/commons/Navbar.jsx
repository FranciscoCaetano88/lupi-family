import { React, Styled, Router } from '../../react';
import Button from './Button.jsx';

const { useHistory } = Router;

const StyledNavbar = Styled.div`
    position: absolute;

    display: flex;
    justify-content: center;

    width: 100%;
    padding: 1em 1em;

    background-color: #FAFAFA;
    z-index: 2;
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
