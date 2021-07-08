const Manager = require("../library/manager");

test("Should get manager's office number", () => {
    const officeNum = 19986;
    const employee = new Manager("Taylor Jones", 1, "tayjones@gmail.com", officeNum);
    expect(employee.officeNum).toBe(officeNum);
});

test("Shoulde get manager's role", () => {
    const role = "Manager";
    const employee = new Manager("Taylor Jones", 1, "tayjones@gmail.com", 19986);
    expect(employee.getRole()).toBe(role);
});