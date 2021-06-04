import { React, Router, Styled } from '../react/index';
import ReactFamilyTree from 'react-family-tree';

import Toolkit from './commons/Toolkit.jsx';
import Card from './commons/Card.jsx';

import members from '../assets/members';
import { ZOOM_AMOUNT } from '../enums';

const { useHistory } = Router;

const WIDTH = 600;
const HEIGHT = 600;

const StyledSection = Styled.div`
    width: 100%;
    height: 100%;
`;

const StyledFamilyTree = Styled.div`
    width: 100%;
    height: 100%;

    overflow: auto;
    zoom: ${(props) => props.scale};
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
    const ref = React.useRef(null);
    const [scale, setScale] = React.useState(1);

    const { scrollToCenter, zoomIn, zoomOut } = useToolkitHandlers(
        ref,
        scale,
        setScale
    );

    return (
        <StyledSection>
            <StyledFamilyTree scale={scale} ref={ref}>
                <ReactFamilyTree
                    nodes={members}
                    rootId={members[0].id}
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
                                onClick={() =>
                                    history.push(`family/${info.id}`)
                                }
                            />
                        </StyledCardWrapper>
                    )}
                />
            </StyledFamilyTree>
            <Toolkit
                scrollToCenter={scrollToCenter}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
            />
        </StyledSection>
    );
};

export default FamilyTree;

function useToolkitHandlers(ref, scale, setScale) {
    const scrollToCenter = () => {
        const { current: element } = ref;
        if (!element) {
            return;
        }

        const { x, y } = getScrollCenterPos(element);
        element.scrollTo(x, y);
    };

    const zoomIn = () => {
        setScale(scale + ZOOM_AMOUNT);
    };

    const zoomOut = () => {
        setScale(scale - ZOOM_AMOUNT);
    };

    React.useEffect(scrollToCenter, [ref]);

    return {
        scrollToCenter,
        zoomIn,
        zoomOut,
    };
}

function getScrollCenterPos(element) {
    const width = element.firstElementChild.offsetWidth;
    const height = element.firstElementChild.offsetHeight;

    return {
        x: (width - element.offsetWidth) / 2,
        y: (height - element.offsetHeight) / 2,
    };
}