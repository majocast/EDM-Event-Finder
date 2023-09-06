import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';

function Account() {
  const location = useLocation();
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    toggleEdit();
  }, [location.pathname]);

  const toggleEdit = () => {
    if(edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      axios.put(`${process.env.REACT_APP_OTG_SERVER}/editusername/${username}`, {newUsername: newUsername})
      .then((res) => {
        if(res.data === 'username updated successfully') {
          localStorage.setItem('username', newUsername);
          alert('username updated successfully');
          toggleEdit();
        } else if(res.data === 'username already taken') {
          alert('username already taken');
          document.querySelector('input[name="newname"]').value = '';
        } 
        else {
          return;
        }
      })
    } catch (error) {
      console.log('error editing username: ', error);
    }
  }

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, [edit]);

  const pullInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_OTG_SERVER}/account/${username}`);
      setEmail(response.data.email);
      setPassword(response.data.password);
    } catch (error) {
      console.error("error fetching data: ", error);
    }
  }
  pullInfo();

  const signOut = () => {
    localStorage.clear();
    history('/');
  }

  if(!password || !email || !username) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  
  return (
      <div className='animate-rise flex flex-col items-center justify-center'>
        <div className='rounded-2xl border-4 border-[#47220f] flex flex-col items-center justify-center bg-white p-8 my-4 drop-shadow-lg gap-4'>
          {edit ? 
          <h1 className='text-3xl font-bold py-2 flex gap-2'>{username}<BsPencil className='hover:cursor-pointer' size={30} onClick={() => toggleEdit()}/></h1> :
          <form action='POST' className='flex gap-2 flex-col'>
            <input className='rounded-lg px-2 py-1 border-2' type='text' name='newname' onChange={(e) => { setNewUsername(e.target.value) }} placeholder='new username' required/>
            <button className='h-auto rounded-lg py-1 px-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' type='submit' onClick={submit}>Confirm Change</button>
            <button className='h-auto rounded-lg py-1 px-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' type='submit' onClick={toggleEdit}>Cancel</button>
          </form>
          }
          <h2>email: {email}</h2>
          <Link className='w-full text-center h-auto rounded-lg py-1 mt-1 cursor-pointer bg-[#47220f] text-white hover:bg-[#d8ccb6] hover:text-[#47220f]' onClick={signOut} to='/'>Log Out</Link>
        </div>
      </div>
  )
}

export default Account;