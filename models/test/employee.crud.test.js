const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Cruz', department: '6473230329ac34874b39d19d' });
      await testEmpTwo.save();
    });
  
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by various params with "findOne" method', async () => {
      const cases = [{ firstName: 'John' }, { lastName: 'Doe' }, { department: '6473231329ac34874b39d19f' }];
      const expectedFirstName = 'John';
      const expectedLastName = 'Doe';
      const expectedDepartment = '6473231329ac34874b39d19f';
      for (let testCase of cases) {
        const employee = await Employee.findOne(testCase);
        expect(employee.firstName).to.be.equal(expectedFirstName);
        expect(employee.lastName).to.be.equal(expectedLastName);
        expect(employee.department).to.be.equal(expectedDepartment);
      }
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Cruz', department: '6473230329ac34874b39d19d' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' }, { $set: { firstName: 'Chris', lastName: 'New', department: '1111' }});
      const updatedEmployee = await Employee.findOne({ firstName: 'Chris', lastName: 'New', department: '1111' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      employee.firstName = 'Chris';
      employee.lastName = 'New';
      employee.department = '1111';
      await employee.save();
    
      const updatedEmployee = await Employee.findOne({ firstName: 'Chris', lastName: 'New', department: '1111' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { firstName: 'Chris', lastName: 'New', department: '1111' });
      const employees = await Employee.find();
      for (let employee of employees) {
        expect(employee.firstName).to.be.equal('Chris');
        expect(employee.lastName).to.be.equal('New');
        expect(employee.department).to.be.equal('1111');
      }
    });
  
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Cruz', department: '6473230329ac34874b39d19d' });
      await testEmpTwo.save();
    });
    
    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      const removedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      expect(removedEmployee).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: '6473231329ac34874b39d19f' });
      expect(removedEmployee).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany({});
      const removedEmployee = await Employee.find();
      expect(removedEmployee.length).to.be.equal(0);
    });
  
  });
});