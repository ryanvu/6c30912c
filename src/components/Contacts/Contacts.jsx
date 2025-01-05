import React, { useState } from 'react';
import { useContacts } from '../../contexts/ContactsContext';
import { Icons } from '../../utils/icons';
import Avatar from '../Avatar/Avatar.jsx';
import { CONTACT_TYPE } from '../../constants/contacts';
import { formatPhoneNumber } from '../../utils/utils';

const Contacts = () => {
  const { contacts } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumbers.some(phone => phone.number.includes(searchTerm));
    
    const matchesType = selectedType === 'all' || 
      contact.type.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });

  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
    return groups;
  }, {});

  const sortedLetters = Object.keys(groupedContacts).sort();

  return (
    <div className="flex flex-col h-full">

      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="relative mb-3">
          <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedType === 'all' ? 'bg-yellow-500 text-white' : 'bg-gray-100'
            }`}
          >
            All
          </button>
          {Object.values(CONTACT_TYPE).map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedType === type ? 'bg-yellow-500 text-white' : 'bg-gray-100'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sortedLetters.map(letter => (
          <div key={letter} className="mb-4">
            <div className="sticky top-[120px] bg-gray-50 px-4 py-1 font-bold text-sm text-gray-500">
              {letter}
            </div>
            {groupedContacts[letter].sort((a, b) => a.name.localeCompare(b.name)).map(contact => (
              <div 
                key={contact.id} 
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
              >
                <Avatar contact={contact} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {contact.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 flex flex-col">
                    {contact.phoneNumbers.map((phone, index) => (
                      <span key={index} className="flex items-center gap-1">
                        <span className="text-xs text-gray-400">{phone.label}:</span>
                        {formatPhoneNumber(phone.number)}
                      </span>
                    ))}
                    {contact.company && (
                      <span className="text-xs text-gray-400">
                        at {contact.company}
                      </span>
                    )}
                  </div>
                </div>
                <Icons.chevronRight size={20} className="text-gray-400" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 p-4 bg-white border-t">
        <button className="w-full bg-green-400 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-500">
          <Icons.plus size={20} />
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default Contacts;