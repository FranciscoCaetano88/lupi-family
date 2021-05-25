import './style.css';
import { React, Dom, Router } from './react';

import Main from './components/Main.jsx';
import FamilyTree from './components/Family-tree.jsx';
import Stories from './components/Stories.jsx';
import Story from './components/Story.jsx';

const { BrowserRouter, Switch, Route } = Router;

Dom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            <Route path="/family">
                <FamilyTree />
            </Route>
            <Route path="/story/:id">
                <Story />
            </Route>
            <Route path="/stories">
                <Stories />
            </Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
