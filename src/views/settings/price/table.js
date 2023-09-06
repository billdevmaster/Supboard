import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { confirmAlert } from "react-confirm-alert";
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_SERVER } from './../../../config/constant';
import { formatDate } from '../../../utils/utils';
const DataTable = ({ data }) => {

  const deleteItem = (id) => {
    confirmAlert({
      title: "Do you want to delete this?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.post(API_SERVER + "settings/price/deleteItem", { id });
              toast.success("Successfully deleted");
            } catch (e) {
              console.log(e)
              toast.error("Server Error");
            }
          }
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
    });
  }

  return (
    <>
      <Table responsive hover>
          <thead className="table-info">
              <tr>
                  <th>Name</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.currency}</td>
                  <td>{item.status}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <NavLink to={`/settings/price/edit/${item._id}`}>
                      <Button variant={'outline-success'} className="btn-icon">
                        <i className="feather icon-edit-2" />
                      </Button>
                    </NavLink>
                    <Button variant={'outline-danger'} className="btn-icon" onClick={() => deleteItem(item._id)}>
                      <i className="feather icon-trash-2" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
      </Table>
    </>
  )
}

export default DataTable;