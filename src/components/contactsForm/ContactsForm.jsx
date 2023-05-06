import PropTypes from 'prop-types';
import { useState } from 'react';
import { Label, Input, Button } from './ContactsForm.styled';

export function ContactsForm({ addNewContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    addNewContact({ name, number });
    onReset();
  };

  const onReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        width: '500px',
        padding: '20px',
        gap: '20px',
      }}
      onSubmit={onSubmit}
    >
      <Label>Name</Label>
      <Input
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={onChange}
        required
      />

      <Label>Number</Label>
      <Input
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={onChange}
        required
      />

      <Button type="submit">Add contact</Button>
    </form>
  );
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
