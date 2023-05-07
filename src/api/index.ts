import { createApi } from "unsplash-js";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});
export const getPhotoBySearch= async (query:string,page:number):Promise<Photos | [string, ...string[]]> =>{
  const { response,errors } = await unsplash.search.getPhotos({
    query,
    page,
    perPage: 10,
    orientation: 'portrait',
  })
  if(response !== undefined){
    return response
  }
  return errors
}
