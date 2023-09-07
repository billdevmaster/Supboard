import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { API_SERVER } from './../../../config/constant';

const StationEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    status: "Active",
    name: "",
    uuid: "",
    lockersCapacity: 16,
    locationId: "",
    terrainId: "",
    description: "",
    scanBoard: true,
    scanLifejacket: false,
    scanPaddle: false,
  });
  const [locationList, setLocationList] = useState([]);
  const [terrainList, setTerrainList] = useState([]);

  useEffect(() => {
    const getSubDatas = async () => {
      try {
        const res = await axios.post(API_SERVER + "location/getListByUser");
        setLocationList(res.data.data);
        const res1 = await axios.post(API_SERVER + "settings/terrain/getList", {currentPage: 0, length: 1000000, keyword: ""});
        setTerrainList(res1.data.data);
        // setData({ ...data, priceId: res.data.data[0]._id });
      } catch (e) {
        console.log(e)
        toast.error("Server Error");
      }
    }
    getSubDatas();
    if (id !== "0") {
      getData();
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (id === "0" && locationList.length > 0) {
      setData({ ...data, locationId: locationList[0]._id });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationList]);

  useEffect(() => {
    if (id === "0" && terrainList.length > 0) {
      setData({ ...data, terrainId: terrainList[0]._id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terrainList])

  const getData = async () => {
    try {
      const res = await axios.post(API_SERVER + "settings/station/getItem", { id });
      setData(res.data.data)
    } catch (e) {
      console.log(e)
      toast.error("Server Error");
    }   
  }

  const handleSubmit = async () => {
    try {
      if (data.name === "") {
        return toast.error("Please fill the input fields.");
      }
      await axios.post(API_SERVER + "settings/station/edit", { data, id });
      toast.success("Successfully Changed");
      setTimeout(() => {
        if (id === "0") {
          history.push("/settings/station")
        }
      }, 2000);
    } catch (e) {
      console.log(e)
      toast.error("Server Error");
    }

  }

  return (
    <>
      <React.Fragment>
        <Row>
          <Col sm={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Status <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({...data, status: e.target.value})} value={data.status}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Name <span className='text-red'>*</span></Form.Label>
                      <Form.Control type="text" placeholder="name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>UUID <span className='text-red'>*</span></Form.Label>
                      <Form.Control type="text" placeholder="uuid" value={data.uuid} onChange={(e) => setData({...data, uuid: e.target.value})}/>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Lockers Capacity <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({...data, lockersCapacity: e.target.value})} value={data.lockersCapacity}>
                        <option value={8}>8</option>
                        <option value={16}>16</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Location <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({ ...data, locationId: e.target.value })} value={data.locationId}>
                        {locationList.map((location, index) => {
                          return (
                            <option key={index} value={location._id}>{location.name}</option>
                          )
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Terrain <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({ ...data, terrainId: e.target.value })} value={data.terrainId}>
                        {terrainList.map((location, index) => {
                          return (
                            <option key={index} value={location._id}>{location.name}</option>
                          )
                        })}
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
                      <Form.Label>Scan Required</Form.Label>
                      <Form.Check type="checkbox" label="Board" checked={data.scanBoard} onChange={(e) => setData({ ...data, scanBoard: e.target.checked })} />
                      <Form.Check type="checkbox" label="Lifejacket" checked={data.scanLifejacket} onChange={(e) => setData({ ...data, scanLifejacket: e.target.checked })} />
                      <Form.Check type="checkbox" label="Paddle" checked={data.scanPaddle} onChange={(e) => setData({ ...data, scanPaddle: e.target.checked })} />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Button variant="primary" className="btn-square text-capitalize" onClick={handleSubmit}>Submit</Button>
                    <NavLink to='/settings/station'>
                      <Button variant="secondary" className="btn-square text-capitalize">Cancel</Button>
                    </NavLink>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </>
  )
}

export default StationEdit;