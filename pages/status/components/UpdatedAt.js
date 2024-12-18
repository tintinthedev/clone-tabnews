import useSWR from "swr";
import fetchAPI from "helpers/fetchApi";

export default function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading) {
    updatedAtText = new Date(data.updated_at).toLocaleString();
  }

  return <div>Última atualização em: {updatedAtText}</div>;
}
