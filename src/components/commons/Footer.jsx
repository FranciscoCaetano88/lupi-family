import { React, Styled } from '../../react';

const StyledFooter = Styled.footer`
    padding: 1em 1em;

    background-color: #f5f5f5;
`;

const StyledParagraph = Styled.p`
    margin-bottom: 0 !important;
    user-select: none;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <StyledParagraph>Família Lupi © 2020</StyledParagraph>
        </StyledFooter>
    );
};

export default Footer;
