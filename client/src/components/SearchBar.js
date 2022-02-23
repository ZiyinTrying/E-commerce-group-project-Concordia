import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ItemsContext } from "./ItemsContext";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { items } = useContext(ItemsContext);
  const history = useHistory();

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const reset = () => {
    setInput("");
  };
  // go to the item detail page every time click on a prediction, and then empty the search bar
  const handleSelect = (itemId) => {
    history.push(`/item/${itemId}`);
    reset();
  };
  // try to make an array with all predictions. enter more than 2 characters to trigger the filter and return the name of items that includes the input characters.
  let matchedItems = [];
  if (input.length >= 2) {
    matchedItems = items.filter((suggestion) => {
      return suggestion.name.toLowerCase().includes(input.toLowerCase());
    });
  }

  return (
    <Wrapper>
      <Search>
        <SearchInput
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search"
        />
        {/* when there is more than one item in the array, start to map them out and render */}
        {matchedItems.length >= 1 && (
          <SuggestList>
            {/* try to get the input character's index on the prediction name */}
            {matchedItems.map((suggestion) => {
              let index = suggestion.name
                .toLowerCase()
                .indexOf(input.toLowerCase());
              // before the prediction char is normal font weight, all the rest predictions are bold.
              let normalText = suggestion.name.slice(0, index + input.length);
              let boldText = suggestion.name.slice(index + input.length);
              return (
                <SuggestItem
                  key={suggestion._id}
                  onClick={() => handleSelect(suggestion._id)}
                >
                  <Span>
                    {normalText}
                    <Prediction>{boldText}</Prediction>
                  </Span>
                  <Category>
                    {" "}
                    in <Purple>{suggestion.category}</Purple>
                  </Category>
                </SuggestItem>
              );
            })}
          </SuggestList>
        )}
      </Search>
      <Clear onClick={reset}>Clear</Clear>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;

  margin-top: 20px;
`;
const SearchInput = styled.input`
  background: var(--color-light-grey);
  padding: 10px;
  border-radius: 8px;
  border: none;
  width: 300px;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Search = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const SuggestList = styled.ul`
  margin: 8px 8px;

  border-radius: 5px;
  box-shadow: 0px 3px 10px 5px var(--color-dark-grey);
  width: 400px;
  padding: 10px;
  background-color: white;
  position: absolute;
  top: 75px;
  z-index: 200;
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: var(--color-dark-grey);
`;
const SuggestItem = styled.li`
  padding: 10px 5px;
  cursor: pointer;
  transition: background-color 300ms ease-in-out;

  &:hover,
  & :active {
    background-color: rgb(165, 226, 80, 30%);
  }
`;
const Span = styled.span``;

const Clear = styled.button`
  width: 70px;
  height: 35px;
  border: 3px solid var(--color-lime);
  border-radius: 15px;
  padding: 0px;
  color: var(--color-lime);
  background-color: var(--color-dark-grey);
  margin-top: 5px;
  margin-left: -70px;
  transition: transform 300ms ease-in-out;
  text-align: center;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const Prediction = styled.span`
  font-weight: 600;
`;
const Category = styled.span`
  font-style: italic;
`;
const Purple = styled.span`
  color: #9853c0;
`;
