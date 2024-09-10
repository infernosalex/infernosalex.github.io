---
title: Bork Sauls - CyberEDU
date: 2024-09-10 07:00:00 -500
categories: [CTF Writeups, CyberEdu, Reverse]
tags: [reverse,integer-overflow]
image: /assets/img/logos/cyberedu.png

---
# Bork Sauls - CyberEDU

**Flag : <span style="color:rgb(60, 179, 113)">ctf{d8194ce78a6c555adae9c14fe56674e97ba1afd88609c99dcb95fc599dcbc9f5}</span>**
- Difficulty: Easy

Firstly, I decompiled the file to see what is inside.

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/47bce577-0bdc-4369-93c0-2247be6d0ce3)

```c
undefined8 main(EVP_PKEY_CTX *param_1)
{
  int local_14;
  int local_10;
  uint local_c;
  
  init(param_1);
  local_c = 100000;
  local_10 = 0;
  puts("You enter the room, and you meet the Dancer of the Boreal Valley. You have 3 options.");
  do {
    puts("Choose: \n1.Roll\n2.Hit(only 3 times)\n3.Throw Estus flask at the boss (wut?)\n4.Alt-F4\n"
        );
    __isoc99_scanf(&DAT_001020b5,&local_14);
    if (local_14 == 3) {
      local_c = local_c + 1999999;
    }
    else if (local_14 < 4) {
      if (0 < local_14) {
        if (local_10 < 3) {
          local_c = local_c - 30000;
        }
        local_10 = local_10 + 1;
      }
    }
    else if (local_14 == 4) {
                    /* WARNING: Subroutine does not return */
      exit(0);
    }
    printf("Health: %d\n",(ulong)local_c);
  } while (-1 < (int)local_c);
  printf("Congratulations. Here\'s your flag: ");
  system("cat flag.txt");
  return 0;
}
```

I understand what I need to do : 
```c
if(-1 > (int)local_c);
```

I will go on pass to the instruction where `cat flag`

OK, but in normal mode you think it's impossible. Hmm, INT_MAX = **2147483647**, but what happened if you increment the "INT_MAX" => INT_MIN = -INT_MAX = **-2147483647** which is negative => GG

## Solve script:
```python
from pwn import *


context.log_level = "debug"

r = remote("34.159.73.134", 30149)
#r = process("./bork_sauls")

INT_MAX = 2147483647 # maximum value of an int (C/C++)

health = 100000
health_added = 1999999

while health < INT_MAX:
  health += health_added
  r.recvuntil(b"4.Alt-F4")
  r.sendline(b"3")

r.recvuntil(b"Here's your flag: ")
flag = r.recvline().strip().decode()

print(flag)
```
