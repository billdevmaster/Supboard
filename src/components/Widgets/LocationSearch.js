import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { useEffect } from 'react';

const libraries = ['places'];

const LocationSearchBox = ({ setValue, value }) => {
  const [data, setData] = useState("");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDQrfpItDJb3AKFlgV_C452VB-LNEmLpk4',
    libraries,
  });
  const [searchBox, setSearchBox] = useState(null);

  useEffect(() => {
    if (value !== "") {
      setData(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onLoad = (ref) => {
    setSearchBox(ref);
  };
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    // Handle the retrieved places as needed
    setValue(places[0].formatted_address);
    setData(places[0].formatted_address);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';
  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
      <Form.Control type="text" placeholder="Search for places" value={data} onChange={(e) => setData(e.target.value)}/>
    </StandaloneSearchBox>
  );
};

export default LocationSearchBox;