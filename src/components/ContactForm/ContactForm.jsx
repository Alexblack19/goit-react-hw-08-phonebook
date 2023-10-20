import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { Form, Label, Span, Input, Submit } from './ContactForm.styled.js';
import Notiflix from 'notiflix';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Notification(name)
      : dispatch(addContact(newContact));

    clearForm();
  };

  function Notification(name) {
    Notiflix.Notify.warning(`${name} is already in your contact list.`, {
      position: 'center-center',
      fontSize: '16px',
    });
  }

  function clearForm() {
    setName('');
    setNumber('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        <Span>Name</Span>
        <Input
          placeholder="Enter name"
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </Label>

      <Label>
        <Span>Number</Span>
        <Input
          type="tel"
          placeholder="+(380) XXX XXX XXX"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </Label>
      <Submit type="submit">Add contact</Submit>
    </Form>
  );
}
