import React, {useEffect, useState} from 'react';
import './style.css'
import {useForm} from "react-hook-form";
import axios from "axios";
import Modal from 'react-modal';

const Projects = () => {
    const {handleSubmit, register, reset, required} = useForm()
    const [modalIsOpen, setIsOpen] = React.useState(false)
    const [gallery, setGallery] = useState([])
    const [image, setImage] = useState({})
    const onSubmit = (data) => {
        data.image = image.url
        axios.post('https://613b7037110e000017a45616.mockapi.io/api/gallery', data)
            .then(({data}) => setGallery([...gallery, data]))
        reset()
    }
    useEffect(() => {
        axios('https://613b7037110e000017a45616.mockapi.io/api/gallery')
            .then(({data}) => setGallery(data))
    }, [])
    const handleChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', 'gallery')
        axios.post('https://api.cloudinary.com/v1_1/dnq500p5b/upload', formData)
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
                <button className='btn-grid' ><i className='bx bx-grid-alt'></i></button>
                <button  className='btn-list'><i className='bx bx-list-ul'></i></button>
            </div>
                <div className='grid'>
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

                <form className='projects-modal' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='startDate'> Даты начала проекта</label>
                        <input className="form-control" id='startDate' type='date'
                               {...register('startDate', {required: true})}
                        />

                    </div>
                    <div className="mb-3">

                        <label className="form-label" htmlFor='finishDate'> Даты окончания проекта</label>
                        <input id='finishDate' className="form-control" type='date'
                               {...register('finishDate', {required: true})}
                        />

                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='title'>Название проекта</label>
                        <input id='title' className="form-control" type='text'
                               {...register('title', {required: true})}
                        />

                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='author'>Автор проекта</label>
                        <input className="form-control" id='author' type='text'
                               {...register('author', {required: true})}
                        />

                    </div>
                    <div className="mb-3">
                        <input type='file'
                               {...register('image', {required: true})}
                               onChange={handleChange}
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