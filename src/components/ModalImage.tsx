import React, { useState } from 'react';
import styled from "styled-components";

const ModalImage = ({url,alt, onClose}) => {
  const [finishLoad, setFinishLoad] = useState(false);
  return (
    <Modal onClick={onClose}>
      {!finishLoad && <ImgLoader>Loading Full Image</ImgLoader>}
        <ImageFull onLoad={()=>setFinishLoad(true)} src={url} alt={alt}/>
    </Modal>
  );
};

const Modal= styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageFull = styled.img`
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 1200px;
  max-height: 90%;
  object-fit: contain;
`

const ImgLoader= styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`
export default ModalImage;
