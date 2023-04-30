import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm } from './contactsForm/ContactsForm';
import { ContactsList } from './contactsList/ContactsList';
import { Filter } from './contactsFilter/Filter';

const contactsData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? contactsData;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    contacts.filter(contact => contact.name === data.name).length
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(prevState => [newContact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onChangeValue = ({ target: { value } }) => {
    setFilter(value);
  };

  const filtredContactsOnLowerCase = filter.toLocaleLowerCase();

  const filtredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtredContactsOnLowerCase)
  );

  return (
    <div
      style={{
        padding: '15px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactsForm addNewContact={addNewContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeValue={onChangeValue} />
      <ContactsList contacts={filtredContacts} onDelete={deleteContact} />
    </div>
  );
};
