import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phNo, setPhNo] = useState();
  const [address, setAddress] = useState("")
  const [pincode, setPinCode] = useState();
  const [profilePic, setProfilePic] = useState();
  const [doc, setDoc] = useState();

  const [errors, setErrors] = useState({ 
    profileErr: "",
    nameErr: "",
    emailErr: "", 
    dateErr: "",
    phErr: "",
    addressErr: "",
    pinErr: "", 
    docErr: ""
  });

  const resetUserInputs = () => {
    setName("");
    setEmail("");
    setDob("");
    setPhNo("");
    setAddress("");
    setPinCode("");
  }

  const validate = () => {
    let value;
    if (
      errors.profileErr ||
      errors.nameErr ||
      errors.emailErr ||
      errors.dateErr ||
      errors.phErr ||
      errors.addressErr ||
      errors.pinErr ||
      errors.docErr ||
      !name || 
      !email || 
      !dob ||
      !phNo ||
      !address || 
      !pincode ||
      !profilePic ||
      !doc
    ) {
      value = false;
      alert("Please fill all the given details");
    } else {
      value = true;
    }
    return value
  }

  const submit = (event) => {
    if(validate()) {

      const formData = new FormData()
      formData.append('name', name);
      formData.append('email', email);
      formData.append('dob', dob);
      formData.append('phoneNo', phNo);
      formData.append('address', address);
      formData.append('pinCode', pincode);
      formData.append('profileImg', profilePic);
      formData.append('doc', doc);

      axios({
        url: 'http://localhost:8080/api/save',
        method: 'POST',
        data: formData
      })
      .then(() => {
        resetUserInputs();
        alert("Successfully saved");
      })
      .catch(() => {
        alert("OOPS, something went wrong");
      })
    }
  }

  return (
    <div className="App">
      <h1>My Form</h1>
      <div className="formContainer">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '27rem' },
          }}
          autoComplete="off"
        >
          <div className="formInputs">
            <TextField
              required
              id="outlined-required"
              value={name}
              label="Name"
              onChange={(e) => {
                setName(e.target.value)
              }}
              onBlur={(e) => {
                !name || !/^[a-zA-Z ]*$/.test(name)
                  ? setErrors({
                      ...errors,
                      nameErr:
                        "Please enter a valid name in alpabetical only",
                    })
                  : setErrors({ ...errors, nameErr: "" });
              }}
            />
            {errors.nameErr && (
              <span style={{ color: "red" }}>
                {errors.nameErr}
              </span>
            )}
            <TextField
              required
              type="email"
              value={email}
              id="outlined-required"
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              onBlur={(e) => {
                !email ||
                !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
                  email
                )
                  ? setErrors({
                      ...errors,
                      emailErr: "Please enter a valid email id",
                    })
                  : 
                    setErrors({ ...errors, emailErr: "" });
              }}
            />
            {errors.emailErr && (
              <span style={{ color: "red" }}>
                {errors.emailErr}
              </span>
            )}
            <TextField
              required
              type="date"
              value={dob}
              id="outlined-required"
              label="DOB"
              onChange={(e) => {
                setDob(e.target.value)
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={(e) => {
                !dob
                  ? setErrors({
                      ...errors,
                      dateErr: "Please enter a valid date of birth",
                    })
                  : setErrors({ ...errors, dateErr: "" });
              }}
            />
            {errors.dateErr && (
              <span style={{ color: "red" }}>
                {errors.dateErr}
              </span>
            )}
            <TextField
              required
              type="number"
              value={phNo}
              id="outlined-required"
              label="Phone No"
              onChange={(e) => {
                setPhNo(e.target.value)
              }}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) &&
                e.preventDefault()
              }
              onInput={(e) => {
                e.target.value = Math.max(
                  0,
                  parseInt(e.target.value)
                )
                  .toString()
                  .slice(0, 10);
              }}
              onBlur={(e) => {
                !phNo || phNo.length !== 10
                  ? setErrors({
                      ...errors,
                      phErr: "Please enter a valid ph no",
                    })
                  : setErrors({ ...errors, phErr: "" });
              }}
            />
            {errors.phErr && (
              <span style={{ color: "red" }}>
                {errors.phErr}
              </span>
            )}
            <TextField
              required
              value={address}
              id="outlined-required"
              label="Address"
              onChange={(e) => {
                setAddress(e.target.value)
              }}
              onBlur={(e) => {
                !address
                  ? setErrors({
                      ...errors,
                      addressErr: "Please enter a valid ph no",
                    })
                  : setErrors({ ...errors, addressErr: "" });
              }}
            />
            {errors.addressErr && (
              <span style={{ color: "red" }}>
                {errors.addressErr}
              </span>
            )}
            <TextField
              required
              type="number"
              value={pincode}
              id="outlined-required"
              label="Pincode"
              onChange={(e) => {
                setPinCode(e.target.value)
              }}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) &&
                e.preventDefault()
              }
              onInput={(e) => {
                e.target.value = Math.max(
                  0,
                  parseInt(e.target.value)
                )
                  .toString()
                  .slice(0, 6);
              }}
              onBlur={(e) => {
                !pincode || pincode.length !== 6
                  ? setErrors({
                      ...errors,
                      pinErr: "Please enter a valid ph no",
                    })
                  : setErrors({ ...errors, pinErr: "" });
              }}
            />
            {errors.pinErr && (
              <span style={{ color: "red" }}>
                {errors.pinErr}
              </span>
            )}
            <div style={{marginRight: "10rem"}}>
              <p>Profile pic</p>
              <input 
                type="file" 
                onChange={(e) => {
                  setProfilePic(e.target.files[0])
                }} 
                accept="image/*" 
              />
            </div>
            <div style={{marginRight: "10rem"}}>
              <p>Doc(.pdf)</p>
              <input 
                type="file" 
                onChange={(e) => {
                  setDoc(e.target.files[0])
                }} 
                accept="application/pdf" 
              />
            </div>
            <Button 
              variant="contained"
              onClick={() => {
                submit();
              }}
            >
              Save
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default App;
