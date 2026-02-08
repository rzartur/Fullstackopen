import React from "react";

const Course = ({ courses }) => {
  console.log("props.courses", courses);
  return (
    <>
      {courses.map((course) => (
        <React.Fragment key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </React.Fragment>
      ))}
    </>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => (
  <p style={{ fontWeight: "bold" }}>
    total of {parts.reduce((sum, part) => sum + part.exercises, 0)}
  </p>
);

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  console.log("courses App", courses);

  return <Course courses={courses} />;
};

export default App;
