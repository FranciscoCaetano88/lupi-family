import { React, Styled, Router } from '../../react';
import Link from './Link.jsx';

import { getCurrentDate } from '../../utils';

const { useHistory } = Router;

const StyledFooter = Styled.footer`
    display: flex;
    justify-content: space-between;

    padding: 1em 1em;

    background-color: #f5f5f5;
`;

const StyledParagraph = Styled.p`
    margin-bottom: 0 !important;
    user-select: none;
`;

const Footer = () => {
    const history = useHistory();
    const { year } = getCurrentDate();

    return (
        <StyledFooter>
            <StyledParagraph>{`Família Lupi © ${year}`}</StyledParagraph>
            <div>
                <StyledParagraph>
                    <Link onClick={() => history.push('/editor/family/')}>
                        Gerar membro da família
                    </Link>
                </StyledParagraph>
                <StyledParagraph>
                    <Link onClick={() => history.push('/editor/stories/')}>
                        Gerar evento histórico
                    </Link>
                </StyledParagraph>
            </div>
        </StyledFooter>
    );
};

export default Footer;
