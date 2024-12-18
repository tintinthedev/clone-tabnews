export default function DatabaseData({
  version,
  maxConnections,
  openedConnections,
}) {
  return (
    <div>
      <p>Versão do banco de dados: {version}</p>
      <p>Quantidade máxima de conexões: {maxConnections}</p>
      <p>Conexões abertas: {openedConnections}</p>
    </div>
  );
}
