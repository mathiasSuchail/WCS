"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    tellMyName() {
        console.log(`I am ${this.name}`);
    }
    tellMyAge() {
        console.log(`I am ${this.age} years old`);
    }
}
const john = new Person("John", 40);
const mary = new Person("Mary", 35);
john.tellMyName();
john.tellMyAge();
mary.tellMyName();
mary.tellMyAge();
