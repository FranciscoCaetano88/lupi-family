import uuid from 'uuid/v1';
import { GENDER } from '../enums';

export function getDefaultMember() {
    return {
        id: uuid(),
        name: '',
        gender: GENDER.male,
        birth: '',
        death: '',
        parents: [],
        spouses: [],
        children: [],
        siblings: [],
        profession: '',
        biography: '',
        events: [],
    };
}

export function getDefaultStory() {
    return {
        id: uuid(),
        title: '',
        year: '',
        description: '',
        images: [],
    };
}
