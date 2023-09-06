import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { API_SERVER } from './../../../config/constant';

const PriceEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    status: "Active",
    currency: "EUR",
    name: "",
    taxName: "",
    description: "",
    taxInclude: false,
    taxPercent: "",
    firstHour: [15, 15, 15, 15, 15, 15, 15],
    restHour: [10, 10, 10, 10, 10, 10, 10]
  });

  useEffect(() => {
    if (id !== "0") {
      getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getData = async () => {
    try {
      const res = await axios.post(API_SERVER + "settings/price/getPrice", { id });
      setData(res.data.data)
    } catch (e) {
      console.log(e)
      toast.error("Server Error");
    }   
  }

  const handleSubmit = async () => {
    try {
      if (data.name === "" || data.taxName === "") {
        return toast.error("Please fill the input fields.");
      }
      await axios.post(API_SERVER + "settings/price/edit", { data, id });
      toast.success("Successfully Changed");
      setTimeout(() => {
        if (id === "0") {
          history.push("/settings/price")
        }
      }, 2000);
    } catch (e) {
      console.log(e)
      toast.error("Server Error");
    }

  }

  const updateWeekDayPrice = (type, value, index) => {
    let tmp = [];
    if (type === "firstHour") {
      tmp = data.firstHour.map((item, i) => {
        if (index === i) {
          return value;
        } else {
          return item;
        }
      })
      setData({ ...data, firstHour: tmp });
    } else {
      tmp = data.restHour.map((item, i) => {
        if (index === i) {
          return value;
        } else {
          return item;
        }
      })
      setData({ ...data, restHour: tmp });
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
                      <Form.Control as="select" onChange={(e) => setData({...data, status: e.target.value})}>
                        <option value="Active" selected={data.status === "Active" ? true : false}>Active</option>
                        <option value="WIP" selected={data.status === "WIP" ? true : false}>WIP</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Currency <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({...data, currency: e.target.value})}>
                        <option selected={data.currency === "EUR" ? true : false}>EUR</option>
                        <option selected={data.currency === "HUF" ? true : false}>HUF</option>
                        <option selected={data.currency === "USD" ? true : false}>USD</option>
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
                      <Form.Label>Tax Name <span className='text-red'>*</span></Form.Label>
                      <Form.Control type="text" placeholder="Tax Name" value={data.taxName} onChange={(e) => setData({...data, taxName: e.target.value})}/>
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
                      <Form.Label>Price Inclusive Tax <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({...data, taxInclude: e.target.value})}>
                        <option value={true}  selected={data.taxInclude === "true" ? true : false}>Yes</option>
                        <option value={false} selected={data.taxInclude === "false" ? true : false}>No</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Tax(in Percentage) <span className='text-red'>*</span></Form.Label>
                      <Form.Control type="text" placeholder="Tax Amount" value={data.taxPercent} onChange={(e) => setData({...data, taxPercent: e.target.value})}/>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Time & Day Wise Price For First Booking Hour <span className='text-red'>*</span></Form.Label>
                      <Table responsive hover>
                        <thead className="table-info">
                          <tr>
                            <th>Time</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>default</th>
                            {data.firstHour.map((item, index) => {
                              return (
                                <td key={index}>
                                  <Form.Control type="text" value={item} onChange={(e) => updateWeekDayPrice("firstHour", e.target.value, index)}/>
                                </td>
                              )
                            })}
                          </tr>
                        </tbody>
                      </Table>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Price For Rest Of The Hours Of The Booking(Except 1st Hour Price ) <span className='text-red'>*</span></Form.Label>
                      <Table responsive hover>
                        <thead className="table-info">
                          <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {data.restHour.map((item, index) => {
                              return (
                                <td key={index}>
                                  <Form.Control type="text" value={item} onChange={(e) => updateWeekDayPrice("restHour", e.target.value, index)}/>
                                </td>
                              )
                            })}
                          </tr>
                        </tbody>
                      </Table>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Button variant="primary" className="btn-square text-capitalize" onClick={handleSubmit}>Submit</Button>
                    <NavLink to='/settings/price'>
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

export default PriceEdit;