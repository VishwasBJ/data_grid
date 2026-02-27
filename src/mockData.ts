export function generateData(count: number) {
  const rows = [];

  for (let i = 0; i < count; i++) {
    rows.push({
      id: i,
      name: "User " + i,
      age: 20 + (i % 30),
      city: "City " + (i % 10)
    });
  }

  return rows;
}
