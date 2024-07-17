import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SignUp.css";

export default function SignUp() {
  const [popUp, setpopUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setrollNo] = useState("");
  const [standard, setStandard] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.13:8000/api/v1/users/getusers"
      );
      console.log(response.data.data);
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const openPopUp = () => {
    setpopUp(true);
  };

  const closepopUp = () => {
    setpopUp(false);
    clearFields();
  };

  const handleSave = async () => {
    const newStudent = { name, email, rollNo, standard };
    try {
      const response = await axios.post(
        "http://192.168.1.13:8000/api/v1/users/adduser",
        newStudent
      );
      console.log("Student added:", response.data);
      setStudents([...students, response.data]);
      closepopUp();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const clearFields = () => {
    setName("");
    setEmail("");
    setrollNo("");
    setStandard("");
  };

  return (
    <div>
      <h1>Student Info</h1>
      <button className="main-btn" onClick={openPopUp}>
        Add Info
      </button>

      {popUp && (
        <div className="popUp">
          <div className="popUp-content">
            <span className="close" onClick={closepopUp}>
              &times;
            </span>
            <h2 className="text-heading">Add Student Info</h2>
            <form>
              <input
                className="input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="number"
                placeholder="Roll Number"
                value={rollNo}
                onChange={(e) => setrollNo(e.target.value)}
              />
              <input
                className="input"
                type="number"
                placeholder="Class"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              />
              <button className="save" type="button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel" type="button" onClick={closepopUp}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Class</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.rollNo}</td>
              <td>{student.standard}</td>
              <td>
                <button className="edit" onClick={openPopUp}>
                  Edit
                </button>
              </td>
              <td>
                <button className="cancel">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
