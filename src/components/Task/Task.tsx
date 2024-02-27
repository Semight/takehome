// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { TaskType } from "../../../types";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { IconButton } from "@mui/material";

// interface TaskProps {
//   tasks: TaskType[];
// }

// const Task: React.FC<TaskProps> = ({ tasks }) => {
//   const [taskList, setTaskList] = React.useState<TaskType[]>([]);

//   React.useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//     setTaskList(storedTasks);
//   }, []);

//   const handleEdit = (index: number) => {
//     const taskToEdit = tasks[index];
//     console.log("Editing task:", taskToEdit);
//   };

//   const handleDelete = (index: number) => {
//     const updatedTasks = [...tasks];
//     updatedTasks.splice(index, 1);
//     setTaskList(updatedTasks);
//   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow >
//             <TableCell>Task Name</TableCell>
//             <TableCell>Importance</TableCell>
//             <TableCell>Due Date</TableCell>
//             {/* <TableCell>Send Reminder</TableCell> */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tasks.map((task, index) => (
//             <TableRow key={index}>
//               <TableCell>{task?.taskName}</TableCell>
//               <TableCell
//                 sx={{
//                   color: "white",
//                   borderRadius: "20px",
//                   width: "100px",
//                   height: "40px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   textAlign: "center",
//                   backgroundColor: task?.importance === 'High' ? 'red' : task?.importance === 'Mid' ? 'pink' : 'yellow',
//                   marginTop: "20px",
//                 }}
//               >
//                 {task?.importance}
//               </TableCell>
//               <TableCell>{task?.date}</TableCell>
//               {/* <TableCell>{task?.sendReminder ? 'Yes' : 'No'}</TableCell> */}
//               <TableCell>
//                 <IconButton onClick={() => handleEdit(index)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleDelete(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default Task;


import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TaskType } from "../../../types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface TaskProps {
  tasks: TaskType[];
  onEditClick: (index: number) => void;
}

const Task: React.FC<TaskProps> = ({ tasks, onEditClick }) => {

  const handleEdit = (index: number) => {
    const taskToEdit = tasks[index];
    console.log("Editing task:", taskToEdit);
  };

  const handleDelete = (index: number) => {
    const handleDelete = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      };
    }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell>Importance</TableCell>
            <TableCell>Due Date</TableCell>
            {/* <TableCell>Send Reminder</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{task?.taskName}</TableCell>
              <TableCell
                sx={{
                  color: "white",
                  borderRadius: "20px",
                  width: "100px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor:
                    task?.importance === "High"
                      ? "red"
                      : task?.importance === "Mid"
                      ? "pink"
                      : "yellow",
                  marginTop: "20px",
                }}
              >
                {task?.importance}
              </TableCell>
              <TableCell>{task?.date}</TableCell>
              {/* <TableCell>{task?.sendReminder ? 'Yes' : 'No'}</TableCell> */}
              <TableCell>
                <IconButton onClick={() => onEditClick(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Task;