import { useState } from "react";

export const useModal = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const openEditModal = () => setEditModalIsOpen(true);
  const closeEditModal = () => setEditModalIsOpen(false);

  return { editModalIsOpen, setEditModalIsOpen, openEditModal, closeEditModal };
};
