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

export default Course;
