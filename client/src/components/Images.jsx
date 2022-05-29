import { useState } from 'react'
import styled from 'styled-components'
import Image from './Image';
import { IoMdClose } from 'react-icons/io'
import { AiFillLike } from 'react-icons/ai'
import { FiInstagram } from 'react-icons/fi'

const Images = ({data}) => {

  const [ imgEnlarge, setImgSize ] = useState(false)
  const [ selectedImg, setImg] = useState('')

  const capitalize = (name) => {
    const formatted = name.charAt(0).toUpperCase() + name.slice(1);
    return formatted;
  }

  const getImg = (img) => {
      setImgSize(true)
      setImg(img)
      console.log('clicked')
  }

  return (
    <>
      {imgEnlarge && (
        <LargeFormat>
          <Close onClick={() => setImgSize(false)}>
            <IoMdClose />
          </Close>
          <Popup>
            <UserDetails>
              <Avatar>
                <img
                  src={selectedImg.user.profile_image.large}
                  alt={selectedImg.alt_description}
                />
              </Avatar>
              <UserDetail>
                <div className="fullname">
                  <p>
                    {!selectedImg.user.first_name
                      ? ""
                      : capitalize(selectedImg.user.first_name)}
                  </p>
                  <p>
                    {!selectedImg.user.last_name
                      ? ""
                      : capitalize(selectedImg.user.last_name)}
                  </p>
                </div>
                <p className="username">@{selectedImg.user.username}</p>
              </UserDetail>
            </UserDetails>
            <Photo>
              <img
                src={selectedImg.urls.regular}
                alt={selectedImg.alt_description}
              />
            </Photo>
            <UserStats>
              <div>
                <h2 className="icon">
                  <AiFillLike />
                </h2>
                <p>{selectedImg.likes}</p>
              </div>
              <div>
                <h2 className="location">Location</h2>
                <p>
                  {!selectedImg.user.location
                    ? "--"
                    : selectedImg.user.location}
                </p>
              </div>
              <div>
                <h2 className="icon">
                  <FiInstagram />
                </h2>
                <p>
                  {!selectedImg.user.instagram_username
                    ? "--"
                    : selectedImg.user.instagram_username}
                </p>
              </div>
            </UserStats>
          </Popup>
        </LargeFormat>
      )}
      <ImageGallery>
        {data.map((photo) => (
          <div key={photo.id} onClick={() => getImg(photo)}>
            <Image photo={photo} />
          </div>
        ))}
      </ImageGallery>
    </>
  );
}

export default Images

const LargeFormat = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .6);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Popup = styled.div`
  background: #fff;
  width: 80%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
  }
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  height: 50px;
  width: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;

  .fullname {
    display: flex;
    
    p {
      font-size: 1.6rem;
    }

    p:first-child {
      padding-right: .5rem;
    }
  }

  .username {
    font-size: 1.4rem;
    color: #404040;
  }
`

const Photo = styled.div`
  display: flex;
  justify-content: center;
  height: 85%;

  img {
    flex: 1;
    min-width: 0;
    min-height: 0;
    object-fit: contain;
  }
`;

const UserStats = styled.div`
  display: flex;
  align-items: flex-end;

  div {
    padding-right: 8rem;

    p {
      font-size: 1.5rem;
    }

    @media screen and (max-width: 480px) {
      padding-right: 4rem;
    }
  }

  .location {
    font-size: 1.5rem;
    color: #a9a9a9;
    font-weight: normal;
    padding-bottom: 0.5rem;
  }

  .icon {
    font-size: 3rem;
    color: #a9a9a9;
  }
`;

const Close = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem 2rem;
  color: #fff;
  font-size: 36px;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    color: #000;
  }
`;

const ImageGallery = styled.div`
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  -webkit-column-width: 33%;
  -moz-column-width: 33%;
  column-width: 33%;
  column-gap: 15px;
  padding: 4rem calc((100vw - 1300px) / 2);

  @media screen and (max-width: 1400px) {
    padding: 4rem 1rem;
  }

  @media screen and (max-width: 900px) {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
    -webkit-column-width: 50%;
    -moz-column-width: 50%;
    column-width: 50%;
  }

  @media screen and (max-width: 480px) {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    -webkit-column-width: 100%;
    -moz-column-width: 100%;
    column-width: 100%;
    padding: 4rem 0;
  }
`;