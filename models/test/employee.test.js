const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
  mongoose.models = {};
});


describe('Employee', () => {

  it('should throw an error if no all arguments', () => {
    const cases = [
      {},
      {firstName: 'John'},
      {lastName: 'Doe'},
      {department: '6473231329ac34874b39d19f'},
      {firstName: 'John', lastName: 'Doe'},
      {firstName: 'John', department: '6473231329ac34874b39d19f'},
      {lastName: 'Doe', department: '6473231329ac34874b39d19f'}
    ];
    for (let example of cases) {
      const emp = new Employee(example);
      emp.validate(err => {
        expect(err.errors.firstName || err.errors.lastName || err.errors.department).to.exist;
      });
    };
  });

  it('should throw an error if "firstName" is not a string', () => {

    const cases = [{}, []];
    for(let name of cases) {
      const emp = new Employee({ name });
      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {

    const cases = [{}, []];
    for(let name of cases) {
      const emp = new Employee({ name });
      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not a string', () => {

    const cases = [{}, []];
    for(let name of cases) {
      const emp = new Employee({ name });
      emp.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if all data are okay', () => {
    const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });
  
});