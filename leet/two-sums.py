
def twoSum(nums, target):
    already_visited = set()
    for i in range(len(nums)):
        difference = target - nums[i]
        if difference in already_visited:
            return [nums.index(difference), i]

        already_visited.add(nums[i])
    return []
