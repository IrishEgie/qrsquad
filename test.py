def split_into_chunks(arr, chunk_size):
    return [arr[i:i+chunk_size] for i in range(0, len(arr), chunk_size)]

arr = [1, 2, 3, 4, 5, 6, 7]
chunk_size = 3
result = split_into_chunks(arr, chunk_size)
print(result)  # Output: [[1, 2, 3], [4, 5]]
