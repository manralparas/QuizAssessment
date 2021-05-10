import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import './QuizStyle.css';
const API_URL = "http://localhost:8000/api/";
function Quiz(props) {
    const [course,setCourse]=useState();
 useEffect(()=>{
      fetch(API_URL+"course/"+props.match.params.id)
      .then((res)=>res.json().then(res=>setCourse(res.response)))
      .catch((err)=>console.log(err))

  },[])

    const numberOfQuestion=10;
    return (
        <div>
            <div className="create_quiz">
             <h3>Create Quiz</h3>
            <button className="btn btn-primary helper" disabled={numberOfQuestion<10?true:false}>Publish Quiz</button>
            </div>
            <div className="warning">
            <p >{numberOfQuestion<10?<p>Atleast 10 question required</p>:null}</p>
          </div>
            <div className="questions">
                <div className="create_question">
                    <h4>Add new question for quiz</h4>
                   <Link to={`/course/question/${props.match.params.id}`}><button className="btn btn-success">Add question</button></Link> 
                </div>
            </div>
        </div>
    )
}

export default Quiz
