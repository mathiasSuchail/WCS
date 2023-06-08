"use strict";
class person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    tellMyName() {
        console.log("Hello my name is " + this.name);
    }
    tellMyAge() {
        console.log(`I am ${this.age} years old`);
    }
}
const person1 = new person("John", 40);
const person2 = new person("Mary", 35);
person1.tellMyName();
person1.tellMyAge();
person2.tellMyName();
person2.tellMyAge();
