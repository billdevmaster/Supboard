import React, { useEffect, useState } from 'react';
import { Card, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '@vlsergey/react-bootstrap-pagination';

import DataTable from './table';
import { API_SERVER } from './../../config/constant';

const Location = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [length, setLength] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const flipRefresh = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, length, keyword, refresh])

  const getData = async () => {
    try {
      const res = await axios.post(API_SERVER + "location/getList", { currentPage, length, keyword });
      const tmpData = [];
      for (let i = 0; i < res.data.data.length; i++) {
        const tmpItem = { ...res.data.data[i] };
        tmpItem.time = tmpItem.openTime + " - " + tmpItem.closeTime;
        tmpItem.price = tmpItem.price.name;
        if (tmpItem.stationType === "operatorOwned") {
          tmpItem.stationName = "Owner Operator";
        } else {
          tmpItem.stationName = "Suprent Operator";
        }
        tmpData.push(tmpItem);
      }
      setData(tmpData);
      setTotalPage(res.data.totalPage);
    } catch (e) {
      console.log(e)
      toast.error("Server Error");
    }
  }

  const handlePageChange = async ( {target: {name, value }} ) => {
    setCurrentPage(value);
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
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
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
              <NavLink to='/location/edit/0'>
                <Button className='float-right text-capitalize'>ADD</Button>
              </NavLink>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <DataTable data={data} flipRefresh={flipRefresh} />
          <Col md={12} style={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}>
            <Pagination value={currentPage} totalPages={totalPage} onChange={handlePageChange} style={{ flexWrap: "wrap" }} />
            <select as="select" className="mb-3 ml-4" onChange={(e) => setLength(parseInt(e.target.value))}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </Col>
        </Card.Body>
    </Card>
    </>
  )
}

export default Location;