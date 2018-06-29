import os
import sqlite3
import time
conn=sqlite3.connect('att.db')
try:
    conn.cursor().execute("CREATE TABLE IF NOT EXISTS Attendance(id integer PRIMARY KEY);")
    conn.cursor().execute("INSERT INTO Attendance(id) VALUES(11502105);")
except:
    pass
conn.commit();
def present(regno):
    date_today=time.strftime("%Y%m%d")
    conn=sqlite3.connect('att.db')
    query="UPDATE Attendance SET _"+date_today+" = 'P' WHERE id="+regno+";"
    conn.cursor().execute(query)
    conn.commit()
def tocheck():
    date_today=time.strftime("%Y%m%d")
    conn=sqlite3.connect('att.db')
    try:
        query="ALTER TABLE Attendance ADD COLUMN _"+date_today+" string;"
        conn.cursor().execute(query)
    except sqlite3.OperationalError:
        pass
    conn.commit()
    t=os.popen("face_recognition --cpus 2 ./KnownFaces ./ToCheck | cut -d ',' -f2").read()
    regno=t.split()
    regno=str(regno[len(regno)-1])
    try:
        regno=int(regno)
        present(str(regno))
        return "YES"
    except:           
        return "NO"
tocheck()
    