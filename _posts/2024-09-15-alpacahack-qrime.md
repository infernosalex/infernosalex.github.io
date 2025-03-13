---
title: qrime - AlpacaHack Round 3 (Crypto)

date: 2024-09-15 17:00:00 -500
categories: [CTF Writeups, AlpacaHack, Crypto]
tags: [Crypto,RSA,Leak,Binary Search,Polynomial]
image: /assets/img/logos/htb/htb-crypto.png
math: true
seo:
  keywords: [Crypto,RSA,Leak,Binary Search,Polynomial,AlpacaHack,AlpacaHack Round 3,CTF,CTF Writeups] 
---
# qrime - AlpacaHack Round 3 (Crypto)


**Flag : <span style="color:rgb(60, 179, 113)">Alpaca{q_and_r_have_nothing_to_do_with_QR_code}</span>**
- Difficulty: **Easy/Medium**

We got the Python source code used to encrypt the flag:

```python
import os
from Crypto.Util.number import bytes_to_long, getRandomNBitInteger, isPrime

def nextPrime(n):
    while not isPrime(n := n + 1):
        continue
    return n

def gen():
    while True:
        q = getRandomNBitInteger(256)
        r = getRandomNBitInteger(256)
        p = q * nextPrime(r) + nextPrime(q) * r
        if isPrime(p) and isPrime(q):
            return p, q, r

flag = os.environ.get("FLAG", "fakeflag").encode()
m = bytes_to_long(flag)

p, q, r = gen()
n = p * q

phi = (p - 1) * (q - 1)
e = 0x10001
d = pow(e, -1, phi)
c = pow(m, e, n)

print(f"{n=}")
print(f"{e=}")
print(f"{c=}")
print(f"{r=}")

```
and we also have the output of the encryption:

```plaintext
n=200697881793620389197751143658858424075492240536004468937396825699483210280999214674828938407830171522000573896259413231953182108686782019862906633259090814783111593304404356927145683840948437835426703183742322171552269964159917779
e=65537
c=77163248552037496974551155836778067107086838375316358094323022740486805320709021643760063197513767812819672431278113945221579920669369599456818771428377647053211504958874209832487794913919451387978942636428157218259130156026601708
r=30736331670163278077316573297195977299089049174626053101058657011068283335270
```

##  Source code analysis
The code is generating an RSA key pair, with 2 primes $p$ and $q$, and encrypting the flag using the public exponent $e$ and the modulus $n$. The code shows the modulus $n$, the public exponent $e$, the $ciphertext$, and the $r$ value. $p$ is generated as $q * nextPrime(r) + nextPrime(q) * r$.

## Solution 1

I have $r$ value, and I can calculate $next\_r$ value, I saw the difference between $r$ and $nextPrime(r)$ is small and I think the diffrence between $q$ and $nextPrime(q)$ is small too. So, I noticed $next\_q = q + k $, where $k$ is a small number.


$$
\begin{cases}
n = p *q \\
p = q * r\_next + (q + k) * r \\
n = q^2 * r\_next + q * (q + k) * r = q ^ 2 * (r\_next + r) + q * (k * r)
\end{cases}
$$

Let's note polynomial $P(x) = x^2 * (r\_next + r) + x * (k * r) - n$ and $P(q) = 0$ (for some small $k$)

$q = (-(k * r) ± \sqrt{((k * r) ** 2 + 4 * (r\_next + r) * n))} / (2 * (r\_next + r))$, but the $q$ is positive, so $$q = (-(k * r) + \sqrt{((k * r) ** 2 + 4 * (r\_next + r) * n))} / (2 * (r\_next + r))$$

### Solve script
```python
from Crypto.Util.number import long_to_bytes, inverse, isPrime
import math

n = 200697881793620389197751143658858424075492240536004468937396825699483210280999214674828938407830171522000573896259413231953182108686782019862906633259090814783111593304404356927145683840948437835426703183742322171552269964159917779
e = 65537
c = 77163248552037496974551155836778067107086838375316358094323022740486805320709021643760063197513767812819672431278113945221579920669369599456818771428377647053211504958874209832487794913919451387978942636428157218259130156026601708
r = 30736331670163278077316573297195977299089049174626053101058657011068283335270

def nextPrime(n):
    while not isPrime(n):
        n += 1
    return n

r_next = nextPrime(r)
print(f"nextPrime(r)={r_next}")

# p * q = n
# p = q * r_next + (q + k) * r

# n = q ** 2 * r_next + q * (q + k) * r
#   = q ** 2 * (r_next + r) + q * (k * r)

# P(x) = x ** 2 * (r_next + r) + x * (k * r) - n
# P(q) = 0 (for some small k)

# q = (-(k * r) ± √((k * r) ** 2 + 4 * (r_next + r) * n)) / (2 * (r_next + r))
# But q > 0 , it's a getRandomNBitInteger(256) 

k = 1
while True:
    q = (- (k * r) + math.isqrt((k * r) ** 2 + 4 * (r_next + r) * n)) // (2 * (r_next + r))
    if n % q == 0 and q > 1:
        break
    k = k + 1


print(f"q={q}")
p = n // q
print(f"p={p}")

phi = (p - 1) * (q - 1)
e = 0x10001
d = inverse(e, phi)
m = pow(c, d, n)
print(bytes.fromhex(hex(m)[2:]))
```

## Solution 2
For second solution, I took another approach, I will use the binary search to find the $q$ value.

### Solve script
```python
from Crypto.Util.number import long_to_bytes, inverse, isPrime
import sympy

n = 200697881793620389197751143658858424075492240536004468937396825699483210280999214674828938407830171522000573896259413231953182108686782019862906633259090814783111593304404356927145683840948437835426703183742322171552269964159917779
e = 65537
c = 77163248552037496974551155836778067107086838375316358094323022740486805320709021643760063197513767812819672431278113945221579920669369599456818771428377647053211504958874209832487794913919451387978942636428157218259130156026601708
r = 30736331670163278077316573297195977299089049174626053101058657011068283335270


def bin_search(n: int, r: int) -> int:
    low = 0
    high = 1 << 256
    while low < high:
        mid = (low + high) // 2
        q = mid
        p: int = q * sympy.nextprime(r) + sympy.nextprime(q) * r
        if p * q >= n:
            high = mid
        else:
            low = mid + 1
    return mid


q = bin_search(n, r)
assert n % q == 0
p = n // q
# And from this is trivial to decrypt the flag
phi = (p - 1) * (q - 1)
d = inverse(e, phi)
m = pow(c, d, n)
print(long_to_bytes(m))
```