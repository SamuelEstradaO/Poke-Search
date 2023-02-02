import styled from "styled-components"
import InfiniteLoader from "react-window-infinite-loader"
import { FixedSizeList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import ListItem from "./ListItem"
import Loader from "./Loader"

const List = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    column-gap: 1rem;
    row-gap: 1rem;
    height: 80%;
    margin: 0 3%;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #ededed;
    max-width: 340px;
    @media (min-width: 768px){
        padding: 0 1rem;   
        justify-content: normal;  
        display: grid;
        grid-template-rows: auto;
        overflow-x: hidden;
        overflow-y: auto;
    }
    @media (min-width: 1444px){
        margin: 0 20%;
    }
`

const PokemonList = ({ hasNextPage, items, isFetchingMorePokemons, loadNextPage, handleClick }) => {
    console.log("hey");
    const itemCount = hasNextPage ? items.length + 1 : items.length;
    const loadMoreItems = isFetchingMorePokemons ? () => { } : loadNextPage;
    const isItemLoaded = index => !hasNextPage || index < items.length;
    const Item = ({ index, style }) => {
        let content;
        if (!isItemLoaded(index)) {
            content = <Loader />;
        } else {
            content = <ListItem style={style} pokemon={items[index]} handleClick={handleClick} />;
        }
        console.log(content);
        return content;
    };
    return (<List>
        <AutoSizer>
            {({ height, width }) =>
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                >
                    {({ onItemsRendered, ref }) => (
                        <FixedSizeList
                            itemCount={itemCount}
                            height={height}
                            itemSize={50}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                            width={width}
                        >
                            {Item}
                        </FixedSizeList>
                    )}

                </InfiniteLoader>}
        </AutoSizer>
    </List>)
}

export default PokemonList;