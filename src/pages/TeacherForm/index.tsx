import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css'


function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ])

  function AddNewScheduleItem() { 
    setScheduleItems([
      ...scheduleItems,
      { week_day:0, from:'', to:'' }
    ]);
  }

  function setScheduleItemsValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItems, index) => {
      if (index === position){
        return { ...scheduleItems, [field]: value };
      }

      return scheduleItems;
    });
    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass (e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then( () => {
      alert('Cadastro realizado com sucesso!');
      
      history.push('/')
    }).catch(() => {
      alert('Erro no cadastro!');
    } )
    
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
      title="Que incrível que você quer dar aulas."
      description="O primeiro passo é preencher esse formulrio de incrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
            <fieldset>
              <legend>Seus Dados</legend>
              <Input name="name" 
                label="Nome Completo"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
              />

              <Input
                name="avatar"
                label="Avatar"
                value={avatar}
                onChange={(e) => { setAvatar(e.target.value) } }
              />
              <Input
                name="whatsapp"
                label="Whatsapp"
                value={whatsapp}
                onChange={ (e) => { setWhatsapp(e.target.value) } }
              />
              <Textarea
              name="Bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {setBio(e.target.value
                )}}
              />
            </fieldset>

            <fieldset>
              <legend>Sobre a aula</legend>
              <Select 
                name="subject"
                label="Matéria"
                value={subject}
                onChange={(e) => {setSubject(e.target.value)}}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Física', label: 'Física' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Quimica', label: 'Quimica' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Educação Física', label: 'Educação Física' },
                  { value: 'História', label: 'História' },
                  { value: 'Geografia', label: 'Geografia' },
                  { value: 'Português', label: 'Português' },
                ]}
              />
              <Input
                name="cost"
                label="Custo da sua hora por aula"
                value={cost}
                onChange={(e) => {setCost(e.target.value)}}
              />
            </fieldset>

            <fieldset>
              <legend>
                Horários disponíveis

                <button type="button" onClick={AddNewScheduleItem} >
                  + Novo horário
                </button>
              </legend>

              
              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week_day"
                  label="Dia da Semana"
                  value={scheduleItem.week_day}
                  onChange={ e => setScheduleItemsValue(index, 'week_day', e.target.value) }
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-Feira' },
                    { value: '2', label: 'Terça-Feira' },
                    { value: '3', label: 'Quarta-Feira' },
                    { value: '4', label: 'Quinta-Feira' },
                    { value: '5', label: 'Sexta-Feira' },
                    { value: '6', label: 'Sábado' },
                    
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={ e => setScheduleItemsValue(index, 'from', e.target.value) }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={ e => setScheduleItemsValue(index, 'to', e.target.value) }
                />
              </div>
                )
              })}
            </fieldset>

            <footer>
              <p>
                <img src={warningIcon} alt="Aviso"/>
                Importante <br/>
                Preencha todos os dados!
              </p>
              <button type="submit">
                Salvar Cadastro
              </button>
            </footer>

        </form>
        
      </main>
    </div>
  )
}

export default TeacherForm;