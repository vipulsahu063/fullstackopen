const CourseList = ({ courses }) => {
    return (
      <div>
        <h1>Web Development Curriculum</h1>
        {courses.map(course => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    );
  };
  
  const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <strong>Total of {totalExercises} exercises</strong>
      </div>
    );
  };
  
  const Header = ({ name }) => <h3>{name}</h3>;
  
  const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
  
  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  );

  export default CourseList