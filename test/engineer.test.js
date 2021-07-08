const Engineer = require("../library/engineer");

test("Should get engineer's Github", () => {
    const github = "spenserlogan";
    const employee = new Engineer("Spenser Cambron", 1, "spenserlogan@gmail.com", github);
    expect(employee.github).toBe(github);
})

test("Should get engineer's role", () => {
    const role = "Engineer";
    const employee = new Engineer("Spenser Cambron", 1, "spenserlogan@gmail.com", "spenserlogan");
    expect(employee.getRole()).toBe(role);
});