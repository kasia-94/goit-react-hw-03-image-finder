import axios from 'axios';

const KEY = '29694222-7e0570b8fa43a8c6cfc4bb193';

export function fetchPhoto(searchQuery, page) {
  return axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
