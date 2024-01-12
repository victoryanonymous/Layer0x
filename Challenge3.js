function calculateStatistics(studentsData) {
  const averageGrades = [];
  const allSubjectGrades = [];

  studentsData.forEach((student) => {
    const studentGrades = student.grades.map((grade) => grade.grade);
    //console.log(studentGrades);
    averageGrades.push(average(studentGrades));
    allSubjectGrades.push(...studentGrades);
  });

  const averageSubjects = studentsData[0].grades.map((_, index) =>
    average(studentsData.map((student) => student.grades[index].grade))
  );

  const overallAverage = average(allSubjectGrades);
  const stdDeviation = standardDeviation(allSubjectGrades);

  return {
    averageGrades,
    averageSubjects,
    overallAverage,
    stdDeviation,
  };
}

function average(arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function standardDeviation(arr) {
  const avg = average(arr);
  const squaredDiffs = arr.map((val) => Math.pow(val - avg, 2));
  const avgSquaredDiffs = average(squaredDiffs);
  return Math.sqrt(avgSquaredDiffs);
}

// Example usage with provided data
const studentsData = [
  {
    name: "John Doe",
    grades: [
      { subject: "Math", grade: 90 },
      { subject: "English", grade: 85 },
      { subject: "Science", grade: 92 },
      { subject: "History", grade: 88 },
      { subject: "Art", grade: 95 },
    ],
  },
  {
    name: "Jane Smith",
    grades: [
      { subject: "Math", grade: 88 },
      { subject: "English", grade: 92 },
      { subject: "Science", grade: 87 },
      { subject: "History", grade: 90 },
      { subject: "Art", grade: 93 },
    ],
  },
  {
    name: "Bob Johnson",
    grades: [
      { subject: "Math", grade: 78 },
      { subject: "English", grade: 85 },
      { subject: "Science", grade: 80 },
      { subject: "History", grade: 88 },
      { subject: "Art", grade: 82 },
    ],
  },
];

const resultChallenge3 = calculateStatistics(studentsData);
console.log(resultChallenge3);
