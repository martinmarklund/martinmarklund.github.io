
// Tags can be changed to serach for other images. Several tags can be used, separated by a ','.
var tags = 'bird';
var api_key = '240a07e3f563e8510c857490af4e846f';   // This is obviously not secure, but since this is pure frontend there is no better solution.

export async function getData(page, size) {
    var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&safe_search=3&per_page=${size}&page=${page}&format=json&nojsoncallback=1`;
    let response = await fetch(url);
    let responseJSON = await response.json();
    return responseJSON;
}
