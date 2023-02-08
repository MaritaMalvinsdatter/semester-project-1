export const API_HOST_URL = 'https://nf-api.onrender.com';
export const API_CONST = '/api/v1';
export const API_AUCTION_CONST = '/auction';
export const API_LISTINGS_CONST = '/listings';
export const API_AUCTION_URL = `${API_HOST_URL}${API_CONST}${API_AUCTION_CONST}`;
export const API_LISTINGS_URL = `${API_AUCTION_URL}${API_LISTINGS_CONST}`;

console.log(API_LISTINGS_URL)


// export const API_POST_AUTHOR = '_author=true&_reactions=true&_comments=true';
// export const API_AUTHOR_URL = `${API_SOCIAL_URL}${API_POSTS_BASE}/?${API_POST_AUTHOR}`;

