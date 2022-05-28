import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/Header";
import Images from './components/Images'
import styled from 'styled-components'

const App = ()  => {
  const [data, setPhotosResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [phrase, setPhrase] = useState('random');
  const [ resultsError, setResultsError ] = useState(false)
  const api = process.env.REACT_APP_API_KEY;

  const searchPhotos = (term) => {
    setPhrase(term)
    setPhotosResponse([])
  }

  // when request returns no results

  const getPhotos = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=17&query=${phrase}&client_id=${api}`
      )
      .then((response) => {
        if(response.data.results.length === 0) {
          setResultsError(true)
          console.log('nothing found')
        } else {
          console.log(response.data.results.length);
          data.length
            ? setPhotosResponse([...data, ...response.data.results])
            : setPhotosResponse(response.data.results);
        }
      })
      .catch(() => {
        console.log("something went wrong with request");
      });
      setPage(page + 1)
  };

  useEffect(() => {
   getPhotos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrase])
  
  return (
    <div>
      <Header onSearch={searchPhotos}/>
      {
        resultsError && (
        <Results>Nothing found</Results>
        )
      }
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={() => getPhotos()}
          hasMore={true}
          loader={<h2>...loading</h2>}
        >
          <Images data={data} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;

const Results = styled.div``


