import { React, Styled } from '../../react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;

    background-image: linear-gradient(45deg, #f5f5f5, #ffffff 40%);

    overflow: auto;
`;

// HACK: 65px magic number is the height of the navbar
const StyledContainer = Styled.div`
    margin-top: 65px;

    margin-inline: auto;
    width: min(90%, 70.5rem);
`;

const Page = ({ children }) => {
    return (
        <StyledPage>
            <Navbar />
            <StyledContainer>{children}</StyledContainer>
            <Footer />
        </StyledPage>
    );
};

export default Page;
