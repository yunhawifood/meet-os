const apartmentCoordinates = {

  "효자성원아파트": {
    lat: 35.808284413223156,
    lng: 127.11381983969042
  },

  "롯데아파트": {
    lat: 35.80685326063011,
    lng: 127.11280875942286
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