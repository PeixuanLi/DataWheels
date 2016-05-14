file = open("green_week")
sum=0
s=[0,0,0,0,0,0,0]
i=0
for line in file:
	line=int(line)
	sum=sum+line
	s[i]=line

file.close()
file = open("green_week_percent","w")	
for line in s:
	file.write(str(line/sum))
	file.write('\n')
	
file.close()