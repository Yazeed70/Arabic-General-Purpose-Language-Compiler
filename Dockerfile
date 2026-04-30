# 1. استخدام بيئة تحتوي على بايثون
FROM python:3.10-slim

# 2. تثبيت لغة الجافا (JDK) وأداة curl
RUN apt-get update && \
    apt-get install -y default-jdk curl && \
    apt-get clean

# 3. تحديد مجلد العمل داخل السيرفر
WORKDIR /app

# 4. نسخ جميع ملفات مشروعك إلى السيرفر
COPY . /app/

# 5. تحميل JavaCC (نفس خطوتك في ملف الـ bat)
RUN curl -L -o javacc.jar https://repo1.maven.org/maven2/net/java/dev/javacc/javacc/7.0.13/javacc-7.0.13.jar

# 6. بناء المترجم (نفس خطوتك في ملف الـ bat)
RUN java -cp javacc.jar javacc LughatDad.jj

# 7. تجميع ملفات الجافا (نفس خطوتك في ملف الـ bat)
RUN javac -encoding UTF-8 *.java

# 8. تشغيل سيرفر البايثون ليبقى يعمل دائماً
CMD ["python", "server.py"]