const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const studentSchema = new mongoose.Schema({
    sid: { type: String, unique: true },
    name: String,
    dept: String
});

const Student = mongoose.model("Student", studentSchema);


app.post("/addStudent", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student data saved Successfully!" });
});

app.get("/searchStudent/:sid", async (req, res) => {
    console.log("Searching ID:", req.params.sid);

    const student = await Student.findOne({ sid: req.params.sid });

    if (!student) {
        return res.json({ message: "Student Not Found" });
    }

    res.json(student);
});
app.get("/allStudent",async(req,res)=>{
    const student = await Student.find();
    res.json(student);
});
app.delete("/delStudent/:sid", async (req, res) => {
    try {
        const sid = req.params.sid;

        const student = await Student.findOneAndDelete({ sid });

        if (!student) {
            return res.json({ message: "Student Not Found!" });
        }

        res.json({ message: "Student deleted Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Student" });
    }
});

app.put("/updateStudent/:sid", async (req, res) => {
    console.log("URL SID:", req.params.sid);
    console.log("BODY:", req.body);

    try {
        const sid = req.params.sid;
        const { name, dept } = req.body;

        const student = await Student.findOneAndUpdate(
            { sid: sid },
            { name, dept },
            { new: true }
        );

        console.log("UPDATED:", student);

        if (!student) {
            return res.json({ message:"Student Not Found" });
        }

        res.json({ message: "Student Updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Update Error" });
    }
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

