from utils.security import hash_password, verify_password

pw1 = "2005"
pw2 = "123"

hash1 = hash_password(pw1)
hash2 = hash_password(pw2)

print("2005 hash:", hash1)
print("123 hash:", hash2)

# 验证
print("2005 verify:", verify_password(pw1, hash1))  # True
print("123 verify:", verify_password(pw2, hash2))    # True