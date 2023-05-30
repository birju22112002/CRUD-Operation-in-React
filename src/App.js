import React, { useEffect, useState } from 'react'
import View from './Component/View';

const getData = () => {
  const data = localStorage.getItem('forms');
  if(data){
    return JSON.parse(data);
  }else{
    return []
  }
}

const App = () => {

  const [forms , setForms] = useState(getData());


  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [pincode,setPincode] = useState('');
  const [number,setNumber] = useState('');

  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);


  const submit = (event) => {
    event.preventDefault();

    let form = {
      name,
      email,
      pincode,
      number
    }
    if(edit){

      let copy = forms;
      Object.assign(copy[active],form)
      setForms([...copy]);
      setEdit(false);
      setActive(null)
    }else{
      setForms([...forms,form]);
    }
    setName('');
    setEmail('');
    setPincode('');
    setNumber(''); 
  }
  // const editForm=(index)=>{
  //   const form=forms[index];
  //   // console.log('tempData',tempData)
  //   setForms({ name: form.name, email: form.email , pincode: form.pincode , number: form.number});
  //   setEditClick(true);
  //   setEditIndex(index);
  // };
  const onEditClick = (index) => {
    const form = forms[index];
    
    setName(form.name);
    setEmail(form.email);
    setPincode(form.pincode);
    setNumber(form.number);
    
    setActive(index);
    setEdit(true);
  }

  const deleteForm=(name)=>{
    const filteredForms=forms.filter((element,index)=>{
      return element.name !== name
    })
    setForms(filteredForms);
  }

  useEffect(()=>{
    localStorage.setItem('forms' ,JSON.stringify(forms));
  },[forms])

  return (
    <>
      <div className="wrapper">
        <h1> Form </h1>
        <div className="main">

          <div className="form-container">
            <form autoComplete="off" className="form-group" onSubmit={submit}>
              <label>Name</label>
              <input 
                type="text" 
                placeholder="Enter Your Name"
                className="form-control" required 
                onChange={(event) => setName(event.target.value)}
                value = {name}
              />
              <br />
              <label>Email</label>
              <input 
                type="text" 
                placeholder="Enter Your E-Mail"
                className="form-control" required
                onChange={(event) => setEmail(event.target.value)}
                value = {email} 
                />
              <br/>
              <label>Pincode</label>
              <input 
                type="text" 
                placeholder="Enter Your Pincode"
                className="form-control" required 
                onChange={(event) => setPincode(event.target.value)}
                value = {pincode}
              />
              <br/>
              <label>Number</label>
              <input 
                type="text" 
                placeholder="Enter Your Phone-Number"
                className="form-control" required
                onChange={(event) => setNumber(event.target.value)}
                value = {number} 
              />
              <br/>
              <button type="submit" className="btn btn-success btn-md"> {edit ? "Update" : "Submit"} </button>
            </form>
          </div>

          <div className="view-container">
          {forms.length>0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Pincode</th>
                    <th>Number</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View forms={forms} onEditClick={onEditClick} deleteForm={deleteForm} />
                </tbody>
              </table>
            </div>
          </>}
          {forms.length < 1 && <div>Form is not Submitted</div>}
          </div>

        </div>
      </div>
    </>
  )
}

export default App;



