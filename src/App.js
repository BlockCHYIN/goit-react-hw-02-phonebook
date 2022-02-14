import { Component } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import Filter from 'components/Filter';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import { Layout } from 'components/Layout.style';

class App extends Component {
    state = {
        contacts: [],
        filter: '',
    }

    formSubmitHandler = data => {
        if (!this.state.contacts.find(
            contact =>
                contact.name.toLowerCase() === data.name.toLowerCase())) {
            this.setState(prevState => ({
                contacts: [...prevState.contacts, { ...data, id: nanoid() }],
            }))
            return true;
        } else {
            alert('Rosie Simpson is aredly in contacts.');
        }
    }

    removeContact = event => {
        this.setState({
            contacts: this.state.contacts.filter(contact => contact.id !== event.target.dataset.id),
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <Layout>
                <h2>Phonebook</h2>
                <ContactForm onSubmit={this.formSubmitHandler} />
                <h2>Contacts</h2>
                <Filter handleChange={this.handleChange} />
                <ContactList
                    filter={this.state.filter}
                    contacts={this.state.contacts}
                    removeContact={this.removeContact}
                />
            </Layout>
        );
    }
}

export default App;