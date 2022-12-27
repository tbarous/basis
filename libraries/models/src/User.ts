class User {
    name;
    surname;
  
    constructor(name: string, surname: string) {
      this.name = name;
      this.surname = surname;
    }
  
    getFullName() {
      return this.name + " " + this.surname;
    }
  
    setName(name: string){
      this.name = name
    }
  }
  
  export default User