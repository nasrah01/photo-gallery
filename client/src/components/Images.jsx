import { useState } from 'react'
import styled from 'styled-components'
import { FaHeart } from "react-icons/fa";
import { IoMdClose } from 'react-icons/io'

const Images = ({data}) => {

  const [ likes, setItemLike ] = useState(false)
  const [ imgEnlarge, setImgSize ] = useState(false)
  const [ selectedImg, setImg] = useState('')

  const capitalize = (name) => {
    const formatted = name.charAt(0).toUpperCase() + name.slice(1);
    return formatted;
  }

  try {
    
  } catch (error) {
    
  }

  const getImg = (img) => {
      setImgSize(true)
      setImg(img)
  }

  const addLike = () => {
    console.log(imgEnlarge)
  }

  return (
    <>
      {
        imgEnlarge === true && (
        <LargeFormat>
          <Close onClick={() => setImgSize(false)}>
            <IoMdClose />
          </Close>
          <Popup>
            <img src={selectedImg} alt='selected' />
          </Popup>
      </LargeFormat>
        )
      }
      <ImageGallery>
        {data.map((photo) => (
          <Container key={photo.id}>
            <ImageContainer>
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </ImageContainer>
            <LinkBlock onClick={() => getImg(photo.urls.regular)}>
              <Icon onClick={() => {
                setImgSize(false);
                setImg(null);
                addLike()
                }}>
                <div>
                  <FaHeart />
                </div>
              </Icon>
              <Profile>
                <Creator onClick={() => {console.log('creator')}}>
                  <img src={photo.user.profile_image.medium} alt="user" />
                </Creator>
                <CreatorName>{capitalize(photo.user.first_name)}</CreatorName>
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
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    height: 70%;
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
`

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
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`

const ImageContainer = styled.div`

  img {
    width: 100%;
    padding-bottom: 15px;
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
`

const CreatorName = styled.div`
  color: #fff;
  font-size: 1.8rem;
  padding-left: .5rem;

  @media screen and (max-width: 900px) {
    font-size: 1.4rem;
  }
`

const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem;
  cursor: pointer;

  div {
    color: #fff;
    background-color: #ff1493;
    border-radius: 5px;
    font-size: 35px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #e6007a;
    }
  }
`;