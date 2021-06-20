import { React, Styled } from '../../react';
import Portrait from './Portrait.jsx';
import { portraits } from '../../assets/images';

const StyledCard = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    margin: 0.5em;
    padding: 0.5rem;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

    background-color: white;

    &:hover {
        transition: 0.2s ease-in;
        box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.4);
    }

    transition: all 0.2s ease-out;

    cursor: pointer;

    user-select: none;
`;

const StyledParagraph = Styled.p`
    text-align: center;

    margin: 0 !important;
`;

const Card = ({ info, onClick, ...restProps }) => {
    const { id, name, birth, death } = info;

    return (
        <StyledCard onClick={onClick} {...restProps}>
            <Portrait src={portraits[id] || portraits.default} />
            <StyledParagraph>
                {name}
                <br />({birth || '????'}-{death || '????'})
            </StyledParagraph>
        </StyledCard>
    );
};

export default Card;
