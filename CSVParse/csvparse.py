import csv
rows = []
def vipCSVCleaner(filename):
    with open(filename, 'r') as file:
        csvreader = csv.reader(file)
        header = next(csvreader)
        header[0] = 'Name'
        rows.append(header[0:6])
        for row in csvreader:
            rows.append(row[0:6])
        sessionDate = rows[1][2].replace("/", "-")
        print(sessionDate)
        cleanedFile = "Cleaned" + sessionDate + filename

    with open(cleanedFile, "w+") as my_csv:
        cleaned = csv.writer(my_csv, delimiter=',')
        cleaned.writerows(rows)
if __name__ == "__main__":
    vipCSVCleaner("VIPSessionJumping.csv")