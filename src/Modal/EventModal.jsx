import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import axios from "axios";

function EventModal({ isOpen, onOpenChange, date }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(date.format("YYYY-MM-DDTHH:mm"));
  const [endDate, setEndDate] = useState(date.format("YYYY-MM-DDTHH:mm"));


  useEffect(()=>{
    setStartDate(date.format("YYYY-MM-DDTHH:mm"))
    setEndDate(date.format("YYYY-MM-DDTHH:mm"))
  },[date])

  const handleCreateEvent = async (onClose) => {
    const token = localStorage.getItem("token"); // Obtener el token almacenado en el local storage

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/events/create`,
        {
          title,
          description,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent className="p-2">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a new event
              </ModalHeader>
              <ModalBody>
                <input
                  className="py-1.5 px-3 bg-slate-100 border-b-2"
                  type="text"
                  placeholder="Establish a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="py-1.5 px-3 bg-slate-100 border-b-2"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  className="py-1.5 px-3 bg-slate-100 border-b-2"
                  type="datetime-local"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  className="py-1.5 px-3 bg-slate-100 border-b-2"
                  type="datetime-local"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleCreateEvent(onClose)}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventModal;
