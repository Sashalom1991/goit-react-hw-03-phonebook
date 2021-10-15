import React, { Component } from 'react';
import { v4 } from 'uuid';
import 'modern-normalize';
import './App.css';

import FormContact from './components/FormContact';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parseCont = JSON.parse(contacts);

    if (parseCont) {
      this.setState({ contacts: parseCont })
    }
    
  }

  componentDidUpdate(preVProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log("Обновилось контакт");

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  FormSubmitHandler = ({ name, number }) => {
    const contact = {
      id: v4(),
      name: name,
      number: number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        ({ name }) => name.toUpperCase() === contact.name.toUpperCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
    }
    // else if (
    //   contacts.find(
    //     ({ number }) => number.toUpperCase() === contact.number.toUpperCase(),
    //   )) {
    //   alert(`${number} is already in contacts`);
    // }
    else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  FilterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  SearchContacts = () => {
    this.state.contacts.filter(contact =>
      contact.name.toUpperCase().includes(this.state.filter.toUpperCase()),
    );
  };

  onDelBtnChange = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { FilterContacts, FormSubmitHandler, onDelBtnChange } = this;
    const { contacts, filter } = this.state;
    const normalizeContact = contacts.filter(contact =>
      contact.name.toUpperCase().includes(filter.toUpperCase()),
    );
    return (
      <>
        <div className="App">
          <h2>Phonebook</h2>
          <FormContact onSubmit={FormSubmitHandler} />
          <h2>Contacts</h2>
          <Filter value={filter} onChangeFilter={FilterContacts} />
          <ContactsList
            contacts={normalizeContact}
            delContact={onDelBtnChange}
          />
        </div>
      </>
    );
  }
}
export default App;
