import { Styled } from '../../react';

const StyledLink = Styled.a`
    color: rgba(60, 100, 120, 0.8);

    cursor: pointer;
    user-select: none;

    &:hover {
        text-decoration: underline;
    }

    &:active {
        color: rgba(60, 100, 120, 0.6);
    }
`;

export default StyledLink;
