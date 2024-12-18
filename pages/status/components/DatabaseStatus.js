import useSWR from "swr";
import fetchAPI from "../helpers/fetchApi";

export default function DatabaseData() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInformation = "Carregando...";

  if (!isLoading) {
    const { version, max_connections, opened_connections } = data;

    databaseInformation = (
      <>
        <p>Versão do banco de dados: {version}</p>
        <p>Quantidade máxima de conexões: {max_connections}</p>
        <p>Conexões abertas: {opened_connections}</p>
      </>
    );
  }

  return (
    <div>
      <h1>Database</h1>
      {databaseInformation}
    </div>
  );
}
