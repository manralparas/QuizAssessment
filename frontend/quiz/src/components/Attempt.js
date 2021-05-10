import React,{useState,useEffect} from 'react'
import './AttemptStyle.css'
import axios from 'axios';
import AuthService from "../services/auth.service";
const API_URL = "http://localhost:8000/api/";
let correct_answer;
let passing_marks;
let correct_mark;
let quizEnd=false;
let checker=false;
function Attempt(props) {
      const currentUser = AuthService.getCurrentUser().message;
      const userId = currentUser._id
    const [quiz,setQuiz] = useState({});

    const [questionCounter,setQuestionCounter]= useState(0);
    const [loading,setLoading]= useState(true);
    const [score,setScore]= useState(0);
    useEffect(()=>{

        
        fetch(API_URL+"quiz/"+props.match.params.id).then(course=>course.json().then(res=>{
            setQuiz(res.response)
        })).catch(err=>console.log(err))
        .finally(()=>setLoading(false))
    
    },[])
    const finishQuiz=()=>{
        return axios.put(API_URL+"attempted/"+props.match.params.id,{
           userId 
        }).then(res=>{
            alert("thank you for giving quiz");
            props.history.push("/profile");
            window.location.reload();
        }).catch(err=>alert(err));
    }
    const checkAnswer=(answer)=>{
        console.log("your answer is "+answer)
        console.log("correct answer is "+correct_answer)
        let counter =questionCounter+1;

        if(questionCounter>8)
        {
            quizEnd=true;
        }
        if(answer===correct_answer)
        {
            alert("correct answer")
            let newMarks = correct_mark+score;
            setScore(newMarks);
            if(score>=passing_marks)
            checker=true;
        }
        else{
            alert("wrong answer")
        }
        setQuestionCounter(counter);
        
    }


    if(loading)
    return(
        <div>Loading</div>
    )
    else if(quizEnd)
    {   passing_marks=quiz.passing_marks;
        return(
				<div className='score-section'><h3 className="mx-5">You score {score}</h3>
               {score>quiz.passing_marks?<h6>Congrats You are Pass</h6>:<h6 className="m-5">Sorry You are Fail in This quiz</h6> }
               <button onClick={()=>finishQuiz()} className="btn btn-danger ">End</button>
                </div>
        )
    }
    else{
        console.log(quiz.question)
        const questionText=quiz.question[questionCounter].questionStatement
        console.log(questionText);
        const answer=quiz.question[questionCounter].correct_answer;
        const marks = quiz.marks;
        correct_answer=answer;
        correct_mark=marks;
        const opt=[...quiz?.question[questionCounter]?.wrong_answer,quiz.question[questionCounter].correct_answer];
        opt.sort(()=>.5-Math.random());
    return (
        <div className="jumbotron">
<div className='app'>
		
			{quizEnd ? (
				<div className='score-section'><h1>You score {score}</h1><button className="btn ">Submit</button></div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
            <span>Q{questionCounter+1}</span>/{quiz?.question?.length}
						</div>
            <div className='question-text bg-danger mx-3'>{questionText}</div>
					</div>
					<div className='answer-section'>
           <div>A-<button className="btn btn-primary m-2" onClick={(e)=>checkAnswer(e.target.value)} value={opt[0]}>{opt[0]}</button> </div> 
            <div>B-<button className="btn btn-primary" onClick={(e)=>checkAnswer(e.target.value)} value={opt[1]}>{opt[1]}</button></div>
           <div>C-<button className="btn btn-primary" onClick={(e)=>checkAnswer(e.target.value)} value={opt[2]}>{opt[2]}</button></div>
            <div><button className="btn btn-primary" onClick={(e)=>checkAnswer(e.target.value)} value={opt[3]}>{opt[3]}</button></div>
					</div>
				</>
			)}
		</div>
        <div className="d-flex justify-content-center">{checker?"you got pass marks you can finish the quiz":null}</div>
        <div className="d-flex justify-content-center"><button disabled={!checker} className="mx-5 btn btn-success btn-lg">Finish</button></div>
        </div>
    )
}
}
export default Attempt
