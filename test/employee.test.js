const Employee = require("../library/employee");

test("Should create new employee", () => {
    const name = "Spenser Cambron";
    const employee = new Employee(name);
    expect(employee.name).toBe(name);
});

test("Should run email", () => {
    const email = "spenserlogan@gmail.com";
    const employee = new Employee("Spenser Cambron", 1, email);
    expect(employee.getEmail()).toBe(email);
});

test("Should get employee id", () => {
    const id = 1;
    const employee = new Employee("Spenser Cambron", 1, "spenserlogan@gmail.com");
    expect(employee.id).toBe(id);
})

test("Should get emoployee role", () => {
    const role = "Employee";
    const employee = new Employee("Spenser Cambron", 1, "spenserlogan@gmail.com");
    expect(employee.getRole()).toBe(role);
});