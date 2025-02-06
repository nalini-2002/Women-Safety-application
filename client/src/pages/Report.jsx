import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import reports from "../images/report.png";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { api } from "../context/api";

const Report = () => {
  const [report, setReport] = useState("");
  const [pincodeOfIncident, setPincodeOfIncident] = useState("");
  const [address, setAddress] = useState("");
  const [auth] = useAuth();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("dfvfvdf");

    if (!report.trim()) {
      toast.error("Report is required!");
      return;
    }
    if (!pincodeOfIncident.trim()) {
      toast.error("PinCode is required!");
      return;
    }
    if (!address.trim()) {
      toast.error("Address is required!");
      return;
    }




    try {
      const res = await axios.post(
        api+"api/v1/incidents",
        { user: auth?.user?._id, report, pincodeOfIncident, address }
      );

      console.log(res.data);
      

      if (res.status === 201) {
        toast.success("Incident reported successfully");
        setReport("");
        setPincodeOfIncident("");
        setAddress("");
      }
    } catch (err) {
      toast.error("Error in sending report");
    }
  };

  return (
    <>
      <Navbar />
      <div className="marginStyle">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
            <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
              <div className="featured-image mb-3 animateImg">
                <img src={reports} className="img-fluid" alt="Report" />
              </div>
            </div>
            <form className="col-md-6 right-box" onSubmit={handleSubmit}>
              <div className="row align-items-center">
                <div className="header-text mb-4">
                  <h2>Incident Report</h2>
                  <p>We value your incident report. We will take action!</p>
                </div>
                <div className="input-group d-flex flex-row align-items-center mb-3">
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="number"
                      value={pincodeOfIncident}
                      onChange={(e) => setPincodeOfIncident(e.target.value)}
                      className="form-control form-control-lg border-dark fs-6"
                      placeholder="Enter the PinCode of the Incident"
                      required
                    />
                  </div>
                </div>
                <div className="input-group d-flex flex-row align-items-center mb-3">
                  <div className="form-outline flex-fill mb-0">
                    <textarea
                      rows={3}
                      value={report}
                      onChange={(e) => setReport(e.target.value)}
                      className="form-control form-control-lg border-dark fs-6"
                      placeholder="Write the Report of the Incident"
                      required
                    />
                  </div>
                </div>
                <div className="input-group d-flex flex-row align-items-center mb-3">
                  <div className="form-outline flex-fill mb-0">
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control form-control-lg border-dark fs-6"
                      placeholder="Enter the Address of the Incident"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center my-3">
                  <div className="form-outline flex-fill mb-0">
                    <button
                      className="btn text-white btn-lg btn-block"
                      style={{ width: "100%", backgroundColor: "blueviolet" }}
                      type="submit"
                    >
                      Submit Incident
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Report;
