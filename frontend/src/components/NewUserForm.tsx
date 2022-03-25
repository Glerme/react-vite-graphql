import { gql, useMutation } from "@apollo/client";
import React from "react";
import { GET_USER } from "../App";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const NewUserForm: React.FC = () => {
  const [name, setName] = React.useState("");
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      return;
    }

    await createUser({
      variables: {
        name,
      },

      refetchQueries: [GET_USER],
    });

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">Enviar</button>
    </form>
  );
};
