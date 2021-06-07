import { React, Styled } from '../../react';

const StyledCarousel = Styled.div`
    display: flex;
    justify-content: space-between;
    width: fit-content;

    border-radius: 1rem;
    border: 1px solid black;
`;

const StyledButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.5em;
    ${(props) =>
        props.direction === 'left'
            ? `border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-right: 1px solid black;`
            : `border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-left: 1px solid black;`}

    font-weight: bold;
    color: white;
    background-color: black;

    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

const StyledNavigator = Styled.div`
    display: flex;
    flex-basis: 100%;
    max-width: 24em;

    overflow-x: scroll;
`;

const Carousel = ({ children }) => {
    const ref = React.useRef(null);
    const { scrollLeft, scrollRight } = useHandlers({ ref });

    return (
        <StyledCarousel>
            <StyledButton direction={'left'} onClick={scrollLeft}>
                {'<'}
            </StyledButton>
            <StyledNavigator ref={ref}>{children}</StyledNavigator>
            <StyledButton onClick={scrollRight}>{'>'}</StyledButton>
        </StyledCarousel>
    );
};

export default Carousel;

function useHandlers({ ref }) {
    const SCROLL_AMOUNT = 50;

    const scrollLeft = React.useCallback(() => {
        const { current: element } = ref;
        if (!element) {
            return;
        }

        element.scrollLeft -= SCROLL_AMOUNT;
    }, [ref]);

    const scrollRight = React.useCallback(() => {
        const { current: element } = ref;
        if (!element) {
            return;
        }

        element.scrollLeft += SCROLL_AMOUNT;
    }, [ref]);

    return {
        scrollLeft,
        scrollRight,
    };
}
