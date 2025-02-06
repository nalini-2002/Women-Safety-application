import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import toast from "react-hot-toast";
import { api } from "../context/api";

const Dashboard = () => {
  const [incidentreport, setIncidentReport] = useState([]);
  const [report, setReport] = useState("");
  const [ack, setAck] = useState(false);

  const getAllIncident = async () => {
    console.log("Fetching Incidents");
    
    try {
      const res = await fetch(api+'api/v1/incidents', {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      console.log(res);
      

      if (res.status === 200) {
        const data = await res.json();
        setIncidentReport(data);
      }
    } catch (err) {
      console.error("Error fetching incidents:", err);
    }
  };

  const acknowledge = async (incId) => {
    try {
     
      const res = await fetch(`${api}api/v1/incidents/${incId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
      });

    console.log(res);
    
      

      if (res.status === 200) {
        toast.success("Updated Successfully");
      }
    } catch (e) {
      toast.error("Error while Updating!");
    } finally {
      setAck(!ack);
    }
  };

  useEffect(() => {
    getAllIncident();
    window.scrollTo(0, 0);
  }, [ack]);

  return (
    <div className="d-flex justify-content-start">
      <Sidebar />
      <div className="container table-responsive mx-3">
        <div className="features_wrapper" style={{ marginTop: '-50px' }}>
          <div className="row">
            <div className="col-12 text-center">
              <p className="features_subtitle">Latest Women Incident Reported!</p>
              <h2 className="features_title">Women Incident Data</h2>
            </div>
          </div>
        </div>
        <table className="table table-striped table-bordered table-hover" style={{ marginTop: '-50px' }}>
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Report</th>
              <th scope="col">Address</th>
              <th scope="col">Pincode</th>
              <th scope="col">Incident recorded Date & Time</th>
              <th scope="col">Acknowledgement Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {incidentreport.map((p, index) => (
              <tr key={index}>
                <th scope="row" style={{ color: p.isSeen ? "green" : "red" }}>
                  {p.uname} {p.isSeen && "Hello"}
                </th>
                <td>
                  {p.isSeen ? (
                    p.report
                  ) : (
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => setReport(p.report)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      View Report
                    </button>
                  )}
                </td>
                <td>{p.address}</td>
                <td>{p.pincode}</td>
                <td>
                  {p.createdAt.split('T')[0]} - {p.createdAt.split('T')[1].split('.')[0]}
                </td>
                <td>
                  {p.isSeen ? (
                    <button className="btn btn-success">Acknowledged</button>
                  ) : (
                    <button className="btn btn-danger" onClick={() => acknowledge(p._id)}>
                      Acknowledge
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Incident Report</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">{report}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
