const apartmentCoordinates = {

  "효자성원아파트_101동": {
    lat: 35.808488374880405,
    lng: 127.11352748147948
  },

  "효자성원아파트_102동": {
  lat: 35.808014802064264,
  lng: 127.11396107647214
},
  "롯데아파트_101동": {
    lat: 35.80685326063011,
    lng: 127.11280875942286
  },


  "롯데아파트_102동": {
    lat: 35.80733983772456,
    lng: 127.11292008833836
  },


  "롯데아파트_103동": {
    lat: 35.80785362919595,
    lng: 127.11284336654083
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