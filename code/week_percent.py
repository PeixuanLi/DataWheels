file = open("uber_week")
sum=0
s=[0,0,0,0,0,0,0]
i=0
for line in file:
	line=int(line)
	sum=sum+line
	s[i]=line
	i+=1

file.close()
file = open("uber_week_percent","w")	
for line in s:
	file.write(str(round(float(line)/float(sum),4)))
	file.write('\n')
	
file.close()