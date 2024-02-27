"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Task from "@/components/Task/Task";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";
import { TaskType } from "../../types";

const schema = yup.object().shape({
  taskName: yup.string().required("Task name is required"),
  importance: yup.string().required("Importance is required"),
  date: yup.string().required("Date is required"),
  sendReminder: yup.boolean().required("Send Reminder is required"),
});

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [credentials, setCredentials] = useState<TaskType>({
    taskName: "",
    importance: "",
    date: "",
    sendReminder: false,
  });
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [storedTasks, setStoredTasks] = useState<any[]>([]);

  React.useEffect(() => {
    let localTask = JSON.parse(localStorage.getItem("tasks") || "[]");
    setStoredTasks(localTask);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setEditIndex(null);
    reset({ taskName: "", importance: "", date: "", sendReminder: false });
    setCredentials({
      taskName: "",
      importance: "",
      date: "",
      sendReminder: false,
    });
  };

  const onSubmit = (data: any) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (editIndex !== null) {
      tasks[editIndex] = { ...data };
    } else {
      tasks.push({ ...data });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    reset({ taskName: "", importance: "", date: "", sendReminder: false });
    setOpen(false);
    setOpenEdit(false);
    setEditIndex(null);
    setStoredTasks(tasks);
  };

  const handleEditClick = (index: number) => {
    setOpenEdit(true);
    setEditIndex(index);
    reset(storedTasks[index]);
    setCredentials({ ...storedTasks[index] });
  };

  const handleDeleteClick = (index: number) => {
    const updatedTasks = [...storedTasks];
    updatedTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setStoredTasks(updatedTasks);
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the task.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="taskName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Name"
                  error={!!errors.taskName}
                  helperText={errors.taskName ? errors.taskName.message : ""}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="importance"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Importance</InputLabel>
                  <Select {...field} error={!!errors.importance} fullWidth>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Mid">Mid</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="date"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label=""
                  type="date"
                  error={!!errors.date}
                  helperText={errors.date ? errors.date.message : ""}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="sendReminder"
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox {...field} required />}
                    label="Send Reminder"
                  />
                  {errors.sendReminder && (
                    <FormHelperText>
                      {errors.sendReminder.message}
                    </FormHelperText>
                  )}
                </FormGroup>
              )}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit */}

      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the task.
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="taskName"
              control={control}
              defaultValue={credentials.importance}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Name"
                  error={!!errors.taskName}
                  helperText={errors.taskName ? errors.taskName.message : ""}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="importance"
              control={control}
              defaultValue={credentials.importance}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Importance</InputLabel>
                  <Select {...field} error={!!errors.importance} fullWidth>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Mid">Mid</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="date"
              control={control}
              defaultValue={credentials.date}
              render={({ field }) => (
                <TextField
                  {...field}
                  label=""
                  type="date"
                  error={!!errors.date}
                  helperText={errors.date ? errors.date.message : ""}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="sendReminder"
              control={control}
              defaultValue={credentials.sendReminder}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox {...field} required />}
                    label="Send Reminder"
                  />
                  {errors.sendReminder && (
                    <FormHelperText>
                      {errors.sendReminder.message}
                    </FormHelperText>
                  )}
                </FormGroup>
              )}
            />

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Task
        tasks={storedTasks}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </Container>
  );
};

export default HomePage;
