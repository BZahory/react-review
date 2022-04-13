
export default function Course({course}) {
    const Part = ({ part, exercises }) => {
        return (
          <p>
            {part} {exercises}
          </p>
        );
      };
    
  return [
    <h1>{course.name}</h1>,
    <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />,
    <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />,
    <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />,
    <p style={{fontWeight:'bold'}}>Number of exercises {course.parts.reduce(
        (previousValue=0, currentValue) => previousValue + currentValue.exercises,
        0
      )}</p>,
  ];
}
