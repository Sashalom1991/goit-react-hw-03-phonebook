import s from './ContactsList.module.css';

const ContactsList = ({ contacts, delContact }) => {
  return (
    <>
      <ul className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            <span>
              <b>{name}</b>: {number}
            </span>

            <button
              type="button"
              onClick={() => delContact(id)}
              className={s.btn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactsList;
