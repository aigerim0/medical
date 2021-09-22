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
                <h1 >ПРОЕКТЫ</h1>
                <h3>СПИСОК ПРОЕКТОВ</h3>
            </div>
            <div>
                <button onClick={() => setIsOpen(true)} className='btn'>Добавить проект</button>
                <div className='grid'>
                    {
                        gallery.map(item =>
                            <div key={item.id} className=''>
                                <div className="box">
                                    <img className='box__img' src={item.image}/>
                                    <h3 className='box__title'>{item.title}</h3>
                                    <div className='date-projects'>
                                        <i className='bx bxs-calendar'></i> <span>{item.startDate}</span>-<span>{item.finishDate}</span>
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
                contentLabel="Example Modal"
            >

                <button className='closeModal' onClick={closeModal}>×</button>

                <form className='projects-modal' onSubmit={handleSubmit(onSubmit)}>
                    <div className='dataInputs'>
                       <div className='startDateInput'>
                           <label htmlFor='startDate'> Даты начала проекта</label>
                           <input id='startDate' className='dataInput' type='date'
                                  {...register('startDate', {required: true})}
                           />
                       </div>
                      <div className='finishDateInput'>
                          <label htmlFor='finishDate'> Даты окончания проекта</label>
                          <input id='finishDate'  className='dataInput' type='date'
                                 {...register('finishDate', {required: true})}
                          />
                      </div>
                    </div>
                    <div>
                     <div>
                        <div className='dataInputs'>
                           <div>
                               <label htmlFor='title'>Название проекта</label>
                               <input id='title' className='titleInput ' type='text'
                                      {...register('title', {required: true})}
                               />
                           </div>
                          <div>
                              <label htmlFor='author'>Автор проекта</label>
                              <input id='author' className='author' type='text'
                                     {...register('author', {required: true})}
                              />
                          </div>
                        </div>
                     </div>
                    </div>
                    <div  className="field__wrapper">
                        <input type='file'
                               {...register('image', {required: true})}
                               onChange={handleChange}
className='fileInput'
                        />
                    </div>
                    <button className='saveBtn'>Добавить проект</button>
                </form>
                {/*<div className="field__wrapper">*/}

                {/*    <input name="file" type="file" name="file" id="field__file-2" className="field field__file"*/}
                {/*           multiple/>*/}

                {/*        <label className="field__file-wrapper" htmlFor="field__file-2">*/}
                {/*            <div className="field__file-fake">Файл не вбран</div>*/}
                {/*            <div className="field__file-button">Выбрать</div>*/}
                {/*        </label>*/}

                {/*</div>*/}
            </Modal>
        </div>
    );
};

export default Projects;