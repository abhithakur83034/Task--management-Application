import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Show = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/show')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(sortedData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
  
    axios
      .delete('http://localhost:8080/delete/' + id)
      .then((res) => {
        toast.success('Data deleted successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
  
        setTimeout(() => {
          navigate(0);
        }, 1000); // Delay navigation by 1 second (adjust the delay as needed)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  };
  

  const handleUpdate = (id) => {
    navigate('/update/' + id);
  };

  const handleSearch = (e) => {
    const key = e.target.value;
    if (key) {
      axios
        .get(`http://localhost:8080/search/${key}`)
        .then((response) => {
          const result = response.data;
          setData(result);
        })
        .catch((error) => {
          console.error('Error occurred during search:', error);
        });
    } else {
     
      setData([]); 
    }
  };
  
  

  console.log("data",data)

  return (
    <div>
      {loading ? (
        <div className="spinn-container" style={{ position: 'absolute', top: '200px', left: '500px' }}>
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" />
        </div>
      ) : (
            <div>
              <div>
              <input type="search"
              className='form-control'
              onChange={handleSearch}
               style={{width:"500px"}}
                placeholder='Search Your Task' />

              </div>
        <table className="table table-bordered">
          <thead>

            <tr>
              <th>Index</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due_Date</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              console.log("item",item)
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>
                  <img src={item.image} style={{height:"100px" , width:"100px"}} alt="..." />
                    </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="btn btn-outline-danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                    <button className="btn btn-outline-success" onClick={() => handleUpdate(item._id)}>
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
            </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Show
