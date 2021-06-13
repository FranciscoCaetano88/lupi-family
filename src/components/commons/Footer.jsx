import { React, Styled, Router } from '../../react';
import Link from './Link.jsx';

import { getCurrentDate } from '../../utils';

const { useHistory } = Router;

const StyledFooter = Styled.footer`
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
            <StyledParagraph>
                <Link onClick={() => history.push('/editor/family/')}>
                    Contribute to the family
                </Link>
            </StyledParagraph>
            <StyledParagraph>
                <Link onClick={() => history.push('/editor/stories/')}>
                    Contribute to stories
                </Link>
            </StyledParagraph>
            <StyledParagraph>{`Família Lupi © ${year}`}</StyledParagraph>
        </StyledFooter>
    );
};

export default Footer;
