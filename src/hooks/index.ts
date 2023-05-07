import { useEffect, useRef, useState } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";

export const useInfiniteScrollRef = (image:Basic[],query:string, hasReachEnd:boolean): [React.MutableRefObject<Element | undefined>, number, boolean] => {
  const compRef = useRef<Element>();
  const [page, setPage] = useState<number>(1);
  const [doReset, setDoReset] = useState(true);
  useEffect(() => {
    setDoReset(false)
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasReachEnd) {
        setTimeout(()=>{
          setPage((prevState) => prevState + 1)
        },1000)
      }
    });
    if (compRef.current && typeof observer.observe == "function") observer.observe(<Element>compRef.current);
    return () => {
      if (compRef.current) observer.unobserve(<Element>compRef.current);
    };
  }, [image]);

  useEffect(() => {
    setPage(1)
    setDoReset(true)
  }, [query]);

  return [compRef, page, doReset];
};

const useDebounce=(value: string)=>{
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), 500)
    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return debouncedValue
}

export default useDebounce
