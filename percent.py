file = open("Time_uber_out")
sum=0
p=[]
for line in file:
	m = line.strip().split("\t")
	m=int(m[1])
	p.append(m)
	sum+=int(m)
file.close();
file = open("uber_percentage_day","w")	
for i in p:
	file.write(str(float(i)/sum))
	file.write('\n')
	
file.close()
	