import { useState } from 'react'
import styled from 'styled-components'
import { FaHeart } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io'
import { AiFillLike } from 'react-icons/ai'
import { FiInstagram } from 'react-icons/fi'

const Images = ({data}) => {

  const [ likes, setItemLike ] = useState()
  const [ imgEnlarge, setImgSize ] = useState(false)
  const [ selectedImg, setImg] = useState('')

  const capitalize = (name) => {
    const formatted = name.charAt(0).toUpperCase() + name.slice(1);
    return formatted;
  }

  const getImg = (img) => {
      setImgSize(true)
      setImg(img)
      console.log(imgEnlarge)
  }

  const addLike = (id) => {
    setItemLike(...id)
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
          <Container key={photo.id} onClick={() => getImg(photo)}>
            <ImageContainer>
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </ImageContainer>
            <LinkBlock>
              <Icon
                onClick={(e) => {
                  e.stopPropagation();
                  addLike(photo.id);
                }}
              >
                <div className="like">
                  <FaHeart />
                </div>
              </Icon>

              <Profile
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a
                  href={photo.user.links.html}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Creator>
                    <img src={photo.user.profile_image.medium} alt="user" />
                  </Creator>
                  <CreatorName>{capitalize(photo.user.first_name)}</CreatorName>
                </a>
              </Profile>
            </LinkBlock>
          </Container>
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
  height: 80%;

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
  padding: 2rem;
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

const Container = styled.div`
  width: 100%;
  position: relative;
`

const ImageContainer = styled.div`

  img {
    width: 100%;
    padding-bottom: 15px;

    @media screen and (max-width: 480px) {
      padding-bottom: 0;
    }
  }
`;

const LinkBlock = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
  left: 0%;
  width: 100%;
  height: calc(100% - 15px);
  overflow: hidden;
  cursor: zoom-in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: all .5s ease;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 480px) {
    position: static;
    background: transparent;
    opacity: 1;
    flex-direction: row-reverse;
    padding: .5rem 1rem 5rem 1rem;
    cursor: default;
  
  }
`;

const Creator = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0;
    border-radius: 50%;
  }

  @media screen and (max-width: 900px) {
    height: 35px;
    width: 35px;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  cursor: pointer;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`;

const CreatorName = styled.div`
  color: #fff;
  font-size: clamp(1.6rem, 1vw, 1.8rem);
  padding-left: 0.5rem;

  @media screen and (max-width: 900px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 480px) {
    color: #404040;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;
  cursor: pointer;

  .like {
    color: #a9a9a9;
    background-color: #fff;
    border-radius: 5px;
    font-size: 35px;
    width: 40px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      color: #000;
    }
  }

  .like__clicked {
    color: #fff;
    background-color: #ff1493;

    &:hover {
      background-color: #ca046e;
      color: #fff;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 0;
    border: 1px solid #c4c1c1;
    border-radius: 5px;
  }
`;