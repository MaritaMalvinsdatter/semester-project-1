export const API_HOST_URL = 'https://nf-api.onrender.com';
export const API_CONST = '/api/v1';
export const API_AUCTION_CONST = '/auction';
export const API_LISTINGS_CONST = '/listings';
export const API_PROFILE_CONST = '/profiles/';
export const API_SELLER = '_seller=true&_bids=true';
export const DESC_ORDER = 'sort=created&sortOrder=desc&_active=true';
export const API_AUCTION_URL = `${API_HOST_URL}${API_CONST}${API_AUCTION_CONST}`;
export const API_AUCTION_PROFILE = `${API_AUCTION_URL}${API_PROFILE_CONST}`
export const API_LISTINGS_URL = `${API_AUCTION_URL}${API_LISTINGS_CONST}`;
export const API_SELLER_URL = `${API_LISTINGS_URL}/?${API_SELLER}`;
export const API_DESC_URL = `${API_LISTINGS_URL}/?${DESC_ORDER}&${API_SELLER}`

// console.log(API_AUCTION_PROFILE)


