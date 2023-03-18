import React, { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Dass TAs");
    setEmail("dass.tas@students.iiit.ac.in")
  }, [props.id]);

  return <div style={{ textAlign: "center", backgroundColor: "#3ea5f1"}}>
      Happy Coding - {name}<br/>
      Contact us at {email}
    </div>;
};

export default Home;
