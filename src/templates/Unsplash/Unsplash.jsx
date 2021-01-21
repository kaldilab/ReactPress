import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import * as GetUtils from 'utils/GetUtils';
import * as GetDate from 'utils/GetDate';
import * as GetStorage from 'utils/GetStorage';

const ApiUnsaplash = 'https://api.unsplash.com';

export default function Unsplash(imageType, imageTerms, imageOrderBy, imageOrientation, imageColor, imagePage, imagePerPage) {
  const isMounted = useRef(false);
  const [unsplashImages, setUnsplashImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(
    () => {
      isMounted.current = true;
      const today = GetDate.FormatDate(GetUtils.GetByDay(), 'yyyy_MM_dd');
      const storeKey = 'Unsplash_' + [imageType, imageTerms, imageOrderBy, imageOrientation, imagePage, today].join('_');
      const clientId = 'YOUR_CLIENT_ID';
      // Topics
      const getUnsplashTopics = async () => {
        // animals, athletics, architecture, arts-culture, business-work, current-events, experimental, fashion, film, food-drink, health-wellness, history, interiors, nature, people, spirituality, technology, textures-patterns, travel, wallpapers
        await axios
          .get(`${ApiUnsaplash}/topics/${imageTerms}/photos`, {
            params: {
              client_id: clientId,
              page: imagePage,
              per_page: imagePerPage,
              order_by: imageOrderBy, // relevant, latest, popular
              orientation: imageOrientation, // landscape, portrait, squarish
            }
          })
          .then(response => {
            console.log(response);
            const responseConfig = response.config.url;
            const responseType = responseConfig.split('/')[3];
            const responseTerms = responseConfig.split('/')[4];
            const responseOrderBy = response.config.params.order_by;
            const responseOrientation = response.config.params.orientation;
            const responseData = response.data;
            const extractResponseData = responseData.map(item =>
            ({
              'type': responseType,
              'terms': responseTerms,
              'orderby': responseOrderBy,
              'orientation': responseOrientation,
              'id': item.id,
              'urls': item.urls,
              'hash': item.blur_hash,
              'description': item.description,
            })
            );
            setUnsplashImages(extractResponseData);
            setIsLoading(false);
            GetStorage.SetLocalStore(storeKey, extractResponseData);
          })
          .catch(error => console.log(error));
      }
      // Search
      const getUnsplashSearch = async () => {
        await axios
          .get(`${ApiUnsaplash}/search/photos`, {
            params: {
              client_id: clientId,
              query: imageTerms,
              page: imagePage,
              per_page: imagePerPage,
              order_by: imageOrderBy, // relevant, latest
              orientation: imageOrientation, // landscape, portrait, squarish
              color: imageColor, // black_and_white, black, white, yellow, orange, red, purple, magenta, green, teal, blue
            }
          })
          .then(response => {
            console.log(response);
            const responseConfig = response.config.url;
            const responseType = responseConfig.split('/')[3];
            const responseTerms = response.config.params.query;
            const responseOrderBy = response.config.params.order_by;
            const responseOrientation = response.config.params.orientation;
            const responseData = response.data.results;
            const extractResponseData = responseData.map(item =>
            ({
              'type': responseType,
              'terms': responseTerms,
              'orderby': responseOrderBy,
              'orientation': responseOrientation,
              'id': item.id,
              'urls': item.urls,
              'hash': item.blur_hash,
              'description': item.description,
            })
            );
            setUnsplashImages(extractResponseData);
            setIsLoading(false);
            GetStorage.SetLocalStore(storeKey, extractResponseData);
          })
          .catch(error => console.log(error));
      }
      if (storeKey in localStorage) {
        setIsLoading(false);
        setUnsplashImages(GetStorage.GetLocalStore(storeKey));
      } else {
        if (imageType === 'topics') {
          getUnsplashTopics();
        } else if (imageType === 'search') {
          getUnsplashSearch();
        }
      }
      return () => {
        isMounted.current = false;
      }
    },
    [imageColor, imageOrderBy, imageOrientation, imagePage, imagePerPage, imageTerms, imageType]
  )

  return [unsplashImages, isLoading];
}