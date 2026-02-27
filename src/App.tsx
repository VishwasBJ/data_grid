import { DataGrid } from "./DataGrid";
import { generateData } from "./mockData";

export default function App() {
  const data = generateData(50000);

  const columns = [
    { key: "id", title: "ID", width: 80 },
    { key: "name", title: "Name", width: 200 },
    { key: "age", title: "Age", width: 100 },
    { key: "city", title: "City", width: 150 }
  ];

  return (
    <div className="p-4">
      <DataGrid data={data} columns={columns} />
    </div>
  );
}
