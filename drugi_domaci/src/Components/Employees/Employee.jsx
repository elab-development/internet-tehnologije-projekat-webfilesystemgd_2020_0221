function Employee({ employee }) {
  return (
    <div className="employee-card">
      <h1>{employee.name}</h1>
      <p>{employee.email}</p>
      <p>{employee.position}</p>
    </div>
  );
}

export default Employee;
