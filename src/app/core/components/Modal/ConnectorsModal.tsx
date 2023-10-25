import Connectors from "../Connectors";
import { CloseModalButton, Container } from "./ui";

export default function ConnectorsModal({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  return (
    <Container handleClick={handleCloseModal}>
      <CloseModalButton handleClick={handleCloseModal} />
      <div className="flex flex-col gap-8 md:gap-12">
        <Connectors />
      </div>
    </Container>
  );
}
