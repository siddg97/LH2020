import PyPDF2

"""
https://stackoverflow.com/questions/34837707/how-to-extract-text-from-a-pdf-file
"""
def pdf2text(pdf_path):
    pages = []

    pdfFileObject = open(pdf_path, 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
    count = pdfReader.numPages
    for i in range(count):
        page = pdfReader.getPage(i)
        pages.append(page.extractText())

    return pages
