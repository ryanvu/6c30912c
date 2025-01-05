import { formatPhoneNumber } from './utils';

const isContactId = (number) => {
  const numStr = String(number);
  // Consider it a contact ID if it's 6 digits or less
  return numStr.length <= 6;
};

export const getDisplayContact = (number, contacts) => {

  if (isContactId(number)) {
    const contact = contacts.find(c => c.id === Number(number));
    if (contact) {
      return {
        display: contact.name,
        isContact: true,
        contact,
        id: number
      };
    }

    return {
      display: `Contact #${number}`,
      isContact: false,
      contact: null,
      id: number
    };
  }

  const contact = contacts.find(contact => 
    contact.phoneNumbers.some(phone => 
      phone.number === String(number)
    )
  );

  if (!contact) {
    return {
      display: formatPhoneNumber(number),
      isContact: false,
      contact: null,
      id: null
    };
  }

  return {
    display: contact.name,
    isContact: true,
    contact,
    id: contact.id
  };
};

export const getCallParticipants = (call, contacts) => {
  const { direction, from, to, via } = call;
  
  const fromContact = getDisplayContact(from, contacts);
  const toContact = getDisplayContact(to, contacts);
  const viaContact = getDisplayContact(via, contacts);
  
  return {
    from: fromContact,
    to: toContact,
    via: viaContact,
    // For display purposes, we want to show the other party as primary
    primary: direction === 'inbound' ? fromContact : toContact
  };
};