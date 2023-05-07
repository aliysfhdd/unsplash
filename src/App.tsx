import './App.css'
import styled from "styled-components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getPhotoBySearch } from "./api";
import useDebounce, { useInfiniteScrollRef } from "./hooks";
import ImageCard from "./components/ImageCard";
import Loading from "./components/Loading";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import { Basic } from "unsplash-js/dist/methods/photos/types";

function App() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query)
  const [imageList, setImageList] = useState<Basic[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const hasReachEnd = useRef(false);
  const [lastElement, page, doReset] = useInfiniteScrollRef(imageList,debouncedQuery,hasReachEnd.current);
  const [isLoading, setIsLoading] = useState(false);
  const showMore= imageList.length >= page * 10
  useEffect(() => {
    (async ()=> {
      if(doReset) return
      setIsLoading(true)
      const resp= await getPhotoBySearch(debouncedQuery,page)
      if((resp as Photos).results){
        const {results, total_pages}=(resp as Photos)
        setImageList((prevState)=>[...prevState,...results])
        setTotalPage(total_pages)
      }
      setIsLoading(false)
    })()
  }, [page,doReset]);

  useEffect(() => {
    setImageList([])
    setTotalPage(1)
  }, [debouncedQuery]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  useEffect(() => {
    if(page>totalPage) hasReachEnd.current=true
    else hasReachEnd.current=false
  }, [totalPage, page]);


  return (
    <Wrapper>
      <h2>Search Image</h2>
      <input onChange={handleSearch}/>
      <ListWrapper>
        {imageList && imageList.map((data) => <ImageCard image={data} key={data.id} />)}
      </ListWrapper>
      {showMore &&
        <Loading ref={lastElement} text={'Loading more image...'}/>
      }
      {isLoading && !showMore &&
        <Loading text={'Loading more image...'}/>
      }
    </Wrapper>
  )
}

const Wrapper=styled.div`
`

const ListWrapper =styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #747bff;
  border-radius: 15px;
`

export default App
