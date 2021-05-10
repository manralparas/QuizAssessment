import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import './QuizStyle.css';
import axios from 'axios';
const API_URL = "http://localhost:8000/api/";
let numberOfQuestion=0;
function Quiz(props) {
    const [point,setPoint] = useState(0);
    const [passing,setPassing] = useState(0);
    const [questions,setQuestion]=useState([{}]);
 useEffect(()=>{
      fetch(API_URL+"question/"+props.match.params.id).then(res=>res.json().then((res)=>{
          setQuestion(res)
            console.log(questions);
            numberOfQuestion=questions.length;
           
        }))

  },[])
  const publishQuiz=()=>{
      return axios.put(API_URL+"publish/"+props.match.params.id,{
          marks:point,
          passing_marks:passing
      }).then(res=>alert("Quiz Publised")).catch(err=>alert(err))
  }
 const handleDelete=(question)=>{
        return axios.put(API_URL+"question/"+props.match.params.id,{
            question
        }).then(res=>alert("Question Deleted"))
        .catch((err)=>alert(err));
 } 
  numberOfQuestion=questions.length;
  console.log(numberOfQuestion)
    return (
        
        <div>
             <h3 style={{textAlign:"center"}}>Create Quiz</h3>
             <div className="publish">
                 
             <div><span>Point Per Question</span><input onChange={(e)=>setPoint(e.target.point)} /></div>
             <div style={{marginTop:"20px"}}><span>Passing Point</span><input onChange={(e)=>setPassing(e.target.value)} /></div>
              </div>
            <div className="create_quiz">
           <button className="btn btn-primary helper" onClick={()=>publishQuiz()} disabled={numberOfQuestion<10?true:false}>Publish Quiz</button>
            </div>
            <div className="warning">
            <p >{numberOfQuestion<10?<p>Atleast 10 question required</p>:null}</p>
          </div>
            <div className="questions">
                <div className="create_question">
                    <h4>Add new question for quiz</h4>
                   <Link to={`/course/question/${props.match.params.id}`}><button className="btn btn-success mx-3">Add question</button></Link> 
                </div>
            </div>
            {questions.map(x=>{
                
      return(<>
          <div className="col-md-7 question_title d-flex justify-content-between">
              <p>Q:- {x.questionStatement}</p>
              <button onClick={()=>handleDelete(x.questionStatement)} className="btn btn-danger">Delete</button>
          </div>
          <p style={{marginLeft:"40px"}}>Ans:-{x.correct_answer}</p>
          </>
      )
  })}
        </div>

    )
}

export default Quiz
