const Intern = require("../library/intern");

test("Should get school", () => {
    const school = "Washington University";
    const employee = new Intern("Spenser Cambron", 1, "spenserlogan@gmail.con", school);
    expect(employee.school).toBe(school);
});

test("Should get role for Intern", () => {
    const role = "Intern";
    const employee = new Intern("Spenser Cambron", 1, "spenserlogan@gmail.com", "Washington University");
    expect(employee.getRole()).toBe(role);
});