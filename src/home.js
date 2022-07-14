import React, {useState, useEffect} from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import Input from './input';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from "react-router-dom";
// import Pagination from './pagination';
// import ReactImageFallback from "react-image-fallback";

const Home = () => {
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(null);
    const [searchParams] = useSearchParams();

    function getdoctors (p){
        fetch(`https://www.tebinja.com/api/v1/doctors/searchi?page=${p}`)
        .then(response => response.json()
        .then((actualData) => setData(actualData)))
    }

    useEffect(() => {
        const x = searchParams.get('page')
        const y = x ? x : 0
        setPage(y)
    }, [])
    
    useEffect(() => {
        if (page !== null) {
            getdoctors(page)
        }
    }, [page])

    const handlePageClick = (event) => {
        setPage(event.selected)
        window.history.pushState(null, document.title, `/?page=${event.selected}`)
    };

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
                            <img 
                                src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${item._source.url}`}
                                onError={e => e.target.src = 'em-w-pro.jpg'}
                                className='img' width="200" 
                                height="200"
                            />
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
            {data && 
                <ReactPaginate className='paginate'
                    breakLabel=".........."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={12}
                    pageCount={1000}
                    previousLabel="< previous"
                    marginPagesDisplayed={12}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    renderOnZeroPageCount={null}
                />
            }
        </div>
     );
}
export default Home;