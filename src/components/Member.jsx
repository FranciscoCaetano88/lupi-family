import { React, Styled } from '../react/index';
import Text from './Text.jsx';
import Link from './Link.jsx';
import Portrait from './Portrait.jsx';
import BackArrow from './BackArrow.jsx';
import { portraits } from '../assets/images';
import themes from './themes';
import { parseText } from '../utils';
import images from '../assets/images';
import { COMPONENT_TYPES } from '../enums';

const StyledContainer = Styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;

    * {
        font-family: "ABeeZee";
        color: rgba(0, 0, 0, 0.6);
    }
`;

const Member = ({ member }) => {
    return (
        <StyledContainer>
            <LeftSection member={member} />
            <RightSection member={member} />
        </StyledContainer>
    );
};

export default Member;

const StyledLeftSection = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    min-width: 40%;
    height: 100%;

    background-color: ${themes.colors.background};
`;

const StyledTop = Styled.div`
    display: flex;

    width: 100%;
`;

const StyledSeparator = Styled.hr`
    width: 80%;

    margin-block-start: 0;
    margin-block-end: 0;
    
    border: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledTr = Styled.tr`
    font-size: ${themes.fonts.size.title_three}px;
`;

const StyledTdTitle = Styled.td`
    font-size: ${themes.fonts.size.normal};
    vertical-align: top;
    text-align: ${(props) => props.textAlign || 'right'};
    font-weight: bold;
    width: 50%;
    padding-right: 20px;
`;

const StyledTdContent = Styled.td`
    font-size: ${themes.fonts.size.normal};
    text-align: ${(props) => props.textAlign || 'left'};
    width: 50%;
`;

const LeftSection = ({ member }) => {
    const {
        id,
        name,
        birth,
        death,
        gender,
        parents,
        spouses,
        children,
        siblings,
    } = member;

    return (
        <StyledLeftSection>
            <StyledTop>
                <BackArrow
                    margin={20}
                    onClick={() => console.log('GO TO PREVIOUS ROUTE')}
                />
            </StyledTop>
            <Portrait src={portraits[id]} marginBottom={5} />
            <Text fontSize={themes.fonts.size.title_two}>{name}</Text>
            <StyledSeparator />
            <table style={{ padding: '20px' }}>
                <tbody>
                    <StyledTr>
                        <StyledTdTitle>Data Nascimento</StyledTdTitle>
                        <StyledTdContent>{birth}</StyledTdContent>
                    </StyledTr>
                    <StyledTr>
                        <StyledTdTitle>Data Óbito</StyledTdTitle>
                        <StyledTdContent>{death}</StyledTdContent>
                    </StyledTr>
                    <StyledTr>
                        <StyledTdTitle>Género</StyledTdTitle>
                        <StyledTdContent>{gender}</StyledTdContent>
                    </StyledTr>
                    <StyledTr>
                        <StyledTdTitle>Pais</StyledTdTitle>
                        <StyledTdContent>
                            {parents.map((p) => p.id).join(', ')}
                        </StyledTdContent>
                    </StyledTr>
                    <StyledTr>
                        <StyledTdTitle>Esposos</StyledTdTitle>
                        <StyledTdContent>
                            {spouses.map((s) => s.id).join(', ')}
                        </StyledTdContent>
                    </StyledTr>
                    <StyledTr>
                        <StyledTdTitle>Filhos</StyledTdTitle>
                        <StyledTdContent>
                            {children.map((c) => c.id).join(', ')}
                        </StyledTdContent>
                    </StyledTr>
                    <StyledTr>
                        <StyledTdTitle>Irmãos</StyledTdTitle>
                        <StyledTdContent>
                            {siblings.map((s) => s.id).join(', ')}
                        </StyledTdContent>
                    </StyledTr>
                </tbody>
            </table>
        </StyledLeftSection>
    );
};

const StyledRightSection = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100%;

    overflow: scroll;
`;

const StyledBiography = Styled.div`
    width: 100%;
`;

const StyledContainerBoth = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: auto;
    height: 100%;

    padding: 64px;
`;

const StyledColumn = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${themes.fonts.size.normal};
    float: left;
    width: ${(props) => props.cols};
`;

const StyledRow = Styled.div`
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`;

const RightSection = ({ member }) => {
    const splitter = /({{.+?}})/;
    const { biography, events } = member;

    return (
        <StyledRightSection>
            <StyledContainerBoth>
                <StyledBiography>
                    <div>
                        <Text
                            align={'left'}
                            fontSize={themes.fonts.size.title_two}
                        >
                            Biografia
                        </Text>
                        <div>
                            <Text
                                lineHeight={25}
                                align={'left'}
                                fontSize={themes.fonts.size.normal}
                                border={'1px solid rgba(0, 0, 0, 0.2)'}
                                padding={'20px'}
                            >
                                {parseText(biography, splitter, transform)}
                            </Text>
                        </div>
                    </div>
                </StyledBiography>
                <StyledBiography>
                    <div>
                        <Text
                            align={'left'}
                            fontSize={themes.fonts.size.title_two}
                        >
                            Eventos Importantes
                        </Text>
                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                padding: '20px',
                            }}
                        >
                            <StyledRow>
                                {Object.keys(events).map((key) => (
                                    <StyledColumn
                                        cols={`${
                                            100 / Object.keys(events).length
                                        }%`}
                                        key={`${key}-title`}
                                    >
                                        {key}
                                    </StyledColumn>
                                ))}
                            </StyledRow>
                            <StyledRow>
                                {Object.keys(events).map((key) => (
                                    <StyledColumn
                                        cols={`${
                                            100 / Object.keys(events).length
                                        }%`}
                                        key={`${key}-content`}
                                    >
                                        {parseText(
                                            events[key],
                                            splitter,
                                            transform
                                        )}
                                    </StyledColumn>
                                ))}
                            </StyledRow>
                        </div>
                    </div>
                </StyledBiography>
            </StyledContainerBoth>
        </StyledRightSection>
    );
};

function transform(string) {
    const [type, path, name] = string.replace(/{{|}}/g, '').split('|');
    if (type === COMPONENT_TYPES.image) {
        return <img key={name} src={images[path]} alt={name} />;
    }

    if (type === COMPONENT_TYPES.link) {
        return (
            <Link key={name} href={path}>
                {name}
            </Link>
        );
    }

    return string;
}
