#!C:/Users/yuta/Anaconda3/python.exe
# -*- coding:utf-8 -*-

import sys
import json
import requests

json_open = open('config.json', 'r')
config = json.load(json_open)

data = {
    "grantType": config['grantType'],
    "clientId": config['clientId'],
    "clientSecret": config['clientSecret']
}
str_json = json.dumps(data)

url = config['accesstokens_url']

headers = {
    "Content-Type": "application/json"
}


def get_token_proc():
    try:
        result = requests.post(url, headers=headers, data=str_json)
        # print(result.text)
        dict_aa = json.loads(result.text)
        access_token = dict_aa["access_token"]
    except Exception as ee:
        sys.stderr.write("*** error *** in requests.post ***\n")
        sys.stderr.write(str(ee) + "\n")

    return access_token


if __name__ == "__main__":
    get_token_proc()
