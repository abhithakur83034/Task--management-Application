

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import axios from 'axios';

const Add = () => {
  const { register, handleSubmit, reset, control } = useForm();

  const selectOptions = [
    { value: 'pending', label: 'pending' },
    { value: 'in-process', label: 'in-process' },
    { value: 'complete', label: 'complete' }
  ];

  const onSubmit = (data) => {
    const file = data.image[0];
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('status', data.status);
  
    axios
      .post('http://localhost:8080/register', formData)
      .then((res) => {
        console.log("response",res.data);
        toast.success('Task added successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(`An error occurred: ${error.response.data}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      });
  };
  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <h1>Add ....</h1>
            <form  onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <ToastContainer />
              <p>
               <input type="file"
               className='form-control'
               name='image'
               {...register('image')} />
              </p>
              <p>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="form-control"
                  name="title"
                  {...register('title', { required: true })}
                />
              </p>
              <p>
                <input
                  type="text"
                  placeholder="Enter Description"
                  className="form-control"
                  name="description"
                  {...register('description', { required: true })}
                />
              </p>
              <p>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  {...register('date', { required: true })}
                />
              </p>
              <p>
                <div>
                  <label>Your Status</label>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        options={selectOptions}
                        {...field}
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption.value)
                        }
                        value={selectOptions.find(
                          (option) => option.value === field.value
                        )}
                      />
                    )}
                  />

                  <small className="text-danger">
                    {/* {errors?.status && errors.status.message} */}
                  </small>
                </div>
              </p>

              <input
                type="submit"
                value="Add Task"
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

export default Add;


