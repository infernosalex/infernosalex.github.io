---
title: "DotMatrix: A Cross-Platform QR Code Generator and Reader"
date: 2025-02-10 12:00:00 +0300
categories: [Projects, University]
tags: [qr-code, reed-solomon, encryption, tauri, python, rust, react]
image:
  path: /assets/img/logos/logo-dotmatrix.png
  alt: DotMatrix QR Code Application
seo:
  keywords: [qr-code, reed-solomon, encryption, tauri, python, rust, react, DotMatrix, QR Code Generator, QR Code Reader, Cross-Platform, University Project, Computer Systems Architecture, University of Bucharest]
---

# DotMatrix: Building a Modern QR Code Solution

## Introduction

DotMatrix is a full-stack web application for QR code generation and decoding, developed as a university project for the "Arhitectura Sistemelor de Calcul" (Computer Systems Architecture) course at the Faculty of Mathematics and Computer Science, University of Bucharest.

The project provides a modern, user-friendly interface for creating and reading QR codes with various customization options. A live instance is available at [https://dotmatrix.byte.mom](https://dotmatrix.byte.mom).

## Project Overview

DotMatrix stands out among QR code tools due to its comprehensive implementation of the QR code standard. Rather than relying on existing libraries, we built the core QR code functionality from scratch, including:

- QR code generation with customizable options (version, error correction level, etc.)
- QR code decoding from uploaded images
- Cross-platform desktop application using Tauri
- RESTful API backend for easy integration

## My Contributions

As part of the team, I was responsible for several key aspects of the project:

### Reed-Solomon Error Correction Implementation

One of my primary contributions was implementing the Reed-Solomon error correction algorithm. This critical component enables QR codes to be resilient against damage and scanning errors.

The implementation required:

- Creating a Galois Field (GF(256)) with polynomial operations
- Developing polynomial division algorithms for error correction code generation
- Implementing syndrome calculation and error location techniques
- Integrating error correction with the QR code generation and decoding pipeline

The Reed-Solomon implementation allows DotMatrix to generate QR codes with four levels of error correction (L, M, Q, and H), making them robust against physical damage or imperfect scanning conditions.

```python
class ReedSolomon:
    def __init__(self):
        # GF(256) primitive polynomial x^8 + x^4 + x^3 + x^2 + 1
        self.exp = [1] * 256  # Exponent table
        self.log = [0] * 256  # Log table
        
        # Initialize exp & log tables
        x = 1
        for i in range(255):
            self.exp[i] = x
            self.log[x] = i
            x = x << 1  # Multiply by x
            if x & 0x100:  # Reduce by primitive polynomial
                x ^= 0x11d
                
    def generate_ecc(self, data: bytes, ecc_words: int) -> bytes:
        """Generate error correction codewords"""
        # Initialize generator polynomial
        generator = [1]
        for i in range(ecc_words):
            generator = self._multiply_polynomials(generator, [1, self.exp[i]])
        
        # Calculate ECC
        remainder = list(data) + [0] * ecc_words
        for i in range(len(data)):
            factor = remainder[i]
            if factor != 0:
                for j in range(1, len(generator)):
                    remainder[i + j] ^= self.multiply(generator[j], factor)
        
        return bytes(remainder[-ecc_words:])
```

### Encryption Support

I also implemented encryption capabilities for QR codes, allowing users to generate encrypted content that can only be decoded with the correct key. This feature is particularly useful for sensitive information.

The encryption flow included:

- Secure key generation and management
- Data encryption before QR code generation
- Integration with the web interface for a seamless user experience
- Decryption capabilities in the decode workflow

### Tauri Desktop Application

To make DotMatrix available as a native application across different platforms, I led the development of a desktop application using Tauri, a framework for building lightweight desktop apps with web technologies and Rust.

This involved:

- Setting up the Tauri project structure and configuration
- Creating Rust-based backend functionality for file system access
- Integrating the web frontend with the Tauri framework
- Implementing platform-specific features like file handling
- Building and packaging the application for Windows, macOS, and Linux

The Tauri implementation allows users to use DotMatrix without an internet connection while benefiting from native performance and integration with the operating system.

## Technical Stack

DotMatrix utilizes a modern technology stack:

- **Frontend**: React with TypeScript, Vite for build tooling, and TailwindCSS for styling
- **Backend**: Python Flask REST API with NumPy and Pillow for image processing
- **Desktop Application**: Tauri (Rust) for cross-platform native applications

## Learning Outcomes

Working on DotMatrix provided valuable experience in:

1. Implementing complex algorithms (Reed-Solomon, QR encoding/decoding)
2. Developing cross-platform applications using Tauri and Rust
3. Building and deploying full-stack web applications
4. Working collaboratively using version control
5. Applying mathematical concepts to solve practical problems

## Conclusion

DotMatrix represents a comprehensive implementation of QR code technology, combining both theoretical understanding and practical application. My work on the Reed-Solomon error correction, encryption features, and Tauri desktop application contributed to creating a robust, cross-platform solution for QR code generation and decoding.

The project is open-source and available on [GitHub](https://github.com/infernosalex/DotMatrix), where you can explore the codebase or contribute to its development. 