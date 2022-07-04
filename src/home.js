import React, {useState, useEffect} from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import Input from './input';

const Home = () => {
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetch('https://www.tebinja.com/api/v1/doctors/searchi?page=0')
        .then(response => response.json()
        .then((actualData) => setData(actualData)))
    }, [])

    return ( 
        <div className='home'>
            <nav className='navBar'><h1>Doctors</h1>
            <br/>
            <h1>
                <Input className='input'
                inputValue={inputValue}
                setInputValue={setInputValue}
                />
            </h1>
            </nav>
            
            <div className='ul'>
            {
                (data == null) ? <h3>Please wait . . .</h3> :
                data && data.doctors && data.doctors.hits &&
                data.doctors.hits.filter((item) => {
                    return item._source.fname.toLowerCase().includes(inputValue.toLowerCase());
                    }).map(item => {
                    return(
                        <>
                        <div className='list'>
                            <img className='img'
                            src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${item._source.url}`}
                            width="200" height="200"></img>
                            <br/>
                            {item._source.fname} {item._source.lname}
                            <br/>
                            <button className='btn'
                            onClick={()=> navigate(`/Profile/${item._id}`)}
                            >Read more
                            </button>
                        </div>
                        </>
                        )
                    })
            }
            </div>
            
        </div>
     );
}
export default Home;