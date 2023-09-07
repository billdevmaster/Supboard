import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { API_SERVER } from './../../config/constant';

const LockerEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    stationId: "",
    description: ""
  });
  const [stationList, setStationList] = useState([]);
  

  useEffect(() => {
    const getStationList = async () => {
      const res = await axios.post(API_SERVER + "settings/station/getListByUser", { id });
      setStationList(res.data.data)
    }
    getStationList();
    if (id !== "0") {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (id === "0" && stationList.length > 0) {
      setData({...data, stationId: stationList[0]._id})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationList]);

  const getData = async () => {
    try {
      const res = await axios.post(API_SERVER + "locker/getItem", { id });
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
      await axios.post(API_SERVER + "locker/edit", { data, id });
      toast.success("Successfully Changed");
      setTimeout(() => {
        if (id === "0") {
          history.push("/locker")
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
                      <Form.Label>Station <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({...data, stationId: e.target.value})} value={data.stationId}>
                        {stationList.map((station, index) => {
                          return (
                            <option value={station._id}>{station.name}</option>
                          )
                        })}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows="3" value={data.description} onChange={(e) => setData({...data, description: e.target.value})}/>
                    </Form.Group>
                  </Col>

                  <Col md={6}>

                  </Col>

                  <Col md={12}>
                    <Button variant="primary" className="btn-square text-capitalize" onClick={handleSubmit}>Submit</Button>
                    <NavLink to='/locker'>
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

export default LockerEdit;