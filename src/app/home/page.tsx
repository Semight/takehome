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
import { TaskType } from "../../../types";

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
    sendReminder: "",
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

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setEditIndex(null);
    reset({ taskName: "", importance: "", date: "", sendReminder: false });
  };

  const onSubmit = (data: any) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (editIndex !== null) {
      // If editIndex is not null, update existing task
      tasks[editIndex] = { ...data };
    } else {
      // Otherwise, add new task
      tasks.push({ ...data });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    reset({ taskName: "", importance: "", date: "", sendReminder: false });
    setOpen(false);
    setOpenEdit(false);
    setEditIndex(null);
  };

  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const handleEditClick = (index: number) => {
    setOpenEdit(true);
    setEditIndex(index);
    setCredentials({ ...storedTasks[index] });
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
            {/* <FormGroup>
  <FormControlLabel required control={<Checkbox />} label="Send Reminder" />
</FormGroup> */}
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
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Name"
                  error={!!errors.taskName}
                  helperText={errors.taskName ? errors.taskName.message : ""}
                  fullWidth
                  margin="normal"
                  value={credentials.taskName}
                  onChange={(e) =>
                    setCredentials({ ...credentials, taskName: e.target.value })
                  }
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
                  <Select
                    {...field}
                    error={!!errors.importance}
                    fullWidth
                    value={credentials.importance}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        importance: e.target.value,
                      })
                    }
                  >
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
                  value={credentials.date}
                  onChange={(e) =>
                    setCredentials({ ...credentials, date: e.target.value })
                  }
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
                    control={
                      <Checkbox
                        {...field}
                        required
                        value={credentials.sendReminder}
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            sendReminder: e.target.value,
                          })
                        }
                      />
                    }
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
            {/* <FormGroup>
  <FormControlLabel required control={<Checkbox />} label="Send Reminder" />
</FormGroup> */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Task tasks={storedTasks} onEditClick={handleEditClick} />
    </Container>
  );
};

export default HomePage;
