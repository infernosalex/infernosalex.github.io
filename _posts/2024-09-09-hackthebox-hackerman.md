---
title: Hackerman - HackTheBox
date: 2024-09-09 12:00:00 -500
categories: [CTF Writeups, Hackthebox, Misc]
tags: [misc,steganography]
image: /assets/img/logos/htb/htb-misc.png
seo:
  keywords: [misc,steganography,HackTheBox,HackTheBox Writeups] 
---
# Hackerman - HackTheBox

**Flag : <span style="color:rgb(60, 179, 113)">HTB{3v1l_c0rp}</span>**
- Difficulty: **Very Easy**

```bash
└──╼ $stegseek hackerman.jpg 
StegSeek 0.6 - https://github.com/RickdeJager/StegSeek

[i] Found passphrase: "almost"
[i] Original filename: "hackerman.txt".
[i] Extracting to "hackerman.jpg.out".

└──╼ $cat hackerman.jpg.out | base64 --decode
HTB{3v1l_c0rp}
```