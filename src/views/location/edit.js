import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_SERVER, ASSET_SERVER } from './../../config/constant';
import LocationSearchBox from '../../components/Widgets/LocationSearch';
import { toast } from 'react-toastify';

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    openTime: "",
    closeTime: "",
    address: "",
    priceId: "",
    stationType: "operatorOwned",
    owner: "",
    description: "",
    operationalMonths: []
  });
  const [images, setImages] = useState([]);
  const [priceList, setPriceList] = useState([]);
  
  const options = [
    { label: 'Jan', value: 1},
    { label: 'Feb', value: 2},
    { label: 'Mar', value: 3},
    { label: 'Apr', value: 4},
    { label: 'May', value: 5},
    { label: 'June', value: 6},
    { label: 'July', value: 7},
    { label: 'Aug', value: 8},
    { label: 'Sept', value: 9},
    { label: 'Oct', value: 10},
    { label: 'Nov', value: 11},
    { label: 'Dec', value: 12},
  ]
  
  const getData = async () => {
    try {
      const res = await axios.post(API_SERVER + "location/getItem", { id });
      const tmpData = { ...res.data.data };
      const tmpOperationalMonths = [];
      for (let i = 0; i < options.length; i++) {
        if (tmpData.operationalMonths.includes(options[i].value.toString())) {
          tmpOperationalMonths.push(options[i]);
        }
      }
      tmpData.operationalMonths = tmpOperationalMonths;
      setData(tmpData);
      const tmpImages = [];
      for (let i = 0; i < tmpData.images.length; i++) { 
        const tmpImage = { filePath: ASSET_SERVER + `uploads/images/${tmpData.images[i]}` };
        tmpImages.push(tmpImage);
      }
      setImages(tmpImages);
    } catch (e) {
      console.log(e)
      toast.error("Server Error");
    }   
  }

  useEffect(() => {
    const getPriceList = async () => {
      try {
        const res = await axios.post(API_SERVER + "settings/price/getListByCreator");
        setPriceList(res.data.data);
        // setData({ ...data, priceId: res.data.data[0]._id });
      } catch (e) {
        console.log(e)
        toast.error("Server Error");
      }
    }
    getPriceList();
    if (id !== 0) {
      getData();
    } else {
      setData({ ...data, priceId: priceList[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = async () => {
    if (data.name === "" || data.phone === "" || data.email === "" || data.openTime === "" || data.closeTime === "" || data.address === "" || data.priceId === "") {
      return toast.error("Please input correct data");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("openTime", data.openTime);
    formData.append("closeTime", data.closeTime);
    formData.append("address", data.address);
    formData.append("priceId", data.priceId);
    formData.append("stationType", data.stationType);
    formData.append("description", data.description);
    const tmpMonths = [];
    for (let i = 0; i < data.operationalMonths.length; i++) {
      tmpMonths.push(data.operationalMonths[i].value);
    }
    formData.append("operationalMonths", tmpMonths);
    formData.append("id", id);
    const tmpFiles = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i].file) {
        formData.append('files', images[i].file);
      }

      if (images[i].filePath) {
        if (images[i].filePath.includes(ASSET_SERVER)) {
          tmpFiles.push(images[i].filePath.replace(ASSET_SERVER + "uploads/images/", ""));
        }
      }
    }
    formData.append('oldImages', tmpFiles);
    try {
      const res = await axios.post(API_SERVER + "location/edit", formData,
       {headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Successfully Updated!");
      console.log(res)
    } catch (e) {
      console.log(e)
      toast.error("Server Error");
    }
  }

  const supportedFileHandler = (event, index) => {
    const nextImages = images.map((image, i) => {
      if (i === index) {
        // Increment the clicked counter
        console.log(event)
        return {filePath: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]};
      } else {
        // The rest haven't changed
        return image;
      }
    });
    setImages(nextImages);
  };

  const addImage = async () => {
    const tmp = [...images];
    tmp.push({});
    setImages(tmp);
  }

  const removeImage = async (index) => {
    const tmp = [];
    for (let i = 0; i < images.length; i++) {
      if (i !== index) {
        // Increment the clicked counter
        tmp.push(images[i]);
      } else {
        continue;
      }
    };
    // console.log(tmp)
    setImages(tmp);
  }

  return (
    <>
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Name <span className='text-red'>*</span></Form.Label>
                        <Form.Control type="text" placeholder="name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Phone Number <span className='text-red'>*</span></Form.Label>
                        <Form.Control type="text" placeholder="phone" value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})}/>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email <span className='text-red'>*</span></Form.Label>
                        <Form.Control type="email" placeholder="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                      </Form.Group>
                    </Col>
                    <Col md={6}></Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Open Time <span className='text-red'>*</span></Form.Label>
                        <Form.Control type="time" placeholder="Open Time" value={data.openTime} onChange={(e) => setData({...data, openTime: e.target.value})}/>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Close Time <span className='text-red'>*</span></Form.Label>
                        <Form.Control type="time" placeholder="Close Time" value={data.closeTime} onChange={(e) => setData({...data, closeTime: e.target.value})}/>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Location Address <span className='text-red'>*</span></Form.Label>
                        <LocationSearchBox value={data.address} setValue={(value) => setData({ ...data, address: value })} />
                        <Form.Text className="text-muted">Note : You have to select Address from Suggestion Box</Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Associate Price <span className='text-red'>*</span></Form.Label>
                        <Form.Control as="select" onChange={(e) => setData({ ...data, priceId: e.target.value })} value={data.priceId}>
                          {priceList.map((item, index) => {
                            return (
                              <option key={index} value={item._id}>{item.name}</option>
                            )
                          })}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Station Type <span className='text-red'>*</span></Form.Label>
                        <Form.Control as="select" onChange={(e) => setData({...data, stationType: e.target.value})} value={data.stationType}>
                          <option value="operatorOwned">Operator Owned</option>
                          <option value="suprentOwned">Suprent Owned</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Associate Station Owner <span className='text-red'>*</span></Form.Label>
                        <Form.Control as="select" onChange={(e) => setData({...data, owner: e.target.value})}>
                          
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" value={data.description} onChange={(e) => setData({...data, description: e.target.value})}/>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Operational Months</Form.Label>
                        <ReactMultiSelectCheckboxes options={options} style={{ width: "100%" }} value={data.operationalMonths} onChange={(e) => setData({ ...data, operationalMonths: e })} dropdownButton={{ width: '200px' }} />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Image Upload</Form.Label>
                        {images.map((image, index) => {
                          if (!image.filePath) {
                            return (
                              <div className="custom-file" key={index} style={{ marginBottom: "10px" }}>
                                <Form.Control
                                  type="file"
                                  className="custom-file-input"
                                  onChange={(event) => supportedFileHandler(event, index)}
                                />
                                <Form.Label className="custom-file-label form-label">
                                  Choose file...
                                </Form.Label>
                              </div>
                            );
                          } else {
                            return (
                              <div key={index} style={{ marginBottom: "10px", display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                <Image src={image.filePath} thumbnail style={{ width: "100px" }} />
                                <Button onClick={() => removeImage(index)}><i className='feather icon-x' style={{ margin: 0 }}></i></Button>
                              </div>
                            );
                          }
                        })}
                        <div>
                          <Button className="btn-square text-capitalize" onClick={addImage}><i className='feather icon-plus'></i>Add Image</Button>
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Button variant="primary" className="btn-square text-capitalize" onClick={handleSubmit}>Submit</Button>
                      <Button variant="secondary" className="btn-square text-capitalize" onClick={handleSubmit}>Cancel</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </>
  )
}

export default Edit;