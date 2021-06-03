import { React, Router, Styled } from '../react/index';
import ReactFamilyTree from 'react-family-tree';
import Card from './commons/Card.jsx';
import members from '../assets/members';

const { useHistory } = Router;

const WIDTH = 250;
const HEIGHT = 280;

const StyledFamilyTree = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledCardWrapper = Styled.div`
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    width: ${WIDTH}px;
    height: ${HEIGHT}px;

    transform: translate(${(props) => `${props.x}px, ${props.y}px`});

    * {
        box-sizing: border-box;
    }
`;

const FamilyTree = () => {
    const history = useHistory();
    const rootId = 'Maria Inês do Carmo-id';

    return (
        <StyledFamilyTree>
            <ReactFamilyTree
                nodes={members}
                rootId={rootId}
                width={WIDTH}
                height={HEIGHT}
                renderNode={(info) => (
                    <StyledCardWrapper
                        key={info.id}
                        x={info.left * (WIDTH / 2)}
                        y={info.top * (HEIGHT / 2)}
                    >
                        <Card
                            info={info}
                            onClick={() => history.push(`family/${info.id}`)}
                        />
                    </StyledCardWrapper>
                )}
            />
        </StyledFamilyTree>
    );
};

export default FamilyTree;
