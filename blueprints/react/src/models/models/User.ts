class User {
  name;
  surname;

  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  getFullName() {
    return this.name + " " + this.surname;
  }

  setName(name){
    this.name = name
  }
}

export default User