import csv
import pandas as pd

df = pd.read_csv(r'/Users/yuxiaoliu/Desktop/gtmbb-vis/src/data/mbbdata.csv', sep=',')

df.to_json(r'/Users/yuxiaoliu/Desktop/gtmbb-vis/src/data/mbbdata.json', indent=1, orient="records")