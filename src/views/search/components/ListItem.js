import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Li = styled.li`
    padding: 10px;
    font-size: calc(${({ theme }) => theme.font.size.mobile.medium} * 0.8);
    border-bottom: 1px solid #d4d4d4;
    @media(min-width: 768px) {
        font-size: calc(${({ theme }) => theme.font.size.desktop.medium} * 0.8);
    }
    &:hover {
        background-color: rgba(1, 252, 231, 0.8);
    }
    & .selected{
        background-color: rgba(1, 252, 231, 0.8);
    }
`
const Item = styled(Link)`
    text-decoration: none;
    color: black;
`

const ListItem = forwardRef(({ item }, ref) => {

    return (<Item to={`/pokemon/${item.url.slice(42, -1)}`} ref={ref}>
        <Li>
            #{item.url.slice(42, -1)} {item.name}
        </Li>
    </Item>)
},)

export default ListItem;