import { React, Router } from '../react';

import Main from './Main.jsx';
import FamilyTree from './Family-tree.jsx';
import Member from './commons/Member.jsx';
import Stories from './Stories.jsx';
import Story from './Story.jsx';

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

export default (
    <BrowserRouter>
        <Switcher />
    </BrowserRouter>
);

function splitIdFrom(pathname) {
    return pathname.split('/').filter((s) => s)[1];
}
