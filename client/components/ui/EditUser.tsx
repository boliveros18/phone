import { FC } from "react";
import { IUser } from "@/interfaces";
import { BackContainer } from "../ui/BackContainer";
import { Container } from "../ui/Container";

interface Props {
  user: IUser | undefined;
  backClick?: any;
  back?: boolean;
}

export const EditUser: FC<Props> = ({ user, back, backClick }) => {
  return (
    <BackContainer back={back} backClick={backClick}>
      <Container>
        <div className="mt-2 ml-8">Edit: {user?.id}</div>
      </Container>
    </BackContainer>
  );
};
