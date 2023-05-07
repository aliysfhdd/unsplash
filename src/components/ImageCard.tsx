import React, { useState } from 'react';
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { createPortal } from "react-dom";
import ModalImage from "./ModalImage";
import styled from "styled-components";

const ImageCard = ({image}: { image:Basic }) => {
  const [showFullImg, setShowFullImg] = useState(false);
  return (
    <Wrapper>
      <div>
        <p>Desc: {image.description}</p>
        <p>By: {image.user.name}</p>
      </div>
      <img loading="lazy" onClick={()=>setShowFullImg(true)} src={image.urls.thumb} alt={image.alt_description || ''} width={'50%'} height={'50%'}/>
      {showFullImg && createPortal(<ModalImage alt={image.alt_description} url={image.urls.full} onClose={()=>setShowFullImg(false)}/>, document.body)}
    </Wrapper>
  );
};

const Wrapper= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  align-items: center;
  flex-grow: 1;
`
export default ImageCard;
