nums = [1, 2, 3,4, 5, 6, 7, 8, 9 , 10, 11, 12, 13]

evens = [num for num in nums if num % 2 == 0]

[n * n for n in [2,4,6,8]]

def gen_board(size, initial_val = None):
    return [[initial_val for x in range(size)] for y in range(size) ]


scores = [55, 89, 99, 87, 60, 70, 74, 76, 90, 50, 83]

grades = ['PASS' if score >= 70 else "FAIL" for score in scores]

