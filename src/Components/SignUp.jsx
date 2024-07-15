import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

export default function SignUp() {
  const [popUp, setpopUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setrollNo] = useState("");
  const [standard, setStandard] = useState("");
  const [students, setStudents] = useState([]);

  const openPopUp = () => {
    setpopUp(true);
  };

  const closepopUp = () => {
    setpopUp(false);
    clearFields();
  };

  //   const handleSave = () => {
  //     const newStudent = { id: Date.now(), name, email, rollNo, standard };
  //     setStudents([...students, newStudent]);
  //     closepopUp();
  //   };

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
      <button onClick={openPopUp}>Add Info</button>

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

      <div>
        {students.map((student) => (
          <div key={student.rollNo}>
            <p>Name: {student.name}</p>
            <p>Email: {student.email}</p>
            <p>Roll Number: {student.rollNo}</p>
            <p>Class: {student.standard}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
