const ContactDetails = ({contact, deleteContact}) => {
  return(
    <p >{contact.name} {contact.number}<button onClick={() => deleteContact(contact.name, contact.id)} type="button">delete</button></p>
  );
}

const Persons = ({contacts, deleteContact}) => (
  <div>
    {contacts.map((contact) => (
      <ContactDetails key={contact.id} contact={contact} deleteContact={deleteContact} />
    ))}
  </div>
)

export default Persons;