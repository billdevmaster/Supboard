import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';

const Location = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setData([
      {
        name: "test",
        address: "test",
        phone: "test Phone",
        email: "test@test.com",
        time: "12:00 - 04:20",
        price: "test price",
        liabilityWaiver: "test liability",
        stationName: "test Stating",
        sla: "No",
        status: "Active",
        createdAt: "2023/08/26",
      }
    ])
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col md="4">
              <Form.Group md="4">
                  <InputGroup>
                      
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        <i className='feather icon-search'></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                  </InputGroup>
              </Form.Group>
            </Col>
            <Col md="8">
              <Button className='float-right text-capitalize'>Add</Button>

            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
            <Table responsive hover>
                <thead className="table-info">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>PhoneNumer</th>
                        <th>Email Id</th>
                        <th>Time</th>
                        <th>Price</th>
                        <th>Liability Waiver</th>
                        <th>Station Owner Name-Type</th>
                        <th>SLA?</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">1</th>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.time}</td>
                        <td>{item.price}</td>
                        <td>{item.liabilityWaiver}</td>
                        <td>{item.stationName}</td>
                        <td>{item.sla}</td>
                        <td>{item.status}</td>
                        <td>{item.createdAt}</td>
                        <td>
                          <Button variant={'outline-success'} className="btn-icon">
                            <i className="feather icon-edit-2" />
                          </Button>
                          <Button variant={'outline-danger'} className="btn-icon">
                            <i className="feather icon-trash-2" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
            </Table>
        </Card.Body>
    </Card>
    </>
  )
}

export default Location;