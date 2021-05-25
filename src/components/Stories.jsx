import { React, Styled, Router } from '../react/index';
import stories from '../assets/stories';

const Stories = () => {
    return (
        <div>
            {stories
                .sort((s1, s2) => s1 - s2)
                .map((s, index) => (
                    <div key={index}>{s.title}</div>
                ))}
        </div>
    );
};

export default Stories;
