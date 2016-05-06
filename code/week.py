file = open("Uber_trips_num")
sum=[0,0,0,0,0,0,0]
s=[0,0,0,0,0,0,0]
i=2;
for line in file:
	m = line.strip().split("\t")
	m=int(m[1])
	sum[i]+=m
	s[i]+=1
	i+=1
	if i==7:
		i=0
file.close();
file = open("uber_week","w")	
for i in range(0, 7):
	file.write(str(sum[i]/s[i]))
	file.write('\n')
	
file.close()
	