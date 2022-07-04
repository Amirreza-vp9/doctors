import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

const Profile = () => {
    const [info, setInfo] = useState({})
    const params = useParams()

    useEffect(() => {
        fetch(`https://www.tebinja.com/api/v1/doctors/${params.id}`)
        .then(res => res.json()
        .then(actualD => setInfo(actualD)))
        .catch(error => {console.log(error.massage);});
    }, [])

    return ( 
        <div className='profile'>
            <nav className='navPro'>Profile</nav>
                <div className='info'>
                    {(info == null) ? <h1>Please wait . . .</h1> : info && info.doctor &&
                    <>
                        <img className='img'
                        src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${info.doctor.url}`}
                        width="200" height="200"></img>
                        <h3>About : {info.doctor.about}</h3>
                        <h3>Address : {info.doctor.address}</h3>
                        <h3>University: {info.doctor.university.name}</h3>
                        <h3>Rate: {info.doctor.rate}</h3>
                    </>    
                    }
                    <Link className='link' to={'/'}>Home</Link>
                </div>
        </div>
     );
}
export default Profile;