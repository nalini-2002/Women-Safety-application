import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { api } from "../context/api";

const Dashboard = () => {
  const [auth] = useAuth();
  const [emerg, setEmer] = useState([]);
  const [chats, setChats] = useState([]);
  const [ack, setAck] = useState(false);
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${api}api/v1/emergency`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });

        if (res.status === 200) {
          const data = await res.json();
          setEmer(data);
        }
      } catch (e) {
        console.log("Error fetching emergency data", e);
      }
    };

    fetchData();
  }, [ack]);

  const ackn = async (uid) => {
    try {
      const res = await fetch(`${api}api/v1/emergency/${uid}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
      });
      if (res.status === 200) {
        toast.success("Updated Successfully");
      }
    } catch (e) {
      toast.error("Error while Updating!");
    } finally {
      setAck(!ack);
    }
  };

  const getChats = async (emergId) => {
    try {
      const res = await fetch(
        `${api}api/v1/chats/${auth?.user?._id}/emerg/${emergId}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        setChats(data || []);
      }
    } catch (e) {
      console.log("Error fetching chats", e);
    }
  };

  const addChat = async (receiverId, emergId) => {
    try {
      const payload = {
        senderId: auth?.user?._id,
        receiverId,
        text: txt,
        emergId,
      };
      const res = await fetch(`${api}api/v1/chats`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) {
        setTxt("");
        getChats(emergId);
      }
    } catch (e) {
      console.log("Error sending chat", e);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container my-5">
        <div className="text-center mb-4">
          <p className="features_subtitle">Latest Women Emergency Alert!</p>
          <h2 className="features_title">Women Emergency Data</h2>
        </div>

        <div className="d-flex justify-content-center">
          <div className="table-responsive" style={{ maxWidth: "95%" }}>
            <table className="table table-striped table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Address of Incident</th>
                  <th>Map View</th>
                  <th>Emergency No.</th>
                  <th>Incident Time</th>
                  <th>Acknowledgement</th>
                  <th>Chat</th>
                </tr>
              </thead>
              <tbody>
                {emerg.map((ee) => (
                  <React.Fragment key={ee._id}>
                    <tr>
                      <td style={{ color: ee.isResolved ? "green" : "red" }}>
                        {ee.username}
                      </td>
                      <td>{ee.addressOfInc}</td>
                      <td>
                        <a href={ee.mapLct} target="_blank" rel="noreferrer">
                          <button className="btn btn-primary">View Map</button>
                        </a>
                      </td>
                      <td>{ee.emergencyNo}</td>
                      <td>{ee.createdAt}</td>
                      <td>
                        {ee.isResolved ? (
                          <button className="btn btn-success">Acknowledged</button>
                        ) : (
                          <button
                            onClick={() => ackn(ee._id)}
                            className="btn btn-danger"
                          >
                            Acknowledge
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-dark"
                          data-bs-toggle="modal"
                          data-bs-target={`#modal${ee._id}`}
                          onClick={() => getChats(ee._id)}
                        >
                          Chat
                        </button>
                      </td>
                    </tr>

                    {/* Chat Modal */}
                    <div
                      className="modal fade"
                      id={`modal${ee._id}`}
                      tabIndex="-1"
                      aria-labelledby={`label${ee._id}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id={`label${ee._id}`}>
                              Chat with {ee.username}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {chats.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`d-flex ${
                                  msg.senderId === auth?.user?._id
                                    ? "justify-content-end"
                                    : "justify-content-start"
                                } mb-2`}
                              >
                                <p className="bg-light p-2 rounded shadow-sm">
                                  {msg.text}
                                </p>
                              </div>
                            ))}
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                addChat(ee.userId, ee._id);
                              }}
                            >
                              <div className="d-flex mt-3">
                                <input
                                  className="form-control mx-2"
                                  value={txt}
                                  onChange={(e) => setTxt(e.target.value)}
                                  type="text"
                                  placeholder="Enter your message"
                                />
                                <button className="btn btn-primary" type="submit">
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
