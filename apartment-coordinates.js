const apartmentCoordinates = {

  "효자성원아파트_101동": {
    lat: null,
    lng: null
  },


  "효자성원아파트_102동": {
  lat: 35.808284413223156,
  lng: 127.11381983969042
}
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