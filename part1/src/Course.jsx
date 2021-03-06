
export default function Course({course}) {
    const Part = ({ part, exercises }) => {
        return (
          <p>
            {part} {exercises}
          </p>
        );
      };
    
  return [
    <h2>{course.name}</h2>,
    ...course.parts.map((x)=> <Part part={x.name} exercises={x.exercises} />),
    <p style={{fontWeight:'bold'}}>Number of exercises {course.parts.reduce(
        (previousValue=0, currentValue) => previousValue + currentValue.exercises,
        0
      )}</p>,
  ];
}
