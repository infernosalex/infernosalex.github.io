---
title: Flag is hidden - CyberEDU
date: 2024-09-10 07:00:00 -500
categories: [CTF Writeups, CyberEdu, Mobile]
tags: [reverse,mobule,apktool,stegano]
image: /assets/img/logos/cyberedu.png

---
# Flag is hidden - CyberEDU

**Flag : <span style="color:rgb(60, 179, 113)">ECSC{a3cfc7f4f812cc4b511f6de4dc150422f49e817c0f61321852a81e6b5f3961ba}</span>**
- Difficulty: **Easy**
  
For this challenge I use 2 tools: `JADX-GUI` and `APKtool` 

Firstly I like to look in `JADX-GUI` to check code and resources. 

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/2099bc80-2a66-4deb-a010-e037f39b8e16)

Good in challenge description, we found a hint `PS: stegano tools can "rock your" score` => stegano + "rockyou.txt"

I use `apktool d flag.apk` and I search the image and I use [`stegcracker`](https://github.com/Paradoxis/StegCracker) to find what is inside 
`stegcracker ./flag/res/drawable-v24/splash.jpg /usr/share/wordlists/rockyou.txt`

After that `cat ./flag/res/drawable-v24/splash.jpg.out` => `fla................................................GGGGGG{RUNTQ3thM2NmYzdmNGY4MTJjYzRiNTExZjZkZTRkYzE1MDQyMmY0OWU4MTdjMGY2MTMyMTg1MmE4MWU2YjVmMzk2MWJhfQ==}`

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/2d44a7ea-1987-4a1b-bfdb-0819c6d11e05)
