import { React, Styled, Router } from '../react/index';
import members from '../assets/members';

// TODO: use family-tree package
const FamilyTree = () => {
    return (
        <div>
            {members.map((m, index) => (
                <div key={index}>{m.name}</div>
            ))}
        </div>
    );
};

export default FamilyTree;
