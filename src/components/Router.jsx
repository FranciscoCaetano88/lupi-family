import { React, Router, Styled } from '../react';

import Main from './Main.jsx';
import FamilyTree from './FamilyTree.jsx';
import Member from './commons/Member.jsx';
import Stories from './Stories.jsx';
import Story from './Story.jsx';

import themes from './themes';
import stories from '../assets/stories';
import members from '../assets/members';

const { BrowserRouter, Switch, Route, useLocation } = Router;

const RouteMember = () => {
    const location = useLocation();
    const id = splitIdFrom(location.pathname);
    const member = members.find((s) => s.id === id);

    return <Member member={member} />;
};

const RouteStory = () => {
    const location = useLocation();
    const id = splitIdFrom(location.pathname);
    const story = stories.find((s) => s.id === id);

    return <Story story={story} />;
};

const Switcher = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            <Route path="/family/:id">
                <RouteMember />
            </Route>
            <Route path="/family">
                <FamilyTree members={members} />
            </Route>
            <Route path="/stories/:id">
                <RouteStory />
            </Route>
            <Route path={'/stories'}>
                <Stories stories={stories} />
            </Route>
            <RouteStory />
            <RouteMember />
        </Switch>
    );
};

const StyledRoot = Styled.div`
    width: 100%;
    height: 100%;

    font-family: ${themes.fonts.family.primary}, ${themes.fonts.family.secondary};
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.6;

    h1,
    h2,
    h3 {
        font-weight: 900;
        line-height: 1;
        color: rgba(60, 100, 120, 1);
    }

    h1 {
        font-size: 2em;
    }

    h1,
    h2,
    h3,
    p {
        margin-bottom: 2rem;
        max-width: 72ch;
    }

    p {
        color: rgba(0, 0, 0, 0.7);
    }

    img {
        display: block;
        max-width: 100%;
    }

    section {
        padding: 3rem 0;
    }

    @media (min-width: 41em) {
            font-size: 1.7rem;
    }
`;

export default (
    <StyledRoot>
        <BrowserRouter>
            <Switcher />
        </BrowserRouter>
    </StyledRoot>
);

function splitIdFrom(pathname) {
    return pathname.split('/').filter((s) => s)[1];
}
