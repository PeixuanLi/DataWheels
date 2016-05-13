s="part-000"
Staten_Island=open("Staten_Island","w")
Queens=open("Queens","w")
Brooklyn=open("Brooklyn","w")
Manhattan=open("Manhattan","w")
Bronx=open("Bronx","w")
st=[]
qe=[]
bk=[]
mh=[]
bx=[]
for i in range(0,7):
	if (i<=9):
		i='0'+str(i)
	else:
		i=str(i)
	file = open(s+i)
	for line in file:	
		m = line.strip().split(",")
		if (m[0]=='Staten_Island'):
			st.append(m[1])
		elif (m[0]=='Queens'):
			qe.append(m[1])
		elif (m[0]=='Brooklyn'):
			bk.append(m[1])
		elif (m[0]=='Manhattan'):
			mh.append(m[1])
		elif (m[0]=='Bronx'):
			bx.append(m[1])
	file.close()

st.sort()
qe.sort()
bk.sort()
mh.sort()
bx.sort()

for i in st:
	Staten_Island.write(i)
	Staten_Island.write('\n')
for i in qe:
	Queens.write(i)
	Queens.write('\n')
for i in bk:
	Brooklyn.write(i)
	Brooklyn.write('\n')
for i in mh:
	Manhattan.write(i)
	Manhattan.write('\n')
for i in bx:
	Bronx.write(i)
	Bronx.write('\n')
	
Staten_Island.close()
Queens.close()
Brooklyn.close()
Manhattan.close()
Bronx.close()