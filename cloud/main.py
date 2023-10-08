import os, PyPDF2

from flask import Flask, request, jsonify, send_file
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

@app.route("/update_pdf", methods=["POST"])
def update_pdf():
    try:
        new_text = request.form["text"]
        pdf_file = request.files.get("file")

        if not pdf_file or not pdf_file.filename.endswith(".pdf"):
            return jsonify({ "message": "invalid file" }), 400
        
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        new_pdf_writer = PyPDF2.PdfWriter()

        for page in pdf_reader.pages:
            page.merge_page(new_text)
            new_pdf_writer.add_page(page)

        new_pdf_path = "new_file.pdf"

        with open(new_pdf_path, "wb") as new_pdf_file:
            new_pdf_writer.write(new_pdf_file)

        response = send_file(
            new_pdf_path,
            as_attachment=True,
            download_name="new_file.pdf",
            mimetype="application/pdf"
        )

        os.remove(new_pdf_path)

        return response

    except Exception as e:
        return jsonify({ "error": str(e) }), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8081)))