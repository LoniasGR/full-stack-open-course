import React from 'react'

const Header = ({title}) => (<h2>{title}</h2>);

const Part = ({title, exercises}) => (
    <p>{title} {exercises}</p>
)

const Total = ({sum}) => (
    <p><strong>Total of {sum} exercises</strong></p>
)

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(
                part =>
                <Part key={part.id} title={part.name} exercises={part.exercises} />
            )}
            <Total sum={parts.reduce((sum, part) => sum+part.exercises,0)}/>
        </div>
    )
}

const Course = ({course}) => {
  return (
    <div>
        {
            <>
            <Header title={course.name} />
            <Content parts={course.parts}/>
            </>
        }
    </div>
  )
}

export default Course;