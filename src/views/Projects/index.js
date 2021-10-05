import React, {useEffect, useState} from 'react';
import './style.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import Modal from 'react-modal';
import {useFormik} from "formik";

import {useDispatch,useSelector} from "react-redux";
import {getProject} from "../../redux/action";
import * as yup from 'yup'


const Projects = () => {
    const {handleSubmit, register, reset, required} = useForm()
    const [modalIsOpen, setIsOpen] = React.useState(false)

    const [image, setImage] = useState({})
    const [cName, setClassName] = useState('grid');
    const dispatch = useDispatch()
    const gallery = useSelector(s => s.gallery)

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            startDate:'',
            finishDate:'',
            images:''
        },

        validationSchema: yup.object({
            title: yup.string().max(15, 'Must be 15 character or less').required('Required'),
            author: yup.string().max(20, 'Must be 20 character or less').required('Required'),
            startDate: yup.string().required("Choose date"),
            finishDate: yup.string().required("Choose date"),
        }),
        onSubmit: values => {
            dispatch(values)
        }
    })

    // const onSubmit = (data) => {
    //     data.image = image.url
    //     axios.post('https://613f1faee9d92a0017e17474.mockapi.io/api/gallery', data)
    //         .then(({data}) => setGallery([...gallery, data]))
    //
    // }
    useEffect(() => {
        dispatch(getProject(gallery))

    }, [])
    const handleChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', 'gallery')
        axios.post('https://api.cloudinary.com/v1_1/dinara994/upload', formData)
            .then(({data}) => setImage(data))
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div>
            <div className='projects-title'>
                <h1>ПРОЕКТЫ</h1>
                <h3>СПИСОК ПРОЕКТОВ</h3>
            </div>
            <div>
                <button onClick={() => setIsOpen(true)} className='btn'>Добавить проект</button>
                <div className='grid-btn'>
                    <button onClick={() => setClassName("grid")} className='btn-grid'><i className='bx bx-grid-alt'></i>
                    </button>
                    <button onClick={() => setClassName("d-block")} className='btn-list'><i className='bx bx-list-ul'></i></button>
                </div>
                <div className={"grid project-boxes " + cName}>
                    {
                        gallery.map(item =>
                            <div key={item.id} className=''>
                                <div className="box">
                                    <img className='box__img' src={item.image}/>
                                    <h3 className='box__title'>{item.title}</h3>
                                    <div className='date-projects'>
                                        <i className='bx bxs-calendar'></i>
                                        <span>{item.startDate}</span>-<span>{item.finishDate}</span>
                                    </div>
                                    <h4 className='box__author'><i className='bx bxs-user'></i> {item.author}</h4>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <button className='closeModal' onClick={closeModal}>×</button>

                <form className='projects-modal' onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='startDate'> Даты начала проекта</label>
                        <input className="form-control" id='startDate' type='date'
                             name='startDate'

                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.startDate}

                        />
                        {
                            formik.touched.startDate && formik.errors.startDate ?
                                (<div>{formik.errors.startDate}</div>) :
                                null
                        }

                    </div>
                    <div className="mb-3">

                        <label className="form-label" htmlFor='finishDate'> Даты окончания проекта</label>
                        <input id='finishDate' className="form-control" type='date'
                               name='finishDate'

                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.finishDate}
                        />
                        {
                            formik.touched.finishDate && formik.errors.finishDate ?
                                (<div>{formik.errors.finishDate}</div>) :
                                null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='title'>Название проекта</label>
                        <input
                            id='title'
                            name='title'
                            className="form-control"
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}

                        />
                        {
                            formik.touched.title && formik.errors.title ?
                                (<div>{formik.errors.title}</div>) :
                                null
                        }

                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='author'>Автор проекта</label>
                        <input
                            name='author'
                            className="form-control"
                            id='author'
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.author}
                        />
                        {
                            formik.touched.author && formik.errors.author ?
                                (<div>{formik.errors.author}</div>) :
                                null
                        }
                    </div>
                    <div className="mb-3">
                        <input type='file'
                               name='image'
                               {...register('image', {required: true})}
                               onChange={e =>{
                                   handleChange(e)
                                   formik.handleChange(e)
                               }}
                               className="form-control"

                        />

                    </div>
                    <button className="btn btn-primary">Добавить проект</button>
                </form>
            </Modal>
        </div>
    );
};

export default Projects;