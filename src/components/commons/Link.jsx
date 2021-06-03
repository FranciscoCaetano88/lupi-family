import { Styled } from '../../react';

const StyledLink = Styled.a`
    color: rgba(60, 100, 120, 0.8);
    text-decoration: underline;

    cursor: pointer;
    user-select: none;

    &:hover {
        color: rgba(60, 100, 120, 0.6);
    }

    &:active {
        color: rgba(60, 100, 120, 0.4);
    }
`;

export default StyledLink;
