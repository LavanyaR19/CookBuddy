import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=YOUR_SERVER_NAME;"
    "DATABASE=CookBuddy;"
    "Trusted_Connection=yes;"
)

cursor = conn.cursor()