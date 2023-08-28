import React, { useEffect, useState } from "react";
import {useApp} from '../Context/AppContext'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import dayjs from "dayjs";

function EventModal({ isOpen, onOpenChange, date, titulo = "", descripcion = "", eventId = null }) {
  const [title, setTitle] = useState(titulo);
  const [description, setDescription] = useState(descripcion);
  const [startDate, setStartDate] = useState(date.format("YYYY-MM-DDTHH:mm"));
  const [endDate, setEndDate] = useState(date.format("YYYY-MM-DDTHH:mm"));
  const {monthEvents, handleMonthEvents} = useApp()

  useEffect(()=>{
    setStartDate(date.format("YYYY-MM-DD"))
    setEndDate(date.format("YYYY-MM-DD"))
  },[date])

  const handleCreateEvent = async (onClose) => {
    const token = localStorage.getItem("token");

    try {
      const evento = {
        title,
        description,
        startDate: dayjs(new Date(startDate)).format("YYYY-MM-DD"),
        endDate: dayjs(new Date(endDate)).format("YYYY-MM-DD"),
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/events/create`,
            evento,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedMonthEvents = [...monthEvents, evento];
      handleMonthEvents(updatedMonthEvents);
      onClose();
      setTitle("");
      setDescription("")
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
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  className="py-1.5 px-3 bg-slate-100 border-b-2"
                  type="date"
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
