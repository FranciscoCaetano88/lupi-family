import { React, Styled } from '../../react';
import Text from './Text.jsx';
import Portrait from './Portrait.jsx';
import { portraits } from '../../assets/images';
import themes from '../themes';

const StyledCard = Styled.div`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    max-width: 230px;
    max-height: 260px;
    padding: 10px;

    margin-right: ${(props) => props.marginRight}px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 14px;

    background-color: white;

    &:hover {
        transition: 0.2s ease-in;
        box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.4);
    }

    transition: all 0.2s ease-out;

    cursor: pointer;

    user-select: none;
`;

const Card = ({ info, onClick, ...restProps }) => {
    const { id, name, birth, death } = info;

    return (
        <StyledCard onClick={onClick} {...restProps}>
            <Portrait src={portraits[id]} marginBottom={5} />
            <Text fontSize={themes.fonts.size.title_three}>
                {name}
                <br />({birth}-{death})
            </Text>
        </StyledCard>
    );
};

export default Card;
