import DatabaseStatus from "./DatabaseStatus";
import UpdatedAt from "./UpdatedAt";

export default function Status() {
  return (
    <>
      <UpdatedAt />
      <hr />
      <DatabaseStatus />
    </>
  );
}
