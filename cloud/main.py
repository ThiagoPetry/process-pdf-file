import os

from flask import Flask, request, jsonify
from PyPDF2 import PdfReader

app = Flask(__name__)

@app.route("/status")
def status():
    ok = { "ok": 1 }
    return ok

@app.route("/read_pdf", methods=["POST"])
def read_pdf():
    if "file" not in request.files:
        return jsonify({ "message": "file not found" }), 400

    pdf_file = request.files["file"]

    if not pdf_file.filename.endswith(".pdf"):
        return jsonify({ "message": "invalid file" }), 400
    
    try:
        pdf = PdfReader(pdf_file)
        text = ""

        for page_number in range(len(pdf.pages)):
            text += pdf.pages[page_number].extract_text()

        return jsonify({ "success": True, "text": text }), 200

    except Exception as e:
        return jsonify({ "error": str(e) }), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8081)))