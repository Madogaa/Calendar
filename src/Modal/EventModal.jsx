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

function EventModal({ isOpen, onOpenChange, date}) {
  const {monthEvents, handleMonthEvents,eventData,handleEventData} = useApp()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventId, setEventId] = useState(-1);
  const { handleErr, handleMsg,handleTrigger } = useApp();


  useEffect(()=>{
    setTitle(eventData?.title || "");
    setDescription(eventData?.description || "");
    setStartDate(eventData?.startDate || "");
    setEndDate(eventData?.endDate || "");
    setEventId(eventData?.id || -1);
  },[eventData])

  useEffect(()=>{
    setStartDate(date.format("YYYY-MM-DD"))
    setEndDate(date.format("YYYY-MM-DD"))
  },[date])

  const modifyEventArray = (eventId) =>{
    const eventIndex = monthEvents.findIndex((event) => event.id === eventId);
    if (eventIndex !== -1) {
      const updatedEvents = [...monthEvents];
       const updatedEventData = {
        id: eventId,
        title,
        description,
        startDate,
        endDate
       }
      updatedEvents[eventIndex] = {
        ...updatedEvents[eventIndex],
        ...updatedEventData,
      };

      // Actualiza el estado para reflejar los cambios en la interfaz
      handleMonthEvents(updatedEvents);
    }
  }

  const handleModifyEvent = async (token,onClose) =>{
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/events/modify/${eventId}`,
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

        // Llama a la función para actualizar el evento en memoria RAM

    if(response.status === 200){

      modifyEventArray(response.data.newEvent.id);
      handleMsg(`${response.data.error}`)
      handleErr(false);
      handleTrigger();
      onClose();
    }
  }

  const handleCreateEvent = async (onClose) => {
    const token = localStorage.getItem("token");
    if(eventId > 0){
      handleModifyEvent(token,onClose);
      return
    }
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
      const id = response.data.createdEvent.id;
      evento.id = id;
      const updatedMonthEvents = [...monthEvents, evento];
      handleMonthEvents(updatedMonthEvents);
      onClose();
      setTitle("");
      setDescription("")
      setEventId(-1);
      handleMsg(`${response.data.error}`)
      handleErr(false);
      handleTrigger();
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
                <Button onClick={()=>{
                  setTitle("")
                  setDescription("")
                  setEventId(-1);
                }} color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleCreateEvent(onClose)}
                >
                  { eventId < 0 ? 'Create' : 'Modify'}
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
