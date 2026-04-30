# 📝 LughatDad Compiler (Arabic Programming Language)

Welcome to the official repository of the **LughatDad** project; a general-purpose Arabic programming language with its own custom compiler built using **JavaCC**. This project allows users to write, compile, and execute Arabic source code in real-time through an interactive web interface.

---

## 🚀 Recent Updates (System Architecture)

The project has recently been upgraded to follow an industry-standard decoupled architecture, ensuring fast performance and making the compiler freely accessible online:

* **Frontend:** 
  * Built using `HTML`, `CSS`, and `Vanilla JavaScript`.
  * Hosted on **[GitHub Pages]** to provide fast access and a stable, interactive user interface.
* **Backend & Compiler:** 
  * The core compiler is built in **Java** using the **JavaCC** parser generator.
  * Wrapped in a lightweight **Python** server that handles code execution via a RESTful API.
  * Fully containerized using **Docker** and hosted on **Hugging Face Spaces** as a cloud server running on port `7860`.

---

## ✨ Features

* **Arabic Syntax:** Full support for variables, loops (`بينما` / while), conditional statements (`إذا` / if), and print operations written entirely in Arabic.
* **Cloud Execution:** Code is sent from the browser to the Hugging Face server, compiled and executed in a Java environment, and results (or errors) are returned to the user instantly.
* **Isolated & Secure:** Code is executed in temporary files that are immediately deleted after the output is returned.

---

## ⚙️ How It Works?

When a user clicks "Run Code" on the web interface:
1. `JavaScript` captures the input text and sends a `POST` request to the Python server (Hugging Face API).
2. The `Python` server creates a temporary text file containing the LughatDad source code.
3. The `Java` compiler is invoked via a `subprocess` command, passing the temporary file as an argument.
4. The compiler reads, parses (Lexical & Syntax Analysis), and executes the code.
5. The `Python` server returns the standard output (or error messages) formatted as a `JSON` response back to the frontend.

---

## 💻 Local Execution

If you want to modify the compiler or run it locally on your machine:

### Prerequisites:
* **Java (JDK)**
* **Python 3**
* **JavaCC** (Downloaded automatically by the build script)

### Steps to Run:

**Step 1: Clone the repository and navigate into it**
```bash
git clone https://github.com/Yazeed70/Arabic-General-Purpose-Language-Compiler.git
cd Arabic-General-Purpose-Language-Compiler
```

**Step 2: Build the compiler and start the local server**
```cmd
run_web.bat
```

**Step 3: Open your browser and navigate to**
`http://localhost:8000`

---

## 🐳 Running with Docker

If you have Docker installed, you can build and spin up the entire project environment easily:

```bash
docker build -t lughatdad-compiler .
docker run -p 8000:7860 lughatdad-compiler
```

---

## 🛠️ Technologies Used
* **Lexer & Parser:** JavaCC
* **Backend:** Python (BaseHTTPRequestHandler)
* **Frontend:** Vanilla JS, HTML, CSS
* **Containerization:** Docker
* **Hosting:** GitHub Pages (Frontend) | Hugging Face Spaces (Backend)

---
*This project was developed as part of the practical coursework for the Compilers course.*
