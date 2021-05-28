import { React, Styled } from '../../react';

const StyledFooter = Styled.div`
    width: 100%;
    height: fit-content;

    padding: 20px;

    background-color: #fafafa;
`;

const Footer = () => {
    return <StyledFooter>Família Lupi © 2020</StyledFooter>;
};

export default Footer;
