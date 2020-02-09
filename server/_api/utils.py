import PyPDF2
import requests
from bs4 import BeautifulSoup  # bs4 for html scraping
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize, sent_tokenize
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


def fetch_result(passage, question):
    url = 'https://machinereading.azurewebsites.net/api'
    PARAMS = {'question':question, "passage":passage}
    r = requests.post(url = url, json=PARAMS)

    return r.text


def html_to_data(url):
    """read html file and convert to data to be summarized"""
    html = requests.get(url)
    beautified_html = BeautifulSoup(html.text, "html.parser")
    paragraphs = beautified_html.find_all("p")
    ps = ''
    for p in paragraphs:
        ps += p.text+'\n\n'
    return ps


def tokenize_sentences(data):
    return sent_tokenize(data)


def frequency_dist(data):
    """Remove all stop words from the tokens list and create a rank"""
    sw = set(stopwords.words('english'))
    stem = PorterStemmer()
    words = word_tokenize(data)
    rank = dict()
    for each in words:
        each = stem.stem(each)
        if each in sw:
            continue
        if each in rank:
            rank[each] += 1
        else:
            rank[each] = 1
    return rank


def rank(sentences, frequency_dist):
    sentence_weight = dict()
    for each in sentences:
        swc_no_sw = 0
        for freq in frequency_dist:
            if freq in each.lower():
                swc_no_sw += 1
                if each[:7] in sentence_weight:
                    sentence_weight[each[:7]] += frequency_dist[freq]
                else:
                    sentence_weight[each[:7]] = frequency_dist[freq]
        sentence_weight[each[:7]] = sentence_weight[each[:7]]/swc_no_sw
    return sentence_weight


def avg_score(ranks):
    sum_vals = 0
    for entry in ranks:
        sum_vals += ranks[entry]
    avg_score = (sum_vals / len(ranks))
    return avg_score


def get_summary(sentences, sentence_weight, threshold):
    sentence_counter = 0
    summ = ''
    for each in sentences:
        if each[:7] in sentence_weight and sentence_weight[each[:7]] >= (threshold):
            summ += " " + each
            sentence_counter += 1
    return summ

def main(data):
    freq_table = frequency_dist(data)
    sentences = tokenize_sentences(data)
    sentence_scores = rank(sentences, freq_table)
    threshold = avg_score(sentence_scores)
    summary = get_summary(sentences, sentence_scores, threshold)
    # print(summary)
    return summary
