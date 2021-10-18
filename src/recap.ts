class Persona {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `Mi nombre es ${this.name} y tengo ${this.age} años.`;
  }
}

const luis = new Persona(23, 'Luis');
console.log(luis.getSummary());
