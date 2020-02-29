// API key
// 240a07e3f563e8510c857490af4e846f
//
// Secret:
// 3c60e68733933248


var api_key = '240a07e3f563e8510c857490af4e846f';
// Tags can be changed to serach for other images. Several tags can be used, separated by a ','.
var tags = 'bird'
var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&safe_search=3&per_page=${250}&format=json&nojsoncallback=1`

export async function getData() {
    
    let response = await fetch(url);
    let responseJSON = await response.json();
    return responseJSON;
}