import React,{useState} from 'react'
import "./QuizStyle.css";
import axios from 'axios';
const API_URL = "http://localhost:8000/api/";
function Question(props) {
  const [question,setQuestionStatement]= useState("");
  const [correct,setCorrect] = useState("");
  const [op1,setOp1] = useState("");
  const [op2,setOp2] = useState("");
  const [op3,setOp3] = useState("");
 function handleSubmit(){
            const questionStatement = question;
            const correct_answer=correct;
            const wrong_answer=[op1,op2,op3];
            return axios.post(API_URL+"question/"+props.match.params.id,{
                        questionStatement,correct_answer,wrong_answer
            }).then(res=>{
                  alert("question added successfully")
                  props.history.push("/dashboard");
                  window.location.reload();
            } ).catch(err=>alert(err))


 }

    return (
      <div>
            <h3>Add new Question</h3>
        <div class="question_container">
             <div className="col-md-8 d-flex justify-content-center coursename">
             <label for="course name" class="form-label m-2">Question</label>
             <textarea class="form-control" onChange={(e)=>setQuestionStatement(e.target.value)} placeholder="Write Your question statement here"></textarea>
       </div>
       <div className="col-md-3 d-flex justify-content-center coursename">
             <label for="course code" class="form-label mx-2">Correct Answer</label>
             <input type="text" onChange={(e)=>setCorrect(e.target.value)} class="form-control"  placeholder=""></input>
       </div>
       <div className="col-md-3 d-flex justify-content-center coursename">
             <label for="course code" class="form-label mx-5">1</label>
             <input type="text" onChange={(e)=>setOp1(e.target.value)} class="form-control"  placeholder="Option 1"></input>
       </div>
       <div className="col-md-3 d-flex justify-content-center coursename">
             <label for="course code" class="form-label mx-5">2</label>
             <input type="text" onChange={(e)=>setOp2(e.target.value)} class="form-control"  placeholder="Option 2"></input>
       </div>
       <div className="col-md-3 d-flex justify-content-center coursename">
             <label for="course code" class="form-label mx-5">3</label>
             <input type="text" onChange={(e)=>setOp3(e.target.value)} class="form-control"  placeholder="Option 3"></input>
       </div>
       <div className="col-md-3 d-flex justify-content-center coursename">
             <button  onClick={()=>handleSubmit()} className="btn btn-success">Add question</button>
       </div>
        </div>
      </div>
    )
}

export default Question
