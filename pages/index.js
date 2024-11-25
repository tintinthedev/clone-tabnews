import Image from "next/image";

function Home() {
  return (
    <>
      <h1>Tome mofi tome</h1>
      <Image
        src={"/raleumofi.png"}
        alt="Imagem de agradecimento para um colega"
        width={100}
        height={100}
      />
    </>
  );
}

export default Home;
