import React, { createContext, useContext, useReducer } from 'react';
import { CONTACT_TYPE } from '../constants/contacts';

const initialContacts = [
  {
    id: 1,
    name: 'John Smith',
    phoneNumbers: [{
      number: '15803554536',
      label: 'mobile',
      primary: true
    }],
    type: CONTACT_TYPE.PERSONAL,
    profileSrc: require('../assets/contacts/john.png').default
  },
  {
    id: 2,
    name: 'You',
    phoneNumbers: [{
      number: '18742869541',
      label: 'work',
      primary: true
    }],
    type: CONTACT_TYPE.BUSINESS,
    profileSrc: require('../assets/contacts/speer.jpeg').default,
    company: 'Speer'
  },
  {
    id: 4,
    name: 'Lebron James',
    phoneNumbers: [{
      number: '15803554536',
      label: 'mobile',
      primary: true
    }],
    profileSrc: require('../assets/contacts/lebron.png').default,
    type: CONTACT_TYPE.PERSONAL
  },
  {
    id: 123456,
    name: 'Michael Jordan',
    phoneNumbers: [{
      number: '18742869541',
      label: 'work',
      primary: true
    }],
    profileSrc: require('../assets/contacts/michael.png').default,
    type: CONTACT_TYPE.BUSINESS,
    company: 'NBA'
  }
];

/**
 * @typedef {Object} ContactsState
 * @property {Contact[]} contacts - Array of all contacts
 * @property {Contact|null} selectedContact - Currently selected contact
 */

/**
 * @typedef {Object} ContactsAction
 * @property {string} type - The action type
 * @property {*} payload - The action payload
 */

/**
 * Reducer function for managing contacts state
 * @param {ContactsState} state - Current state
 * @param {ContactsAction} action - Action to perform
 * @returns {ContactsState} New state
 */
const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'SELECT_CONTACT':
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
};

const ContactsContext = createContext();

/**
 * Provider component for contacts functionality
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, {
    contacts: initialContacts,
    selectedContact: null
  });

  return (
    <ContactsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
}

/**
 * Hook for accessing contacts context and functionality
 * @returns {Object} Contacts context value and utility functions
 */
export function useContacts() {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }

  const { state, dispatch } = context;

  /**
   * Get a contact by their ID
   * @param {number} id - Contact ID
   * @returns {Contact|undefined} Found contact or undefined
   */
  const getContactById = (id) => {
    return state.contacts.find(contact => contact.id === id);
  };

  /**
   * Get a contact by their phone number
   * @param {string} phoneNumber - Phone number to search for
   * @returns {Contact|undefined} Found contact or undefined
   */
  const getContactByPhone = (phoneNumber) => {
    return state.contacts.find(contact => 
      contact.phoneNumbers.some(phone => 
        phone.number === phoneNumber.replace(/\D/g, '')
      )
    );
  };

  /**
   * Add a new contact
   * @param {Omit<Contact, 'id'>} contactData - Contact data without ID
   */
  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Math.max(...state.contacts.map(c => c.id), 0) + 1
    };
    dispatch({ type: 'ADD_CONTACT', payload: newContact });
  };

  /**
   * Update an existing contact
   * @param {Contact} contact - Updated contact data
   */
  const updateContact = (contact) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: contact });
  };

  /**
   * Delete a contact
   * @param {number} id - ID of contact to delete
   */
  const deleteContact = (id) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  /**
   * Select a contact
   * @param {Contact|null} contact - Contact to select or null to clear selection
   */
  const selectContact = (contact) => {
    dispatch({ type: 'SELECT_CONTACT', payload: contact });
  };

  return {
    contacts: state.contacts,
    selectedContact: state.selectedContact,
    getContactById,
    getContactByPhone,
    addContact,
    updateContact,
    deleteContact,
    selectContact
  };
}