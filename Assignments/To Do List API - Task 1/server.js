// requiring express
const express = require("express");
const app = express();

// requiring file system
const fs = require("fs");

// using middleware
app.use(express.json());

// Getting the list of tasks
app.get("/tasks", (req, res) => {
    fs.readFile("tasks.json", "utf-8", (err, data) => {
        let formattedData = JSON.parse(data);
        res.json({
            message: "TO DO LIST",
            tasks: formattedData,
        });
    });
});

// Getting Specific task by id
app.get("/tasks/:id", (req, res) => {
    const targetId = req.params.id;
    fs.readFile("tasks.json", "utf-8", (err, data) => {
        let formattedData = JSON.parse(data);
        let uniqueTask;
        if (targetId) {
            uniqueTask = formattedData.find(data => data.id == targetId)
        }
        if (uniqueTask) {
            let targetTask = uniqueTask;
            res.send({
                message: "Data of selected task",
                task: targetTask,
            });
        } else {
            res.send({
                message: "No task found for the specified id",
                response: "404 NOT FOUND"
            })
        }
    });
});

// posting new task
app.post("/tasks", (req, res) => {
    let newTask = req.body;
    fs.readFile("tasks.json", "utf-8", (err, data) => {
        let tasks = JSON.parse(data);
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        let newData = {
            id: newId,
            title: newTask.title,
            description: newTask.description,
            completed: newTask.completed,
        }
        tasks.push(newData);
        let dataSentToFile = JSON.stringify(tasks);
        fs.writeFile("tasks.json", dataSentToFile, (err) => {
            console.log(err)
        });
        res.send({
            message: "Succesfully added the task",
            task: newData,
        })
    });
});

// using put to change the whole task
app.put("/tasks/:id", (req, res) => {
    const targetId = req.params.id;
    const newData = req.body;
    fs.readFile("tasks.json", "utf-8", (err, data) => {
        let tasks = JSON.parse(data);
        let updatedTask = tasks.map(task => {
            if (task.id == targetId) {
                return {
                    ...task,
                    title: newData.title,
                    description: newData.description,
                    completed: newData.completed,
                }
            }
            return task;
        });
        let dataSentToFile = JSON.stringify(updatedTask)
        fs.writeFile("tasks.json", dataSentToFile, (err) => {
            console.log(err)
        });

        res.send({
            message: "Task Updated successfully",
            task: updatedTask,
        })
    });
});

// using patch to update task status
app.patch("/tasks/:id", (req, res) => {
     const targetId = req.params.id;
    const newData = req.body;
    fs.readFile("tasks.json", "utf-8", (err, data) => {
        let tasks = JSON.parse(data);
        let updatedTask = tasks.map(task => {
            if (task.id == targetId) {
                return {
                    ...task,
                    completed: newData.completed,
                }
            }
            return task;
        });
        let dataSentToFile = JSON.stringify(updatedTask)
        fs.writeFile("tasks.json", dataSentToFile, (err) => {
            console.log(err)
        });

        res.send({
            message: "Task Updated successfully",
            task: updatedTask,
        })
    });
});

// deleting the task by id
app.delete("/tasks/:id", (req, res) => {
    let targetId = req.params.id;
    let remainingTasks;
    fs.readFile("tasks.json", "utf-8", (err, data) => {
        let tasks = JSON.parse(data);
        remainingTasks = tasks.filter(task => task.id != targetId);
        let dataSentToFile = JSON.stringify(remainingTasks, null, 5);
        fs.writeFile("tasks.json", dataSentToFile, (err) => {
            console.log(err)
        })
        res.send({
            message: "Task removed successfully",
            tasks: remainingTasks,
        });
    });
});

// making server
const PORT = 3007;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})