#!C:/Users/yuta/Anaconda3/python.exe
# -*- coding:utf-8 -*-

import sys
import io
import json
import requests
from get_token import get_token_proc

sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8")
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

access_token = get_token_proc()  # access_tokenを取得

sentence = sys.stdin.read()  # 分析する文章をJSから受け取る(改行含む)

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + access_token
}

data = {
    "sentence": sentence,
}
str_json = json.dumps(data)  # dataをJSON形式に変換

url = 'https://api.ce-cotoha.com/api/dev/nlp/v1/sentiment'  # 感情分析のURL


try:
    result = requests.post(url, headers=headers, data=str_json)
    print('Content-Type: text/html;charset=utf-8\n')
    print(result.text)

except Exception as ee:
    # sys.stderr.write("*** error *** in requests.post ***\n")
    # sys.stderr.write(str(ee) + "\n")
    # print('Content-Type: text/html;charset=utf-8\n')
    # print(ee)
    pass
