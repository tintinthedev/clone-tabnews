import useSWR from "swr";
import DatabaseData from "./DatabaseData";
import UpdatedAt from "./UpdatedAt";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function Status() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Carregando informações...</div>;
  }

  const updatedAtText = new Date(data.updated_at).toLocaleString();

  const { version, max_connections, opened_connections } =
    data.dependencies.database;

  const databaseData = {
    version,
    maxConnections: max_connections,
    openedConnections: opened_connections,
  };

  return (
    <>
      <UpdatedAt updatedAtText={updatedAtText} />
      <hr />
      <DatabaseData {...databaseData} />
    </>
  );
}
