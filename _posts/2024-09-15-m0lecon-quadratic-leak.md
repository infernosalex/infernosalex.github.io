---
title: Quadratic Leak
date: 2024-09-15 17:00:00 -500
categories: [CTF Writeups, m0leCon CTF, Crypto]
tags: [Crypto,RSA,Leak]
image: /assets/img/logos/htb/htb-crypto.png
math: true
---
# Quadratic Leak - m0lecon CTF 2025 Teaser

**Flag : <span style="color:rgb(60, 179, 113)">ptm{Nonlinear_Algebra_Preserved_Over_Large_Integers}</span>**
- Difficulty: **Medium**

We got the Python source code used to encrypt the flag:

```python
from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes, bytes_to_long  

flag = b'ptm{REDACTED}'
flag = bytes_to_long(flag)

key = RSA.generate(2048)
n = key.n
e = key.e
p, q = key.p, key.q

leak = (p**2 + q**2 - p - q)%key.n

ciph = pow(flag, key.e, key.n)
ciph = long_to_bytes(ciph)

print(f'{n = }')
print(f'{e = }')
print(f'{ciph = }')
print(f'{leak = }')
```
and we also have the output of the encryption:

```plaintext
n = 18981841105895636526675685852772632158842968216380018810386298633786155635996081803989776444322885832862508871280454015266715098097212762303823817669399277859053310692838636039765017523835850272300243126797277954387477501506925762258179024160726332434715115654485883242651742714579029928789693932848304595300833348009779987606253681750351002940239431890559231554840489325837351081804589516122959648786979395257143753954514874848903523580352634665455711644772319481340052722305319056316013353993453687301538982087215697860640865435677605005049256026879380517059221652220476972139202570771113865372482940490650024591211
e = 65537
ciph = b'/>\xf0a\xe4\x95a\xb8!h\x11[\xa01\xa2\x08\xd2\xa0\xd7G\xb0CU`\x97\xc7\xa2\xe9\x94\x10=\xf7\xd6y{\x01u\xcbl\xe1\x7f\x8d\xa0\xd8_\xba\x8a\xd9\x85\xc1\xcc\rK\xc7\xb6\xfb.(\x99%\x1f\x0b\xeci\nR\x8b\xcc>\x86\x18\xe1ie\x19\x9dI\xda\x9bNh8N\xe5\xf2\xf3kP\xeb\x02d\xdei\xadd\xa0\x17WKs~3ohp\xeb\x83\x17>[\x87K\xd1\x0e>\xf6\xeeR\x08\xc4y\x9c\xc7\xbf\xdaq\x9a\xff\x99EQSg\x04"H\xc0=\xfc\x1b\xdcA\x95\xb9\x15m\xe6\x04N\x81%\xda\xa5\xb2P\x02\xbb\xb9\x83\xbf\xcfR\xffe\x0fT\xd9=f\xc1\xab\xd3:\xfb\xf8k\xc0\xd1]V\xc6pK\x86T\xfe\xd5\xadb\x7f\x1b\xb1\x9d9\xe51\xb8\'BY\xcb\x934\x1e\xfb\xc8\x96V4\x0f\xb3\xe4\xd9\x92e;v\x88\x8e\x16\x14?\xe9ew\x95\x8c\xa2\xfc\xc3\xf7,\xd50\xc3@\x11|\x8a\xe0\xee\xf3u\xa0\x8a_?A2[\xad\x8e\x81\x99\xf0\r'  
leak = 110277838449088002585424592968018361142419851286027284241723700708406129526007148628583636124051067276081936889565484783806534793568491888186904160969266846545579940493300734427497600123059580090561311191997050900418560468769108541786093143743441372956591688646550593311523980201035231511541259853198512190703006995530566933548862787123808685889850952840156903871573965022335639190635103252052979042642912530238710466180279568731038056810280199578414064760950459385877300845399348928704648108281000674478903445454838155321984920936780746021819652974978142789457099370813760033995294668404782700700352547809925049256
```

##  Source code analysis
The code is generating an RSA key pair, with 1024 bits primes $p$ and $q$, and encrypting the flag using the public exponent $e$ and the modulus $n$. The code shows the modulus $n$, the public exponent $e$, the $ciphertext$, and the $leak$  value.

The leak value is calculated as follows:
$$\text{leak} = (p^2 + q^2 - p - q) \mod{n}$$

We need to find `leak` to recover the $p$ and $q$ values and decrypt the flag.

## Solution 

The idea is to find the value of $p + q$. 
$$p^2 + q^2 - p - q = (p + q)^2 - (p + q) \mod{n}$$ 
The experssion $(p + q)^2$ is equal to $p^2 + q^2 + 2pq$. So, the equation can be simplified, because $N$ = $p*q$ and $2pq \mod{n} = 0$. So, the equation can be simplified as follows: $(p + q)^2 - (p + q)$  = $(p + q)(p + q - 1)$.

Phi is the Euler's totient function, and it is equal to $(p - 1)(q - 1) = pq -(p+q)+1$.
And we can calculate $phi$ and $d$ without to find $p$ and $q$.
$$ 
phi = n - p\_plus\_q  + 1 \\
d=pow(e,-1,phi) \\
flag = pow(ciphertext,d,n)
$$

When I solved it, I didn't know that equation and I solve the system of equations to find $p$ and $q$.

$$
\begin{cases}
eq1 = p + q - p\_plus\_q \\
eq2 = p \cdot q - n \\
\end{cases}
$$

```python
from sympy import symbols, solve

# Given values
p_plus_q = 275749238008070720596557063691887439758718721972498220178910500602724271259602516272039850899295392787140083369754120031567642392134807339477039518885214191807889465264536828940006167883453159218821449466582455379049340120277182788173911470697075948834472696513634193058030512537007890050884691744220113395900
n = 18981841105895636526675685852772632158842968216380018810386298633786155635996081803989776444322885832862508871280454015266715098097212762303823817669399277859053310692838636039765017523835850272300243126797277954387477501506925762258179024160726332434715115654485883242651742714579029928789693932848304595300833348009779987606253681750351002940239431890559231554840489325837351081804589516122959648786979395257143753954514874848903523580352634665455711644772319481340052722305319056316013353993453687301538982087215697860640865435677605005049256026879380517059221652220476972139202570771113865372482940490650024591211

# Define the variables
p, q = symbols('p q')

# Define the equations
eq1 = p + q - p_plus_q
eq2 = p * q - n

# Solve the equations
solutions = solve((eq1, eq2), (p, q))

# Print the solutions
for sol in solutions:
    # sol is a tuple with (p_value, q_value) or (q_value, p_value)
    p_value, q_value = sol
    print(f"p = {p_value}")
    print(f"q = {q_value}")
```
And the final, it's trivial to decrypt the flag.

### Solve script unintended
```python
from sage.all import *
from Crypto.Util.number import long_to_bytes, bytes_to_long, inverse

n = 18981841105895636526675685852772632158842968216380018810386298633786155635996081803989776444322885832862508871280454015266715098097212762303823817669399277859053310692838636039765017523835850272300243126797277954387477501506925762258179024160726332434715115654485883242651742714579029928789693932848304595300833348009779987606253681750351002940239431890559231554840489325837351081804589516122959648786979395257143753954514874848903523580352634665455711644772319481340052722305319056316013353993453687301538982087215697860640865435677605005049256026879380517059221652220476972139202570771113865372482940490650024591211
leak = 110277838449088002585424592968018361142419851286027284241723700708406129526007148628583636124051067276081936889565484783806534793568491888186904160969266846545579940493300734427497600123059580090561311191997050900418560468769108541786093143743441372956591688646550593311523980201035231511541259853198512190703006995530566933548862787123808685889850952840156903871573965022335639190635103252052979042642912530238710466180279568731038056810280199578414064760950459385877300845399348928704648108281000674478903445454838155321984920936780746021819652974978142789457099370813760033995294668404782700700352547809925049256

s = var('s')

# Estimated range for c
max_c = 10000000  
found_solution = False
# Iterate over different values of c and try to solve for p + q
for c in range(max_c):
    # Construct the equation: leak + c * n = (p + q)(p + q - 1)
    equation = s * (s - 1) == leak + c * n
    solutions = solve(equation, s)
    
    for sol in solutions:
        p_plus_q = sol.rhs()
        if p_plus_q.is_integer() and p_plus_q > 0:
            print(f"Successful: p + q = {p_plus_q}, with c = {c}")
            found_solution = True
            break
    if found_solution:
        break
    if not found_solution:
        print(f"Unsuccessful: c = {c}")

phi = n - p_plus_q + 1
e = 65537

d = inverse_mod(e, phi)

ciph_bytes = ciph = b'/>\xf0a\xe4\x95a\xb8!h\x11[\xa01\xa2\x08\xd2\xa0\xd7G\xb0CU`\x97\xc7\xa2\xe9\x94\x10=\xf7\xd6y{\x01u\xcbl\xe1\x7f\x8d\xa0\xd8_\xba\x8a\xd9\x85\xc1\xcc\rK\xc7\xb6\xfb.(\x99%\x1f\x0b\xeci\nR\x8b\xcc>\x86\x18\xe1ie\x19\x9dI\xda\x9bNh8N\xe5\xf2\xf3kP\xeb\x02d\xdei\xadd\xa0\x17WKs~3ohp\xeb\x83\x17>[\x87K\xd1\x0e>\xf6\xeeR\x08\xc4y\x9c\xc7\xbf\xdaq\x9a\xff\x99EQSg\x04"H\xc0=\xfc\x1b\xdcA\x95\xb9\x15m\xe6\x04N\x81%\xda\xa5\xb2P\x02\xbb\xb9\x83\xbf\xcfR\xffe\x0fT\xd9=f\xc1\xab\xd3:\xfb\xf8k\xc0\xd1]V\xc6pK\x86T\xfe\xd5\xadb\x7f\x1b\xb1\x9d9\xe51\xb8\'BY\xcb\x934\x1e\xfb\xc8\x96V4\x0f\xb3\xe4\xd9\x92e;v\x88\x8e\x16\x14?\xe9ew\x95\x8c\xa2\xfc\xc3\xf7,\xd50\xc3@\x11|\x8a\xe0\xee\xf3u\xa0\x8a_?A2[\xad\x8e\x81\x99\xf0\r' 
ciph_long = bytes_to_long(ciph_bytes)

decrypted_long = pow(ciph_long, d, n)

decrypted_bytes = long_to_bytes(decrypted_long)

print(decrypted_bytes.decode('utf-8'))

```

