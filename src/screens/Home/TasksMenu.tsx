import React, { useState } from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { TaskStatus } from "../../contexts/TaskContext/taskTypes";
import useTasks from "../../hooks/useTasks";
import AddTaskModal from "./AddTaskModal";

const FilterButton: React.FC<{
  label: string;
  disabled: boolean;
  active: boolean;
  onClick: () => void;
}> = ({ label, disabled, active, onClick }) => (
  <Button
    disabled={disabled}
    variant={active ? "solid" : "outline"}
    onClick={onClick}
  >
    {label}
  </Button>
);

const TasksMenu = () => {
  const { filter, setFilter, query, setQuery } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between py-8">
      <div className="flex gap-4 items-center">
        <Button onClick={() => setIsOpen(true)}>Add New Task</Button>
        <Input
          value={query}
          onChange={(val) => setQuery(val)}
          placeholder="Search Tasks"
        />
      </div>
      <div className="flex gap-4 items-center">
        <span>Filter</span>
        <FilterButton
          label={"All"}
          disabled={filter === "all"}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {Object.keys(TaskStatus).map((item) => {
          const key = item as keyof typeof TaskStatus;
          return (
            <FilterButton
              key={key}
              label={key}
              disabled={filter === TaskStatus[key]}
              active={filter === TaskStatus[key]}
              onClick={() => setFilter(TaskStatus[key])}
            />
          );
        })}
      </div>
      <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default TasksMenu;
