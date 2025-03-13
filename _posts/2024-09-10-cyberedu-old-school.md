---
title: Old School - ROCSC && CyberEDU
date: 2024-09-10 07:00:00 -500
categories: [CTF Writeups, CyberEdu, ROCSC, Reverse]
tags: [reverse,cracking]
image: /assets/img/logos/cyberedu.png
seo:
  keywords: [reverse,cracking,Cyberedu,Cyberedu CTF,CTF,CTF Writeups] 
---
# Old School - ROCSC && CyberEDU

**Flag : <span style="color:rgb(60, 179, 113)">ROSCSC{LCRO-ECSC-8989-1918}</span>**
- Difficulty: **Medium**

Firstly, check out the description because, this challenge it's so tricky : `formatul ROSCSC{cod_licenta}.` REMEMBER **`ROSCSC`** it's the first part of the flag, for example I lose 20 minutes to find what is wrong with my flag.

Let's dive in: 
```python
└──╼ $strings Uncrackable.exe
!This program cannot be run in DOS mode.
Rich
.text
`.data
.rsrc
MSVBVM60.DLL
Uncrackable
Form1
Uncrackable license checker
Form1
Command1
Verificare
Text1
Label1
License code:
VB5!
Uncrackable
Uncrackable
Uncrackable
Form1
Uncrackable
Label1
C:\Program Files (x86)\Microsoft Visual Studio\VB98\VB6.OLB
```

Now I find the program it's a Visual Basics (VB) App. Now, I search [VB Decompiler](https://www.vb-decompiler.org/download.htm) and that's I found, I test on my self, but if you don't want to run "untrusted" softwares, I will attach the decomplied version in writeup.

```cs
Data Table: 40288C
  loc_402BD8: LitStr "LCRO"
  loc_402BDB: FStStrCopy var_8C
  loc_402BDE: LitStr "CSCE"
  loc_402BE1: ImpAdCallI2 StrReverse()
  loc_402BE6: FStStr var_90
  loc_402BE9: LitI2 8989
  loc_402BEC: FStI2 var_92
  loc_402BEF: LitI2_Byte 1
  loc_402BF1: CUI1I2
  loc_402BF3: LitI4 1
  loc_402BF8: FLdRfVar var_AC
  loc_402BFB: Ary1StUI1
  loc_402BFD: LitI2_Byte 9
  loc_402BFF: CUI1I2
  loc_402C01: LitI4 2
  loc_402C06: FLdRfVar var_AC
  loc_402C09: Ary1StUI1
  loc_402C0B: LitI2_Byte 1
  loc_402C0D: CUI1I2
  loc_402C0F: LitI4 3
  loc_402C14: FLdRfVar var_AC
  loc_402C17: Ary1StUI1
  loc_402C19: LitI2_Byte 8
  loc_402C1B: CUI1I2
  loc_402C1D: LitI4 4
  loc_402C22: FLdRfVar var_AC
  loc_402C25: Ary1StUI1
  loc_402C27: LitStr "-"
  loc_402C2A: FStStrCopy var_B4
  loc_402C2D: ILdRf var_8C
  loc_402C30: ILdRf var_B4
  loc_402C33: ConcatStr
  loc_402C34: FStStrNoPop var_BC
  loc_402C37: ILdRf var_90
  loc_402C3A: ConcatStr
  loc_402C3B: FStStrNoPop var_C0
  loc_402C3E: ILdRf var_B4
  loc_402C41: ConcatStr
  loc_402C42: FStStrNoPop var_C4
  loc_402C45: FLdI2 var_92
  loc_402C48: CStrUI1
  loc_402C4A: FStStrNoPop var_C8
  loc_402C4D: ConcatStr
  loc_402C4E: FStStrNoPop var_CC
  loc_402C51: ILdRf var_B4
  loc_402C54: ConcatStr
  loc_402C55: FStStrNoPop var_D0
  loc_402C58: LitI4 1
  loc_402C5D: FLdRfVar var_AC
  loc_402C60: Ary1LdUI1
  loc_402C62: CStrI2
  loc_402C64: FStStrNoPop var_D4
  loc_402C67: ConcatStr
  loc_402C68: FStStrNoPop var_D8
  loc_402C6B: LitI4 2
  loc_402C70: FLdRfVar var_AC
  loc_402C73: Ary1LdUI1
  loc_402C75: CStrI2
  loc_402C77: FStStrNoPop var_DC
  loc_402C7A: ConcatStr
  loc_402C7B: FStStrNoPop var_E0
  loc_402C7E: LitI4 3
  loc_402C83: FLdRfVar var_AC
  loc_402C86: Ary1LdUI1
  loc_402C88: CStrI2
  loc_402C8A: FStStrNoPop var_E4
  loc_402C8D: ConcatStr
  loc_402C8E: FStStrNoPop var_E8
  loc_402C91: LitI4 4
  loc_402C96: FLdRfVar var_AC
  loc_402C99: Ary1LdUI1
  loc_402C9B: CStrI2
  loc_402C9D: FStStrNoPop var_EC
  loc_402CA0: ConcatStr
  loc_402CA1: FStStr var_B8
  loc_402CA4: FFreeStr var_BC = "": var_C0 = "": var_C4 = "": var_C8 = "": var_CC = "": var_D0 = "": var_D4 = "": var_D8 = "": var_DC = "": var_E0 = "": var_E4 = "": var_E8 = ""
  loc_402CC1: FLdRfVar var_BC
  loc_402CC4: FLdPrThis
  loc_402CC5: VCallAd Control_ID_Text1
  loc_402CC8: FStAdFunc var_F0
  loc_402CCB: FLdPr var_F0
  loc_402CCE:  = Me.Text
  loc_402CD3: FLdZeroAd var_BC
  loc_402CD6: FStStr var_88
  loc_402CD9: FFree1Ad var_F0
  loc_402CDC: ILdRf var_B8
  loc_402CDF: ILdRf var_88
  loc_402CE2: EqStr
  loc_402CE4: BranchF loc_402D13
  loc_402CE7: LitVar_Missing var_170
  loc_402CEA: LitVar_Missing var_150
  loc_402CED: LitVar_Missing var_130
  loc_402CF0: LitI4 0
  loc_402CF5: LitVarStr var_100, "Cracked!"
  loc_402CFA: FStVarCopyObj var_110
  loc_402CFD: FLdRfVar var_110
  loc_402D00: ImpAdCallFPR4 MsgBox(, , , , )
  loc_402D05: FFreeVar var_110 = "": var_130 = "": var_150 = ""
  loc_402D10: Branch loc_402D3C
  loc_402D13: LitVar_Missing var_170
  loc_402D16: LitVar_Missing var_150
  loc_402D19: LitVar_Missing var_130
  loc_402D1C: LitI4 0
  loc_402D21: LitVarStr var_100, "Incearca mai tare"
  loc_402D26: FStVarCopyObj var_110
  loc_402D29: FLdRfVar var_110
  loc_402D2C: ImpAdCallFPR4 MsgBox(, , , , )
  loc_402D31: FFreeVar var_110 = "": var_130 = "": var_150 = ""
  loc_402D3C: ExitProcHresult
```

```cs
  loc_402CDC: ILdRf var_B8
  loc_402CDF: ILdRf var_88
  loc_402CE2: EqStr
```
var_88 will be the license code input, which will be compere with var_B8 = correct license code

```cs
var_8C = "LCRO"
var90 = reverse("CSCE") = "ECSC"
var92 = 8989
var_AC it's a vector => 1918
```

This instructions add "-" in each part of license code
```cs
  loc_402C27: LitStr "-"
  loc_402C2A: FStStrCopy var_B4
  loc_402C2D: ILdRf var_8C
  loc_402C30: ILdRf var_B4
  loc_402C33: ConcatStr
```

=> License code = **LCRO-ECSC-8989-1918**

And GG, we successful crack the program and found flag.