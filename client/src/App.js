import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/Header";
import Images from './components/Images'
import styled from 'styled-components'
import { AiFillPicture } from 'react-icons/ai'
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const App = ()  => {
  const [data, setPhotosResponse] = useState([]);
  const [stats, setResultStats] = useState()
  const [page, setPage] = useState(1);
  const [phrase, setPhrase] = useState('random');
  const api = process.env.REACT_APP_API_KEY;

  const searchPhotos = (term) => {
    setPhrase(term)
    setPhotosResponse([])
  }

  const getPhotos = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=17&query=${phrase}&client_id=${api}`
      );
      console.log(response)
      data.length
        ? setPhotosResponse([...data, ...response.data.results])
        : setPhotosResponse(response.data.results);

        setResultStats(response.data)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }

    setPage(page + 1);
  };

  useEffect(() => {
    getPhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrase])
    
  return (
    <div>
      <Header onSearch={searchPhotos} />
      {data.length ? (
        <>
          <Results>
            <Icon>
              <AiFillPicture />
            </Icon>
            <Stats>
              <p>Photos:</p>
              <p>{stats.total}</p>
            </Stats>
          </Results>
          <Gallery>
            <InfiniteScroll
              dataLength={data.length}
              next={() => getPhotos()}
              hasMore={true}
              loader={<h2>...loading</h2>}
            >
              <Images data={data} />
            </InfiniteScroll>
          </Gallery>
        </>
      ) : (
        <NoResults>
          <MdOutlineReportGmailerrorred size={20} />
          <p>No results found for </p>
          <span>{phrase}</span>
        </NoResults>
      )}
    </div>
  );
}

export default App;

const Results = styled.div`
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2rem;
  padding: 0 2rem;
`

const Icon = styled.div`
  font-size: 36px;
`

const Stats = styled.div`
  display: flex;
  padding: 0 .5rem;

  p {
    font-size: 1.4rem;
    padding-left: .3rem
  }
`

const Gallery = styled.div``

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;

  p {
    font-size: 1.6rem;
    padding: .5rem;
  }

  span {
    font-size: 1.6rem;
    font-weight: bold;
  }
`