---
title: LostModulus - HackTheBox
date: 2024-09-10 07:00:00 -500
categories: [CTF Writeups, Hackthebox, Crypto]
tags: [Crypto,RSA,Small e]
image: /assets/img/logos/htb/htb-crypto.png
math: true
---
# LostModulus - HackTheBox

**Flag : <span style="color:rgb(60, 179, 113)">HTB{n3v3r_us3_sm4ll_3xp0n3n7s_f0r_rs4}</span>**
- Difficulty: **Very Easy**

The challenge provides a RSA script and the ciphertext. The script is using a **small e** value which is a common mistake in RSA implementation.

```python
# Challenge.py
#!/usr/bin/python3
from Crypto.Util.number import getPrime, long_to_bytes, inverse
flag = open('flag.txt', 'r').read().strip().encode()

class RSA:
    def __init__(self):
        self.p = getPrime(512)
        self.q = getPrime(512)
        self.e = 3
        self.n = self.p * self.q
        self.d = inverse(self.e, (self.p-1)*(self.q-1))
    def encrypt(self, data: bytes) -> bytes:
        pt = int(data.hex(), 16)
        ct = pow(pt, self.e, self.n)
        return long_to_bytes(ct)
    def decrypt(self, data: bytes) -> bytes:
        ct = int(data.hex(), 16)
        pt = pow(ct, self.d, self.n)
        return long_to_bytes(pt)

def main():
    crypto = RSA()
    print ('Flag:', crypto.encrypt(flag).hex())

if __name__ == '__main__':
    main()
```

```plaintext
Flag: 05c61636499a82088bf4388203a93e67bf046f8c49f62857681ec9aaaa40b4772933e0abc83e938c84ff8e67e5ad85bd6eca167585b0cc03eb1333b1b1462d9d7c25f44e53bcb568f0f05219c0147f7dc3cbad45dec2f34f03bcadcbba866dd0c566035c8122d68255ada7d18954ad604965
```

## Source code analysis
The challenge script is using $ e=3 $, which is the exponent used for encryption. In RSA, $m$ is the plain text, $c$ is the ciphertext and $n$ is the modulus : 
$$ c = m^e \mod{n} $$

## Solution
Since the exponent is small and we don't have n ( we can take a hint from the title *"Lost Modulus"*), we can easily calculate the cube root of the ciphertext to get the plaintext. This can work if the message is short enough to satisfy the condition $m^3 = c  < n$, so the modulus doesn't affect the result.

```python
import gmpy2
c = int('05c61636499a82088bf4388203a93e67bf046f8c49f62857681ec9aaaa40b4772933e0abc83e938c84ff8e67e5ad85bd6eca167585b0cc03eb1333b1b1462d9d7c25f44e53bcb568f0f05219c0147f7dc3cbad45dec2f34f03bcadcbba866dd0c566035c8122d68255ada7d18954ad604965', 16)  
integer = gmpy2.iroot(c, 3)[1]
## Here I test if the cube root is an integer
assert integer == True
m = gmpy2.iroot(c, 3)[0]
flag = bytes.fromhex(hex(m)[2:]).decode()
print(flag)
```

And works, we get the flag, voila! 💚