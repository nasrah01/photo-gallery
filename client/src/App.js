import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "./components/SearchBar";

const App = ()  => {
  const [data, setPhotosResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [phrase, setPhrase] = useState('fashion');
  const api = "0mlTAtb3057obU5Q167m6QqhVNhY7OIhcdPpV0D1bgE";

  const searchPhotos = (term) => {
    setPhrase(term)
    setPhotosResponse([])
  }

  const getPhotos = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${phrase}&client_id=${api}`
      )
      .then((response) => {
        data.length ?
        setPhotosResponse([...data, ...response.data.results]) : setPhotosResponse(response.data.results)
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

  console.log(data)
  
  return (
    <div>
      <SearchBar onSearch={searchPhotos}/>
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={() => getPhotos()}
          hasMore={true}
          loader={<h2>...loading</h2>}
        >
          {data.map((photo, index) => (
            <img key={index} src={photo.urls.regular} alt="random" />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
