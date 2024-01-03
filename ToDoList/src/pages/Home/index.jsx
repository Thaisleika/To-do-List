import React, { useState, useEffect } from "react";

import "./styles.css";

import { Activities } from "../../Activities";

export function Home() {
  const [taskName, setTaskName] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleAddTask() {
    const newTask = {
      task: taskName,
      when: daysOfWeek,
    };
    setTasksList((prevState) => [...prevState, newTask]);
    setDaysOfWeek("");
    setTaskName("");
  }

  useEffect(() => {
    fetch("https://api.github.com/users/thaisleika")
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>To do List</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto do perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="digite a tarefa aqui"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
      <input
        type="text"
        placeholder="dia da semana"
        onChange={(e) => setDaysOfWeek(e.target.value)}
        value={daysOfWeek}
      />
      <button type="button" onClick={handleAddTask}>
        Adicionar
      </button>

      {tasksList?.map((task, index) => (
        <Activities
          key={`${task.task} - ${index}`}
          task={task.task}
          when={task.when}
        />
      ))}
    </div>
  );
}
