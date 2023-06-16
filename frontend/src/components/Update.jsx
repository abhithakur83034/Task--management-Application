import React, { useEffect } from 'react';
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';
import Select from 'react-select'


const Update = () => {
  const {  handleSubmit, setValue,control } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();





  
  
const selectOptions = [
  { value: "pending", label: "pending" },
  { value: "in-process", label: "in-process" },
  { value: "complete", label: "complete" }
];

const registerOptions = {
  // ...
  role: { required: "Role is required" }
};


  useEffect(() => {
    axios
      .get(`http://localhost:8080/update/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data) => {
        console.log(data);
        setValue('status', data.status);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:8080/update/${id}`,data)
      .then((res) => {
        console.log(res.data);
        if(res){
            toast.success('data updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
        toast.error(`An error occured : ${error.response.data}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
      });

    console.log(data);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <h1>Update ...</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Your Status</label>
                <Controller
                    name="status"
                    control={control}
                    rules={registerOptions.status}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        options={selectOptions}
                        {...field}
                        onChange={(selectedOption) => field.onChange(selectedOption.value)}
                        value={selectOptions.find((option) => option.value === field.value)}
                      />
                    )}
                  />

                <small className="text-danger">
                  {/* {errors?.status && errors.status.message} */}
                </small>
              </div>
             
              <input
                type="submit"
                value="Update Task"
                className="btn btn-outline-success"
              />
            </form>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Update;
