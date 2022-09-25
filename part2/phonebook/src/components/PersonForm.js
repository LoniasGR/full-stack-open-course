const PersonForm = ({newName, setNewName, newPhone, setNewPhone, handleAddName}) => (
    <form onSubmit={handleAddName}>
    <div>
      name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      <br/>
      number: <input type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )

  export default PersonForm;