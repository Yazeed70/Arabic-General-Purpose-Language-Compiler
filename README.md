===============================
🧠 LughatDad (لغة ضاد)
===============================
Arabic General-Purpose Programming Language Compiler


===============================
📝 Project Overview
===============================
LughatDad (لغة الضاد) is an original general-purpose programming language designed to be written entirely in Arabic script.

This project implements a Tree-Walking Interpreter using JavaCC, enabling real-time parsing and execution of Arabic source code.

The language provides a complete programming environment where:

All keywords, identifiers, and outputs are in Arabic (Unicode)
The architecture is based on an Abstract Syntax Tree (AST)
Clear separation between syntax analysis and semantic evaluation
Supports advanced control flow such as:
Nested loops
Conditional branching

===============================
🚀 Prerequisites
===============================
Make sure you have the following installed:

☕ Java Development Kit (JDK 8 or higher)
Required for compiling and running the interpreter
🐍 Python (3.x) (Optional)
Only needed for the web interface
⚙️ JavaCC (Java Compiler Compiler) (Optional)
Required if you want to modify the .jj grammar file

===============================
🛠️ How to Run
===============================
▶️ Option 1: Automated Script (Windows)
Navigate to the project folder
Double-click: run_web.bat

The script will:

Generate the parser
Compile Java files with UTF-8 encoding
Start the local server

Then open your browser:

http://localhost:8000

===============================
💻 Option 2: Manual Command Line (CLI)
===============================
1. Generate Parser
javacc LughatDad.jj
2. Compile Files
javac -encoding UTF-8 *.java
3. Run with UTF-8 Support
Run a file:
java -Dfile.encoding=UTF-8 LughatDad source_file.dad
Interactive mode:
java -Dfile.encoding=UTF-8 LughatDad

===============================
🧩 Option 3: Using IDE (e.g., Eclipse)
===============================
Setup:
Create a new Java Project
Import all .java files + .jj file
Encoding Configuration:
Right-click project → Properties → Resource
Set encoding to: UTF-8
Run Configuration:
Go to: Run → Run Configurations
Select your application
Add VM argument:
-Dfile.encoding=UTF-8

(Optional)

Ensure Console encoding is also UTF-8
▶️ Run:
You can now type LughatDad code directly in the console

===============================
💻 Language Features
===============================
🧾 Variables
باستخدام: متغير
🖨️ Output
باستخدام: اطبع(...)
🔁 Control Flow
إذا (if)
وإلا (else)
بينما (while)
➗ Mathematics
+, -, *, /, ^
مع احترام أولوية العمليات
🔤 Data Types
Numbers (Double)
Boolean (صح / خطأ)
Strings
Dynamic typing

===============================
📂 Project Structure
===============================
LughatDad.jj        → JavaCC grammar
index.html          → Web interface
styles.css          → Styling
script.js           → Frontend logic
server.py           → Python bridge
SymbolTable         → HashMap<String, Object>

