const apartmentCoordinates = {

  "효자성원아파트_101동": {
    lat: 35.80853769579162,
    lng: 127.11379032761255
  },

  "효자성원아파트_102동": {
  lat: 35.808014802064264,
  lng: 127.11396107647214
},
};
function getApartmentCoordinate(
  apartmentName,
  detailAddress
) {

  const detail =
    detailAddress || "";


  const dongMatch =
    detail.match(/\d+동/);


  if (!dongMatch) {

    return null;

  }


  const key =
    apartmentName + "_" + dongMatch[0];


  return apartmentCoordinates[key] || null;

}