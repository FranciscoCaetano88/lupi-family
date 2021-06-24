import { React, Router, Styled } from '../react/index';
import ReactFamilyTree from 'react-family-tree';

import Toolkit from './commons/Toolkit.jsx';
import Card from './commons/Card.jsx';

import members from '../assets/members';
import { ZOOM_AMOUNT, ZOOM_MAX, ZOOM_MIN } from '../enums';
import Navbar from './commons/Navbar.jsx';

const { useHistory } = Router;

const WIDTH = 600;
const HEIGHT = 600;

const StyledSection = Styled.div`
    width: 100%;
    height: 100%;

    overflow: hidden;
`;

const StyledFamilyContainer = Styled.div`
    display: flex;
    justify-content: flex-start;

    width: 100%;
    height: 100%;

    overflow: auto;

    cursor: ${(props) => props.cursor};
`;

const StyledFamilyTree = Styled.div`
    width: fit-content;
    height: fit-content;

    transform: scale(${(props) => props.scale}, ${(props) => props.scale});
`;

const StyledCardWrapper = Styled.div`
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    width: ${WIDTH}px;
    height: ${HEIGHT}px;

    transform: translate(${(props) => `${props.x}px, ${props.y}px`});
    font-size: 2rem;

    * {
        box-sizing: border-box;
    }
`;

const FamilyTree = () => {
    const history = useHistory();
    const ref = React.useRef(null);
    const [scale, setScale] = React.useState(0.4);
    const [rootId, setRootId] = React.useState(members[0].id);
    const [nodes, setNodes] = React.useState(members);

    const { onScreeDown, clicked } = useScrollHandlers(ref);
    const { scrollToCenter, zoomIn, zoomOut } = useToolkitHandlers(
        ref,
        scale,
        setScale
    );

    React.useEffect(() => {
        scrollToCenter();
    }, [rootId]);

    return (
        <StyledSection>
            <Navbar />
            <StyledFamilyContainer
                ref={ref}
                onPointerDown={onScreeDown}
                cursor={clicked ? 'grabbing' : 'grab'}
            >
                <StyledFamilyTree scale={scale}>
                    <ReactFamilyTree
                        nodes={nodes}
                        rootId={rootId}
                        width={WIDTH}
                        height={HEIGHT}
                        renderNode={(info) => (
                            <StyledCardWrapper
                                key={info.id}
                                x={info.left * (WIDTH / 2)}
                                y={info.top * (HEIGHT / 2)}
                            >
                                <MemberCard
                                    info={info}
                                    onCardClick={() =>
                                        history.push(`family/${info.id}`)
                                    }
                                    onRootClick={(id) => {
                                        setRootId(id);
                                        const newInfo = {
                                            ...info,
                                            parents: [],
                                            siblings: [],
                                        };
                                        setNodes([
                                            ...nodes.filter(
                                                (n) => n.id !== info.id
                                            ),
                                            newInfo,
                                        ]);
                                    }}
                                    isRoot={
                                        info.id === rootId ||
                                        info.spouses.some(
                                            (s) => s.id === rootId
                                        )
                                    }
                                />
                            </StyledCardWrapper>
                        )}
                    />
                </StyledFamilyTree>
            </StyledFamilyContainer>
            <Toolkit
                scrollToCenter={scrollToCenter}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
            />
        </StyledSection>
    );
};

export default FamilyTree;

const StyledMemberCard = Styled.div`
    position relative;
`;

const StyledRootIcon = Styled.div`
    position: absolute;

    top: 0;
    right: 0;

    width: 1em;
    height: 1em;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-top-left-radius: 50%;
    border-bottom-right-radius: 50%;

    background: white;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);

    &:hover {
        transition: 0.2s ease-in;
        box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.4);
    }

    transition: all 0.2s ease-out;

    cursor: pointer;

    user-select: none;
`;

const MemberCard = ({ info, onCardClick, onRootClick, isRoot }) => {
    return (
        <StyledMemberCard>
            {!isRoot && <StyledRootIcon onClick={() => onRootClick(info.id)} />}
            <Card info={info} onClick={onCardClick} />
        </StyledMemberCard>
    );
};

function useScrollHandlers(ref) {
    const [clicked, setClicked] = React.useState(false);
    const [scrollPos, setScrollPos] = React.useState({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
    });

    const setElementScroll = (e) => {
        const { current } = ref;
        if (!current) {
            return;
        }

        if (!clicked) {
            return;
        }

        const { x, y, top, left } = scrollPos;
        // Scroll the element
        current.scrollLeft = left - (e.clientX - x);
        current.scrollTop = top - (e.clientY - y);
    };
    const disableClicked = () => {
        setClicked(false);
    };

    React.useEffect(() => {
        document.addEventListener('pointerup', disableClicked);
        document.addEventListener('pointermove', setElementScroll);

        return () => {
            document.removeEventListener('pointerup', disableClicked);
            document.removeEventListener('pointermove', setElementScroll);
        };
    }, [clicked]);

    return {
        onScreeDown: (e) => {
            e.preventDefault();

            setClicked(true);
            setScrollPos({
                x: e.pageX,
                y: e.pageY,
                left: e.currentTarget.scrollLeft,
                top: e.currentTarget.scrollTop,
            });
        },
        clicked,
    };
}

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
        let newScale = scale + ZOOM_AMOUNT;
        if (newScale >= ZOOM_MAX) {
            newScale = ZOOM_MAX;
        }

        setScale(newScale);
    };

    const zoomOut = () => {
        let newScale = scale - ZOOM_AMOUNT;
        if (newScale <= ZOOM_MIN) {
            newScale = ZOOM_MIN;
        }

        setScale(newScale);
    };

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
