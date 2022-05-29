import styled from 'styled-components'
import { FaHeart } from "react-icons/fa";

const Image = ({photo}) => {

  const capitalize = (name) => {
    const formatted = name.charAt(0).toUpperCase() + name.slice(1);
    return formatted;
  };

  return (
    <Container>
      <ImageContainer>
        <img src={photo.urls.regular} alt={photo.alt_description} />
      </ImageContainer>
      <LinkBlock>
        <Icon
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="like">
            <FaHeart />
          </div>
        </Icon>

        <Profile>
          <a href={photo.user.links.html} target="_blank" rel="noreferrer">
            <Creator>
              <img src={photo.user.profile_image.medium} alt="user" />
            </Creator>
            <CreatorName>{capitalize(photo.user.first_name)}</CreatorName>
          </a>
        </Profile>
      </LinkBlock>
    </Container>
  );
}

export default Image

const Container = styled.div`
  width: 100%;
  position: relative;
`;

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
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 480px) {
    position: static;
    background: transparent;
    opacity: 1;
    flex-direction: row-reverse;
    padding: 0.5rem 1rem 5rem 1rem;
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
