import React from 'react'
import { useState } from 'react'
import { BsSearch, BsCamera } from "react-icons/bs";
import styled from 'styled-components'
import background from '../images/background.jpg'

const SearchBar = ({onSearch}) => {

  const [ queryInput, setQueryResults ] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault();

      const term = queryInput.trim();

      if(term) {
        onSearch(term);
      }
    };

  return (
    <HeaderContainer>
      <TitleContainer>
        <div className="camera">
          <BsCamera />
        </div>
        <h1>Photos</h1>
      </TitleContainer>
      <SearchContainer>
        <Search>
          <Heading>
            The best free stock photos, <br /> royality free images by creators
          </Heading>
          <Form onSubmit={handleSubmit}>
            <input
              name="text"
              placeholder="Search free high-resolution photos"
              autoComplete='off'
              value={queryInput}
              onChange={(e) => setQueryResults(e.target.value)}
            />
            <button type="submit">
              <BsSearch />
            </button>
          </Form>
        </Search>
      </SearchContainer>
    </HeaderContainer>
  );
}

export default SearchBar

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 600px;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${background});
    width: 100%;
    min-height: 600px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: .4;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
  padding: 2rem;

  .camera {
    font-size: clamp(3rem, 4vw, 6rem);
    color: #fff;
    margin-right: 0.3rem;
  }

  h1 {
    color: #7b28a4;
    font-size: clamp(2rem, 2vw, 3.5rem);
    margin-top: 0.5rem;
    font-family: "Yellowtail", cursive;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Search = styled.div`
  display: flex;
  flex-direction: column;
`

const Heading = styled.h2`
  font-size: clamp(1.8rem, 2vw, 3.5rem);
  color: #fff;
  z-index: 100;
`

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  margin-top: 2rem;
  background-color: #fff;
  width: 35vw;
  border-radius: 5px;
  padding: 0.8rem;

  input {
    flex: 1;
    font-size: clamp(1.6rem, 1vw, 2rem);
    color: #404040;
    border: none;
    outline: none;

    &:focus {
      outline-style: none;
      box-shadow: none;
      border-color: transparent;
    }
  }

  button {
    font-size: clamp(3rem, 2vw, 4rem);
    color: #404040;
    border: none;
    background-color: #fff;
  }

  @media screen and (max-width: 800px) {
    width: 70vw;
  }
`;