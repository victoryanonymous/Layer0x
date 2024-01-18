import math

def calc_statistics(students_data):
    avg_grades = []
    all_sub_grades = []

    for student in students_data:
        std_grades = [grade['grade'] for grade in student['grades']]
        avg_grades.append(_avg(std_grades))
        all_sub_grades.extend(std_grades)

    avg_sub = [
        _avg([student['grades'][i]['grade'] for student in students_data])
        for i in range(len(students_data[0]['grades']))
    ]

    overall_avg = _avg(all_sub_grades)
    std_deviation = _std_deviation(all_sub_grades)

    return {
        'average_grades': avg_grades,
        'average_subjects': avg_sub,
        'overall_average': overall_avg,
        'std_deviation': std_deviation,
    }

def _avg(arr):
    return sum(arr) / len(arr) if len(arr) > 0 else 0

def _std_deviation(arr):
    avg = _avg(arr)
    squared_diffs = [(val - avg) ** 2 for val in arr]
    avg_squared_diffs = _avg(squared_diffs)
    return math.sqrt(avg_squared_diffs)

students_data = [
    {
        'name': 'John Doe',
        'grades': [
            {'subject': 'Math', 'grade': 90},
            {'subject': 'English', 'grade': 85},
            {'subject': 'Science', 'grade': 92},
            {'subject': 'History', 'grade': 88},
            {'subject': 'Art', 'grade': 95}
        ]
    },
    {
        'name': 'Jane Smith',
        'grades': [
            {'subject': 'Math', 'grade': 88},
            {'subject': 'English', 'grade': 92},
            {'subject': 'Science', 'grade': 87},
            {'subject': 'History', 'grade': 90},
            {'subject': 'Art', 'grade': 93}
        ]
    },
    {
        'name': 'Bob Johnson',
        'grades': [
            {'subject': 'Math', 'grade': 78},
            {'subject': 'English', 'grade': 85},
            {'subject': 'Science', 'grade': 80},
            {'subject': 'History', 'grade': 88},
            {'subject': 'Art', 'grade': 82}
        ]
    }
]

result_challenge3 = calc_statistics(students_data)
print(result_challenge3)
