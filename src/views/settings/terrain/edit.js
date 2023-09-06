import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { API_SERVER } from './../../../config/constant';

const TerrainEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    status: "Active",
    name: "",
  });

  useEffect(() => {
    if (id !== "0") {
      getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const getData = async () => {
    try {
      const res = await axios.post(API_SERVER + "settings/terrain/getItem", { id });
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
      await axios.post(API_SERVER + "settings/terrain/edit", { data, id });
      toast.success("Successfully Changed");
      setTimeout(() => {
        if (id === "0") {
          history.push("/settings/terrain")
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
                      <Form.Label>Name <span className='text-red'>*</span></Form.Label>
                      <Form.Control type="text" placeholder="name" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Status <span className='text-red'>*</span></Form.Label>
                      <Form.Control as="select" onChange={(e) => setData({...data, status: e.target.value})} value={data.status}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Button variant="primary" className="btn-square text-capitalize" onClick={handleSubmit}>Submit</Button>
                    <NavLink to='/settings/terrain'>
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

export default TerrainEdit;